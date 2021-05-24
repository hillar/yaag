import { WglScene } from './createScene';
export declare const INPUT_COMMANDS: {
    MOVE_FORWARD: number;
    MOVE_BACKWARD: number;
    MOVE_LEFT: number;
    MOVE_RIGHT: number;
    MOVE_UP: number;
    MOVE_DOWN: number;
    TURN_LEFT: number;
    TURN_RIGHT: number;
    TURN_UP: number;
    TURN_DOWN: number;
};
/**
 * Game input controls similar to the first player games, where user can "walk" insider
 * the world and look around.
 */
export default function createFPSControls(scene: WglScene): {
    dispose: () => void;
    handleCommand: (commandId: any, value: number) => void;
    setViewBox: (rect: any) => any;
    getUpVector: () => number[];
    lookAt: (eye: number[], center: number[]) => any;
    enableMouseCapture: (isLocked: boolean) => any;
    enableDeviceOrientation: (isEnabled: boolean) => void;
    isDeviceOrientationEnabled: () => boolean;
    setRotationSpeed(speed: number): any;
    setMoveSpeed(speed: number): any;
    setScrollSpeed(speed: number): any;
    setFlySpeed(speed: number): any;
    setSpeed(factor: number): any;
    getRotationSpeed(): number;
    getMoveSpeed(): number;
    getScrollSpeed(): number;
    getFlySpeed(): number;
    getKeymap(): {
        87: number;
        65: number;
        83: number;
        68: number;
        81: number;
        37: number;
        69: number;
        39: number;
        38: number;
        40: number;
        16: number;
        32: number;
    };
    getMouseCapture(): boolean;
};
//# sourceMappingURL=createFPSControls.d.ts.map