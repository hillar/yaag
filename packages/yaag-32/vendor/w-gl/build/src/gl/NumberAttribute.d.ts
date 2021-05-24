import BaseAttribute from './BaseAttribute';
export default class NumberAttribute extends BaseAttribute {
    getAddBlock(offset: number): {
        code: string;
        offset: number;
    };
    getMoveBlock(offset: number, lineJoin?: string): string;
    getGetBlock(offset: number): string;
}
//# sourceMappingURL=NumberAttribute.d.ts.map