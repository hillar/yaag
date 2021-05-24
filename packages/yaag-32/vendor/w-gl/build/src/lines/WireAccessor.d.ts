import WireCollection from "./WireCollection";
import { ColorPoint } from "src/global";
/**
 * Wire accessor provides access to the buffer that stores wires.
 *
 * Wires are "lines" with 1.0 width.
 */
export default class WireAccessor {
    offset: number;
    _wire: WireCollection;
    update: (from: any, to: any) => void;
    constructor(wireCollection: WireCollection, offset: number);
    update2D(from: ColorPoint, to: ColorPoint): void;
    update3D(from: ColorPoint, to: ColorPoint): void;
}
//# sourceMappingURL=WireAccessor.d.ts.map