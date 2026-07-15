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

```csharp
int result = Pvr_UnitySDKAPI.Sensor.UPvr_Init(0);
if (result == 0) {
    // Sensor initialized successfully
}
```

### `UPvr_StartSensor(int index)`
Starts sensor tracking for the given index.

```csharp
Pvr_UnitySDKAPI.Sensor.UPvr_StartSensor(0);
```

### `UPvr_StopSensor(int index)`
Stops sensor tracking.

```csharp
Pvr_UnitySDKAPI.Sensor.UPvr_StopSensor(0);
```

### `UPvr_ResetSensor(int index)`
Full sensor reset — zeroes position and orientation.

```csharp
Pvr_UnitySDKAPI.Sensor.UPvr_ResetSensor(0);
```

### `UPvr_OptionalResetSensor(int index, int resetRot, int resetPos)`
Selective sensor reset. `resetRot` and `resetPos` are 0/1 flags.

```csharp
// Reset orientation only, keep position
Pvr_UnitySDKAPI.Sensor.UPvr_OptionalResetSensor(0, 1, 0);
```

### `UPvr_ResetSensorAll(int index)`
Resets all sensor data for the given index.

```csharp
Pvr_UnitySDKAPI.Sensor.UPvr_ResetSensorAll(0);
```

### `UPvr_GetSensorState(int index, ref float x, y, z, w, px, py, pz)`
Returns the current sensor pose. `x,y,z,w` is the orientation quaternion, `px,py,pz` is the position.

```csharp
float x = 0, y = 0, z = 0, w = 0, px = 0, py = 0, pz = 0;
Pvr_UnitySDKAPI.Sensor.UPvr_GetSensorState(0, ref x, ref y, ref z, ref w, ref px, ref py, ref pz);
Quaternion orientation = new Quaternion(x, y, z, w);
Vector3 position = new Vector3(px, py, pz);
```

### `UPvr_GetMainSensorState(ref float x, y, z, w, px, py, pz, ref float vfov, hfov, ref int viewNumber)`
Returns the main sensor pose plus FOV and view count.

```csharp
float x = 0, y = 0, z = 0, w = 0, px = 0, py = 0, pz = 0;
float vfov = 0, hfov = 0;
int viewNumber = 0;
Pvr_UnitySDKAPI.Sensor.UPvr_GetMainSensorState(ref x, ref y, ref z, ref w,
    ref px, ref py, ref pz, ref vfov, ref hfov, ref viewNumber);
// vfov/hfov are in degrees, viewNumber is typically 2 for stereo
```

### `UPvr_GetSensorGyroscope(int index, ref float x, y, z)`
Returns gyroscope data (angular velocity in rad/s).

```csharp
float gx = 0, gy = 0, gz = 0;
Pvr_UnitySDKAPI.Sensor.UPvr_GetSensorGyroscope(0, ref gx, ref gy, ref gz);
Vector3 angularVelocity = new Vector3(gx, gy, gz);
```

### `UPvr_GetSensorMagnet(int index, ref float x, y, z)`
Returns magnetometer data.

```csharp
float mx = 0, my = 0, mz = 0;
Pvr_UnitySDKAPI.Sensor.UPvr_GetSensorMagnet(0, ref mx, ref my, ref mz);
Vector3 magnetometer = new Vector3(mx, my, mz);
```

### `UPvr_Enable6DofModule(bool enable)`
Enables or disables 6DOF tracking.

```csharp
Pvr_UnitySDKAPI.Sensor.UPvr_Enable6DofModule(true);
```

### `UPvr_Get6DofSensorQualityStatus()`
Returns 6DOF tracking quality status code.

```csharp
int quality = Pvr_UnitySDKAPI.Sensor.UPvr_Get6DofSensorQualityStatus();
// 0 = good, non-zero indicates degraded tracking
```

### `UPvr_Get6DofSafePanelFlag()`
Returns whether the safe panel (boundary) flag is active.

