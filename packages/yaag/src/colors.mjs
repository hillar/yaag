
  export function style2rgba(styleValue) {
    if (styleValue.startsWith('rgba(')) {
      // rgba(rr,gg,bb,a)
      let colors = styleValue.substr(5).split(/,/).map(x => Number.parseFloat(x))
      //colors[3] = Math.round(colors[3] * 255);
      return colors;
    } else if (styleValue.startsWith('rgb(')) {
      // rgb(rr,gg,bb)
      let colors = styleValue.substr(4).split(/,/).map(x => Number.parseFloat(x))
      colors[3] = 1
      return colors;
    } else {
      throw new Error('Cannot parse this color yet ' + styleValue);
    }
  }

  export function toRgba(x) {
    return [
      (x >> 24) & 0xff ,
      (x >> 16) & 0xff ,
      (x >> 8) & 0xff ,
      // TODO is there a better way !?
      (((x) & 0xff )/255).toPrecision(2)
    ];
  }


  export function toColor(r,g,b,a = 1) {
    const aa = a * 255
    return (r << 24) | (g << 16) | (b << 8) | aa
  }
