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

The PicoVR Unity SDK provides Unity bindings for the Pico Neo 2 runtime. It wraps the native Pico OpenXR and Pico Platform APIs into C# components and prefabs for use in Unity projects.

## Installation

1. Choose the correct package for your target architecture (32-bit or 64-bit)
2. In Unity, go to **Assets > Import Package > Custom Package**
3. Select the `.unitypackage` file and import all assets
4. Configure player settings for Android (XR settings, minimum API level 26, etc.)
5. Add the `PicoVR` prefab or SDK components to your scene

## 32-bit vs 64-bit

Two separate packages are provided:
- **32-bit** (`armeabi-v7a`) — for older compatibility
- **64-bit** (`arm64-v8a`) — recommended for Pico Neo 2 (SDM845 is 64-bit)

Use the 64-bit package unless you have a specific reason to target 32-bit.