```csharp
bool safePanel = Pvr_UnitySDKAPI.Sensor.UPvr_Get6DofSafePanelFlag();
```

### `UPvr_SetTrackingOriginType(TrackingOrigin type)`
Sets the tracking origin type (EyeLevel, FloorLevel, StageLevel).

```csharp
Pvr_UnitySDKAPI.Sensor.UPvr_SetTrackingOriginType(TrackingOrigin.FloorLevel);
```

### `UPvr_SetReinPosition(float x, y, z, w, float px, py, pz, int hand, bool valid, int key)`
Overrides controller position/orientation. Used for simulated/controller-less scenarios.

```csharp
// Set left controller to identity pose at origin
Pvr_UnitySDKAPI.Sensor.UPvr_SetReinPosition(
    0f, 0f, 0f, 1f,   // identity quaternion
    0f, 1f, 0f,       // position at (0,1,0)
    0,                 // left hand
    true,              // valid pose
    0);                // no key event
```

### `UPvr_GetAcceleration()`
Returns head linear acceleration as `Vector3`.

```csharp
Vector3 accel = Pvr_UnitySDKAPI.Sensor.UPvr_GetAcceleration();
```

### `UPvr_AngularVelocity()`
Returns head angular velocity as `Vector3`.

```csharp
Vector3 angVel = Pvr_UnitySDKAPI.Sensor.UPvr_AngularVelocity();
```

### `UPvr_GetVelocity()`
Returns head linear velocity as `Vector3`.

```csharp
Vector3 velocity = Pvr_UnitySDKAPI.Sensor.UPvr_GetVelocity();
```

### `UPvr_GetAngularAcceleration()`
Returns head angular acceleration as `Vector3`.

```csharp
Vector3 angAccel = Pvr_UnitySDKAPI.Sensor.UPvr_GetAngularAcceleration();
```

## API Reference — Render

### `UPvr_GetIntConfig(int configEnum, ref int result)`
Returns an integer config value. See `GlobalIntConfigs` enum.

```csharp
int value = 0;
Pvr_UnitySDKAPI.Render.UPvr_GetIntConfig((int)GlobalIntConfigs.TARGET_FRAME_RATE, ref value);
```

### `UPvr_GetFloatConfig(int configEnum, ref float result)`
Returns a float config value. See `GlobalFloatConfigs` enum.

```csharp
float ipd = 0f;
Pvr_UnitySDKAPI.Render.UPvr_GetFloatConfig((int)GlobalFloatConfigs.IPD, ref ipd);
```

### `UPvr_EnableFoveation(bool enable)`
Enables/disables fixed foveated rendering (FFR).

```csharp
Pvr_UnitySDKAPI.Render.UPvr_EnableFoveation(true);
```

### `SetFoveatedRenderingLevel(EFoveationLevel level)`
Sets the FFR preset level. System-level FFR settings override app-level if set.

```csharp
Pvr_UnitySDKAPI.Render.SetFoveatedRenderingLevel(EFoveationLevel.High);
```

### `GetFoveatedRenderingLevel()`
Returns the current FFR level.

```csharp
EFoveationLevel level = Pvr_UnitySDKAPI.Render.GetFoveatedRenderingLevel();
```

### `SetFoveatedRenderingParameters(Vector2 ffrGain, float ffrArea, float ffrMinimum)`
Sets custom FFR parameters (gain X/Y, area, minimum). System FFR overrides take priority.

```csharp
Pvr_UnitySDKAPI.Render.SetFoveatedRenderingParameters(
    new Vector2(2.0f, 2.0f),  // gain X/Y
    1.0f,                     // area
    0.125f);                  // minimum
```

### `UPvr_SetFoveationResource(int textureId, int previousId, float focalX, float focalY)`
Sets FFR resource parameters for a specific texture.

