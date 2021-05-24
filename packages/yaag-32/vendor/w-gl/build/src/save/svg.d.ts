import { WglScene } from 'src/createScene';
declare type ProjectedPoint = {
    x: number;
    y: number;
    isBehind?: boolean;
};
interface SVGExportSettings {
    /**
     * Called before a collection of points is printed to the output. If function returns
     * false, then this collection of points is not printed.
     */
    beforeWrite?: (points: ProjectedPoint[]) => boolean;
    /**
     * Allow consumers to write a license information (right between <?xml> and <!doctype..>)
     */
    open?: () => string;
    /**
     * Allow consumers to write any additional elements before closing the </svg> document
     */
    close?: () => string;
    /**
     * When this is boolean `true`, each value is `Math.round()`'ed  before it is printed. If the
     * value is a `number` then it indicates amount of significant digits for the rounding.
     *
     * `false` by default - values are printed at maximum precision.
     */
    round?: boolean | number;
}
export default function svg(scene: WglScene, settings?: SVGExportSettings): string;
export {};
//# sourceMappingURL=svg.d.ts.map