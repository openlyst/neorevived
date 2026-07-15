---
section: Pico OpenXR Mobile SDK v1.0.13
order: 1
type: table
rows:
  - key: SDK Name
    value: Pico OpenXR Mobile SDK
  - key: Version
    value: 1.0.13
  - key: OpenXR API Version
    value: 1.0.13 (Khronos OpenXR 1.0)
  - key: Platform
    value: Android (arm64-v8a, armeabi-v7a)
  - key: License
    value: Pico SDK License Agreement (<code>https://developer.pico-interactive.com/sdk</code>), OpenXR headers under Apache 2.0
  - key: Loader Library
    value: <code>libopenxr_loader.so</code> — arm64-v8a (1,018 KB), armeabi-v7a (506 KB)
  - key: Headers
    value: <code>openxr.h</code>, <code>openxr_platform.h</code>, <code>openxr_platform_defines.h</code>, <code>openxr_reflection.h</code>
  - key: PICO Extensions
    value: None in v1.0.13 — no <code>openxr_pico.h</code> header. Uses standard Khronos OpenXR 1.0 API only
  - key: Sample App
    value: HelloXR — Gradle project with CMake native build, OpenGL ES and Vulkan graphics plugins, prebuilt APK included
  - key: Build System
    value: Android Gradle + CMake (NDK), <code>AndroidPrebuilt/jni/Android.mk</code> for NDK integration
  - key: Min Android SDK
    value: 26 (Android 8.0)
  - key: Manifest Requirements
    value: <code>&lt;meta-data android:name="pvr.app.type" android:value="vr" /&gt;</code> in application tag
  - key: Rendering Backends
    value: OpenGL ES 3.2, Vulkan 1.1 (defined via <code>XR_USE_GRAPHICS_API_OPENGL_ES</code> and <code>XR_USE_GRAPHICS_API_VULKAN</code>)
  - key: Tracking
    value: Standard OpenXR <code>xrLocateViews</code> / <code>xrLocateSpace</code> for head and controller poses
  - key: Download
    value: Not available for download on this site. Originally distributed as <code>Pico_OpenXR_Mobile_SDK_1.0.13.zip</code> (2.8 MB)
---

## Overview

This is the first release of Pico's OpenXR Mobile SDK. It provides a standard Khronos OpenXR 1.0 loader with no Pico-specific extensions — apps use the core OpenXR API for rendering, tracking, and input.

## SDK Contents

```
OpenXR/
├── Apk/
│   └── HelloXR.apk          (3.8 MB — prebuilt sample)
├── Include/openxr/
│   ├── openxr.h              (106 KB — core OpenXR 1.0 API)
│   ├── openxr_platform.h     (49 KB — platform-specific definitions)
│   ├── openxr_platform_defines.h  (4.5 KB — platform macros)
│   └── openxr_reflection.h   (58 KB — reflection utilities)
├── Libs/Android/
│   ├── arm64-v8a/
│   │   └── libopenxr_loader.so  (1,018 KB)
│   └── armeabi-v7a/
│       └── libopenxr_loader.so  (506 KB)
├── Projects/AndroidPrebuilt/
│   └── jni/Android.mk        (NDK integration makefile)
└── Sample/HelloXR/           (Gradle + CMake sample project)
```

## Integration

### Step 1 — Copy Loader Library

Copy `libopenxr_loader.so` for your target ABI into your project:

```
app/src/main/jniLibs/arm64-v8a/libopenxr_loader.so
app/src/main/jniLibs/armeabi-v7a/libopenxr_loader.so
```

### Step 2 — Add Include Paths

In your `CMakeLists.txt`:

```cmake
include_directories(${CMAKE_SOURCE_DIR}/../OpenXR/Include)
```

### Step 3 — Link Against Loader

```cmake
LINK_DIRECTORIES(${CMAKE_SOURCE_DIR}/../OpenXR/Libs/Android/${ANDROID_ABI})
target_link_libraries(hello_xr openxr_loader android EGL GLESv3 vulkan log)
```

### Step 4 — Define Platform Macros

```cmake
add_definitions(-DXR_USE_PLATFORM_ANDROID)
add_definitions(-DXR_USE_GRAPHICS_API_OPENGL_ES)
# or for Vulkan:
add_definitions(-DXR_USE_GRAPHICS_API_VULKAN)
```

### Step 5 — AndroidManifest

```xml
<application>
    <meta-data android:name="pvr.app.type" android:value="vr" />
    <!-- ... -->
</application>
```

The `pvr.app.type` metadata is required for the Pico runtime to launch the app in VR mode.

### Step 6 — NDK Integration (Alternative)

For pure NDK projects (no Gradle), use the `AndroidPrebuilt/jni/Android.mk` makefile:

```makefile
include $(CLEAR_VARS)
LOCAL_MODULE := openxr_loader
LOCAL_SRC_FILES := $(OPENXR_PATH)/Libs/Android/$(TARGET_ARCH_ABI)/libopenxr_loader.so
include $(PREBUILT_SHARED_LIBRARY)
```

## Standard OpenXR API Usage

Since v1.0.13 has no Pico extensions, all functionality comes from the standard Khronos OpenXR 1.0 API.

### Instance Creation

```c
XrInstanceCreateInfo createInfo = {};
createInfo.type = XR_TYPE_INSTANCE_CREATE_INFO;
createInfo.applicationInfo.applicationName = "MyApp";
createInfo.applicationInfo.apiVersion = XR_API_VERSION_1_0;
// No PICO extensions to enable in v1.0.13
createInfo.enabledExtensionCount = 0;

XrInstance instance;
xrCreateInstance(&createInfo, &instance);
```

### Session Creation

```c
XrGraphicsRequirementsOpenGLESKHR gfxReq = {};
gfxReq.type = XR_TYPE_GRAPHICS_REQUIREMENTS_OPENGL_ES_KHR;
xrGetOpenGLESGraphicsRequirementsKHR(instance, systemId, &gfxReq);

XrSessionCreateInfo sessionCI = {};
sessionCI.type = XR_TYPE_SESSION_CREATE_INFO;
sessionCI.systemId = systemId;
sessionCI.next = &graphicsBinding; // XrGraphicsBindingOpenGLESAndroidKHR

XrSession session;
xrCreateSession(instance, &sessionCI, &session);
```

### Rendering Loop

```c
while (running) {
    XrFrameWaitInfo frameWaitInfo = {XR_TYPE_FRAME_WAIT_INFO};
    XrFrameState frameState = {XR_TYPE_FRAME_STATE};
    xrWaitFrame(session, &frameWaitInfo, &frameState);

    XrFrameBeginInfo frameBeginInfo = {XR_TYPE_FRAME_BEGIN_INFO};
    xrBeginFrame(session, &frameBeginInfo);

    // xrLocateViews for eye poses
    XrViewLocateInfo viewLocateInfo = {XR_TYPE_VIEW_LOCATE_INFO};
    viewLocateInfo.viewConfigurationType = XR_VIEW_CONFIGURATION_TYPE_PRIMARY_STEREO;
    viewLocateInfo.displayTime = frameState.predictedDisplayTime;
    viewLocateInfo.space = appSpace;
    xrLocateViews(session, &viewLocateInfo, &viewState, 2, &viewCount, views);

    // Render to swapchain images
    // ...

    XrFrameEndInfo frameEndInfo = {XR_TYPE_FRAME_END_INFO};
    frameEndInfo.displayTime = frameState.predictedDisplayTime;
    frameEndInfo.environmentBlendMode = XR_ENVIRONMENT_BLEND_MODE_OPAQUE;
    // No XrFrameEndInfoEXT in v1.0.13 — no FFR support
    xrEndFrame(session, &frameEndInfo);
}
```

### Input / Controller Tracking

Controllers are accessed via standard OpenXR interaction profiles and actions:

```c
// Suggested interaction profile for Pico Neo 2 controllers
XrPath profilePath;
xrStringToPath(instance, "/interaction_profiles/pico/controller", &profilePath);

// Actions for buttons, trigger, grip, thumbstick, etc.
XrActionSet actionSet;
XrActionCreateInfo actionCI = {XR_TYPE_ACTION_CREATE_INFO};
actionCI.actionType = XR_ACTION_TYPE_BOOLEAN_INPUT;
strcpy(actionCI.actionName, "trigger_click");
strcpy(actionCI.localizedActionName, "Trigger Click");
xrCreateAction(actionSet, &actionCI, &triggerAction);
```

### Space Tracking

```c
XrReferenceSpaceCreateInfo spaceCI = {XR_TYPE_REFERENCE_SPACE_CREATE_INFO};
spaceCI.referenceSpaceType = XR_REFERENCE_SPACE_TYPE_STAGE; // or LOCAL
spaceCI.poseInReferenceSpace.orientation.w = 1.0f;
xrCreateReferenceSpace(session, &spaceCI, &appSpace);

// Locate controller in space
XrSpaceLocation spaceLocation = {XR_TYPE_SPACE_LOCATION};
xrLocateSpace(controllerSpace, appSpace, predictedDisplayTime, &spaceLocation);
// spaceLocation.pose.position and .orientation contain the controller pose
```

## Sample App (HelloXR)

### Build Configuration

- **Gradle**: 3.6.1, compileSdk 29, minSdk 26, targetSdk 26
- **CMake**: 3.10.2, clang toolchain, c++_static STL
- **ABIs**: armeabi-v7a, arm64-v8a
- **Graphics**: OpenGL ES 3.2 and Vulkan 1.1 (selectable via `debug.xr.graphicsPlugin` system property)
- **App ID**: `com.khronos.hello_xr`

### Sample Structure

```
HelloXR/
├── CMakeLists.txt          — builds hello_xr shared library
├── build.gradle            — Android Gradle build config
├── hello_xr/               — source code
│   ├── main.cpp            — android_main entry point
│   ├── openxr_program.cpp  — OpenXR program implementation
│   ├── graphicsplugin.h    — graphics plugin interface
│   ├── platformplugin.h    — platform plugin interface
│   ├── pch.h               — precompiled header
│   └── common.h            — shared utilities
├── openxr_loader/          — prebuilt loader libs per ABI
└── settings.gradle         — Gradle settings
```

### Key Differences from v2.0.1 Sample

- No `pController.cpp` / `pController.h` — no PICO controller API
- No `Pxr_SetEngineVersion` or `Pxr_StartCVControllerThread` calls
- No `XrSessionBeginInfoEXT` — standard `xrBeginSession` only
- No `XrFrameEndInfoEXT` — standard `xrEndFrame` only
- No `XrViewStatePICOEXT` — standard `xrLocateViews` only
- APK is 3.8 MB vs 4.8 MB in v2.0.1

## Limitations

- No Pico-specific extensions (no foveated rendering, eye tracking, boundary, or controller info APIs)
- No `openxr_pico.h` header
- Uses OpenXR 1.0 patch 13, which is an older Khronos revision
- Controller input must use standard OpenXR action system only
- No performance level control
- No sensor reset API
- No see-through camera access
- No MRC support
- No config system for runtime parameters

## License

```
Copyright (C), 2015-2021, PicoVR. Co., Ltd.

Your use of this SDK or tool is subject to the Pico SDK License Agreement,
available at https://developer.pico-interactive.com/sdk
```

OpenXR headers are under the Apache 2.0 License (Khronos Group).
