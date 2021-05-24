declare type ClapHandler = {
    (e: MouseEvent): void;
    (e: Touch): void;
};
export default function onClap(element: Element, callback: ClapHandler, ctx?: any): () => void;
export {};
//# sourceMappingURL=clap.d.ts.map