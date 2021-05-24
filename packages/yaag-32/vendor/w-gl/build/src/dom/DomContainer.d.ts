import { DrawContext, WglScene } from "src/createScene";
import Element from "src/Element";
import DomElement from "./DomElement";
import { SeeThroughCollection } from "./SeeThroughCollection";
declare type DomContainerOptions = {
    /**
     * If set to true the Dom container is rendered behind the canvas. This
     * allows to render webgl items in front of the DOM items.
     *
     * Potentially this also leads to higher calculation demands.
     *
     * Note: you are responsible to make the canvas clear color be transparent:
     *
     * ``` js
     *   scene.setClearColor(0, 0, 0, 0); // Alpha set to 0
     * ```
     *
     * Also you need to disable pointer events on canvas and provide an alternative
     * DOM element (behind the canvas) to listen to events:
     *
     * `` js
     * let scene = createScene(canvas, {
     *    inputTarget: HTMLElement | CSSSelector
     * });
     * scene.getDrawContext().canvas.style.pointerEvents = 'none';
     * ```
     */
    seeThrough: boolean;
};
/**
 * Synchronizes CSS3 rendering with the parent drawing context.
 */
export default class DomContainer extends Element {
    /**
     * Container is where we place the CSS Camera. It preserves 3d transforms
     */
    container: HTMLElement;
    /**
     * Camera is the root element of the css rendering tree, and it follows
     * perspective camera of the parent w-gl scene.
     */
    camera: HTMLElement;
    bound: boolean;
    seeThrough: boolean;
    lastCameraTransform: string;
    seeThroughQuads?: SeeThroughCollection;
    constructor(options?: DomContainerOptions);
    bindScene(scene: WglScene): void;
    acceptDomChild(child: DomElement): void;
    draw(gl: WebGLRenderingContext, drawContext: DrawContext): void;
    _updateCameraTransforms(drawContext: DrawContext): void;
}
export {};
//# sourceMappingURL=DomContainer.d.ts.map