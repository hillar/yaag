/**
 * Describes a single texture in the glsl program.
 *
 * Note: this class is very limited at the moment and has strong assumptions about texture format and source
 * It will grow based on client needs.
 */
export default class ActiveTexture {
    /**
     * Name of the texture sample in the glsl code
     */
    name: string;
    /**
     * Texture unit number. External code is supposed to give it, and increment
     * with every new texture bound to program.
     */
    offset: number;
    /**
     * Name of the variable that references WebGLTexture object in the compiled javascript code
     */
    variableName: string;
    /**
     * Name of the variable that indicates readiness of the texture. Texture becomes ready when
     * someone calls texture init block (which ultimately uses `texImage2D`)
     */
    ready: string;
    /**
     * Name of the variable that points to uniform location associated with the texture.
     */
    location: string;
    /**
     * Always set to true. Used by external code to check the nature of the uniform variable.
     */
    isTexture: boolean;
    constructor(name: string, offset?: number);
    getInitBlockForDraw(): string;
    getTextureInitCanvasBlock(): string;
    getDraw(): string;
}
//# sourceMappingURL=ActiveTexture.d.ts.map