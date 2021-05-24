import Element from '../Element';
import WireAccessor from './WireAccessor';
import Color from '../Color';
import { ColorPoint, Line } from 'src/global';
import { DrawContext } from 'src/createScene';
export interface WireCollectionOptions {
    allowColors?: boolean;
    is3D?: boolean;
    width?: number;
}
/**
 * Collection of lines. TODO: I think I should rename this to LineCollection
 */
export default class WireCollection extends Element {
    readonly allowColors: boolean;
    readonly is3D: boolean;
    readonly itemsPerLine: number;
    capacity: number;
    count: number;
    color: Color;
    /**
     * uniform width of the line.
     */
    width: number;
    buffer: ArrayBuffer;
    positions: Float32Array;
    colors: Uint32Array | null;
    isDirtyBuffer: boolean;
    private _program;
    constructor(capacity: number, options: WireCollectionOptions);
    draw(gl: WebGLRenderingContext, drawContext: DrawContext): void;
    setLineWidth(newLineWidth: number): void;
    add(line: Line): WireAccessor;
    getLineColor(from?: ColorPoint, to?: ColorPoint): number[];
    forEachLine(callback: (from: ColorPoint, to: ColorPoint) => void): void;
    dispose(): void;
    _extendArray(): void;
}
//# sourceMappingURL=WireCollection.d.ts.map