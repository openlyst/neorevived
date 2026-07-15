---
section: SDK Overview & Notes
order: 0
type: freeform
---

## Pico Neo 2 SDKs

The Pico Neo 2 shipped with several SDKs covering different development approaches:

- **OpenXR Mobile SDK** — native C/C++ development using the Khronos OpenXR standard. Two versions available: v1.0.13 (core OpenXR only) and v2.0.1 (adds 17 Pico-specific extensions)
- **PicoVR Unity SDK** — Unity plugin with C# bindings for the Pico runtime. Version 2.8.12 available in both 32-bit and 64-bit builds
- **PicoXR Platform SDK** — Unity plugin for Pico platform services (accounts, store, leaderboards, IAP)
- **Unreal Engine 4.27 SDK** — UE4 plugin with Blueprint and C++ bindings
- **Enterprise Assistant** — Windows PC tool for device management and debugging

## No Downloads

These SDKs are not available for download on this site. They were originally distributed by Pico Interactive through their developer portal at `https://developer.pico-interactive.com/sdk`. The Pico SDK License Agreement applies to all of them.

## OpenXR vs PicoVR Unity SDK

The OpenXR SDK is for native development and gives you direct access to the OpenXR API plus Pico extensions. The Unity SDK wraps the same underlying runtime but provides Unity-friendly C# components and editor integration. For most app development on the Neo 2, the Unity SDK is the easier path. The OpenXR SDK is better for engine porting or custom rendering pipelines.

## Version Differences (OpenXR)

| Feature | v1.0.13 | v2.0.1 |
|---|---|---|
| OpenXR API | 1.0.13 | 1.0.14 |
| `openxr_pico.h` | No | Yes |
| Pico extensions | 0 | 17 |
| Controller API | Standard OpenXR | Full Pico controller API |
| Eye tracking | No | Yes |
| FFR | No | Yes |
| Boundary system | No | Yes |
| See-through camera | No | Yes |
| Performance settings | No | Yes |
| Sensor reset | No | Yes |
| Stencil mesh | No | Yes |
| MRC | No | Yes |
| Config system | No | Yes |

If you're starting new development, use v2.0.1. The v1.0.13 release is only useful if you need to maintain compatibility with an older codebase that doesn't use Pico extensions.
