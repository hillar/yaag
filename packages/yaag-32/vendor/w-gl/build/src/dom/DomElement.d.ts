import Element from '../Element';
import { WglScene } from '../createScene';
export default class DomElement extends Element {
    el: HTMLElement;
    lastTransform: String;
    constructor(customStyle: CSSStyleDeclaration);
    updateWorldTransform(force?: boolean): boolean;
    bindScene(scene: WglScene): void;
    draw(): void;
    dispose(): void;
}
//# sourceMappingURL=DomElement.d.ts.map