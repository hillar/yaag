import { mat4, vec3, quat } from 'gl-matrix';
/**
 * View matrix allows you to place camera anywhere in the world
 */
export default class ViewMatrix {
    /**
     * This is our view matrix
     */
    matrix: mat4;
    /**
     * Inverse of the view matrix
     */
    cameraWorld: mat4;
    /**
     * Camera position in the world
     */
    position: vec3;
    /**
     * Camera orientation in the world
     */
    orientation: quat;
    /**
     * Where the camera is looking
     */
    center: vec3;
    constructor(viewMatrix?: mat4);
    /**
     * Makes the view look at a given point
     */
    lookAt(eye: number[], center: number[], up: number[]): this;
    /**
     * Updates view matrix from the current orientation and position
     */
    update(): this;
    /**
     * Extracts current position and orientation from the `cameraWorld` matrix
     */
    deconstructPositionRotation(): void;
    translateOnAxis(axis: number[], distance: number): this;
    translateX(distance: number): this;
    translateY(distance: number): this;
    translateZ(distance: number): this;
}
//# sourceMappingURL=ViewMatrix.d.ts.map