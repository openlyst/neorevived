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

The Pico Unreal SDK provides Unreal Engine 4.27 plugins for Pico Neo 2 development. It includes native libraries, Blueprint nodes, and C++ bindings for the Pico runtime. The SDK contains four plugins covering XR rendering/tracking, online subsystem, enterprise APIs, and spatial audio.

## Installation

1. Extract the `UE_4.27.zip` archive
2. Copy the plugin folders into your project's `Plugins/` directory
3. Enable the Pico plugins in **Edit > Plugins**
4. Configure Android project settings (minimum SDK 26, arm64-v8a ABI)
5. Set up XR settings in project config to use the Pico runtime
6. Set `DefaultPICOXR.ini` in `Config/` for HMD settings

## Plugin Structure

```
UE_4.27/Plugins/
├── PICOXR/                          — Main XR rendering/tracking plugin
│   ├── PICOXR.uplugin
│   ├── Config/DefaultPICOXR.ini     — HMD config defaults
│   ├── Resources/SceneAnchorData.json
│   └── Source/
│       ├── PICOXRHMD/               — HMD device implementation
│       │   ├── PXR_HMD.cpp          (106 KB — main HMD device class)
│       │   ├── PXR_HMDFunctionLibrary.cpp — Blueprint function library
│       │   ├── PXR_BoundarySystem.cpp — Boundary/guardian system
│       │   ├── PXR_StereoLayer.cpp  — Stereo layer composition
│       │   ├── PXR_Splash.cpp       — Splash screen rendering
│       │   ├── PXR_EventManager.cpp — Event polling and dispatch
│       │   ├── PXR_PluginWrapper.cpp — Native plugin P/Invoke wrapper
│       │   ├── PXR_HMDRenderBridge*.cpp — OpenGL/Vulkan render bridges
│       │   ├── PXR_DynamicResolutionState.cpp — Dynamic resolution
│       │   └── PXR_GameFrame.cpp    — Frame timing logic
│       ├── PICOXREyeTracker/         — Eye tracking subsystem
│       └── PICOXREditor/             — Editor tools and settings
├── OnlineSubsystemPICO/             — Online services plugin
│   ├── OnlineSubsystemPico.uplugin
│   └── Source/OnlineSubsystemPico/
│       ├── OnlinePicoFunctionLibrary.h  (74 KB — Blueprint function library)
│       ├── OnlinePicoFunctionLibrary.cpp (54 KB)
│       ├── OnlineSubsystemPico.cpp      (17 KB — subsystem implementation)
│       ├── OnlineSubsystemPicoManager.cpp (113 KB)
│       ├── OnlineSessionInterfacePico.cpp (113 KB — session/matchmaking)
│       ├── Pico_Achievements.cpp        — Achievement system
│       ├── Pico_IAP.cpp                 — In-app purchases
│       ├── Pico_Leaderboards.cpp        — Leaderboards
│       ├── Pico_Matchmaking.cpp         — Matchmaking
│       ├── Pico_Room.cpp                — Room system
│       ├── Pico_User.cpp                — User/identity
│       ├── Pico_Challenges.cpp          — Challenges
│       ├── Pico_AssetFile.cpp           — Asset file download
│       ├── Pico_Highlight.cpp           — Highlight system
│       ├── Pico_Notification.cpp        — Notification system
│       ├── Pico_Speech.cpp              — Speech recognition
│       ├── Pico_Sport.cpp               — Sport/fitness data
│       ├── Pico_CloudStorage.cpp        — Cloud storage
│       ├── Pico_Compliance.cpp          — Compliance/Kiosk mode
│       ├── Pico_DataStore.cpp           — Data store
│       ├── Pico_Networking.cpp          — Networking
│       └── PicoPresenceInterface.cpp    — Presence
├── PICOEnterprise/                  — Enterprise/ToB functions
│   ├── PICOEnterprise.uplugin
│   ├── Libs/Include/
│   │   ├── PXR_EnterpriseInterface.h  — Native enterprise API
│   │   └── PXR_EnterpriseTypes.h      — Enterprise type definitions
│   └── Source/PICOEnterprise/
│       ├── PICO_EnterpriseFunctionLibrary.h  (168 KB — Blueprint functions)
│       ├── PICO_EnterpriseFunctionLibrary.cpp (162 KB)
│       └── PICO_EnterpriseInterfaceWrapper.cpp
└── PICOSpatialAudio/                — Spatial audio plugin
    ├── PicoSpatialAudio.uplugin
    └── Source/PicoSpatialAudio/
        ├── include/pxr_audio_spatializer.h  — Spatializer API
        ├── PxrAudioSpatializerApi.h         — API definitions
        ├── PicoAmbisoncsRenderer.cpp        — Ambisonics rendering
        ├── PxrAudioSpatializerSpatialization.cpp — Sound spatialization
        ├── PxrAudioSpatializerReverb.cpp    — Reverb effects
        ├── PxrAudioSpatializerListener.cpp  — Listener management
        ├── PicoSpatialAudioSceneGeometryComponent.cpp — Scene geometry
        └── PicoSpatializationSourceSettings.cpp — Source settings
```

