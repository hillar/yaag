/**
 * Base class for attribute code generators. Attribute code generators are responsible
 * for mapping glsl attributes to javascript buffers and states.
 *
 * For example, imagine your glsl has the following attribute:
 *
 * ``` glsl
 * attribute vec2 point;
 * ```
 *
 * We generate a code that allows javascript clients add vertex to collection:
 *
 * ``` js
 * program.add({
 *   point: [1, 4]
 * })
 * ```
 *
 * And render it:
 *
 * ``` js
 * program.draw()
 * ```
 *
 * Code generator from glsl type to javascript starts in BaseAttribute:
 */
export default class BaseAttribute {
    /**
     * type of the attribute that is used in `gl.vertexAttribPointer()`.
     */
    type: string;
    /**
     * If true - more checks are performed
     */
    debug: boolean;
    /**
     * Type of the buffer view. Used for setting values
     */
    bufferViewType: string;
    /**
     * Number of components per vertex attribute, used in `gl.vertexAttribPointer()`
     */
    count: number;
    /**
     * attribute name in glsl. Has to be set before calling any instance methods.
     */
    name?: string;
    /**
     * How many bytes each component takes? Most of the type it should be just 4.
     */
    bytePerElement: number;
    constructor();
    setName(name: any): void;
    getInitBlockForBuffer(includeDeclaration: any): string;
    getInitBlockForDraw(): string;
    /**
     * "Add block" returns code that adds attribute values to the shared buffer.
     */
    getAddBlock(offset: number, join?: string): AddBlock;
    getMoveBlock(offset: number, join?: string): string;
    /**
     * "Get block" returns code that reconstructs attribute's values from the shared buffer
     */
    getGetBlock(offset: number): string;
    getDivisor(divisor: 0 | 1): string;
    getDraw(stride: any, offset: any): string;
    ensureNameIsSet(): void;
}
export declare type AddBlock = {
    code: string;
    offset: number;
};
//# sourceMappingURL=BaseAttribute.d.ts.map