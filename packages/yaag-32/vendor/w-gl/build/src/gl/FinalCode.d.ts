/**
 * Helper class that holds intermediate state of the code before it is
 * compiled to javascript.
 */
export default class FinalCode {
    /**
     * Collection of strings to be put into program API block;
     */
    api: string[];
    /**
     * Collection of string to be put into initialization block of the code;
     */
    init: string[];
    /**
     * Collection of the strings that initialize buffers.
     */
    bufferInit: string[];
    /**
     * Collection of strings to be put into the implementation section (after return API statement)
     */
    implementation: string[];
    attributesDrawBlock?: string[];
    constructor();
    addToInit(block: any): void;
    addBufferInit(block: any): void;
    addToAPI(block: any): void;
    addToImplementation(block: any): void;
    setAttributesDrawBlock(block: string[]): void;
    link(): string;
}
//# sourceMappingURL=FinalCode.d.ts.map