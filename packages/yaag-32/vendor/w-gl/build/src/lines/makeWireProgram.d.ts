import { DrawContext } from 'src/createScene';
import WireCollection from './WireCollection';
export default function makeWireProgram(gl: WebGLRenderingContext, wireCollection: WireCollection): {
    draw: (drawContext: DrawContext) => void;
    dispose: () => void;
};
//# sourceMappingURL=makeWireProgram.d.ts.map