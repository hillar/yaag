import Element from '../Element';
import Color from '../Color';
import PointAccessor from './PointAccessor';
import { DrawContext } from 'src/createScene';
import { ColorPoint } from 'src/global';
interface PointCollectionOptions {
    /**
     * If true, then each point has three dimensions (requires more memory)
     */
    is3D?: boolean;
    /**
     * If true, then colors can be set on each point (4 byte per point)
     */
    allowColors?: boolean;
}
export default class PointCollection extends Element {
    is3D: boolean;
    allowColors: boolean;
    /**
     * Allocated buffer capacity
     */
    capacity: number;
    /**
     * Total number of points in the collection that should be rendered.
     */
    count: number;
    color: Color;
    buffer: ArrayBuffer;
    positions: Float32Array;
    colors: Uint32Array | null;
    size?: number;
    itemsPerPoint: number;
    _program: any;
    constructor(capacity: number, options: PointCollectionOptions);
    draw(gl: WebGLRenderingContext, drawContext: DrawContext): void;
    dispose(): void;
    add(point: ColorPoint, data?: any): PointAccessor;
    _extendArray(): void;
}
export {};
//# sourceMappingURL=PointCollection.d.ts.map