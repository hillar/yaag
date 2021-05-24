/**
 * Allows smooth kinetic scrolling of the surface
 */
export default function createKineticAnimation(getCurrentPoint: any, moveCallback: any, settings?: any): {
    start: () => void;
    setAmplitude: (newAmplitude: any) => void;
    getAmplitude: () => any;
    stop: () => void;
    impulse: (vx: any, vy: any, vz: any) => void;
    cancel: () => void;
};
//# sourceMappingURL=createKineticAnimation.d.ts.map