---
section: Pico OpenXR Mobile SDK v2.0.1
order: 2
type: table
rows:
  - key: SDK Name
    value: Pico OpenXR Mobile SDK
  - key: Version
    value: 2.0.1
  - key: OpenXR API Version
    value: 1.0.14 (Khronos OpenXR 1.0, updated from v1.0.13)
  - key: Platform
    value: Android (arm64-v8a, armeabi-v7a)
  - key: License
    value: Pico SDK License Agreement (<code>https://developer.pico-interactive.com/sdk</code>), OpenXR headers under Apache 2.0
  - key: Loader Library
    value: <code>libopenxr_loader.so</code> — arm64-v8a (1,571 KB), armeabi-v7a (768 KB)
  - key: Headers
    value: <code>openxr.h</code>, <code>openxr_pico.h</code>, <code>openxr_platform.h</code>, <code>openxr_platform_defines.h</code>, <code>openxr_reflection.h</code>
  - key: PICO Extensions
    value: <code>XR_PICO_singlepass_enable</code>, <code>XR_PICO_android_swapchain_ext_enable</code>, <code>XR_PICO_ipd</code>, <code>XR_PICO_stencilmesh</code>, <code>XR_PICO_view_frustum_ext</code>, <code>XR_PICO_configs_ext</code>, <code>XR_PICO_reset_sensor</code>, <code>XR_PICO_android_MrcPose_function_ext_enable</code>, <code>XR_PICO_boundary_ext</code>, <code>XR_PICO_performance_settings</code>, <code>XR_PICO_android_create_instance_ext_enable</code>, <code>XR_PICO_view_state_ext_enable</code>, <code>XR_PICO_frame_end_info_ext</code>, <code>XR_PICO_session_begin_info_ext_enable</code>, <code>XR_PICO_foveation_image_ext_enable</code>, <code>XR_PICO_mrc_pose_ext_enable</code>, <code>XR_PICO_android_controller_function_ext_enable</code>
  - key: Sample App
    value: HelloXR — updated Gradle project with CMake native build, OpenGL ES and Vulkan graphics plugins, prebuilt APK included (4.8 MB)
  - key: Build System
    value: Android Gradle + CMake (NDK), <code>AndroidPrebuilt/jni/Android.mk</code> for NDK integration
  - key: Min Android SDK
    value: 26 (Android 8.0)
  - key: Manifest Requirements
    value: <code>&lt;meta-data android:name="pvr.app.type" android:value="vr" /&gt;</code>, <code>android.hardware.vr.headtracking</code> feature, OpenGL ES 3.2
  - key: Rendering Backends
    value: OpenGL ES 3.2, Vulkan 1.1
  - key: Tracking
    value: OpenXR <code>xrLocateViews</code> / <code>xrLocateSpace</code> plus PICO-specific <code>xrSetTrackingModePICO</code> (rotation, position, eye modes)
  - key: Eye Tracking
    value: <code>xrGetEyeTrackingDataPICO</code> — provides gaze point, gaze vector, eye openness, pupil dilation, and foveated gaze direction
  - key: IPD Control
    value: <code>xrSetIPDPICO</code> / <code>xrGetIPDPICO</code>, <code>xrSetTrackingIPDEnabledPICO</code> / <code>xrGetTrackingIPDEnabledPICO</code>, <code>xrGetEyeTrackingAutoIPDPICO</code>
  - key: Foveated Rendering
    value: <code>xrGetFoveationConfigPICO</code>, <code>XrFoveationParametersEXT</code> struct, <code>XR_PICO_foveation_image_ext_enable</code>, levels — none, low, mid, high, top-high
  - key: Boundary System
    value: <code>xrGetBoundaryGeometryPICO</code>, <code>xrBoundaryTestPointPICO</code>, <code>xrBoundaryTestNodePICO</code>, <code>xrGetBoundaryDimensionsPICO</code>, <code>xrInvokeFunctionsPICO</code> for guardian control
  - key: Controller API
    value: <code>xrGetControllerConnectionStatePico</code>, <code>xrGetPhyControllerInfoPico</code>, <code>xrVibrateControllerPico</code>, <code>xrSetMainControllerHandlePico</code>, <code>xrGetControllerSensorDataPico</code>, <code>xrGetControllerTouchValuePico</code>, <code>xrGetControllerGripValuePico</code>, key mapping via <code>XrControllerKeyMap</code>
  - key: See-Through
    value: <code>xrGetSeeThroughDataPICO</code> — raw camera frames for left/right eye with exposure data
  - key: Performance
    value: <code>xrSetPerformanceLevelPICO</code> / <code>xrGetPerformanceLevelPICO</code> with CPU/GPU domain control
  - key: Sensor Reset
    value: <code>xrResetSensorPICO</code> with options — position, orientation, orientation-Y-only, all
  - key: Stencil Mesh
    value: <code>xrGetStencilmeshPICO</code> — returns eye stencil mesh vertices and indices
  - key: View Frustum
    value: <code>xrGetFrustumParametersPICO</code> / <code>xrSetFrustumParametersPICO</code> — left/right frustum planes
  - key: MRC (Mixed Reality Capture)
    value: <code>xrSetMrcPose</code> / <code>xrGetMrcPose</code>, <code>xrGetMrcPosePICO</code> / <code>xrSetMrcPosePICO</code>
  - key: Config System
    value: <code>xrGetConfigPICO</code> / <code>xrSetConfigPICO</code> — render texture size, FPS, log levels, neck model, refresh rate, 6DOF enable, controller type, IPD, tracking origin height
  - key: Session Extensions
    value: <code>XrSessionBeginInfoEXT</code> (single pass, color space), <code>XrFrameEndInfoEXT</code> (FFR, headpose, depth)
  - key: Download
    value: Not available for download on this site. Originally distributed as <code>Pico_OpenXR_Mobile_SDK_2.0.1.zip</code> (3.4 MB)
---

## Overview

The 2.0.1 release is a major update over v1.0.13. It adds `openxr_pico.h` with 17 PICO-specific extensions covering controller management, boundary/guardian, eye tracking, foveated rendering, see-through camera, performance control, and more.

## Key Changes from v1.0.13

- OpenXR API bumped from 1.0.13 to 1.0.14
- Added `openxr_pico.h` with 17 PICO-specific extensions
- Loader library size increased (arm64: 1,018 KB to 1,571 KB)
- Sample app APK grew from 3.9 MB to 4.8 MB
- Added `pController.cpp` / `pController.h` in sample for controller handling

## Integration

Include `openxr_pico.h` after `openxr.h`:

```c
#include "openxr/openxr.h"
#include "openxr/openxr_pico.h"
```

All PICO functions are loaded via `xrGetInstanceProcAddr`. The sample's `pController.cpp` shows the pattern — store function pointers at init, null-check before calling:

```c
PFN_xrGetControllerConnectionStatePico pfnGetConnState = nullptr;
xrGetInstanceProcAddr(instance, "xrGetControllerConnectionStatePico",
    reinterpret_cast<PFN_xrVoidFunction*>(&pfnGetConnState));
if (pfnGetConnState) {
    uint8_t status;
    pfnGetConnState(instance, 0, &status);
}
```

## Data Structures

### XrControllerInfo

Hardware info for a connected controller.

| Field | Type | Description |
|---|---|---|
| `software_ver` | `char[6]` | Controller firmware version |
| `hardware_ver` | `char[3]` | Hardware revision |
| `sn` | `char[18]` | Serial number |
| `addr` | `char[6]` | Bluetooth MAC address |
| `ndi_version` | `char[5]` | NDI (6DOF) module version |

### XrRigidBodyPosef

Full rigid body pose with velocity and acceleration. Used by `XrTracking`.

| Field | Type | Description |
|---|---|---|
| `Pose` | `XrPosef` | Position + orientation |
| `AngularVelocity` | `XrVector3f` | Angular velocity (rad/s) |
| `LinearVelocity` | `XrVector3f` | Linear velocity (m/s) |
| `AngularAcceleration` | `XrVector3f` | Angular acceleration |
| `LinearAcceleration` | `XrVector3f` | Linear acceleration |
| `TimeInSeconds` | `int64_t` | Absolute timestamp of pose |
| `PredictionInSeconds` | `int64_t` | How far ahead this was predicted |

### XrTracking

Controller tracking result containing both local and global poses.

| Field | Type | Description |
|---|---|---|
| `Status` | `unsigned int` | Tracking status flags |
| `ControllerLocalPose` | `XrRigidBodyPosef` | Pose relative to tracking origin |
| `ControllerGlobalPose` | `XrRigidBodyPosef` | Pose in world space |

### XrEyeTrackingData

Eye tracking data from `xrGetEyeTrackingDataPICO`. All positions/vectors are in HMD center-eye coordinates.

| Field | Type | Description |
|---|---|---|
| `leftEyePoseStatus` | `int32_t` | Bit field, left eye pose validity |
| `rightEyePoseStatus` | `int32_t` | Bit field, right eye pose validity |
| `combinedEyePoseStatus` | `int32_t` | Bit field, combined eye pose validity |
| `leftEyeGazePoint[3]` | `float` | Left eye gaze point in 3D space |
| `rightEyeGazePoint[3]` | `float` | Right eye gaze point |
| `combinedEyeGazePoint[3]` | `float` | Combined gaze point (center-eye) |
| `leftEyeGazeVector[3]` | `float` | Left eye gaze direction vector |
| `rightEyeGazeVector[3]` | `float` | Right eye gaze direction vector |
| `combinedEyeGazeVector[3]` | `float` | Combined gaze direction |
| `leftEyeOpenness` | `float` | 0.0 (closed) to 1.0 (open) |
| `rightEyeOpenness` | `float` | 0.0 (closed) to 1.0 (open) |
| `leftEyePupilDilation` | `float` | Pupil dilation in mm |
| `rightEyePupilDilation` | `float` | Pupil dilation in mm |
| `leftEyePositionGuide[3]` | `float` | Inner corner position (meters) |
| `rightEyePositionGuide[3]` | `float` | Inner corner position (meters) |
| `foveatedGazeDirection[3]` | `float` | Gaze direction for foveated rendering |
| `foveatedGazeTrackingState` | `int32_t` | State of the foveated gaze signal |

### XrFoveationParametersEXT

Parameters for fixed foveated rendering (FFR). Passed via `XrFrameEndInfoEXT`.

| Field | Type | Description |
|---|---|---|
| `textureIdCount` | `int` | Number of texture IDs |
| `textureId` | `int*` | Array of texture IDs |
| `previousId` | `int*` | Previous frame texture IDs |
| `focalPointX/Y` | `float` | Focal point in UV space |
| `ffrType` | `XrFoveationType` | Level-based or parameter-based |
| `foveationGainX/Y` | `float` | Foveation gain per axis |
| `foveationArea` | `float` | Area affected |
| `foveationMinimum` | `float` | Minimum resolution scale |
| `level` | `XrFoveationLevel` | Preset level (none/low/mid/high/top-high) |
| `frameOffsetCount` | `int` | Number of frame offsets |
| `frameOffset` | `float*` | Per-frame offset values |

### XrViewFrustum

Frustum planes for each eye. Used by `xrGetFrustumParametersPICO` / `xrSetFrustumParametersPICO`.

| Field | Type | Description |
|---|---|---|
| `left/right/top/bottom` | `float` | Frustum plane values |
| `near` | `float` | Near clip plane |
| `far` | `float` | Far clip plane (arbitrary) |
| `frustumPose` | `XrPosef` | Pose of the frustum |

### XrViewStatePICOEXT

Extended view state with headpose and motion data. Chained onto `xrLocateViews` output via `next` pointer.

| Field | Type | Description |
|---|---|---|
| `headpose` | `XrPosef` | Head pose |
| `poseStatus` | `int32_t` | Bit field indicating pose validity |
| `poseTimeStampNs` | `uint64_t` | When pose was generated (ns) |
| `poseFetchTimeNs` | `uint64_t` | When pose was retrieved (ns) |
| `expectedDisplayTimeNs` | `uint64_t` | Expected display time (ns) |
| `gsIndex` | `int` | Internal graphics sync index |
| `linear_velocity` | `XrVector3f` | Head linear velocity |
| `angular_velocity` | `XrVector3f` | Head angular velocity |
| `linear_acceleration` | `XrVector3f` | Head linear acceleration |
| `angular_acceleration` | `XrVector3f` | Head angular acceleration |

### XrFrameEndInfoEXT

Extended frame end info. Chained onto `xrEndFrame` via `next` pointer.

| Field | Type | Description |
|---|---|---|
| `enableFoveation` | `uint32_t` | Enable FFR for this frame |
| `foveationParametersEXT` | `XrFoveationParametersEXT` | FFR parameters |
| `useHeadposeExt` | `uint32_t` | Use extended headpose |
| `headpose` | `XrPosef` | Head pose for this frame |
| `poseStatus` | `int32_t` | Pose validity flags |
| `poseTimeStampNs` | `uint64_t` | Pose timestamp (ns) |
| `poseFetchTimeNs` | `uint64_t` | Fetch timestamp (ns) |
| `expectedDisplayTimeNs` | `uint64_t` | Display time (ns) |
| `gsIndex` | `int` | Graphics sync index |
| `depth` | `float` | Depth value |

### XrSessionBeginInfoEXT

Extended session begin info. Chained onto `xrBeginSession` via `next` pointer.

| Field | Type | Description |
|---|---|---|
| `enableSinglePass` | `uint32_t` | Enable single-pass rendering |
| `colorSpace` | `XrColorSpace` | `colorSpaceLinear` (0) or `colorSpaceSRGB` (1) |

### XrSwapchainCreateInfoAndroidEXT

Android-specific swapchain creation. Allows passing user-created textures to the runtime.

| Field | Type | Description |
|---|---|---|
| `imageNumExt` | `uint32_t` | Number of external images |
| `imagesExt` | `uint32_t*` | Array of external image handles |

### XrInstanceCreateInfoAndroidPICOEXT

Android instance creation extension. Allows passing a SurfaceView for rendering.

| Field | Type | Description |
|---|---|---|
| `nativeWindow` | `ANativeWindow*` | Native Android window |
| `surfaceView` | `jobject*` | Java SurfaceView object |

### ConfigsSetPICO

Configuration struct for `xrSetConfigsPICO`. Sets multiple runtime parameters at once.

| Field | Type | Description |
|---|---|---|
| `engineVersion` | `char*` | Engine version string |
| `trackingOrigin` | `int` | `EYELEVEL` (0), `FLOORLEVEL` (1), `STAGELEVEL` (2) |
| `noErrorFlag` | `bool` | Disable OpenGL error checking |
| `enableSixDof` | `bool` | Enable 6DOF tracking |
| `presentationFlag` | `bool` | Presentation mode flag |
| `platform` | `int` | `UNITY` (0), `UNREAL` (1), `NATIVE` (2) |
| `displayRate` | `float` | Target display refresh rate |
| `mrcTextureId` | `uint64_t` | MRC texture ID |

## Enums

### XrControllerKeyMap

Controller button and touch mappings.

**Buttons (0-127)**

| Value | Name | Description |
|---|---|---|
| 0 | `XR_CONTROLLER_KEY_HOME` | Home button |
| 1 | `XR_CONTROLLER_KEY_AX` | A/X button |
| 2 | `XR_CONTROLLER_KEY_BY` | B/Y button |
| 3 | `XR_CONTROLLER_KEY_BACK` | Back button |
| 4 | `XR_CONTROLLER_KEY_TRIGGER` | Trigger |
| 5 | `XR_CONTROLLER_KEY_VOL_UP` | Volume up |
| 6 | `XR_CONTROLLER_KEY_VOL_DOWN` | Volume down |
| 7 | `XR_CONTROLLER_KEY_ROCKER` | Thumbstick/rocker |
| 8 | `XR_CONTROLLER_KEY_GRIP` | Grip button |
| 9 | `XR_CONTROLLER_KEY_TOUCHPAD` | Touchpad |
| 127 | `XR_CONTROLLER_KEY_LASTONE` | Sentinel |

**Touch events (128-255)**

| Value | Name | Description |
|---|---|---|
| 128 | `XR_CONTROLLER_TOUCH_AX` | A/X touch |
| 129 | `XR_CONTROLLER_TOUCH_BY` | B/Y touch |
| 130 | `XR_CONTROLLER_TOUCH_ROCKER` | Thumbstick touch |
| 131 | `XR_CONTROLLER_TOUCH_TRIGGER` | Trigger touch |
| 132 | `XR_CONTROLLER_TOUCH_THUMB` | Thumb touch |
| 255 | `XR_CONTROLLER_TOUCH_LASTONE` | Sentinel |

Used with `xrSetPhyControllerEnableKeyPico` to enable/disable individual keys.

### xrt_device_eventtype

Controller device event types, used by `XrControllerEventChanged`.

| Value | Name | Description |
|---|---|---|
| 0 | `XRT_DEVICE_CONNECTCHANGED` | Controller connected/disconnected |
| 1 | `XRT_DEVICE_MAIN_CHANGED` | Main controller changed |
| 2 | `XRT_DEVICE_VERSION` | Firmware version event |
| 3 | `XRT_DEVICE_SN` | Serial number event |
| 4 | `XRT_DEVICE_BIND_STATUS` | Binding status |
| 5 | `XRT_STATION_STATUS` | Tracking station status |
| 6 | `XRT_DEVICE_IOBUSY` | IO busy |
| 7 | `XRT_DEVICE_OTASTAUS` | OTA update status |
| 8 | `XRT_DEVICE_ID` | Device ID |
| 15 | `XRT_DEVICE_HANDNESS_CHANGED` | Left/right handness changed |
| 16 | `XRT_DEVICE_CHANNEL` | Channel changed |
| 17 | `XRT_DEVICE_LOSSRATE` | Packet loss rate |
| 18 | `XRT_DEVICE_THREAD_STARTED` | CV thread started |

Values 9-14 are commented out in the header (OTA progress/code events, BLE MAC).

### XrTrackingMode

Tracking mode flags for `xrSetTrackingModePICO` / `xrGetTrackingModePICO`. Can be OR'd together.

| Value | Name | Description |
|---|---|---|
| 0x1 | `XR_TRACKING_MODE_ROTATION` | Enable rotation tracking (3DOF) |
| 0x2 | `XR_TRACKING_MODE_POSITION` | Enable position tracking (6DOF) |
| 0x4 | `XR_TRACKING_MODE_EYE` | Enable eye tracking |

### XrFoveationLevel

FFR preset levels for `XrFoveationParametersEXT` and `xrGetFoveationConfigPICO`.

| Value | Name | Description |
|---|---|---|
| -1 | `XR_FOVEATION_LEVEL_NONE` | No foveation |
| 0 | `XR_FOVEATION_LEVEL_LOW` | Low foveation |
| 1 | `XR_FOVEATION_LEVEL_MID` | Medium foveation |
| 2 | `XR_FOVEATION_LEVEL_HIGH` | High foveation |
| 3 | `XR_FOVEATION_LEVEL_TOP_HIGH` | Maximum foveation |

### XrFoveationType

| Value | Name | Description |
|---|---|---|
| 0 | `XR_FOVEATION_LEVEL` | Use preset level |
| 1 | `XR_FOVEATION_PARAMETERS` | Use custom parameters (gain, area, minimum) |

### XrResetSensorOption

Options for `xrResetSensorPICO`.

| Value | Name | Description |
|---|---|---|
| 0 | `XR_RESET_POSITION` | Reset position only |
| 1 | `XR_RESET_ORIENTATION` | Reset orientation only |
| 2 | `XR_RESET_ORIENTATION_Y_ONLY` | Reset only Y-axis orientation |
| 3 | `XR_RESET_ALL` | Reset everything |

### xrFuncitonName

Function names for `xrInvokeFunctionsPICO`. This is a multipurpose dispatch for boundary, see-through, and guardian operations.

| Value | Name | Description |
|---|---|---|
| 0 | `XR_SET_SEETHROUGH_VISIBLE` | Toggle see-through camera visibility |
| 1 | `XR_SET_GUARDIANSYSTEM_DISABLE` | Disable guardian system |
| 2 | `XR_RESUME_GUARDIANSYSTEM_FOR_STS` | Resume guardian for STS |
| 3 | `XR_PAUSE_GUARDIANSYSTEM_FOR_STS` | Pause guardian for STS |
| 4 | `XR_SHUTDOWN_SDK_GUARDIANSYSTEM` | Shut down SDK guardian |
| 5 | `XR_GET_CAMERA_DATA_EXT` | Get camera data |
| 6 | `XR_START_SDK_BOUNDARY` | Start SDK boundary |
| 7 | `XR_SET_CONTROLLER_POSITION` | Set controller position (unused) |
| 8 | `XR_START_CAMERA_PREVIEW` | Start camera preview |
| 9 | `XR_GET_ROOM_MODE_STATE` | Get room mode state |
| 10 | `XR_DISABLE_BOUNDARY` | Disable boundary |
| 11 | `XR_SET_MONO_MODE` | Set mono mode |
| 12 | `XR_GET_BOUNDARY_CONFIGURED` | Check if boundary is configured |
| 13 | `XR_GET_BOUNDARY_ENABLED` | Check if boundary is enabled |
| 14 | `XR_SET_BOUNDARY_VISIBLE` | Set boundary visibility |
| 15 | `XR_SET_SEETHROUGH_BACKGROUND` | Set see-through as background |
| 16 | `XR_GET_BOUNDARY_VISIBLE` | Get boundary visibility |

### ConfigsEXT (Get)

Config indices for `xrGetConfigPICO`. All return float values.

| Value | Name | Description |
|---|---|---|
| 0 | `RENDER_TEXTURE_WIDTH` | Render texture width in pixels |
| 1 | `RENDER_TEXTURE_HEIGHT` | Render texture height in pixels |
| 2 | `SHOW_FPS` | FPS display toggle |
| 3 | `RUNTIME_LOG_LEVEL` | Runtime log level |
| 4 | `PXRPLUGIN_LOG_LEVEL` | Pico plugin log level |
| 5 | `UNITY_LOG_LEVEL` | Unity log level |
| 6 | `UNREAL_LOG_LEVEL` | Unreal log level |
| 7 | `NATIVE_LOG_LEVEL` | Native log level |
| 8 | `TARGET_FRAME_RATE` | Target frame rate |
| 9 | `NECK_MODEL_X` | Neck model X offset |
| 10 | `NECK_MODEL_Y` | Neck model Y offset |
| 11 | `NECK_MODEL_Z` | Neck model Z offset |
| 12 | `DISPLAY_REFRESH_RATE` | Display refresh rate |
| 13 | `ENABLE_6DOF` | 6DOF enabled |
| 14 | `CONTROLLER_TYPE` | Controller type |
| 15 | `PHYSICAL_IPD` | Physical IPD in mm |
| 16 | `TO_DELTA_SENSOR_Y` | Delta sensor Y |
| 17 | `GET_DISPLAY_RATE` | Get display rate |
| 18 | `FOVEATION_SUBSAMPLED_ENABLED` | FFR subsampling enabled |
| 19 | `TRACKING_ORIGIN_HEIGHT` | Tracking origin height |

### ConfigsSetEXT (Set)

Config indices for `xrSetConfigPICO`. Accepts char* data.

| Value | Name | Description |
|---|---|---|
| 0 | `UNREAL_VERSION` | Unreal engine version |
| 1 | `TRACKING_ORIGIN` | Tracking origin (eye/floor/stage) |
| 2 | `OPENGL_NOERROR` | OpenGL no-error mode |
| 3 | `ENABLE_SIX_DOF` | Enable 6DOF |
| 4 | `PRESENTATION_FLAG` | Presentation flag |
| 5 | `ENABLE_CPT` | Enable CPT |
| 6 | `PLATFORM` | Platform (Unity/Unreal/Native) |
| 7 | `FOVEATION_LEVEL` | FFR level |
| 8 | `SET_DISPLAY_RATE` | Set display rate |
| 9 | `MRC_TEXTURE_ID` | MRC texture ID |

### TrackingOrigin

| Value | Name | Description |
|---|---|---|
| 0 | `EYELEVEL` | Eye-level tracking origin |
| 1 | `FLOORLEVEL` | Floor-level tracking origin |
| 2 | `STAGELEVEL` | Stage-level tracking origin |

### Platform

| Value | Name | Description |
|---|---|---|
| 0 | `UNITY` | Unity engine |
| 1 | `UNREAL` | Unreal engine |
| 2 | `NATIVE` | Native C/C++ |

### XrColorSpace

Color space for `XrSessionBeginInfoEXT`.

| Value | Name | Description |
|---|---|---|
| 0 | `colorSpaceLinear` | Linear color space |
| 1 | `colorSpaceSRGB` | sRGB color space |

## PICO Event System

v2.0.1 adds several custom event types dispatched through `xrPollEvents`. Check `eventDataBuffer.type` against these to handle them.

### XrEventDataSeethroughStateChanged

Fired when the see-through camera state changes (on/off).

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `state` | `int` | New see-through state (0=off, 1=on) |

### XrEventDataKeyEvent

Fired on controller key press/release.

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `repeat` | `int32_t` | Key repeat count |
| `keyCode` | `int32_t` | Key code (see `XrControllerKeyMap`) |
| `keyAction` | `int8_t` | Action (press/release) |

### XrControllerEventChanged

Fired on controller device events (connect, disconnect, handness, etc.).

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `eventtype` | `xrt_device_eventtype` | Event subtype |
| `controller` | `uint8_t` | Controller index (0=left, 1=right) |
| `status` | `uint8_t` | Event status |
| `varying[400]` | `uint8_t[400]` | Variable-length payload |
| `length` | `uint16_t` | Payload length |

### XrEventDataHardIPDStateChanged

Fired when the physical IPD dial is adjusted.

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `ipd` | `float` | New IPD in meters |

### XrEventDataFoveationLevelChanged

Fired when FFR level changes.

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `level` | `int` | New foveation level (see `XrFoveationLevel`) |

### XrEventDataFrustumChanged

Fired when view frustum changes. No additional data beyond type/next.

### XrEventDataRenderTextureChanged

Fired when render texture dimensions change.

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `width` | `int` | New render texture width |
| `height` | `int` | New render texture height |

### XrEventDataTargetFrameRateChanged

Fired when target frame rate changes.

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `frameRate` | `int` | New target frame rate |

### XrEventDataMrcStatusChanged

Fired when MRC (Mixed Reality Capture) is enabled/disabled.

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `mrcStatus` | `int` | MRC status (0=off, 1=on) |

### XrEventDataRefreshRateChanged

Fired when display refresh rate changes.

| Field | Type | Description |
|---|---|---|
| `type` | `XrStructureType` | Event type |
| `next` | `void*` | Next chain pointer |
| `refreshRate` | `float` | New refresh rate in Hz |

### Event Polling Example

```c
XrEventDataBuffer eventBuffer;
eventBuffer.type = XR_TYPE_EVENT_DATA_BUFFER;
eventBuffer.next = nullptr;

while (xrPollEvent(instance, &eventBuffer) == XR_SUCCESS) {
    switch (eventBuffer.type) {
        case XR_TYPE_EVENT_DATA_EVENTS_LOST:
            // events lost, re-sync state
            break;
        // Check for PICO-specific events by comparing type values
        // The exact XR_TYPE_ values are defined by the runtime
    }
    eventBuffer.type = XR_TYPE_EVENT_DATA_BUFFER;
}
```

## Function Reference

### Tracking Mode

#### `xrSetTrackingModePICO`

```c
XrResult xrSetTrackingModePICO(XrSession session, uint32_t trackingMode);
```

Sets the active tracking mode. `trackingMode` is a bitmask of `XrTrackingMode` values. For 6DOF + eye tracking, pass `XR_TRACKING_MODE_ROTATION | XR_TRACKING_MODE_POSITION | XR_TRACKING_MODE_EYE` (0x7).

Must be called after `xrBeginSession`. Changing modes mid-session may cause tracking to briefly drop.

```c
// Enable 6DOF + eye tracking
xrSetTrackingModePICO(session,
    XR_TRACKING_MODE_ROTATION | XR_TRACKING_MODE_POSITION | XR_TRACKING_MODE_EYE);
```

#### `xrGetTrackingModePICO`

```c
XrResult xrGetTrackingModePICO(XrSession session, uint32_t *trackingMode);
```

Returns the current tracking mode bitmask.

```c
uint32_t mode;
xrGetTrackingModePICO(session, &mode);
bool hasEyeTracking = (mode & XR_TRACKING_MODE_EYE) != 0;
bool hasPosition = (mode & XR_TRACKING_MODE_POSITION) != 0;
```

### Eye Tracking

#### `xrGetEyeTrackingDataPICO`

```c
XrResult xrGetEyeTrackingDataPICO(XrSession session, XrEyeTrackingData *eyeTrackingData);
```

Fills `XrEyeTrackingData` with current eye tracking data. Call this each frame after `xrWaitFrame`. Eye tracking must be enabled via `xrSetTrackingModePICO` with `XR_TRACKING_MODE_EYE` flag.

The `combinedEyeGazePoint` and `combinedEyeGazeVector` are the most useful fields for interaction — they give a single fused gaze point and direction from the HMD center-eye origin. `foveatedGazeDirection` is specifically for driving foveated rendering.

```c
XrEyeTrackingData eyeData;
xrGetEyeTrackingDataPICO(session, &eyeData);
if (eyeData.combinedEyePoseStatus) {
    // Use eyeData.combinedEyeGazePoint for raycasting
    // Use eyeData.foveatedGazeDirection for FFR focal point
}
```

### IPD Control

#### `xrSetIPDPICO`

```c
XrResult xrSetIPDPICO(XrSession session, float distance);
```

Sets the interpupillary distance in meters. Typical range is 0.058 to 0.072. This overrides the physical IPD dial setting.

```c
// Set IPD to 64mm
xrSetIPDPICO(session, 0.064f);
```

#### `xrGetIPDPICO`

```c
XrResult xrGetIPDPICO(XrSession session, float* ipd);
```

Returns the current IPD in meters.

```c
float ipd;
xrGetIPDPICO(session, &ipd);
// ipd is in meters, e.g. 0.064 = 64mm
```

#### `xrSetTrackingIPDEnabledPICO`

```c
XrResult xrSetTrackingIPDEnabledPICO(XrSession session, bool enable);
```

Enables/disables IPD-based tracking adjustment. When enabled, the runtime automatically adjusts eye positions based on IPD changes.

```c
xrSetTrackingIPDEnabledPICO(session, true);
```

#### `xrGetTrackingIPDEnabledPICO`

```c
XrResult xrGetTrackingIPDEnabledPICO(XrSession session, bool* enable);
```

Returns whether IPD tracking adjustment is enabled.

```c
bool enabled;
xrGetTrackingIPDEnabledPICO(session, &enabled);
```

#### `xrGetEyeTrackingAutoIPDPICO`

```c
XrResult xrGetEyeTrackingAutoIPDPICO(XrSession session, float* autoIPD);
```

Returns the auto-detected IPD from eye tracking cameras. This is the physical IPD measured by the eye tracking system, which may differ from the dial setting. Requires eye tracking to be enabled.

```c
float autoIPD;
xrGetEyeTrackingAutoIPDPICO(session, &autoIPD);
// autoIPD is the measured physical IPD in meters
```

### Foveated Rendering

#### `xrGetFoveationConfigPICO`

```c
XrResult xrGetFoveationConfigPICO(
    XrSession session,
    XrFoveationLevel level,
    float *gainX,
    float *gainY,
    float *area,
    float *minimum);
```

Returns the foveation parameters for a given preset level. Use this to understand what gain/area/minimum values each level corresponds to before setting custom parameters.

```c
float gainX, gainY, area, minimum;
xrGetFoveationConfigPICO(session, XR_FOVEATION_LEVEL_HIGH, &gainX, &gainY, &area, &minimum);
// gainX=2.0 means 2x resolution reduction at periphery on X axis
```

#### `xrGetFoveationImagePICO`

```c
XrResult xrGetFoveationImagePICO(
    XrSession session,
    XrSwapchain swapchain,
    int eye,
    uint64_t* foveationImage,
    uint32_t* width,
    uint32_t* height);
```

Returns the foveation image handle for a given swapchain and eye. This is the pre-distorted texture that the runtime compositor will sample from.

FFR is applied per-frame via `XrFrameEndInfoEXT` chained onto `xrEndFrame`:

```c
XrFrameEndInfoEXT frameEndExt = {};
frameEndExt.type = XR_TYPE_FRAME_END_INFO_EXT;
frameEndExt.enableFoveation = 1;
frameEndExt.foveationParametersEXT.level = XR_FOVEATION_LEVEL_HIGH;
frameEndExt.foveationParametersEXT.ffrType = XR_FOVEATION_LEVEL;

XrFrameEndInfo frameEnd = {};
frameEnd.type = XR_TYPE_FRAME_END_INFO;
frameEnd.next = &frameEndExt;
// ... set layer count and layers
xrEndFrame(session, &frameEnd);
```

### Stencil Mesh

#### `xrGetStencilmeshPICO`

```c
XrResult xrGetStencilmeshPICO(
    XrSession session,
    int eye,
    int *vertsCount,
    int *indexCount,
    float **localVerts,
    unsigned int **localIndex);
```

Returns the stencil mesh for the specified eye (0=left, 1=right). The stencil mesh defines the visible area of the display lens — areas outside the stencil are not visible through the lens and can be skipped in rendering.

The runtime allocates `localVerts` and `localIndex` internally. `vertsCount` gives the number of vertices (each 3 floats), `indexCount` gives the number of indices. The caller should not free the pointers — they are owned by the runtime.

```c
int vertCount, idxCount;
float* verts;
unsigned int* indices;
xrGetStencilmeshPICO(session, 0, &vertCount, &idxCount, &verts, &indices);
// Build a stencil mesh from verts (3 * vertCount floats) and indices
// Use it to mask out invisible lens regions during rendering
```

### View Frustum

#### `xrGetFrustumParametersPICO`

```c
XrResult xrGetFrustumParametersPICO(
    XrSession session,
    struct XrViewFrustum *pLeftFrustum,
    struct XrViewFrustum *pRightFrustum);
```

Returns the current view frustum parameters for both eyes. Each `XrViewFrustum` contains left/right/top/bottom/near/far planes and a pose.

```c
XrViewFrustum leftFrustum, rightFrustum;
xrGetFrustumParametersPICO(session, &leftFrustum, &rightFrustum);
// leftFrustum.left, .right, .top, .bottom, .near, .far
// Use to build custom projection matrices
```

#### `xrSetFrustumParametersPICO`

```c
XrResult xrSetFrustumParametersPICO(
    XrSession session,
    struct XrViewFrustum *pLeftFrustum,
    struct XrViewFrustum *pRightFrustum);
```

Overrides the view frustum parameters. This is useful for custom projection matrices or matching external camera frustums for mixed reality capture.

```c
XrViewFrustum leftF = { -0.05f, 0.05f, 0.04f, -0.04f, 0.1f, 100.0f };
XrViewFrustum rightF = { -0.05f, 0.05f, 0.04f, -0.04f, 0.1f, 100.0f };
xrSetFrustumParametersPICO(session, &leftF, &rightF);
```

### Sensor Reset

#### `xrResetSensorPICO`

```c
XrResult xrResetSensorPICO(XrSession session, XrResetSensorOption option);
```

Resets the sensor tracking. Different options reset different components:

- `XR_RESET_POSITION` — zeroes the current position, recentering the user
- `XR_RESET_ORIENTATION` — zeroes orientation, facing forward
- `XR_RESET_ORIENTATION_Y_ONLY` — zeroes only yaw (keeps pitch/roll)
- `XR_RESET_ALL` — full recenter

Typically called when the user presses a recenter button. The reset is applied to the tracking origin, so all subsequent poses are relative to the new origin.

```c
// Full recenter on button press
xrResetSensorPICO(session, XR_RESET_ALL);
```

### Config System

The config system provides get/set access to runtime parameters. Get uses `ConfigsEXT` enum with float output; Set uses `ConfigsSetEXT` enum with char* input.

#### `xrGetConfigPICO`

```c
XrResult xrGetConfigPICO(
    XrSession session,
    enum ConfigsEXT configIndex,
    float *configData);
```

Returns a single config value as a float. See `ConfigsEXT` enum for available indices.

```c
float width, height;
xrGetConfigPICO(session, RENDER_TEXTURE_WIDTH, &width);
xrGetConfigPICO(session, RENDER_TEXTURE_HEIGHT, &height);
// width/height are the current render texture dimensions
```

#### `xrGetConfigsPICO`

```c
XrResult xrGetConfigsPICO(
    XrSession session,
    int *configCount,
    float **configArray);
```

Returns all config values at once. `configCount` is set to the number of values, `configArray` points to runtime-owned memory.

```c
int count;
float* configs;
xrGetConfigsPICO(session, &count, &configs);
// configs[0] = first config value, configs[1] = second, etc.
// count = total number of config values
```

#### `xrSetConfigPICO`

```c
XrResult xrSetConfigPICO(
    XrSession session,
    enum ConfigsSetEXT configIndex,
    char *configData);
```

Sets a single config value. The data is passed as a char* string, even for numeric values. See `ConfigsSetEXT` enum for available indices.

```c
// Set FFR level to high
xrSetConfigPICO(session, FOVEATION_LEVEL, "2");
```

#### `xrSetConfigsPICO`

```c
XrResult xrSetConfigsPICO(
    XrSession session,
    struct ConfigsSetPICO *configsData);
```

Sets multiple config values at once using a `ConfigsSetPICO` struct. This is more efficient than calling `xrSetConfigPICO` multiple times.

```c
ConfigsSetPICO cfg = {};
cfg.engineVersion = "2.8.0.1";
cfg.trackingOrigin = EYELEVEL;
cfg.enableSixDof = true;
cfg.platform = NATIVE;
cfg.displayRate = 72.0f;
xrSetConfigsPICO(session, &cfg);
```

### Performance Settings

#### `xrSetPerformanceLevelPICO`

```c
XrResult xrSetPerformanceLevelPICO(
    XrSession session,
    XrPerfSettingsDomainEXT domain,
    int level);
```

Sets the performance level for a given domain (CPU or GPU). `domain` uses `XrPerfSettingsDomainEXT` from the EXT_performance_settings extension. `level` is typically 0-3 (power saver, normal, high, turbo).

```c
// Set CPU to high performance
xrSetPerformanceLevelPICO(session, XR_PERF_SETTINGS_DOMAIN_CPU_EXT, 2);
// Set GPU to turbo
xrSetPerformanceLevelPICO(session, XR_PERF_SETTINGS_DOMAIN_GPU_EXT, 3);
```

#### `xrGetPerformanceLevelPICO`

```c
XrResult xrGetPerformanceLevelPICO(
    XrSession session,
    XrPerfSettingsDomainEXT domain,
    int *level);
```

Returns the current performance level for the specified domain.

```c
int cpuLevel, gpuLevel;
xrGetPerformanceLevelPICO(session, XR_PERF_SETTINGS_DOMAIN_CPU_EXT, &cpuLevel);
xrGetPerformanceLevelPICO(session, XR_PERF_SETTINGS_DOMAIN_GPU_EXT, &gpuLevel);
// cpuLevel/gpuLevel: 0=power saver, 1=normal, 2=high, 3=turbo
```

### Boundary / Guardian System

The boundary system provides guardian boundary geometry, point/node proximity testing, and control over the guardian and see-through systems via a dispatch function.

#### `xrInvokeFunctionsPICO`

```c
XrResult xrInvokeFunctionsPICO(
    XrSession session,
    xrFuncitonName name,
    void *input,
    unsigned int size_in,
    void **output,
    unsigned int size_out);
```

Multipurpose dispatch for boundary, see-through, and guardian operations. See `xrFuncitonName` enum for all available operations. The `input`/`size_in` and `output`/`size_out` parameters depend on the function being invoked.

Common usage:

```c
// Check if boundary is configured
void* output = nullptr;
unsigned int outSize = 0;
xrInvokeFunctionsPICO(session, XR_GET_BOUNDARY_CONFIGURED,
    nullptr, 0, &output, outSize);

// Set boundary visible
xrInvokeFunctionsPICO(session, XR_SET_BOUNDARY_VISIBLE,
    nullptr, 0, nullptr, 0);

// Disable guardian system
xrInvokeFunctionsPICO(session, XR_SET_GUARDIANSYSTEM_DISABLE,
    nullptr, 0, nullptr, 0);
```

#### `xrBoundaryTestPointPICO`

```c
XrResult xrBoundaryTestPointPICO(
    XrSession session,
    float x, float y, float z,
    bool isPlayArea,
    bool *pisTriggering,
    float *pclosestDistance,
    float *ppx, float *ppy, float *ppz,
    float *pnx, float *pny, float *pnz,
    int *ret);
```

Tests a point in 3D space against the boundary. Returns whether the point is triggering the boundary (too close), the closest distance to the boundary, the closest point on the boundary (`ppx-ppz`), the normal at that point (`pnx-pnz`), and a return code.

`isPlayArea` selects between the play area boundary (true) or the full guardian boundary (false).

```c
bool triggering;
float closestDist, px, py, pz, nx, ny, nz;
int ret;
xrBoundaryTestPointPICO(session, 1.0f, 0.0f, 0.0f, false,
    &triggering, &closestDist, &px, &py, &pz, &nx, &ny, &nz, &ret);
if (triggering) {
    // Point is too close to boundary, trigger warning
}
```

#### `xrBoundaryTestNodePICO`

```c
XrResult xrBoundaryTestNodePICO(
    XrSession session,
    int node,
    bool isPlayArea,
    bool *pisTriggering,
    float *pclosestDistance,
    float *ppx, float *ppy, float *ppz,
    float *pnx, float *pny, float *pnz,
    int *ret);
```

Same as `xrBoundaryTestPointPICO` but tests a tracked node (e.g. head, controller) by its node ID instead of an explicit point. The runtime uses the node's current tracked position.

```c
bool triggering;
float closestDist, px, py, pz, nx, ny, nz;
int ret;
// Test head node (2) against outer boundary
xrBoundaryTestNodePICO(session, 2, false,
    &triggering, &closestDist, &px, &py, &pz, &nx, &ny, &nz, &ret);
if (triggering) {
    // Head is too close to boundary
}
```

#### `xrGetBoundaryGeometryPICO`

```c
XrResult xrGetBoundaryGeometryPICO(
    XrSession session,
    float **outPointsFloat,
    bool isPlayArea,
    int *ret);
```

Returns the boundary geometry as a flat array of floats. Each point is 3 floats (x, y, z). The array is runtime-owned. The number of points can be determined by dividing the array length by 3.

```c
float* points;
int ret;
xrGetBoundaryGeometryPICO(session, &points, false, &ret);
// points[0..2] = first boundary point, points[3..5] = second, etc.
```

#### `xrGetBoundaryDimensionsPICO`

```c
XrResult xrGetBoundaryDimensionsPICO(
    XrSession session,
    float *x, float *y, float *z,
    bool isPlayArea,
    int *ret);
```

Returns the dimensions (width, height, depth) of the boundary or play area.

```c
float x, y, z;
int ret;
xrGetBoundaryDimensionsPICO(session, &x, &y, &z, false, &ret);
// x=width, y=height, z=depth of outer boundary
```

#### `xrSetControllerPositionPICO`

```c
XrResult xrSetControllerPositionPICO(
    XrSession session,
    float x, float y, float z,    // orientation quaternion
    float w,
    float px, float py, float pz, // position
    int hand,
    bool valid,
    int keyEvent);
```

Overrides the controller position and orientation. `x,y,z,w` is the orientation quaternion, `px,py,pz` is the position. `hand` is 0=left, 1=right. `valid` indicates if the pose is valid. `keyEvent` can pass a key event. This is used for simulated/controller-less scenarios.

```c
// Set left controller pose to origin, facing forward
xrSetControllerPositionPICO(session,
    0.0f, 0.0f, 0.0f, 1.0f,   // identity quaternion
    0.0f, 1.0f, 0.0f,         // position at (0,1,0)
    0,                         // left hand
    true,                      // valid pose
    0);                        // no key event
```

### See-Through Camera

#### `xrGetSeeThroughDataPICO`

```c
XrResult xrGetSeeThroughDataPICO(
    XrSession session,
    uint8_t *leftEye,
    uint8_t *rightEye,
    uint32_t *width,
    uint32_t *height,
    uint32_t *exposure,
    int64_t *start_of_exposure_ts,
    int *ret);
```

Returns raw camera frames for both eyes. `leftEye` and `rightEye` are buffers that will be filled with image data. `width` and `height` are set to the image dimensions. `exposure` is the exposure value used, and `start_of_exposure_ts` is the timestamp when exposure started (nanoseconds).

The caller must allocate `leftEye` and `rightEye` buffers large enough for `width * height * bytes_per_pixel` (typically RGBA, 4 bytes/pixel). Query width/height first or use a sufficiently large buffer.

```c
uint8_t leftBuf[1280 * 800 * 4];
uint8_t rightBuf[1280 * 800 * 4];
uint32_t w, h, exposure;
int64_t exposureTs;
int ret;
xrGetSeeThroughDataPICO(session, leftBuf, rightBuf,
    &w, &h, &exposure, &exposureTs, &ret);
// leftBuf/rightBuf now contain raw camera frames at w x h resolution
```

### MRC (Mixed Reality Capture)

MRC allows capturing the VR scene composited with a video feed for recording or streaming.

#### `xrSetMrcPose`

```c
XrResult xrSetMrcPose(
    XrSession session,
    float x, float y, float z, float w,    // orientation quaternion
    float px, float py, float pz);          // position
```

Sets the MRC camera pose. The orientation is a quaternion `(x,y,z,w)` and position is `(px,py,pz)`. This tells the runtime where the external camera is positioned relative to the tracking origin.

```c
// Place MRC camera 2m in front, 1.5m up, looking forward
xrSetMrcPose(session,
    0.0f, 0.0f, 0.0f, 1.0f,    // identity quaternion (forward)
    0.0f, 1.5f, -2.0f);         // position
```

#### `xrGetMrcPose`

```c
XrResult xrGetMrcPose(
    XrSession session,
    float *x, float *y, float *z, float *w,
    float *px, float *py, float *pz);
```

Returns the current MRC camera pose.

#### `xrSetMrcPosePICO`

```c
XrResult xrSetMrcPosePICO(
    XrSession session,
    float x, float y, float z, float w,
    float px, float py, float pz);
```

PICO-specific MRC pose setter. Functionally identical to `xrSetMrcPose` but loaded via the `XR_PICO_mrc_pose_ext_enable` extension.

```c
xrSetMrcPosePICO(session,
    0.0f, 0.0f, 0.0f, 1.0f,    // identity quaternion
    0.0f, 1.5f, -2.0f);         // position
```

#### `xrGetMrcPosePICO`

```c
XrResult xrGetMrcPosePICO(
    XrSession session,
    float *x, float *y, float *z, float *w,
    float *px, float *py, float *pz);
```

PICO-specific MRC pose getter. Returns the current MRC camera pose.

The MRC texture ID is set via the config system:

```c
// Set MRC texture ID via config
char texIdStr[32];
sprintf(texIdStr, "%llu", (unsigned long long)textureId);
xrSetConfigPICO(session, MRC_TEXTURE_ID, texIdStr);
```

### Controller API

The controller API is split into two groups: CMC (deprecated, not used since 2021/07) and InputManager (current). All functions take `XrInstance` (not `XrSession`) and are loaded via `xrGetInstanceProcAddr`.

#### `xrGetControllerConnectionStatePico`

```c
XrResult xrGetControllerConnectionStatePico(
    XrInstance instance,
    uint8_t controllerhandle,
    uint8_t *status);
```

Returns the connection state of a controller. `controllerhandle` is 0 (left) or 1 (right). `status` is set to 1 if connected, 0 if disconnected.

```c
uint8_t leftStatus, rightStatus;
xrGetControllerConnectionStatePico(instance, 0, &leftStatus);
xrGetControllerConnectionStatePico(instance, 1, &rightStatus);
```

#### `xrGetPhyControllerInfoPico`

```c
XrResult xrGetPhyControllerInfoPico(
    XrInstance instance,
    int device,
    XrControllerInfo *controllerinfo);
```

Returns hardware info for a connected controller. `device` is 0 (left) or 1 (right). Fills the `XrControllerInfo` struct with firmware version, hardware version, serial number, MAC address, and NDI version.

```c
XrControllerInfo info;
xrGetPhyControllerInfoPico(instance, 0, &info);
// info.sn = serial number, info.addr = MAC, info.software_ver = firmware
```

#### `xrVibrateControllerPico`

```c
XrResult xrVibrateControllerPico(
    XrInstance instance,
    float strength,
    int time,
    int controllerHandle);
```

Triggers controller vibration. `strength` is 0.0 to 1.0. `time` is duration in milliseconds. `controllerHandle` is 0 (left) or 1 (right).

```c
// Vibrate left controller at 50% strength for 200ms
xrVibrateControllerPico(instance, 0.5f, 200, 0);
```

#### `xrSetMainControllerHandlePico`

```c
XrResult xrSetMainControllerHandlePico(
    XrInstance instance,
    int controllerHandle);
```

Sets which controller is the "main" (primary) controller. This affects UI handedness and which controller's input is prioritized. `controllerHandle` is 0 (left) or 1 (right).

```c
// Set right controller as main
xrSetMainControllerHandlePico(instance, 1);
```

#### `xrGetMainControllerHandlePico`

```c
XrResult xrGetMainControllerHandlePico(
    XrInstance instance,
    int *controllerHandle);
```

Returns the current main controller handle (0=left, 1=right).

```c
int mainHandle;
xrGetMainControllerHandlePico(instance, &mainHandle);
// mainHandle: 0=left, 1=right
```

#### `xrGetControllerSensorDataPico`

```c
XrResult xrGetControllerSensorDataPico(
    XrInstance instance,
    int controllerHandle,
    float headSensorData[],
    float *data);
```

Returns controller sensor data (pose, IMU). `headSensorData` is an input array containing the current head sensor data (used for coordinate frame relative calculations). `data` is the output array filled with controller sensor values.

The `data` output typically contains position (3 floats), orientation (4 floats as quaternion), velocity, angular velocity, etc. The exact layout depends on the runtime version.

```c
float headData[16];
float controllerData[16];
xrGetHeadSensorDataPico(instance, headData);
xrGetControllerSensorDataPico(instance, 0, headData, controllerData);
// controllerData[0..2] = position, [3..6] = orientation quaternion
```

#### `xrGetControllerSensorDataPredictPico`

```c
XrResult xrGetControllerSensorDataPredictPico(
    XrInstance instance,
    int controllerHandle,
    float headSensorData[],
    float predictTime,
    float *data);
```

Same as `xrGetControllerSensorDataPico` but predicts the controller pose `predictTime` seconds into the future. Useful for rendering with motion prediction to reduce latency.

```c
float headData[16];
float predictedData[16];
xrGetHeadSensorDataPico(instance, headData);
// Predict 20ms into the future
xrGetControllerSensorDataPredictPico(instance, 0, headData, 0.020f, predictedData);
```

#### `xrGetControllerFixedSensorStatePico`

```c
XrResult xrGetControllerFixedSensorStatePico(
    XrInstance instance,
    int controllerHandle,
    float *data);
```

Returns the controller's fixed sensor state — the raw sensor values without prediction or filtering applied.

```c
float rawData[16];
xrGetControllerFixedSensorStatePico(instance, 0, rawData);
// rawData contains unfiltered sensor values
```

#### `xrGetControllerTouchValuePico`

```c
XrResult xrGetControllerTouchValuePico(
    XrInstance instance,
    int controllerSerialNum,
    int length,
    int *value);
```

Returns touch sensor values for the controller. `controllerSerialNum` identifies the controller. `length` is the number of touch values to read. `value` is filled with touch state for each touch sensor (see `XrControllerKeyMap` touch events 128-132).

```c
int touchValues[5];
xrGetControllerTouchValuePico(instance, 0, 5, touchValues);
// touchValues[0] = AX touch, [1] = BY touch, [2] = rocker touch,
// [3] = trigger touch, [4] = thumb touch
```

#### `xrGetControllerGripValuePico`

```c
XrResult xrGetControllerGripValuePico(
    XrInstance instance,
    int controllerSerialNum,
    int *gripvalue);
```

Returns the grip button value (0 = not pressed, 1 = fully pressed).

```c
int gripValue;
xrGetControllerGripValuePico(instance, 0, &gripValue);
if (gripValue > 0) {
    // Grip button is being pressed
}
```

#### `xrGetControllerLinearVelocityStatePico`

```c
XrResult xrGetControllerLinearVelocityStatePico(
    XrInstance instance,
    int controllerHandle,
    float *data);
```

Returns the controller's linear velocity (3 floats: x, y, z in m/s).

```c
float velocity[3];
xrGetControllerLinearVelocityStatePico(instance, 0, velocity);
// velocity[0]=x, [1]=y, [2]=z in m/s
```

#### `xrGetControllerAngularVelocityStatePico`

```c
XrResult xrGetControllerAngularVelocityStatePico(
    XrInstance instance,
    int controllerHandle,
    float *data);
```

Returns the controller's angular velocity (3 floats: x, y, z in rad/s).

```c
float angVel[3];
xrGetControllerAngularVelocityStatePico(instance, 0, angVel);
// angVel[0]=x, [1]=y, [2]=z in rad/s
```

#### `xrGetControllerAccelerationStatePico`

```c
XrResult xrGetControllerAccelerationStatePico(
    XrInstance instance,
    int controllerHandle,
    float *data);
```

Returns the controller's linear acceleration (3 floats: x, y, z in m/s²).

```c
float accel[3];
xrGetControllerAccelerationStatePico(instance, 0, accel);
// accel[0]=x, [1]=y, [2]=z in m/s²
```

#### `xrGetHeadSensorDataPico`

```c
XrResult xrGetHeadSensorDataPico(
    XrInstance instance,
    float *data);
```

Returns the HMD head sensor data (pose + IMU). Used as input to `xrGetControllerSensorDataPico` for relative coordinate calculations.

```c
float headData[16];
xrGetHeadSensorDataPico(instance, headData);
// headData[0..2] = position, [3..6] = orientation quaternion
// Pass headData to xrGetControllerSensorDataPico
```

#### `xrSetPhyControllerEnableKeyPico`

```c
XrResult xrSetPhyControllerEnableKeyPico(
    XrInstance instance,
    bool isEnable,
    XrControllerKeyMap Key);
```

Enables or disables a specific controller key. `isEnable` true enables the key, false disables it. `Key` is from `XrControllerKeyMap` enum (buttons 0-9 or touch events 128-132).

```c
// Disable the Home button
xrSetPhyControllerEnableKeyPico(instance, false, XR_CONTROLLER_KEY_HOME);

// Re-enable it
xrSetPhyControllerEnableKeyPico(instance, true, XR_CONTROLLER_KEY_HOME);
```

#### `xrSetPhyControllerEnterPairingPico`

```c
XrResult xrSetPhyControllerEnterPairingPico(
    XrInstance instance,
    int device);
```

Puts a controller into pairing mode. `device` is 0 (left) or 1 (right).

```c
// Put left controller into pairing mode
xrSetPhyControllerEnterPairingPico(instance, 0);
```

#### `xrSetPhyControllerStopPairingPico`

```c
XrResult xrSetPhyControllerStopPairingPico(
    XrInstance instance,
    int device);
```

Stops pairing mode for a controller.

```c
// Stop pairing mode for left controller
xrSetPhyControllerStopPairingPico(instance, 0);
```

#### `xrSetPhyControllerUnbindPico`

```c
XrResult xrSetPhyControllerUnbindPico(
    XrInstance instance,
    int device);
```

Unbinds a controller from the HMD.

```c
// Unbind left controller
xrSetPhyControllerUnbindPico(instance, 0);
```

#### `xrSetPhyControllerUpgradePico`

```c
XrResult xrSetPhyControllerUpgradePico(
    XrInstance instance,
    int devicetype,
    int rule,
    char* station_path_by_char,
    char* controller_path_by_char);
```

Triggers a firmware upgrade for a controller. `devicetype` is the controller type, `rule` is the upgrade rule, and the path arguments specify the firmware file paths on the station and controller.

```c
// Upgrade left controller firmware
xrSetPhyControllerUpgradePico(instance,
    0,                          // device type
    1,                          // upgrade rule
    "/sdcard/firmware/station.bin",
    "/sdcard/firmware/controller.bin");
```

### Deprecated CMC Functions (not used since 2021/07)

These functions are marked as deprecated in the header. They should not be used in new code but are documented for reference.

#### `xrSetEngineVersionPico`

```c
XrResult xrSetEngineVersionPico(XrInstance instance, const char* version);
```

Sets the engine version string. The sample app calls this on resume with `"2.8.0.1"` and on pause with `"2.7.0.0"`.

```c
xrSetEngineVersionPico(instance, "2.8.0.1");
```

#### `xrSetControllerEventCallbackPico`

```c
XrResult xrSetControllerEventCallbackPico(
    XrInstance instance,
    bool enable_controller_callback);
```

Enables/disables controller event callbacks. When enabled, `XrControllerEventChanged` events are dispatched via `xrPollEvent`.

```c
xrSetControllerEventCallbackPico(instance, true);
// Controller events will now arrive via xrPollEvent
```

#### `xrResetControllerSensorPico`

```c
XrResult xrResetControllerSensorPico(
    XrInstance instance,
    int controllerHandle);
```

Resets the sensor for a specific controller. Similar to `xrResetSensorPICO` but for a single controller.

```c
// Reset left controller sensor
xrResetControllerSensorPico(instance, 0);
```

#### `xrGetConnectDeviceMacPico`

```c
XrResult xrGetConnectDeviceMacPico(XrInstance instance, char* mac);
```

Returns the MAC address of the connected device.

```c
char mac[32];
xrGetConnectDeviceMacPico(instance, mac);
// mac = e.g. "AA:BB:CC:DD:EE:FF"
```

#### `xrStartCVControllerThreadPico`

```c
XrResult xrStartCVControllerThreadPico(
    XrInstance instance,
    int headSensorState,
    int handSensorState);
```

Starts the computer vision controller tracking thread. `headSensorState` and `handSensorState` are DOF modes: `PXR_HMD_3DOF` (0) or `PXR_HMD_6DOF` (1), `PXR_CONTROLLER_3DOF` (0) or `PXR_CONTROLLER_6DOF` (1).

The sample app calls this on resume:
```c
pxr::Pxr_StartCVControllerThread(PXR_HMD_6DOF, PXR_CONTROLLER_6DOF);
```

#### `xrStopCVControllerThreadPico`

```c
XrResult xrStopCVControllerThreadPico(
    XrInstance instance,
    int headSensorState,
    int handSensorState);
```

Stops the CV controller tracking thread. Called on pause in the sample app.

```c
xrStopCVControllerThreadPico(instance, PXR_HMD_6DOF, PXR_CONTROLLER_6DOF);
```

#### `xrResetHeadSensorForControllerPico`

```c
XrResult xrResetHeadSensorForControllerPico(XrInstance instance);
```

Resets the head sensor for controller tracking. Used to recenter the controller tracking reference frame.

```c
xrResetHeadSensorForControllerPico(instance);
```

#### `xrSetIsEnbleHomeKeyPico`

```c
XrResult xrSetIsEnbleHomeKeyPico(
    XrInstance instance,
    bool isEnable);
```

Enables or disables the Home button on the controller. When disabled, pressing Home does not trigger the system home action.

```c
// Disable Home button
xrSetIsEnbleHomeKeyPico(instance, false);
```

## PICO Extension Reference

All 17 extensions defined in `openxr_pico.h`. Enable by requesting them in `xrCreateInstance` via `XrInstanceCreateInfo::enabledExtensionNames`.

### `XR_PICO_singlepass_enable`

Enables single-pass rendering — both eyes rendered in a single draw call instead of two. Reduces draw call overhead. Used with `XrSessionBeginInfoEXT.enableSinglePass`.

### `XR_PICO_android_swapchain_ext_enable`

Allows passing user-created Android textures to the runtime via `XrSwapchainCreateInfoAndroidEXT`. Useful when integrating with existing Android rendering pipelines that manage their own textures.

### `XR_PICO_ipd`

Provides IPD get/set functions: `xrSetIPDPICO`, `xrGetIPDPICO`, `xrSetTrackingIPDEnabledPICO`, `xrGetTrackingIPDEnabledPICO`, `xrGetEyeTrackingAutoIPDPICO`.

### `XR_PICO_stencilmesh`

Provides `xrGetStencilmeshPICO` for retrieving the lens stencil mesh per eye.

### `XR_PICO_view_frustum_ext`

Provides `xrGetFrustumParametersPICO` and `xrSetFrustumParametersPICO` for view frustum control.

### `XR_PICO_configs_ext`

Provides the config system: `xrGetConfigPICO`, `xrGetConfigsPICO`, `xrSetConfigPICO`, `xrSetConfigsPICO`, `xrGetFoveationConfigPICO`.

### `XR_PICO_reset_sensor`

Provides `xrResetSensorPICO` for sensor recentering.

### `XR_PICO_android_MrcPose_function_ext_enable`

Provides `xrSetMrcPose` and `xrGetMrcPose` for MRC camera pose control.

### `XR_PICO_boundary_ext`

Provides the boundary/guardian system: `xrInvokeFunctionsPICO`, `xrSetControllerPositionPICO`, `xrBoundaryTestNodePICO`, `xrBoundaryTestPointPICO`, `xrGetBoundaryGeometryPICO`, `xrGetBoundaryDimensionsPICO`, `xrGetSeeThroughDataPICO`.

### `XR_PICO_performance_settings`

Provides `xrSetPerformanceLevelPICO` and `xrGetPerformanceLevelPICO` for CPU/GPU performance control.

### `XR_PICO_android_create_instance_ext_enable`

Allows passing a SurfaceView/ANativeWindow to `xrCreateInstance` via `XrInstanceCreateInfoAndroidPICOEXT` for rendering to an Android surface.

### `XR_PICO_view_state_ext_enable`

Provides `XrViewStatePICOEXT` — extended view state with headpose, velocity, and acceleration data chained onto `xrLocateViews` output.

### `XR_PICO_frame_end_info_ext`

Provides `XrFrameEndInfoEXT` — extended frame end info with FFR parameters, headpose, and depth. Chained onto `xrEndFrame`.

### `XR_PICO_session_begin_info_ext_enable`

Provides `XrSessionBeginInfoEXT` — extended session begin info with single-pass and color space options. Chained onto `xrBeginSession`.

### `XR_PICO_foveation_image_ext_enable`

Provides `xrGetFoveationImagePICO` for retrieving foveation image handles per swapchain/eye.

### `XR_PICO_mrc_pose_ext_enable`

Provides `xrGetMrcPosePICO` and `xrSetMrcPosePICO` — PICO-specific MRC pose functions (alternative to the `XR_PICO_android_MrcPose_function_ext_enable` variants).

### `XR_PICO_android_controller_function_ext_enable`

Provides the full controller API — all `xr*Pico` controller functions (connection state, info, vibration, sensor data, touch/grip values, pairing, unbinding, key enable, CV thread control, etc.).

## Sample App Walkthrough (HelloXR)

The sample demonstrates a complete OpenXR application lifecycle with PICO extensions.

### Lifecycle

1. **`android_main`** — entry point. Attaches JVM, creates `AndroidAppState`, sets up command handler
2. **`APP_CMD_RESUME`** — calls `Pxr_SetEngineVersion("2.8.0.1")` and `Pxr_StartCVControllerThread(6DOF, 6DOF)`
3. **`xrInitializeLoaderKHR`** — initializes the OpenXR loader with Android VM/context
4. **`CreateInstance`** — creates `XrInstance` with enabled extensions
5. **`InitializeSystem`** — gets system ID via `xrGetSystem`
6. **`InitializeSession`** — creates session, calls `xrBeginSession` with `XrSessionBeginInfoEXT` (single-pass, color space)
7. **`CreateSwapchains`** — creates swapchains for both eyes
8. **Render loop** — `PollEvents` → `PollActions` → `RenderFrame` (with `XrFrameEndInfoEXT` for FFR)
9. **`APP_CMD_PAUSE`** — calls `Pxr_SetEngineVersion("2.7.0.0")` and `Pxr_StopCVControllerThread(6DOF, 6DOF)`

### Controller Initialization

The `pController.cpp` file shows the pattern for loading all controller function pointers:

```c
void InitializeGraphicDeivce(XrInstance mInstance) {
    mControllerInstance = mInstance;
    xrGetInstanceProcAddr(mInstance, "xrGetControllerConnectionStatePico",
        reinterpret_cast<PFN_xrVoidFunction*>(&pfnXrGetControllerConnectionStatePico));
    // ... repeat for all 20+ controller functions
}
```

Each wrapper function null-checks the pointer before calling:

```c
int Pxr_GetControllerConnectionState(uint8_t handle, uint8_t *status) {
    if (pfnXrGetControllerConnectionStatePico != nullptr)
        return pfnXrGetControllerConnectionStatePico(mControllerInstance, handle, status);
    return -1;
}
```

### Graphics Plugin Selection

On Android, the graphics plugin is selected via system property:

```
adb shell setprop debug.xr.graphicsPlugin OpenGLES
adb shell setprop debug.xr.graphicsPlugin Vulkan
```

Both OpenGL ES 3.2 and Vulkan 1.1 plugins are included in the sample.

### AndroidManifest Requirements

```xml
<meta-data android:name="pvr.app.type" android:value="vr" />
<uses-feature android:name="android.hardware.vr.headtracking" android:required="true" />
```

The `pvr.app.type` metadata tells the Pico runtime to launch the app in VR mode. Without it, the app runs as a normal 2D Android app.
