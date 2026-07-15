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

## Integration

1. Copy `libopenxr_loader.so` for your target ABI into `app/src/main/jniLibs/<abi>/`
2. Add the `Include/` directory to your CMake include paths
3. Link against `openxr_loader` in your `CMakeLists.txt`
4. Add `pvr.app.type` metadata to your `AndroidManifest.xml`
5. Define `XR_USE_PLATFORM_ANDROID` and your graphics API defines (`XR_USE_GRAPHICS_API_OPENGL_ES` or `XR_USE_GRAPHICS_API_VULKAN`)

## Limitations

- No Pico-specific extensions (no foveated rendering, eye tracking, boundary, or controller info APIs)
- No `openxr_pico.h` header
- Uses OpenXR 1.0 patch 13, which is an older Khronos revision
