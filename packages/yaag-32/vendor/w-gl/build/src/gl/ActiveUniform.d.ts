/**
 * Maps a glsl uniform type to correponding
 */
export declare const UniformTypeToFunctionName: {
    mat4: string;
    mat3: string;
    mat2: string;
    vec4: string;
    vec3: string;
    vec2: string;
    float: string;
};
/**
 * Defines a single uniform attribute in the GLSL shader
 */
export default class ActiveUniform {
    /**
     * Name of the uniform
     */
    name: string;
    /**
     * Name of the function that sets uniform value on `gl`. E.g. `uniformMatrix4fv`
     */
    functionName: string;
    /**
     * Name of the variable that holds uniform location.
     */
    location: string;
    constructor(name: string, variableType: string);
    getInitBlockForDraw(): string;
    getDraw(): string;
}
//# sourceMappingURL=ActiveUniform.d.ts.map