```csharp
Pvr_UnitySDKAPI.Render.UPvr_SetFoveationResource(
    currentTextureId, previousTextureId, 0.5f, 0.5f);
```

### `UPvr_GetStencilMesh(int eye, ref int vertexCount, ref int triangleCount, ref IntPtr vertexData, ref IntPtr indexData)`
Returns the stencil mesh for the given eye (0=left, 1=right). Vertex data is 3 floats per vertex, index data is 3 ints per triangle.

```csharp
int vertCount = 0, triCount = 0;
IntPtr vertData = IntPtr.Zero, indexData = IntPtr.Zero;
Pvr_UnitySDKAPI.Render.UPvr_GetStencilMesh(0, ref vertCount, ref triCount, ref vertData, ref indexData);
// vertData: array of vertCount * 3 floats
// indexData: array of triCount * 3 ints
```

### `UPvr_GetSystemDisplayFrequency()`
Returns the current display refresh rate in Hz.

```csharp
float refreshRate = Pvr_UnitySDKAPI.Render.UPvr_GetSystemDisplayFrequency();
```

### `UPvr_SetSystemDisplayFrequency(float rate)`
Sets the display refresh rate.

```csharp
Pvr_UnitySDKAPI.Render.UPvr_SetSystemDisplayFrequency(72f);
```

### `UPvr_GetDisplayFrequenciesAvailable()`
Returns an array of available display refresh rates.

```csharp
float[] rates = Pvr_UnitySDKAPI.Render.UPvr_GetDisplayFrequenciesAvailable();
foreach (float rate in rates) {
    Debug.Log("Available refresh rate: " + rate);
}
```

### `UPvr_SetColorspaceType(int colorspaceType)`
Sets the color space (0=linear, 1=sRGB).

```csharp
Pvr_UnitySDKAPI.Render.UPvr_SetColorspaceType(1); // sRGB
```

### `UPvr_SetCastingColorspaceType(int colorspaceType)`
Sets the color space for screen casting.

```csharp
Pvr_UnitySDKAPI.Render.UPvr_SetCastingColorspaceType(0); // Linear for casting
```

### `UPvr_SetMonoMode(bool enable)`
Enables mono (single-eye) rendering mode.

```csharp
Pvr_UnitySDKAPI.Render.UPvr_SetMonoMode(true);
```

### `UPvr_SetupLayerData(int layerIndex, int sideMask, int textureId, int textureType, int layerFlags, Vector4 colorScale, Vector4 colorOffset)`
Sets up overlay layer data for composition.

```csharp
Pvr_UnitySDKAPI.Render.UPvr_SetupLayerData(
    0,                          // layer index
    3,                          // side mask (both eyes)
    overlayTexture.GetNativeTexturePtr().ToInt32(),
    0,                          // texture type
    0,                          // layer flags
    Vector4.one,                // color scale
    Vector4.zero);              // color offset
```

### `UPvr_SetOverlayModelViewMatrix(...)`
Sets the model-view matrix for an overlay layer. Supports head-locked overlays.

```csharp
Matrix4x4 mv = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, Vector3.one);
Pvr_UnitySDKAPI.Render.UPvr_SetOverlayModelViewMatrix(0, 3, mv);
```

### `UPvr_CreateLayerAndroidSurface(int layerType, int layerIndex)`
Creates an Android Surface for an external surface overlay layer. Returns IntPtr to the Surface.

```csharp
IntPtr surface = Pvr_UnitySDKAPI.Render.UPvr_CreateLayerAndroidSurface(0, 0);
// Use surface with Android SurfaceTexture for video playback
```

### `UPvr_GetLayerAndroidSurface(int layerType, int layerIndex)`
Gets the Android Surface for a previously created external surface layer.

```csharp
IntPtr surface = Pvr_UnitySDKAPI.Render.UPvr_GetLayerAndroidSurface(0, 0);
```

