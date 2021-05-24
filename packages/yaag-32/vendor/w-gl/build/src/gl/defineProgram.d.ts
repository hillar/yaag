import { ProgramInfo } from "./getProgramInfo";
import BaseAttribute from "./BaseAttribute";
import InstancedAttribute from "./InstancedAttribute";
import FinalCode from "./FinalCode";
export declare type RenderProgram = {
    /**
     * This method adds a new vertex to the buffer and returns its id.
     *
     * The vertex is a an object, where key names match your `glsl`
     * attribute names. For example, imagine you have this vertex shader:
     *
     * ``` glsl
     * attribute vec3 point;
     * attribute vec4 color;
     *
     * uniform mat4 modelViewProjection;
     * varying vec4 vColor
     *
     * void main() {
     *   gl_Position = modelViewProjection * vec4(point, 0, 1.0);
     *   vColor = color.abgr;
     * }
     * ```
     *
     * From JavaScript side, we can add three vertices like so:
     *
     * ``` js
     * program.add({color: 0xff0000ff, point: [0, 0, 0]});
     * program.add({color: 0x00ff00ff, point: [0, 1, 0]});
     * program.add({color: 0x0000ffff, point: [1, 1, 0]});
     * ```
     *
     * notice how `color` and `point` match the attributes of the vertex shader.
     */
    add: (vertex: Object) => number;
    /**
     * Similar to `add()`, this method allows to update vertex values.
     */
    update: (vertexId: number, vertex: Object) => void;
    /**
     * Requests to remove a vertex from the collection. This is performed
     * by moving the last element of the collection on top of the requested index;
     *
     * Returns index of the newly vertex.
     */
    remove: (vertexId: number) => number;
    /**
     * Reads a vertex object from the buffer. Note: this method creates a new object
     * so we don't recommend to use it in a hot path to avoid GC pressure.
     *
     * Example:
     *
     * ``` js
     * let vertexId = program.add({color: 0xFF00FFFF, point: [1, 1, 1]});
     * let vertex = program.get(vertexId);
     * // vertex is now {color: 0xFF00FFFF, point: [1, 1, 1]}
     */
    get: (vertexId: number) => Object;
    /**
     * Executes WebGL draw() call with given set of uniforms and current
     * buffer.
     */
    draw: (uniforms: Object) => void;
    /**
     * De-allocates WebGL resources created by this program.
     */
    dispose: () => void;
    /**
     * Returns a string that represent javascript code to render program
     */
    getCode: () => FinalCode;
    /**
     * Returns a copy of the used part of the buffer.
     *
     * Note: actual buffer might be larger than returned copy, but we always return
     * part of the buffer that holds vertex attributes data.
     */
    getBuffer: () => ArrayBuffer;
    /**
     * Appends new `buffer` content to the current buffer, starting at `offset` location
     * (offset is specified in bytes).
     *
     * If current buffer is not big enough to hold appended data, current buffer is
     * extended to fulfill the request.
     *
     * This method is useful when you want to load persisted buffer (from `getBuffer()`)
     */
    appendBuffer: (buffer: Uint8Array, offset: number) => void;
    /**
     * Allows to quickly adjust how many items are in the rendered collection.
     * Setting this number to `0` makes WebGL "clear" the collection. Any subsequent `add()`
     * calls will proceed from the beginning of the collection
     */
    setCount: (count: number) => void;
    /**
     * Returns current number of added vertices.
     */
    getCount: () => number;
};
/**
 * Allows custom shader definition
 */
export declare type ProgramDefinition = {
    /**
     * Source code of the vertex shader. Plain string of glsl.
     */
    vertex: string;
    /**
     * Source code of the fragment shader, plane string of glsl
     */
    fragment: string;
    /**
     * How many vertices shall we reserve when buffer is created?
     *
     * Subsequently when we call `.add()`, and there is not enough space
     * in the buffer, the buffer will be doubled in size. For best performance
     * it's best to reserve exact amount of memory upon program creation.
     */
    capacity?: number;
    /**
     * If set to true, compiled javascript code has more checks and prints
     * the entire source code.
     */
    debug?: boolean;
    /**
     * Provides access to webgl rendering context. This parameter may go away
     * in the future.
     */
    gl: WebGLRenderingContext;
    /**
     * Allows to create linked programs. When this is set, the new program will
     * not manage its buffer, but rather use this one as an input to own shaders.
     *
     * Note: I'm not happy with this one yet, so it might change too.
     */
    sourceBuffer?: RenderProgram;
    /**
     * Called on entrance to `draw()` method. Returns a string that needs to be inserted
     * to `draw()`. Allows custom draw logic.
     */
    preDrawHook?: (x: ProgramInfo) => string;
    /**
     * Called on exit from `draw()` method. Returns a string that needs to be inserted
     * to end of the `draw()`. Allows custom draw logic.
     */
    postDrawHook?: (x: ProgramInfo) => string;
    /**
     * Collection of attribute overrides. Attribute overrides allow developers to override
     * default guessed types. For example, a glsl `attribute vec4 color;` will be translated
     * to a `Float32Array`, with one 32bit float per color channel. That is not optimal, as the
     * same information can be fit into a single 32bit uint value. So we can override
     * `float32` with
     *
     * ``` js
     *  attributes: {
     *    // tells defineProgram() to use a single 32bit integer for this attribute
     *    // instead of 4 floats.
     *    color: wgl.ColorAttribute();
     *  }
     * ```
     */
    attributes?: {
        [key: string]: BaseAttribute;
    };
    /**
     * Collection of instanced attributes. Each instanced attribute should come with its own buffer.
     * Generated program then use ANGLE_instanced_arrays extension and make all draw call instanced.
     *
     * ``` glsl
     *   attribute vec2 point;
     * ```
     * ``` js
     *  instanced: {
     *    // Make `point` instanced attribute, to render a quad:
     *    point: new wgl.InstancedAttribute([0, 0, 0, 1, 1, 1, 1, 1 0, 0, 1, 0])
     *  }
     * ```
     */
    instanced?: {
        [key: string]: InstancedAttribute;
    };
    /**
     * By default order of attributes in the javascript array buffer will match their definition order
     * in the glsl program. It works well most of the time, however if you want to serialize buffer
     * and then restore it, we recommend saving order of the attributes, so that it once restored it is
     * not affected by changed glsl code.
     *
     * This array is just collection of attribute names, that enforces their order in the array buffer.
     */
    attributeLayout?: string[];
};
export default function defineProgram(structure: ProgramDefinition): RenderProgram;
//# sourceMappingURL=defineProgram.d.ts.map