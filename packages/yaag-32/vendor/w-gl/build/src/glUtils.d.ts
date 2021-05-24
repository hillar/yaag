declare const glUtils: {
    compile: typeof compile;
    link: typeof link;
    getLocations: typeof getLocations;
    getAttributes: typeof getAttributes;
    getUniforms: typeof getUniforms;
    initBuffer: typeof initBuffer;
};
export default glUtils;
declare function compile(gl: WebGLRenderingContext, type: GLenum, shaderSrc: string): WebGLShader;
declare function link(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram;
declare function getLocations(gl: WebGLRenderingContext, program: WebGLProgram): {
    attributes: any;
    uniforms: any;
};
declare function getAttributes(gl: WebGLRenderingContext, program: WebGLProgram): any;
declare function getUniforms(gl: WebGLRenderingContext, program: WebGLProgram): any;
declare function initBuffer(gl: WebGLRenderingContext, data: BufferSource | null, elementsPerVertex: number, attribute: number): void;
//# sourceMappingURL=glUtils.d.ts.map