### `UPvr_GetRawCameraData(byte[] buffer, ref uint width, ref uint height, ref uint count)`
Gets raw camera frame data into the provided buffer.

```csharp
byte[] buffer = new byte[1280 * 800 * 4];
uint width = 0, height = 0, count = 0;
Pvr_UnitySDKAPI.Render.UPvr_GetRawCameraData(buffer, ref width, ref height, ref count);
// buffer contains raw camera frame at width x height
```

### `UPvr_GetIntSysProc(string property, ref int result)`
Gets a system property integer value by name.

```csharp
int result = 0;
Pvr_UnitySDKAPI.Render.UPvr_GetIntSysProc("some_property", ref result);
```

## API Reference — System

### `UPvr_GetSDKVersion()`
Returns the native SDK version string.

```csharp
string version = Pvr_UnitySDKAPI.System.UPvr_GetSDKVersion();
Debug.Log("Native SDK version: " + version);
```

### `UPvr_GetUnitySDKVersion()`
Returns the Unity SDK version string (`"2.8.12.1"`).

```csharp
string version = Pvr_UnitySDKAPI.System.UPvr_GetUnitySDKVersion();
Debug.Log("Unity SDK version: " + version);
```

### `UPvr_GetDeviceMode()`
Returns the device model string.

```csharp
string model = Pvr_UnitySDKAPI.System.UPvr_GetDeviceMode();
Debug.Log("Device model: " + model);
```

### `UPvr_GetDeviceSN()`
Returns the device serial number.

```csharp
string sn = Pvr_UnitySDKAPI.System.UPvr_GetDeviceSN();
```

### `UPvr_GetHmdHardwareVersion()`
Returns HMD hardware version as int.

```csharp
int hwVersion = Pvr_UnitySDKAPI.System.UPvr_GetHmdHardwareVersion();
```

### `UPvr_GetHmdFirmwareVersion()`
Returns HMD firmware version as string.

```csharp
string fwVersion = Pvr_UnitySDKAPI.System.UPvr_GetHmdFirmwareVersion();
```

### `UPvr_GetHmdSerialNumber()`
Returns HMD serial number as string.

```csharp
string serial = Pvr_UnitySDKAPI.System.UPvr_GetHmdSerialNumber();
```

### `UPvr_GetHmdBatteryStatus()`
Returns HMD battery level (0-100).

```csharp
int battery = Pvr_UnitySDKAPI.System.UPvr_GetHmdBatteryStatus();
Debug.Log("HMD battery: " + battery + "%");
```

### `UPvr_GetHmdBatteryTemperature()`
Returns HMD battery temperature.

```csharp
float temp = Pvr_UnitySDKAPI.System.UPvr_GetHmdBatteryTemperature();
```

### `UPvr_SetHmdAudioStatus(bool enable)`
Enables/disables HMD audio.

```csharp
Pvr_UnitySDKAPI.System.UPvr_SetHmdAudioStatus(true);
```

### `UPvr_GetHmdAudioStatus()`
Returns HMD audio status (0=disabled, 1=enabled).

```csharp
int audioStatus = Pvr_UnitySDKAPI.System.UPvr_GetHmdAudioStatus();
```

### `UPvr_SetIPD(float distance)`
Sets the interpupillary distance in meters. Also refreshes eye camera positions.

```csharp
Pvr_UnitySDKAPI.System.UPvr_SetIPD(0.064f); // 64mm
```

### `UPvr_GetIPD()`
Returns the current IPD in meters.

```csharp
float ipd = Pvr_UnitySDKAPI.System.UPvr_GetIPD();
Debug.Log("IPD: " + (ipd * 1000f) + "mm");
```

### `UPvr_SetTrackingIPDEnabled(bool enable)`
Enables/disables IPD-based tracking adjustment.

```csharp
Pvr_UnitySDKAPI.System.UPvr_SetTrackingIPDEnabled(true);
```

### `UPvr_GetTrackingIPDEnabled()`
Returns whether IPD tracking adjustment is enabled.

