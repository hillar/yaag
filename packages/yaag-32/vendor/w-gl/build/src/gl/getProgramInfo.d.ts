import ActiveUniform from './ActiveUniform';
import ActiveTexture from './ActiveTexture';
import BaseAttribute from './BaseAttribute';
import InstancedAttribute from './InstancedAttribute';
import { ProgramDefinition } from './defineProgram';
export declare type ProgramInfo = {
    bytePerVertex: number;
    itemPerVertex: number;
    attributes: BaseAttribute[];
    instanced: InstancedAttribute[];
    uniforms: (ActiveTexture | ActiveUniform)[];
};
export default function getProgramInfo(programDefinition: ProgramDefinition): ProgramInfo;
//# sourceMappingURL=getProgramInfo.d.ts.map