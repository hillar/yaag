import WireCollection from './WireCollection';
import { DrawContext } from 'src/createScene';
export default function makeThickWireProgram(gl: WebGLRenderingContext, wireCollection: WireCollection): {
    draw: (drawContext: DrawContext) => void;
    dispose: () => void;
};
//# sourceMappingURL=makeThickWireProgram.d.ts.map