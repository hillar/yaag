import Element from '../Element';
import Color from '../Color';
import { DrawContext } from 'src/createScene';
import { ColorPoint } from 'src/global';
export interface LineStripOptions {
    allowColors?: boolean;
    is3D?: boolean;
}
/**
 * Line strip is implemented as a cyclic buffer. Each subsequent element of the
 * buffer is connected with a line to the previous element of the buffer.
 */
export default class LineStripCollection extends Element {
    drawCount: number;
    madeFullCircle: boolean;
    allowColors: boolean;
    is3D: boolean;
    itemsPerLine: number;
    capacity: number;
    nextElementIndex: number;
    color: Color;
    buffer: ArrayBuffer;
    positions: Float32Array;
    colors: Uint32Array | null;
    private _program;
    constructor(capacity: number, options?: LineStripOptions);
    draw(gl: WebGLRenderingContext, drawContext: DrawContext): void;
    add(point: ColorPoint): void;
    dispose(): void;
}
//# sourceMappingURL=LineStripCollection.d.ts.map