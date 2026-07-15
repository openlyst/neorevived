---
section: PicoVR Unity SDK 2.8.12
order: 3
type: table
rows:
  - key: SDK Name
    value: PicoVR Unity SDK
  - key: Version
    value: 2.8.12 (Build 583)
  - key: Platform
    value: Unity (Android), 32-bit and 64-bit builds
  - key: License
    value: Pico SDK License Agreement (<code>https://developer.pico-interactive.com/sdk</code>)
  - key: Package Files
    value: <code>PicoVR_Unity_SDK_32bit-2.8.12_B583-20211027.unitypackage</code> (15.4 MB), <code>PicoVR_Unity_SDK_64bit-2.8.12_B583-20211027.unitypackage</code> (16.4 MB)
  - key: Build Date
    value: "2021-10-27"
  - key: Unity Version
    value: Compatible with Unity 2019+ (check package requirements for exact minimum)
  - key: Native Libraries
    value: <code>libpvr.so</code>, <code>libPvr_UnitySDK.so</code> (bundled inside the unitypackage)
  - key: Rendering
    value: OpenGL ES, Vulkan (via Unity graphics settings)
  - key: Tracking
    value: 6DOF head and controller tracking via Pico runtime, 3DOF fallback supported
  - key: Controller Input
    value: Full controller input mapping via Unity input system — buttons, trigger, grip, touchpad, thumbstick
  - key: Features
    value: Render optimization, FFR (fixed foveated rendering), boundary system, see-through camera, hand tracking, eye tracking (if hardware present), IPD adjustment
  - key: Download
    value: Not available for download on this site. Originally distributed as <code>PicoVR_Unity_SDK_2.8.12_B583.zip</code> (31.8 MB)
---

## Overview

The PicoVR Unity SDK provides Unity bindings for the Pico Neo 2 runtime. It wraps the native Pico APIs into C# components and prefabs. The main API surface is in `Pvr_UnitySDKAPI.cs` under the `Pvr_UnitySDKAPI` namespace, with P/Invoke calls into `libPvr_UnitySDK.so`.

## Installation

1. Choose the correct package for your target architecture (32-bit or 64-bit)
2. In Unity, go to **Assets > Import Package > Custom Package**
3. Select the `.unitypackage` file and import all assets
4. Configure player settings for Android (XR settings, minimum API level 26, etc.)
5. Add the `Pvr_UnitySDKManager` prefab to your scene

## 32-bit vs 64-bit

Two separate packages are provided:
- **32-bit** (`armeabi-v7a`) — for older compatibility
- **64-bit** (`arm64-v8a`) — recommended for Pico Neo 2 (SDM845 is 64-bit)

## SDK Structure

```
Assets/PicoMobileSDK/
├── Pvr_UnitySDK/
│   ├── API/Pvr_UnitySDKAPI.cs          — Main C# API (P/Invoke wrappers)
│   ├── Pvr_UnitySDKManager.cs          — Central SDK manager component
│   ├── Render/                         — Eye rendering, single-pass, overlays
│   ├── Sensor/                         — Head tracking, pose, sensor
│   ├── System/                         — Event system, UI input, config
│   ├── Editor/                         — Unity editor tools and build checks
│   └── Scenes/Examples/                — Sample scenes
├── Pvr_Controller/                     — Controller input and visualization
├── Pvr_BoundarySDK/                    — Boundary/guardian system
├── Pvr_Achievement/                    — Achievement system
├── Pvr_ToBService/                     — ToB service API
├── Pvr_Payment/                        — Payment SDK
└── Pvr_VolumePowerBrightness/          — Volume/power/brightness control
```

## Namespace

All API functions are in `Pvr_UnitySDKAPI` namespace. The API is organized into structs:

- **`Sensor`** — Head tracking, sensor reset, IMU data
- **`Render`** — FFR, display frequency, stencil mesh, overlays, color space
- **`System`** — Device info, eye tracking, IPD, tracking mode, single-pass, performance
- **`BoundarySystem`** — Boundary geometry, test, see-through, guardian
- **`PlatformSettings`** — Entitlement check

## Enums

### GlobalIntConfigs

| Value | Name | Description |
|---|---|---|
| 0 | `EYE_TEXTURE_RESOLUTION0` | Left eye texture resolution |
| 1 | `EYE_TEXTURE_RESOLUTION1` | Right eye texture resolution |
| 2 | `SEENSOR_COUNT` | Sensor count |
| 3 | `ABILITY6DOF` | 6DOF capability |
| 4 | `PLATFORM_TYPE` | Platform type |
| 5 | `TRACKING_MODE` | Current tracking mode |
| 6 | `LOG_LEVEL` | Log level |
| 7 | `ENBLE_HAND6DOF_BY_HEAD` | Hand 6DOF via head |
| 8 | `ENBLE_6DOF_GLOBAL_TRACKING` | 6DOF global tracking |
| 9 | `TARGET_FRAME_RATE` | Target frame rate |
| 10 | `iShowFPS` | Show FPS |
| 11 | `SensorMode` | Sensor mode |
| 12 | `LOGICFLOW` | Logic flow (0/1 Viewer) |
| 13 | `EYE_TEXTURE_RES_HIGH` | High eye texture resolution |
| 14 | `EYE_TEXTURE_RES_NORMAL` | Normal eye texture resolution |
| 15 | `iCtrlModelLoadingPri` | Controller model loading priority |
| 16 | `iPhoneHMDModeEnabled` | Phone HMD mode |
| 17 | `isEnableBoundary` | Boundary enabled |
| 18 | `Enable_Activity_Rotation` | Activity rotation |
| 19 | `GetDisplay_Orientation` | Display orientation |
| 20 | `GetWaitFrameNum` | Wait frame count |
| 21 | `GetResetFrameNum` | Reset frame count |
| 22 | `EnableFFRBYSYS` | FFR enabled by system |
| 23 | `RotControllerMode` | Rotation controller mode |
| 24 | `RenderFPS` | Render FPS |
| 25 | `AntiAliasingLevelRecommended` | Recommended AA level |

### GlobalFloatConfigs

| Value | Name | Description |
|---|---|---|
| 0 | `IPD` | Interpupillary distance |
| 1 | `VFOV` | Vertical field of view |
| 2 | `HFOV` | Horizontal field of view |
| 3 | `NECK_MODEL_X` | Neck model X offset |
| 4 | `NECK_MODEL_Y` | Neck model Y offset |
| 5 | `NECK_MODEL_Z` | Neck model Z offset |
| 6 | `DISPLAY_REFRESH_RATE` | Display refresh rate |

### TrackingOrigin

| Value | Name | Description |
|---|---|---|
| 0 | `EyeLevel` | Origin at eye level (no user height) |
| 1 | `FloorLevel` | Origin at floor (includes user height) |
| 2 | `StageLevel` | Origin at stage level |

### EFoveationLevel

| Value | Name | Description |
|---|---|---|
| 0 | `Low` | Low foveation |
| 1 | `Med` | Medium foveation |
| 2 | `High` | High foveation |
| 3 | `Top_High` | Maximum foveation |

### TrackingMode

| Value | Name | Description |
|---|---|---|
| 0x1 | `PVR_TRACKING_MODE_ROTATION` | Rotation tracking (3DOF) |
| 0x2 | `PVR_TRACKING_MODE_POSITION` | Position tracking (6DOF) |
| 0x4 | `PVR_TRACKING_MODE_EYE` | Eye tracking |

### ExtraLatencyMode

| Value | Name | Description |
|---|---|---|
| 0 | `ExtraLatencyModeOff` | No extra latency |
| 1 | `ExtraLatencyModeOn` | Extra latency on |
| 2 | `ExtraLatencyModeDynamic` | Dynamic extra latency |

### StereoRenderingPathPico

| Value | Name | Description |
|---|---|---|
| 0 | `MultiPass` | Multi-pass stereo rendering |
| 1 | `SinglePass` | Single-pass stereo rendering |

### pvrEyePoseStatus

Bit flags for eye tracking pose validity.

| Bit | Name | Description |
|---|---|---|
| 0 | `kGazePointValid` | Gaze point is valid |
| 1 | `kGazeVectorValid` | Gaze vector is valid |
| 2 | `kEyeOpennessValid` | Eye openness is valid |
| 3 | `kEyePupilDilationValid` | Pupil dilation is valid |
| 4 | `kEyePositionGuideValid` | Position guide is valid |

## Data Structures

### EyeTrackingData

```csharp
public struct EyeTrackingData {
    public int leftEyePoseStatus, rightEyePoseStatus, combinedEyePoseStatus;
    public Vector3 leftEyeGazePoint, rightEyeGazePoint, combinedEyeGazePoint;
    public Vector3 leftEyeGazeVector, rightEyeGazeVector, combinedEyeGazeVector;
    public float leftEyeOpenness, rightEyeOpenness;
    public float leftEyePupilDilation, rightEyePupilDilation;
    public Vector3 leftEyePositionGuide, rightEyePositionGuide;
    public Vector3 foveatedGazeDirection;
    public int foveatedGazeTrackingState;
}
```

### EyeTrackingGazeRay

```csharp
public struct EyeTrackingGazeRay {
    public Vector3 Direction;  // World-space gaze direction
    public bool IsValid;       // True when gaze data is available
    public Vector3 Origin;     // World-space gaze origin
}
```

### ViewFrustum

```csharp
public struct ViewFrustum {
    public float left, right, top, bottom;
    public float near, far;
}
```

### BoundaryTestResult

```csharp
public struct BoundaryTestResult {
    public bool IsTriggering;
    public float ClosestDistance;
    public Vector3 ClosestPoint;
    public Vector3 ClosestPointNormal;
}
```

## API Reference — Sensor

### `UPvr_Init(int index)`
Initializes the sensor at the given index. Returns 0 on success.

### `UPvr_StartSensor(int index)`
Starts sensor tracking for the given index.

### `UPvr_StopSensor(int index)`
Stops sensor tracking.

### `UPvr_ResetSensor(int index)`
Full sensor reset — zeroes position and orientation.

### `UPvr_OptionalResetSensor(int index, int resetRot, int resetPos)`
Selective sensor reset. `resetRot` and `resetPos` are 0/1 flags.

### `UPvr_ResetSensorAll(int index)`
Resets all sensor data for the given index.

### `UPvr_GetSensorState(int index, ref float x, y, z, w, px, py, pz)`
Returns the current sensor pose. `x,y,z,w` is the orientation quaternion, `px,py,pz` is the position.

### `UPvr_GetMainSensorState(ref float x, y, z, w, px, py, pz, ref float vfov, hfov, ref int viewNumber)`
Returns the main sensor pose plus FOV and view count.

### `UPvr_GetSensorGyroscope(int index, ref float x, y, z)`
Returns gyroscope data (angular velocity in rad/s).

### `UPvr_GetSensorMagnet(int index, ref float x, y, z)`
Returns magnetometer data.

### `UPvr_Enable6DofModule(bool enable)`
Enables or disables 6DOF tracking.

### `UPvr_Get6DofSensorQualityStatus()`
Returns 6DOF tracking quality status code.

### `UPvr_Get6DofSafePanelFlag()`
Returns whether the safe panel (boundary) flag is active.

### `UPvr_SetTrackingOriginType(TrackingOrigin type)`
Sets the tracking origin type (EyeLevel, FloorLevel, StageLevel).

### `UPvr_SetReinPosition(float x, y, z, w, float px, py, pz, int hand, bool valid, int key)`
Overrides controller position/orientation. Used for simulated/controller-less scenarios.

### `UPvr_GetAcceleration()`
Returns head linear acceleration as `Vector3`.

### `UPvr_AngularVelocity()`
Returns head angular velocity as `Vector3`.

### `UPvr_GetVelocity()`
Returns head linear velocity as `Vector3`.

### `UPvr_GetAngularAcceleration()`
Returns head angular acceleration as `Vector3`.

## API Reference — Render

### `UPvr_GetIntConfig(int configEnum, ref int result)`
Returns an integer config value. See `GlobalIntConfigs` enum.

```csharp
int value = 0;
Pvr_UnitySDKAPI.Render.UPvr_GetIntConfig((int)GlobalIntConfigs.TARGET_FRAME_RATE, ref value);
```

### `UPvr_GetFloatConfig(int configEnum, ref float result)`
Returns a float config value. See `GlobalFloatConfigs` enum.

### `UPvr_EnableFoveation(bool enable)`
Enables/disables fixed foveated rendering (FFR).

### `SetFoveatedRenderingLevel(EFoveationLevel level)`
Sets the FFR preset level. System-level FFR settings override app-level if set.

```csharp
Pvr_UnitySDKAPI.Render.SetFoveatedRenderingLevel(EFoveationLevel.High);
```

### `GetFoveatedRenderingLevel()`
Returns the current FFR level.

### `SetFoveatedRenderingParameters(Vector2 ffrGain, float ffrArea, float ffrMinimum)`
Sets custom FFR parameters (gain X/Y, area, minimum). System FFR overrides take priority.

### `UPvr_SetFoveationResource(int textureId, int previousId, float focalX, float focalY)`
Sets FFR resource parameters for a specific texture.

### `UPvr_GetStencilMesh(int eye, ref int vertexCount, ref int triangleCount, ref IntPtr vertexData, ref IntPtr indexData)`
Returns the stencil mesh for the given eye (0=left, 1=right). Vertex data is 3 floats per vertex, index data is 3 ints per triangle.

### `UPvr_GetSystemDisplayFrequency()`
Returns the current display refresh rate in Hz.

### `UPvr_SetSystemDisplayFrequency(float rate)`
Sets the display refresh rate.

### `UPvr_GetDisplayFrequenciesAvailable()`
Returns an array of available display refresh rates.

### `UPvr_SetColorspaceType(int colorspaceType)`
Sets the color space (0=linear, 1=sRGB).

### `UPvr_SetCastingColorspaceType(int colorspaceType)`
Sets the color space for screen casting.

### `UPvr_SetMonoMode(bool enable)`
Enables mono (single-eye) rendering mode.

### `UPvr_SetupLayerData(int layerIndex, int sideMask, int textureId, int textureType, int layerFlags, Vector4 colorScale, Vector4 colorOffset)`
Sets up overlay layer data for composition.

### `UPvr_SetOverlayModelViewMatrix(...)`
Sets the model-view matrix for an overlay layer. Supports head-locked overlays.

### `UPvr_CreateLayerAndroidSurface(int layerType, int layerIndex)`
Creates an Android Surface for an external surface overlay layer. Returns IntPtr to the Surface.

### `UPvr_GetLayerAndroidSurface(int layerType, int layerIndex)`
Gets the Android Surface for a previously created external surface layer.

### `UPvr_GetRawCameraData(byte[] buffer, ref uint width, ref uint height, ref uint count)`
Gets raw camera frame data into the provided buffer.

### `UPvr_GetIntSysProc(string property, ref int result)`
Gets a system property integer value by name.

## API Reference — System

### `UPvr_GetSDKVersion()`
Returns the native SDK version string.

### `UPvr_GetUnitySDKVersion()`
Returns the Unity SDK version string (`"2.8.12.1"`).

### `UPvr_GetDeviceMode()`
Returns the device model string.

### `UPvr_GetDeviceSN()`
Returns the device serial number.

### `UPvr_GetHmdHardwareVersion()`
Returns HMD hardware version as int.

### `UPvr_GetHmdFirmwareVersion()`
Returns HMD firmware version as string.

### `UPvr_GetHmdSerialNumber()`
Returns HMD serial number as string.

### `UPvr_GetHmdBatteryStatus()`
Returns HMD battery level (0-100).

### `UPvr_GetHmdBatteryTemperature()`
Returns HMD battery temperature.

### `UPvr_SetHmdAudioStatus(bool enable)`
Enables/disables HMD audio.

### `UPvr_GetHmdAudioStatus()`
Returns HMD audio status (0=disabled, 1=enabled).

### `UPvr_SetIPD(float distance)`
Sets the interpupillary distance in meters. Also refreshes eye camera positions.

```csharp
Pvr_UnitySDKAPI.System.UPvr_SetIPD(0.064f); // 64mm
```

### `UPvr_GetIPD()`
Returns the current IPD in meters.

### `UPvr_SetTrackingIPDEnabled(bool enable)`
Enables/disables IPD-based tracking adjustment.

### `UPvr_GetTrackingIPDEnabled()`
Returns whether IPD tracking adjustment is enabled.

### `UPvr_GetEyeTrackingAutoIPD(ref float autoIPD)`
Returns the auto-detected IPD from eye tracking cameras.

### `UPvr_setTrackingMode(int trackingMode)`
Sets the tracking mode (bitmask of `TrackingMode` enum values).

```csharp
int mode = (int)(TrackingMode.PVR_TRACKING_MODE_ROTATION | TrackingMode.PVR_TRACKING_MODE_POSITION);
Pvr_UnitySDKAPI.System.UPvr_setTrackingMode(mode);
```

### `UPvr_GetTrackingMode()`
Returns the current tracking mode bitmask.

### `UPvr_getEyeTrackingData(ref EyeTrackingData data)`
Fills the `EyeTrackingData` struct with current eye tracking data. Requires eye tracking to be enabled on the `Pvr_UnitySDKEyeManager` component.

```csharp
EyeTrackingData data = new EyeTrackingData();
if (Pvr_UnitySDKAPI.System.UPvr_getEyeTrackingData(ref data)) {
    if ((data.combinedEyePoseStatus & (int)pvrEyePoseStatus.kGazePointValid) != 0) {
        Vector3 gazePoint = data.combinedEyeGazePoint;
        // Use gazePoint for interaction
    }
}
```

### `UPvr_getEyeTrackingGazeRay(ref EyeTrackingGazeRay gazeRay)`
Returns a world-space gaze ray. Transforms the eye tracking data through the head pose matrix. `IsValid` is true when both gaze point and vector are valid.

### `UPvr_getEyeTrackingGazeRayWorld(ref EyeTrackingGazeRay gazeRay)`
Returns a world-space gaze ray transformed through the `Pvr_UnitySDKEyeManager` transform.

### `UPvr_getEyeTrackingPos()`
Returns the eye tracking position in local space.

### `UPvr_EnableSinglePass(bool enable)`
Enables/disables single-pass stereo rendering.

### `UPvr_SetAntiAliasing(int level)`
Sets the anti-aliasing level (1, 2, 4, or 8).

### `UPvr_SetCurrentRenderTexture(uint textureId)`
Sets the current render texture for single-pass rendering.

### `UPvr_SetSinglePassDepthBufferWidthHeight(int width, int height)`
Sets the depth buffer dimensions for single-pass rendering.

### `UPVR_setPerformanceLevels(int cpuLevel, int gpuLevel)`
Sets CPU and GPU performance levels (0-3).

```csharp
Pvr_UnitySDKAPI.System.UPVR_setPerformanceLevels(2, 2); // High CPU + High GPU
```

### `UPvr_SetExtraLatencyMode(ExtraLatencyMode mode)`
Sets the extra latency mode for rendering pipeline.

### `UPvr_GetPredictedDisplayTime()`
Returns the predicted display time in seconds.

### `UPvr_GetCountryCode()`
Returns the device's country code.

### `UPvr_StartVRModel()` / `UPvr_StopVRModel()`
Starts/stops VR mode on the device.

### `UPvr_StartHomeKeyReceiver(string name)` / `UPvr_StopHomeKeyReceiver()`
Registers/unregisters a home key broadcast receiver.

### `UPvr_RemovePlatformLogo()` / `UPvr_ShowPlatformLogo()`
Controls platform logo visibility.

## API Reference — BoundarySystem

### `UPvr_GetFloorHeight()`
Returns the floor height in meters.

### `UPvr_GetSeeThroughState()`
Returns see-through state: 0=off, 1=gradient, 2=total.

### `UPvr_EnableSeeThroughManual(bool enable)`
Enables/disables manual see-through background.

### `UPvr_GetTrackingState()`
Returns 6DOF tracking quality state as `BoundaryTrackingState` enum (LostNoReason, LostCamera, LostHighLight, etc.).

### `UPvr_GetFrameRateLimit()`
Returns whether frame rate limiting is active.

### `UPvr_IsBoundaryEnable()`
Returns whether the boundary system is enabled.

### `UPvr_BoundaryGetConfigured()`
Returns true if boundary has been configured with valid data.

### `UPvr_BoundaryTestNode(BoundaryTrackingNode node, BoundaryType type)`
Tests a tracked node (HandLeft, HandRight, Head) against the boundary. Returns `BoundaryTestResult` with `IsTriggering`, `ClosestDistance`, `ClosestPoint`, `ClosestPointNormal`.

```csharp
BoundaryTestResult result = BoundarySystem.UPvr_BoundaryTestNode(
    BoundarySystem.BoundaryTrackingNode.Head,
    BoundarySystem.BoundaryType.OuterBoundary);
if (result.IsTriggering) {
    // Head is too close to boundary
}
```

### `UPvr_BoundaryTestPoint(Vector3 point, BoundaryType type)`
Tests a 3D point against the boundary. Returns `BoundaryTestResult`.

### `UPvr_BoundaryGetGeometry(BoundaryType type)`
Returns an array of `Vector3` points defining the boundary geometry.

### `UPvr_BoundaryGetDimensions(BoundaryType type)`
Returns `Vector3` with the boundary dimensions (width, height, depth).

### `UPvr_BoundaryGetEnabled()`
Returns whether the boundary system is currently enabled.

### `UPvr_BoundarySetVisible(bool value)` / `UPvr_BoundaryGetVisible()`
Sets/gets boundary visibility. System overrides may apply.

### `UPvr_BoundarySetSeeThroughVisible(bool value)`
Sets see-through camera visibility.

### `UPvr_SetGuardianSystemDisable(bool value)`
Disables/enables the guardian system.

### `UPvr_StartCameraFrame()` / `UPvr_StopCameraFrame()`
Starts/stops the see-through camera frame capture.

### `UPvr_BoundaryGetSeeThroughData(int cameraIndex, RenderTexture rt)`
Captures see-through camera data into a Unity RenderTexture. `cameraIndex` 0=left, 1=right.

### `UPvr_BoundarySetCameraImageRect(int width, int height)`
Sets the camera image dimensions for see-through.

### `UPvr_GetDialogState()`
Returns the current boundary dialog state (-1=none, 0=goback, 1=toofar, 2=lost, 3-8=specific lost reasons).

## API Reference — PlatformSettings

### `UPvr_AppEntitlementCheck(string appid)`
Verifies app entitlement by app ID. Returns true if valid.

### `UPvr_AppEntitlementCheckExtra(string appid)`
Extended entitlement check. Returns 0=success, -1=invalid params, -2=service not exist, -3=timeout.

### `UPvr_IsCurrentDeviceValid()`
Checks if the current device is in the simulation device list. Returns `simulationType` (Null, Valid, Invalid).

## Sample Scenes

The SDK includes several example scenes in `Pvr_UnitySDK/Scenes/Examples/`:

- **Cube.unity** — Basic VR cube rendering
- **Sphere.unity** — VR sphere interaction with controller
- **EyeTracking.unity** — Eye tracking with gaze-based highlighting
- **GetSeeThroughImage.unity** — See-through camera frame capture
- **2DOverlay.unity** / **2DUnderlay.unity** — Overlay/underlay layer composition
- **360Overlay.unity** — 360-degree overlay
- **OverlayExternalSurface.unity** — External Android surface overlay
- **UserEntitlementCheck.unity** — Entitlement verification example

## Key Components

### Pvr_UnitySDKManager
Central manager component. Must be present in the scene. Configures rendering, tracking, and SDK lifecycle. Exposes settings for:
- Render texture level (Normal/High)
- Stereo rendering path (MultiPass/SinglePass)
- FFR level
- Tracking origin
- Extra latency mode
- System FFR/debug FFR level overrides

### Pvr_UnitySDKEyeManager
Manages eye cameras and eye tracking. Enable `EyeTracking` flag to use eye tracking APIs.

### Pvr_UnitySDKSensor
Manages head sensor data and pose updates.

### Pvr_Controller
Controller input and visualization. Handles button events, touchpad, vibration, and controller model loading.
