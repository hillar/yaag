import { WglScene } from './createScene';
/**
 * Controls that are best suited for map-like applications with top-down view
 */
export default function createMapControls(scene: WglScene): {
    dispose: () => void;
    setViewBox: () => any;
    panByAbsoluteOffset: (dx: number, dy: number) => void;
    slideCenterUpDown: (dz: number) => void;
    rotateByAngle: (angleChange: number, thetaChange: number) => void;
    rotateByAbsoluteOffset: (dx: number, dy: number) => void;
    zoomCenterByScaleFactor: (scaleFactor: number, dx: number, dy: number) => void;
    zoomToClientCoordinates: (clientX: number, clientY: number, scaleFactor: number, shouldAnimate: any) => void;
    redraw: () => void;
    allowRotation: boolean;
    allowPinchRotation: boolean;
    rotateAnimation: {
        start: () => void;
        setAmplitude: (newAmplitude: any) => void;
        getAmplitude: () => any;
        stop: () => void;
        impulse: (vx: any, vy: any, vz: any) => void;
        cancel: () => void;
    };
    panAnimation: {
        start: () => void;
        setAmplitude: (newAmplitude: any) => void;
        getAmplitude: () => any;
        stop: () => void;
        impulse: (vx: any, vy: any, vz: any) => void;
        cancel: () => void;
    };
};
//# sourceMappingURL=createMapControls.d.ts.map