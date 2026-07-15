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

The 2.0.1 release is a major update over v1.0.13. It adds a dedicated `openxr_pico.h` header with extensive Pico-specific extensions for controller management, boundary/guardian system, eye tracking, foveated rendering, see-through camera, performance control, and more.

## Key Changes from v1.0.13

- OpenXR API bumped from 1.0.13 to 1.0.14
- Added `openxr_pico.h` with 17 PICO-specific extensions
- Loader library size increased significantly (arm64: 1,018 KB to 1,571 KB)
- Sample app APK grew from 3.9 MB to 4.8 MB
- Controller API: full physical controller info, vibration, sensor data, touch values, grip values, pairing/unbinding, key enable/disable
- Added `pController.cpp` / `pController.h` in sample for controller handling
- Added single-pass rendering support (`XR_PICO_singlepass_enable`)
- Added Android swapchain extension for user-created textures
- Added view state extension with headpose, velocity, acceleration data
- Added frame end info extension with FFR parameters and headpose
- Added session begin info with color space and single-pass options
- Added MRC (Mixed Reality Capture) pose APIs
- Added config system for runtime parameters (render size, FPS, neck model, etc.)
- Added sensor reset API
- Added stencil mesh API
- Added view frustum get/set
- Added performance level settings

## Integration

Same as v1.0.13 but also include `openxr_pico.h` after `openxr.h` to access Pico-specific functions:

```c
#include "openxr/openxr.h"
#include "openxr/openxr_pico.h"
```

## Controller Key Map

The `XrControllerKeyMap` enum defines all controller inputs:

- **Buttons**: Home, A/X, B/Y, Back, Trigger, Volume Up/Down, Rocker, Grip, Touchpad
- **Touch events**: A/X, B/Y, Rocker, Trigger, Thumb

## Event System

Pico-specific events added in v2.0.1:

- `XrEventDataSeethroughStateChanged` — see-through camera on/off
- `XrEventDataKeyEvent` — controller key press/release
- `XrControllerEventChanged` — controller connect/disconnect, handness, battery, etc.
- `XrEventDataHardIPDStateChanged` — physical IPD adjustment
- `XrEventDataFoveationLevelChanged` — FFR level changed
- `XrEventDataFrustumChanged` — view frustum changed
- `XrEventDataRenderTextureChanged` — render texture size changed
- `XrEventDataTargetFrameRateChanged` — target FPS changed
- `XrEventDataMrcStatusChanged` — MRC enabled/disabled
- `XrEventDataRefreshRateChanged` — display refresh rate changed
