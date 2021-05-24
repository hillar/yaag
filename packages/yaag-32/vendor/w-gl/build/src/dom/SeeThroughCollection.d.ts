import GLCollection from "src/GLCollection/GLCollection";
import DomElement from "./DomElement";
declare type QuadPointTracker = {
    original: number[];
    point: number[];
    uiId: number;
};
export declare class SeeThroughCollection extends GLCollection {
    domElementToPoints: Map<DomElement, QuadPointTracker[]>;
    uiIDToUI: Map<number, QuadPointTracker>;
    constructor(gl: WebGLRenderingContext);
    appendFromDomElement(dom: DomElement): void;
    disposeDomElement(domElement: DomElement): void;
    updateDOMElementTransform(domElement: DomElement): void;
    clear(): void;
}
export {};
//# sourceMappingURL=SeeThroughCollection.d.ts.map