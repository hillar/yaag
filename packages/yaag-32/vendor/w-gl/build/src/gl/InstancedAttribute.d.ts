import BaseAttribute from "./BaseAttribute";
export default class InstancedAttribute {
    bufferValues: number[];
    typeDef?: BaseAttribute;
    constructor(bufferValues: number[]);
    setTypeDefinition(typeDef: BaseAttribute): void;
    getInitBlock(): string;
    getDivisor(divisor: 0 | 1): string;
    getDraw(): string;
}
//# sourceMappingURL=InstancedAttribute.d.ts.map