```csharp
bool enabled = Pvr_UnitySDKAPI.System.UPvr_GetTrackingIPDEnabled();
```

### `UPvr_GetEyeTrackingAutoIPD(ref float autoIPD)`
Returns the auto-detected IPD from eye tracking cameras.

```csharp
float autoIPD = 0f;
Pvr_UnitySDKAPI.System.UPvr_GetEyeTrackingAutoIPD(ref autoIPD);
// autoIPD is the measured physical IPD in meters
```

### `UPvr_setTrackingMode(int trackingMode)`
Sets the tracking mode (bitmask of `TrackingMode` enum values).

```csharp
int mode = (int)(TrackingMode.PVR_TRACKING_MODE_ROTATION | TrackingMode.PVR_TRACKING_MODE_POSITION);
Pvr_UnitySDKAPI.System.UPvr_setTrackingMode(mode);
```

### `UPvr_GetTrackingMode()`
Returns the current tracking mode bitmask.

```csharp
int mode = Pvr_UnitySDKAPI.System.UPvr_GetTrackingMode();
bool hasPosition = (mode & (int)TrackingMode.PVR_TRACKING_MODE_POSITION) != 0;
```

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

```csharp
EyeTrackingGazeRay gazeRay = new EyeTrackingGazeRay();
Pvr_UnitySDKAPI.System.UPvr_getEyeTrackingGazeRay(ref gazeRay);
if (gazeRay.IsValid) {
    // Raycast from gazeRay.Origin in direction gazeRay.Direction
    Physics.Raycast(gazeRay.Origin, gazeRay.Direction, out RaycastHit hit);
}
```

### `UPvr_getEyeTrackingGazeRayWorld(ref EyeTrackingGazeRay gazeRay)`
Returns a world-space gaze ray transformed through the `Pvr_UnitySDKEyeManager` transform.

```csharp
EyeTrackingGazeRay gazeRay = new EyeTrackingGazeRay();
Pvr_UnitySDKAPI.System.UPvr_getEyeTrackingGazeRayWorld(ref gazeRay);
if (gazeRay.IsValid) {
    // Use gazeRay for world-space interaction
}
```

### `UPvr_getEyeTrackingPos()`
Returns the eye tracking position in local space.

```csharp
Vector3 eyePos = Pvr_UnitySDKAPI.System.UPvr_getEyeTrackingPos();
```

### `UPvr_EnableSinglePass(bool enable)`
Enables/disables single-pass stereo rendering.

```csharp
Pvr_UnitySDKAPI.System.UPvr_EnableSinglePass(true);
```

### `UPvr_SetAntiAliasing(int level)`
Sets the anti-aliasing level (1, 2, 4, or 8).

```csharp
Pvr_UnitySDKAPI.System.UPvr_SetAntiAliasing(4);
```

### `UPvr_SetCurrentRenderTexture(uint textureId)`
Sets the current render texture for single-pass rendering.

```csharp
Pvr_UnitySDKAPI.System.UPvr_SetCurrentRenderTexture((uint)renderTexture.GetNativeTexturePtr().ToInt32());
```

### `UPvr_SetSinglePassDepthBufferWidthHeight(int width, int height)`
Sets the depth buffer dimensions for single-pass rendering.

```csharp
Pvr_UnitySDKAPI.System.UPvr_SetSinglePassDepthBufferWidthHeight(2048, 2048);
```

### `UPVR_setPerformanceLevels(int cpuLevel, int gpuLevel)`
Sets CPU and GPU performance levels (0-3).

```csharp
Pvr_UnitySDKAPI.System.UPVR_setPerformanceLevels(2, 2); // High CPU + High GPU
```

### `UPvr_SetExtraLatencyMode(ExtraLatencyMode mode)`
Sets the extra latency mode for rendering pipeline.

