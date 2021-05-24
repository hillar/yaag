import { mat4 } from 'gl-matrix';
import { WglScene, DrawContext } from './createScene';
/**
 * Represents a single element in the scene tree
 */
export default class Element {
    children: Element[];
    parent: Element | null;
    /**
     * Transforms local coordinate system to parent coordinate system
     */
    model: mat4;
    /**
     * Cumulative transform to webgl coordinate system.
     */
    worldModel: mat4;
    /**
     * Model * view * projection matrix
     */
    modelViewProjection: mat4;
    worldTransformNeedsUpdate: boolean;
    /**
     * If true, the modelViewProjection matrix is updated before draw() call
     */
    modelViewProjectionNeedsUpdate: boolean;
    type: string;
    scene: WglScene | null;
    constructor();
    appendChild(child: Element, sendToBack?: boolean): void;
    insertChildAfter(child: Element, after: Element): void;
    bindScene(scene: WglScene | null): void;
    traverse(enterCallback: any, exitCallback: any): void;
    /**
     * Rotates this element `rad` radians around `axis`.
     */
    rotate(rad: number, axis: number[]): this;
    /**
     * Rotate `rad` radians around X axis
     */
    rotateX(rad: number): this;
    /**
     * Rotate `rad` radians around Y axis
     */
    rotateY(rad: number): this;
    /**
     * Rotate `rad` radians around Z axis
     */
    rotateZ(rad: number): this;
    /**
     * Scales this element by vector `v`
     */
    scale(v: number[]): this;
    /**
     * Translate this element by vector `v`
     */
    translate(v: number[]): this;
    /**
     * Removes the child from the collection of children. Takes `O(n)` time where `n` is number
     * of children.
     */
    removeChild(child: Element): void;
    updateWorldTransform(force?: boolean): boolean;
    scheduleMVPUpdate(): void;
    updateModelViewProjection(projection: mat4, view: mat4): void;
    /**
     * Requests the element to draw itself (and its children)
     */
    draw(gl: WebGLRenderingContext, drawContext: DrawContext): void;
    dispose(): void;
}
//# sourceMappingURL=Element.d.ts.map