## PICOXR Plugin

The main XR plugin. Implements the UE4 `IStereoRenderingDevice` and `FXRRenderBridge` interfaces.

### Key Classes

#### `PXR_HMD` (`PXR_HMD.cpp`, 106 KB)
The core HMD device implementation. Extends `IStereoRenderingDevice`. Handles:
- Stereo rendering (left/right eye textures)
- Head pose tracking (6DOF/3DOF)
- Frame timing (`xrWaitFrame`/`xrBeginFrame`/`xrEndFrame`)
- Swapchain management
- Layer composition (via `PXR_StereoLayer`)
- FFR (fixed foveated rendering)
- Single-pass stereo
- Dynamic resolution
- Splash screen rendering
- MRC (Mixed Reality Capture) via `PICO_MRCSceneCapture2D`

#### `PXR_HMDFunctionLibrary` (`PXR_HMDFunctionLibrary.cpp`)
Blueprint-callable function library exposing Pico-specific functions to UE4 Blueprints and C++:
- `PXR_GetHMDInfo` — Get HMD device info
- `PXR_GetControllerInfo` — Get controller state
- `PXR_SetFFRLevel` — Set foveated rendering level
- `PXR_GetEyeTrackingData` — Get eye tracking gaze data
- `PXR_BoundaryTest*` — Boundary proximity tests
- `PXR_SeeThroughCamera*` — See-through camera control
- `PXR_SetTrackingOrigin` — Set tracking origin type
- `PXR_ResetSensor` — Sensor recentering

#### `PXR_BoundarySystem` (`PXR_BoundarySystem.cpp`)
Boundary/guardian system implementation. Provides geometry queries, node/point tests, and visibility control.

#### `PXR_EventManager` (`PXR_EventManager.cpp`)
Polls Pico runtime events and dispatches them to UE4 delegates. Handles device events, controller events, and boundary events.

#### `PXR_PluginWrapper` (`PXR_PluginWrapper.cpp`)
Wraps native Pico SDK function calls. Loads function pointers from `libpvr.so` and `libPvr_UESDKExt2.so` at runtime.

### Config (`DefaultPICOXR.ini`)

```ini
[PICOXR]
; HMD settings
bEnabled=True
bUseFFR=True
FFRLevel=1
bUseSinglePass=False
```

## OnlineSubsystemPICO Plugin

Implements UE4's `IOnlineSubsystem` interface for Pico platform services. Provides Blueprint and C++ access to:

### Modules

| Module | Description |
|---|---|
| **Identity** | User login, authentication, profile |
| **Session** | Create/find/update game sessions, matchmaking |
| **Achievements** | Unlock/query achievements |
| **Leaderboards** | Submit/query leaderboard scores |
| **Friends** | Friends list management |
| **Presence** | User presence and invites |
| **IAP** | In-app purchases and subscriptions |
| **Room** | Persistent room system |
| **Challenges** | Time-limited challenges |
| **Notification** | Push notifications |
| **Speech** | Speech-to-text |
| **Sport** | Fitness/sport data tracking |
| **CloudStorage** | Cloud save data |
| **Compliance** | Kiosk mode and enterprise compliance |
| **AssetFile** | Asset file download system |
| **Highlight** | Screenshot/recording highlights |
| **Networking** | P2P networking |
| **DataStore** | Key-value data store |

