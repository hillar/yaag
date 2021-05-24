import { WglScene } from "src/createScene";
interface GuidOptions {
    /**
     * A color for the grid lines 0xRRGGBBAA
     */
    lineColor?: number;
    /**
     * Maximum alpha transparency that can be used for the grid lines
     */
    maxAlpha?: number;
    /**
     * Cursor color 0xRRGGBBAA
     */
    cursorColor?: number;
    /**
     * If set to false, the cursor is not rendered
     */
    showCursor?: boolean;
    /**
     * If set to false, the grid is not rendered
     */
    showGrid?: boolean;
}
export default function createGuide(scene: WglScene, options?: GuidOptions): {
    dispose: () => void;
    update: () => void;
};
export {};
//# sourceMappingURL=createGuide.d.ts.map