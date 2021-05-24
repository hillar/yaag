import PointCollection from './PointCollection';
import { DrawContext } from 'src/createScene';
export default function makePointsProgram(gl: WebGLRenderingContext, pointCollection: PointCollection): {
    draw: (drawContext: DrawContext) => void;
    dispose: () => void;
};
//# sourceMappingURL=makePointsProgram.d.ts.map