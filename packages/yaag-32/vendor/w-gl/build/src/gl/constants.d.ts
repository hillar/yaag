import FloatAttribute from './FloatAttribute';
import NumberAttribute from './NumberAttribute';
/**
 * Maps a glsl attribute type to corresponding Attribute class.
 */
export declare const GLTypeToBufferType: {
    vec4: () => FloatAttribute;
    vec3: () => FloatAttribute;
    vec2: () => FloatAttribute;
    float: () => NumberAttribute;
};
//# sourceMappingURL=constants.d.ts.map