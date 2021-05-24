import BaseAttribute from './BaseAttribute';
export default class FloatAttribute extends BaseAttribute {
    constructor(count: number);
    getAddBlock(offset: number, lineJoin?: string): {
        code: string;
        offset: number;
    };
    getMoveBlock(offset: number, lineJoin?: string): string;
    getGetBlock(offset: number): string;
}
//# sourceMappingURL=FloatAttribute.d.ts.map