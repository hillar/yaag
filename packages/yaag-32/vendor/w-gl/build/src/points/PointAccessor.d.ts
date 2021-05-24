import PointCollection from './PointCollection';
import { PointWithSize } from 'src/global';
/**
 * Provides access to a single point in the PointCollection
 */
export default class PointAccessor {
    offset: any;
    data?: any;
    _points: PointCollection;
    constructor(points: PointCollection, offset: number, data?: any);
    update(point: PointWithSize): void;
    setColor(color?: number): void;
}
//# sourceMappingURL=PointAccessor.d.ts.map