### `OnlinePicoFunctionLibrary` (74 KB header)
The main Blueprint function library. Exposes all platform APIs as static C++ functions callable from Blueprints. Key function groups:

- **User**: `GetLoggedInUser`, `GetUserInfo`, `Login`, `Logout`
- **Session**: `CreateSession`, `FindSessions`, `JoinSession`, `LeaveSession`
- **Achievement**: `UnlockAchievement`, `GetAchievements`
- **Leaderboard**: `WriteLeaderboardScore`, `ReadLeaderboard`
- **IAP**: `GetProducts`, `PurchaseProduct`, `QueryOrder`
- **Matchmaking**: `StartMatchmaking`, `CancelMatchmaking`
- **Room**: `CreateRoom`, `JoinRoom`, `LeaveRoom`, `GetRoomList`
- **Notification**: `RegisterNotification`, `SendNotification`

## PICOEnterprise Plugin

Enterprise (ToB) functions for kiosk mode, device management, and controlled deployments.

### Key API (`PICO_EnterpriseFunctionLibrary.h`, 168 KB)

- **Device Control**: Reboot, shutdown, factory reset
- **App Management**: Silent install/uninstall, app whitelist
- **System Settings**: WiFi, Bluetooth, brightness, volume, USB mode
- **Home Key**: Configure home button behavior per event type
- **Screen/Sleep**: Screen-off delay, sleep delay
- **System Switches**: Toggle USB, auto-sleep, system update, cast, eye protection, calibration, etc.
- **Kiosk Mode**: Lock device to single app, disable UI elements
- **Calibration**: Global/auto calibration control

Uses `PXR_EnterpriseInterface.h` native API with functions like:
- `PXR_EnterpriseSetHomeKey`
- `PXR_EnterpriseControlDevice`
- `PXR_EnterpriseSwitchSet`
- `PXR_EnterpriseSetScreenOffDelay`
- `PXR_EnterpriseSetSleepDelay`
- `PXR_EnterpriseSetUSBConfigMode`

## PICOSpatialAudio Plugin

Spatial audio rendering with ambisonics support.

### Key Components

- **`PxrAudioSpatializerContextSingleton`** — Main audio context, manages listener and sources
- **`PicoAmbisonicsRenderer`** — Ambisonics decoding and rendering
- **`PxrAudioSpatializerSpatialization`** — Per-source spatialization processing
- **`PxrAudioSpatializerReverb`** — Reverb and reflection effects
- **`PxrAudioSpatializerListener`** — Listener position/orientation tracking
- **`PicoSpatialAudioSceneGeometryComponent`** — Scene geometry for acoustic simulation
- **`PicoSpatializationSourceSettings`** — Per-source spatialization settings (directivity, distance attenuation)
- **`PicoSpatialAudioSceneMaterialSettings`** — Material acoustic properties

### API (`pxr_audio_spatializer.h`, 61 KB)

Native C API for spatial audio processing:
- `Pxr_Audio_Spatializer_Init` — Initialize spatializer
- `Pxr_Audio_Spatializer_Destroy` — Cleanup
- `Pxr_Audio_Spatializer_SetListenerPose` — Set listener position/orientation
- `Pxr_Audio_Spatializer_SetSourcePose` — Set source position/orientation
- `Pxr_Audio_Spatializer_SetSourceDirectivity` — Set source directivity pattern
- `Pxr_Audio_Spatializer_SetReverb` — Configure reverb
- `Pxr_Audio_Spatializer_Process` — Process audio buffer

## Rendering

The SDK supports both OpenGL ES and Vulkan rendering via separate render bridge implementations:
- `PXR_HMDRenderBridge_OpenGL.cpp` — OpenGL ES render bridge
- `PXR_HMDRenderBridge_Vulkan.cpp` — Vulkan render bridge

The render bridge handles swapchain creation, texture sharing, and frame submission to the Pico runtime.

## Notes

This is the largest SDK package at 103.7 MB. It includes prebuilt native libraries for both arm64-v8a and armeabi-v7a, plus UE4-specific shader and asset files. The `OnlinePicoFunctionLibrary.h` (74 KB) and `PICO_EnterpriseFunctionLibrary.h` (168 KB) are the largest single API headers, reflecting the extensive platform service surface.