```csharp
Pvr_UnitySDKAPI.System.UPvr_SetExtraLatencyMode(ExtraLatencyMode.ExtraLatencyModeOn);
```

### `UPvr_GetPredictedDisplayTime()`
Returns the predicted display time in seconds.

```csharp
float displayTime = Pvr_UnitySDKAPI.System.UPvr_GetPredictedDisplayTime();
```

### `UPvr_GetCountryCode()`
Returns the device's country code.

```csharp
string country = Pvr_UnitySDKAPI.System.UPvr_GetCountryCode();
```

### `UPvr_StartVRModel()` / `UPvr_StopVRModel()`
Starts/stops VR mode on the device.

```csharp
Pvr_UnitySDKAPI.System.UPvr_StartVRModel();
// ... later ...
Pvr_UnitySDKAPI.System.UPvr_StopVRModel();
```

### `UPvr_StartHomeKeyReceiver(string name)` / `UPvr_StopHomeKeyReceiver()`
Registers/unregisters a home key broadcast receiver.

```csharp
Pvr_UnitySDKAPI.System.UPvr_StartHomeKeyReceiver("com.myapp.HOME_KEY");
// ... later ...
Pvr_UnitySDKAPI.System.UPvr_StopHomeKeyReceiver();
```

### `UPvr_RemovePlatformLogo()` / `UPvr_ShowPlatformLogo()`
Controls platform logo visibility.

```csharp
Pvr_UnitySDKAPI.System.UPvr_RemovePlatformLogo();
// ... later ...
Pvr_UnitySDKAPI.System.UPvr_ShowPlatformLogo();
```

## API Reference — BoundarySystem

### `UPvr_GetFloorHeight()`
Returns the floor height in meters.

```csharp
float floorHeight = Pvr_UnitySDKAPI.BoundarySystem.UPvr_GetFloorHeight();
```

### `UPvr_GetSeeThroughState()`
Returns see-through state: 0=off, 1=gradient, 2=total.

```csharp
int state = Pvr_UnitySDKAPI.BoundarySystem.UPvr_GetSeeThroughState();
```

### `UPvr_EnableSeeThroughManual(bool enable)`
Enables/disables manual see-through background.

```csharp
Pvr_UnitySDKAPI.BoundarySystem.UPvr_EnableSeeThroughManual(true);
```

### `UPvr_GetTrackingState()`
Returns 6DOF tracking quality state as `BoundaryTrackingState` enum (LostNoReason, LostCamera, LostHighLight, etc.).

```csharp
int state = Pvr_UnitySDKAPI.BoundarySystem.UPvr_GetTrackingState();
// 0 = tracking normal, non-zero = tracking lost with specific reason
```

### `UPvr_GetFrameRateLimit()`
Returns whether frame rate limiting is active.

```csharp
bool limited = Pvr_UnitySDKAPI.BoundarySystem.UPvr_GetFrameRateLimit();
```

### `UPvr_IsBoundaryEnable()`
Returns whether the boundary system is enabled.

```csharp
bool enabled = Pvr_UnitySDKAPI.BoundarySystem.UPvr_IsBoundaryEnable();
```

### `UPvr_BoundaryGetConfigured()`
Returns true if boundary has been configured with valid data.

```csharp
bool configured = Pvr_UnitySDKAPI.BoundarySystem.UPvr_BoundaryGetConfigured();
```

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

```csharp
BoundaryTestResult result = BoundarySystem.UPvr_BoundaryTestPoint(
    new Vector3(1.0f, 0f, 0f),
    BoundarySystem.BoundaryType.OuterBoundary);
if (result.IsTriggering) {
    Debug.Log("Point is too close to boundary");
}
```

### `UPvr_BoundaryGetGeometry(BoundaryType type)`
Returns an array of `Vector3` points defining the boundary geometry.

```csharp
Vector3[] points = BoundarySystem.UPvr_BoundaryGetGeometry(
    BoundarySystem.BoundaryType.OuterBoundary);
foreach (Vector3 pt in points) {
    Debug.Log("Boundary point: " + pt);
}
```

