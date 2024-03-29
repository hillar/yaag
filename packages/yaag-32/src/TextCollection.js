import { defineProgram, ColorAttribute, InstancedAttribute, GLCollection } from 'w-gl';

export default class ColoredTextCollection extends GLCollection {
  constructor(gl,
    fontjson = 'https://raw.githubusercontent.com/hillar/yaag/main/packages/yaag/src/Roboto.json',
    fontpng = 'https://raw.githubusercontent.com/hillar/yaag/main/packages/yaag/src/Roboto0.png',
    notifyReady, options = {}) {

    gl.getExtension('OES_standard_derivatives');

    super(getTextProgram(gl, options));

    let img = (this.msdfImage = new Image());
    img.crossOrigin = 'Anonymous';
    this.isReady = false;
    this.queue = [];
    this.texts = {}
    this.fontSize = options.fontSize || 2;
    this.opacity = options.opacity !== undefined ? options.opacity : 1;
    this.fontInfo = null;

    fetch(fontjson, { mode: 'cors' })
      .then((x) => x.json())
      .then((fontInfo) => {
        this.fontInfo = fontInfo;
        this.alphabet = new Map();
        fontInfo.chars.forEach((char) => {
          let charValue = String.fromCharCode(char.id);
          this.alphabet.set(charValue, char);
        });
        this.msdfImage.onerror = () => {
          console.error('error',this.msdfImage.src)
        }
        this.msdfImage.onload = () => {
          this._sdfTextureChanged = true;
          this.program.setTextureCanvas('msdf', this.msdfImage);
          this.isReady = true;
          this.sdfTextureWidth = img.width;
          this.sdfTextureHeight = img.height;

          this.queue.forEach((q) => this.addText(q));
          this.queue = [];
          notifyReady();
        };
        this.msdfImage.src = fontpng
      })
      .catch((error)=>{ console.error('error',fontjson) });
  }

  clear() {
    this.program.setCount(0);
  }

  draw(gl, drawContext) {
    if (!this.uniforms) {
      this.uniforms = {
        modelViewProjection: this.modelViewProjection,
        bias: 0.5,
        opacity: this.opacity
      };
    }
    this.uniforms.opacity = this.opacity;
    this.uniforms.cameraDistance = drawContext.view.position[2];

    this.uniforms.bias = 0.5;
    this.program.draw(this.uniforms);
  }

  addText(textInfo) {
    if (!this.isReady) {
      this.queue.push(textInfo);
      return;
    }
    let { id, text, x = 0, y = 0, z = 0 } = textInfo;
    if (text === undefined) {
      throw new Error('Text is not defined in ' + textInfo);
    }
    let dx = 0;
    let fontSize = textInfo.fontSize || this.fontSize;
    if (textInfo.limit !== undefined) {
      let w = 0;
      for (let char of text) {
        let sdfPos = this.alphabet.get(char);
        if (!sdfPos) continue;
        w += sdfPos.xadvance;
      }
      fontSize = (textInfo.limit * this.fontInfo.info.size) / w;
    }

    let scale = fontSize / this.fontInfo.info.size;
    if (textInfo.cx !== undefined) {
      let w = 0;
      for (let char of text) {
        let sdfPos = this.alphabet.get(char);
        if (!sdfPos) continue;

        w += sdfPos.xadvance;
      }
      dx -= w * textInfo.cx * scale;
    }
    if (textInfo.cy !== undefined) {
      y += fontSize * textInfo.cy;
    }
    const chars = []
    for (let char of text) {
      let sdfPos = this.alphabet.get(char);
      if (!sdfPos) {
        console.error(char + ' is missing in the font');
        continue;
      }

      const cid = this.add({
        position: [x + dx, y - sdfPos.yoffset * scale, z],
        color: textInfo.color,
        charSize: [
          (fontSize * sdfPos.width) / 42,
          (-fontSize * sdfPos.height) / 42,
          fontSize
        ],
        texturePosition: [
          sdfPos.x / this.sdfTextureWidth,
          1 - sdfPos.y / this.sdfTextureHeight,
          sdfPos.width / this.sdfTextureWidth,
          -sdfPos.height / this.sdfTextureHeight,
        ],
      });
      chars.push(cid)
      dx += sdfPos.xadvance * scale;
    }
    this.texts[id] = chars
    //if (this.scene) this.scene.renderFrame();
  }
  updateText(textInfo){
    let { id, x = 0, y = 0, z = 0 } = textInfo;
    if (id === undefined) {
      throw new Error('ID is not defined in ' + textInfo)
    }
    if (this.texts[id]) {
      let [xx,yy,zz] = this.get(this.texts[id][0]).position
      const diffx = x - xx
      const diffy = y - yy
      const diffz = z - zz


      for (const charId of this.texts[id]){

        const char = this.get(charId)
        if (char) {
          char.position[0] = char.position[0] + diffx
          char.position[1] = char.position[1] + diffy
          char.position[2] = char.position[2] + diffz
          this.update(charId,char)
        }

      }

    }

  }
  remove(id) {
    if (this.texts[id]) {
      for (const charId of this.texts[id]){
        this.program.remove(charId)
      }
    }

  }
}

function getTextProgram(gl, options) {
  return defineProgram({
    capacity: options.capacity || 1,
    buffer: options.buffer,
    debug: options.debug,
    gl,
    vertex: `
  uniform mat4 modelViewProjection;
  uniform float cameraDistance;

  attribute vec4 color;

  // Position of the text character:
  attribute vec3 position;
  // Instanced quad coordinate:
  attribute vec2 point;
  attribute vec3 charSize;
  // [x, y, w, h] - of the character in the msdf texture;
  attribute vec4 texturePosition;

  varying vec2 vPoint;
  varying vec4 vColor;

  void main() {
    gl_Position = modelViewProjection * vec4(
      position + vec3(vec2(point.x, point.y) * charSize.xy, position.z), 1.);
    vPoint = texturePosition.xy + point * texturePosition.zw;
    vColor = color.abgr;
    vColor[3] = smoothstep(0.2, 0.8, 100.0 / (50. * charSize.z) );
  }`,

    fragment: `
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
  precision highp float;
  varying vec2 vPoint;
  varying vec4 vColor;

  uniform float bias;
  uniform float opacity;
  uniform sampler2D msdf;

  float median(float r, float g, float b) {
    return max(min(r, g), min(max(r, g), b));
  }

  void main() {
    vec3 sample = texture2D(msdf, vPoint).rgb;
    float sigDist = median(sample.r, sample.g, sample.b) - bias;
    float alpha = clamp(sigDist / fwidth(sigDist) + bias, 0.0, 1.0);
    gl_FragColor = vec4(vColor.rgb, vColor.a * alpha * opacity);
  }`,
    attributes: {
      color: new ColorAttribute(),
    },
    instanced: {
      point: new InstancedAttribute([0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1]),
    },
  });
}
