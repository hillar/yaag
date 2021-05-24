/**
 * This object tracks device orientation and applies it to a give object's quaternion (e.g. camera).
 *  See also: https://developers.google.com/web/fundamentals/native-hardware/device-orientation#device_coordinate_frame
 */
export default function createDeviceOrientationHandler(inputTarget: any, objectOrientation: any, updated: any, events: any): {
    isEnabled: boolean;
    isAbsolute: boolean;
    useCurrentOrientation: () => void;
    dispose: () => void;
    enable: (newEnabled: boolean) => void;
};
//# sourceMappingURL=createDeviceOrientationHandler.d.ts.map