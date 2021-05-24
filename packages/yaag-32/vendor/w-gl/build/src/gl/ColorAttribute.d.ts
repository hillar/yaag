import BaseAttribute from './BaseAttribute';
export default class ColorAttribute extends BaseAttribute {
    constructor();
    getAddBlock(offset: number): {
        code: string;
        offset: number;
    };
    getMoveBlock(offset: number, lineJoin?: string): string;
    getGetBlock(offset: number): string;
    getDraw(stride: number, offset: number): string;
}
//# sourceMappingURL=ColorAttribute.d.ts.map