import { EventedType } from 'ngraph.events';
import Element from './Element';
import { mat4, vec3 } from 'gl-matrix';
import ViewMatrix from './ViewMatrix';
declare type Size = {
    width: number;
    height: number;
};
declare type WGLSceneOptions = {
    /**
     * Default device pixel ratio to be used for scene. If non specified
     * window.devicePixelRatio is used.
     */
    devicePixelRatio?: number;
    /**
     * Size of the scene;
     */
    size?: Size;
    /**
     * WebGL context options.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
     */
    wglContextOptions?: WebGLContextAttributes;
    /**
     * Field of view angle defined in radians.
     */
    fov?: number;
    /**
     * Near bound of the frustum
     */
    near?: number;
    /**
     * far bound of the frustum
     */
    far?: number;
    /**
     * If this property is set w-gl scene will listen to keyboard/mouse/touch
     * events from it.
     *
     * Otherwise the canvas is used.
     */
    inputTarget?: HTMLElement | string;
    /**
     * Indicates whether user can rotate the scene (either with an `alt` key or with touch/keyboard)
     *
     * `true` by default.
     */
    allowRotation?: boolean;
    /**
     * Indicates whether user can rotate the scene with touch. Overrides
     * `allowRotation` for mobile devices.
     *
     * `true` by default.
     */
    allowPinchRotation?: boolean;
    /**
     * The smallest angle of rotation around Y axis, tracked from axis X to axis Z.
     *
     * `-Infinity` by default;
     */
    minPhi?: number;
    /**
     * The largest angle of rotation around Y axis, tracked from axis X to axis Z.
     *
     * `Infinity` by default;
     */
    maxPhi?: number;
    /**
     * The smallest camera inclination angle in radians. (Angle above Oxz plane)
     */
    minTheta?: number;
    /**
     * The largest camera inclination angle in radians. (Angle above Oxz plane)
     */
    maxTheta?: number;
    /**
     * The smallest zoom distance from the viewing plane
     */
    minZoom?: number;
    /**
     * The largest zoom distance to the viewing plane
     */
    maxZoom?: number;
    /**
     * Don't use these - this can change
     */
    camera?: any;
    controls?: any;
    captureMouse?: boolean;
    useDeviceOrientation?: boolean;
};
/**
 * A context that is passed to individual rendering programs of the w-gl
 */
export interface DrawContext {
    width: number;
    height: number;
    fov: number;
    pixelRatio: number;
    canvas: HTMLCanvasElement;
    projection: mat4;
    inverseProjection: mat4;
    view: ViewMatrix;
}
export interface SceneCoordinate {
    x: number;
    y: number;
    z: number;
}
export interface WglScene extends EventedType {
    /**
     * Given `clientX` and `clientY` of a mouse coordinate, return corresponding coordinate
     * in the rendered world.
     */
    getSceneCoordinate(clientX: number, clientY: number): vec3;
    /**
     * Appends a new child to the scene
     */
    appendChild: (child: Element, sendToBack?: boolean) => void;
    /**
     * removes a child from scene
     */
    removeChild: (child: Element) => void;
    /**
     * Returns current options passed during scene creation.
     */
    getOptions: () => WGLSceneOptions;
    /**
     * Requests the scene to schedule a re-render. If `immediate` is true, then rendering
     * happens synchronously inside the call;
     */
    renderFrame: (immediate?: boolean) => void;
    /**
     * Returns the root element of the scene. Root element is a tree entry point of all things
     * that can be rendered on this scene.
     */
    getRoot: () => Element;
    /**
     * Returns four element-array of the WebGL's clear color [r, g, b, a]. Each element is
     * between `0` and `1`;
     */
    getClearColor: () => [number, number, number, number];
    /**
     * Returns current draw context (thing passed to every element during render loop)
     */
    getDrawContext: () => DrawContext;
    /**
     * Get current pixel ratio
     */
    getPixelRatio: () => number;
    /**
     * Returns rendering context.
     */
    getGL: () => WebGLRenderingContext;
    /**
     * Returns current camera controller. Don't rely on this method, it is subject to change.
     */
    getCameraController: () => any;
}
export default function createScene(canvas: HTMLCanvasElement, options?: WGLSceneOptions): WglScene;
export {};
//# sourceMappingURL=createScene.d.ts.map