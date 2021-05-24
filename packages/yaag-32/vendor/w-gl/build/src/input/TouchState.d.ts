/**
 * Just to track changes for a single touch event, we create this state:
 */
export declare class TouchState {
    x: number;
    y: number;
    lastX: number;
    lastY: number;
    id: any;
    createdAt: number;
    constructor(touch: any);
    move(touch: any): void;
}
/**
 * This state is used to detect gestures. It answers the questions:
 * - Should we scale with this gesture?
 * - Should we rotate with this gesture?
 * - Should we change incline with this gesture?
 */
export declare class MultiTouchState {
    allowRotation: boolean;
    state: number;
    canRotate: boolean;
    canScale: boolean;
    canIncline: boolean;
    first: any;
    second: any;
    stateChanged: boolean;
    constructor(allowRotation: boolean);
    reset(): void;
    isUnknown(): boolean;
    track(first: any, second: any): void;
}
//# sourceMappingURL=TouchState.d.ts.map