### `UPvr_BoundaryGetDimensions(BoundaryType type)`
Returns `Vector3` with the boundary dimensions (width, height, depth).

```csharp
Vector3 dims = BoundarySystem.UPvr_BoundaryGetDimensions(
    BoundarySystem.BoundaryType.PlayArea);
Debug.Log("Play area: " + dims.x + " x " + dims.y + " x " + dims.z);
```

### `UPvr_BoundaryGetEnabled()`
Returns whether the boundary system is currently enabled.

```csharp
bool enabled = BoundarySystem.UPvr_BoundaryGetEnabled();
```

### `UPvr_BoundarySetVisible(bool value)` / `UPvr_BoundaryGetVisible()`
Sets/gets boundary visibility. System overrides may apply.

```csharp
BoundarySystem.UPvr_BoundarySetVisible(true);
bool visible = BoundarySystem.UPvr_BoundaryGetVisible();
```

### `UPvr_BoundarySetSeeThroughVisible(bool value)`
Sets see-through camera visibility.

```csharp
BoundarySystem.UPvr_BoundarySetSeeThroughVisible(true);
```

### `UPvr_SetGuardianSystemDisable(bool value)`
Disables/enables the guardian system.

```csharp
BoundarySystem.UPvr_SetGuardianSystemDisable(true);
```

### `UPvr_StartCameraFrame()` / `UPvr_StopCameraFrame()`
Starts/stops the see-through camera frame capture.

```csharp
BoundarySystem.UPvr_StartCameraFrame();
// ... capture frames ...
BoundarySystem.UPvr_StopCameraFrame();
```

### `UPvr_BoundaryGetSeeThroughData(int cameraIndex, RenderTexture rt)`
Captures see-through camera data into a Unity RenderTexture. `cameraIndex` 0=left, 1=right.

```csharp
RenderTexture rt = new RenderTexture(1280, 800, 0);
BoundarySystem.UPvr_BoundaryGetSeeThroughData(0, rt);
// rt now contains the left camera frame
```

### `UPvr_BoundarySetCameraImageRect(int width, int height)`
Sets the camera image dimensions for see-through.

```csharp
BoundarySystem.UPvr_BoundarySetCameraImageRect(1280, 800);
```

### `UPvr_GetDialogState()`
Returns the current boundary dialog state (-1=none, 0=goback, 1=toofar, 2=lost, 3-8=specific lost reasons).

```csharp
int dialogState = BoundarySystem.UPvr_GetDialogState();
if (dialogState == 1) {
    // User is too far from boundary
}
```

## API Reference — PlatformSettings

### `UPvr_AppEntitlementCheck(string appid)`
Verifies app entitlement by app ID. Returns true if valid.

```csharp
bool valid = Pvr_UnitySDKAPI.PlatformSettings.UPvr_AppEntitlementCheck("your_app_id");
if (!valid) {
    // App is not entitled, show error or exit
}
```

### `UPvr_AppEntitlementCheckExtra(string appid)`
Extended entitlement check. Returns 0=success, -1=invalid params, -2=service not exist, -3=timeout.

```csharp
int result = Pvr_UnitySDKAPI.PlatformSettings.UPvr_AppEntitlementCheckExtra("your_app_id");
switch (result) {
    case 0:  // Success
        break;
    case -1: // Invalid params
        break;
    case -2: // Service not exist
        break;
    case -3: // Timeout
        break;
}
```

### `UPvr_IsCurrentDeviceValid()`
Checks if the current device is in the simulation device list. Returns `simulationType` (Null, Valid, Invalid).

```csharp
var valid = Pvr_UnitySDKAPI.PlatformSettings.UPvr_IsCurrentDeviceValid();
if (valid == SimulationType.Valid) {
    // Device is valid for this app
}
```

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
