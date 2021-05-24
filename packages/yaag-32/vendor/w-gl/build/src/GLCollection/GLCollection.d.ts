import Element from '../Element';
import { RenderProgram } from 'src/gl/defineProgram';
import { DrawContext } from 'src/createScene';
export default class GLCollection extends Element {
    uniforms?: Object;
    program: RenderProgram;
    constructor(program: RenderProgram);
    getBuffer(): ArrayBuffer;
    appendBuffer(uint8Collection: Uint8Array, offset: number): void;
    add(vertex: Object): number;
    update(id: number, point: Object): void;
    remove(id: number): number;
    get(id: number): Object;
    draw(gl: WebGLRenderingContext, drawContext: DrawContext): void;
    dispose(): void;
}
//# sourceMappingURL=GLCollection.d.ts.map