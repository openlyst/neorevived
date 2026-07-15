---
section: Pico Unreal Engine 4.27 SDK
order: 5
type: table
rows:
  - key: SDK Name
    value: Pico Unreal SDK
  - key: Version
    value: UE 4.27
  - key: Platform
    value: Unreal Engine 4.27 (Android)
  - key: License
    value: Pico SDK License Agreement (<code>https://developer.pico-interactive.com/sdk</code>)
  - key: Package File
    value: <code>UE_4.27.zip</code> (103.7 MB)
  - key: Native Libraries
    value: <code>libpvr.so</code>, <code>libPvr_UESDKExt2.so</code> (bundled inside the plugin)
  - key: Rendering
    value: OpenGL ES, Vulkan (via UE4 RHI settings)
  - key: Tracking
    value: 6DOF head and controller tracking, 3DOF fallback
  - key: Features
    value: Motion controller support, head tracking, boundary system, FFR, see-through camera, hand tracking, eye tracking (if hardware present)
  - key: Config Integration
    value: Uses <code>xrSetConfigPICO</code> / <code>xrGetConfigPICO</code> with <code>UNREAL_VERSION</code> and <code>Platform.UNREAL</code> enum values
  - key: Download
    value: Not available for download on this site
---

## Overview

The Pico Unreal SDK provides Unreal Engine 4.27 plugins for Pico Neo 2 development. It includes native libraries, Blueprint nodes, and C++ bindings for the Pico runtime.

## Installation

1. Extract the `UE_4.27.zip` archive
2. Copy the Pico plugin folder into your project's `Plugins/` directory
3. Enable the Pico plugin in **Edit > Plugins**
4. Configure Android project settings (minimum SDK 26, arm64-v8a ABI)
5. Set up XR settings in project config to use the Pico runtime

## Notes

This is the largest SDK package at 103.7 MB. It includes prebuilt native libraries for both arm64-v8a and armeabi-v7a, plus UE4-specific shader and asset files.
