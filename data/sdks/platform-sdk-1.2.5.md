---
section: PicoXR Platform SDK 1.2.5
order: 4
type: table
rows:
  - key: SDK Name
    value: PicoXR Platform SDK
  - key: Version
    value: 1.2.5 (Build 81)
  - key: Platform
    value: Unity (Android)
  - key: License
    value: Pico SDK License Agreement (<code>https://developer.pico-interactive.com/sdk</code>)
  - key: Package File
    value: <code>PicoXR_Platform_SDK-1.2.5_B81.zip</code> (7.6 MB)
  - key: Purpose
    value: Platform-level services — user identity, entitlements, leaderboards, achievements, multiplayer matchmaking, IAP (in-app purchases), friends list
  - key: Download
    value: Not available for download on this site
---

## Overview

The PicoXR Platform SDK is a Unity package (`com.unity.xr.picoxr`) that provides access to Pico platform-level services. It is separate from the rendering/tracking SDK and wraps native APIs via P/Invoke into `UnityPicoVR.aar` and `Pvr_UnitySDK` native libraries. The main API surface is in `PXR_Plugins.cs` under the `Unity.XR.PXR` namespace.

## Relationship to Other SDKs

- **PicoVR Unity SDK** handles rendering, tracking, and controller input
- **PicoXR Platform SDK** handles platform services (accounts, store, social, device management)
- Both can be used together in the same Unity project

## Package Structure

```
PicoXR_Platform_SDK-1.2.5_B81/
├── package.json                    — UPM package manifest
├── Runtime/
│   ├── Scripts/
│   │   ├── PXR_Plugins.cs          — Main API (73 KB, P/Invoke + Android JNI)
│   │   ├── PXR_Manager.cs          — Central manager component
│   │   ├── PXR_Loader.cs           — XR subsystem loader
│   │   ├── PXR_Settings.cs         — SDK settings
│   │   ├── PXR_ProjectSetting.cs   — Project-level settings
│   │   ├── PXR_PlatformSetting.cs  — Platform settings (entitlement)
│   │   ├── PXR_Usages.cs           — XR input usages
│   │   ├── PXR_SQPLoader.cs        — SQP (Scene Quick Preview) loader
│   │   ├── PXR_OverlayManager.cs   — Overlay layer management
│   │   ├── PXR_PassThroughSystem.cs — Pass-through subsystem
│   │   ├── Achievement/            — Achievement API and models
│   │   ├── Controller/             — Controller battery, key effects, loader
│   │   ├── Features/               — Boundary, eye tracking, FFR, input, overlay, pass-through, screen fade
│   │   ├── Payment/                — Payment SDK (IAP)
│   │   └── Utils/                  — UI event system, OBJ importer
│   ├── Android/                    — Native libraries
│   │   ├── UnityPicoVR.aar
│   │   ├── pvrSDK-release.aar
│   │   ├── Pico_PaymentSDK_Android_V1.0.34.aar
│   │   ├── achievenment.jar
│   │   ├── initServer.jar
│   │   ├── tobserviceclient.jar
│   │   ├── gson-2.8.0.jar
│   │   └── LitJson.dll
│   └── UnitySubsystemsManifest.json
├── Editor/                         — Unity editor extensions and build tools
└── Assets/Payment/                 — Payment demo scenes and prefabs
```

## Dependencies

```json
{
  "com.unity.xr.management": "3.2.16",
  "com.unity.ugui": "1.0.0",
  "com.unity.subsystemregistration": "1.0.6",
  "com.unity.xr.interaction.toolkit": "0.9.4-preview"
}
```

Requires Unity 2019.4+.

## Enums

### SystemInfoEnum

Device system information query types.

| Value | Name | Description |
|---|---|---|
| 0 | `ELECTRIC_QUANTITY` | Battery level |
| 1 | `PUI_VERSION` | Pico UI version |
| 2 | `EQUIPMENT_MODEL` | Device model |
| 3 | `EQUIPMENT_SN` | Equipment serial number |
| 4 | `CUSTOMER_SN` | Customer serial number |
| 5 | `INTERNAL_STORAGE_SPACE_OF_THE_DEVICE` | Internal storage space |
| 6 | `DEVICE_BLUETOOTH_STATUS` | Bluetooth status |
| 7 | `BLUETOOTH_NAME_CONNECTED` | Connected Bluetooth name |
| 8 | `BLUETOOTH_MAC_ADDRESS` | Bluetooth MAC address |
| 9 | `DEVICE_WIFI_STATUS` | WiFi status |
| 10 | `WIFI_NAME_CONNECTED` | Connected WiFi name |
| 11 | `WLAN_MAC_ADDRESS` | WLAN MAC address |
| 12 | `DEVICE_IP` | Device IP address |

### DeviceControlEnum

| Value | Name | Description |
|---|---|---|
| 0 | `DEVICE_CONTROL_REBOOT` | Reboot device |
| 1 | `DEVICE_CONTROL_SHUTDOWN` | Shutdown device |

### PackageControlEnum

| Value | Name | Description |
|---|---|---|
| 0 | `PACKAGE_SILENCE_INSTALL` | Silent install package |
| 1 | `PACKAGE_SILENCE_UNINSTALL` | Silent uninstall package |

### HomeEventEnum

| Value | Name | Description |
|---|---|---|
| 0 | `SINGLE_CLICK` | Home button single click |
| 1 | `DOUBLE_CLICK` | Home button double click |
| 2 | `LONG_PRESS` | Home button long press |

### HomeFunctionEnum

| Value | Name | Description |
|---|---|---|
| 0 | `VALUE_HOME_GO_TO_SETTING` | Go to settings |
| 1 | `VALUE_HOME_BACK` | Back |
| 2 | `VALUE_HOME_RECENTER` | Recenter |
| 3 | `VALUE_HOME_OPEN_APP` | Open app |
| 4 | `VALUE_HOME_DISABLE` | Disable home button |
| 5 | `VALUE_HOME_GO_TO_HOME` | Go to home |
| 6 | `VALUE_HOME_SEND_BROADCAST` | Send broadcast |
| 7 | `VALUE_HOME_CLEAN_MEMORY` | Clean memory |

### ScreenOffDelayTimeEnum

Screen-off delay in seconds: `THREE` (3), `TEN` (10), `THIRTY` (30), `SIXTY` (60), `THREE_HUNDRED` (300), `SIX_HUNDRED` (600), `NEVER` (-1).

### SleepDelayTimeEnum

Sleep delay in seconds: `FIFTEEN` (15), `THIRTY` (30), `SIXTY` (60), `THREE_HUNDRED` (300), `SIX_HUNDRED` (600), `ONE_THOUSAND_AND_EIGHT_HUNDRED` (1800), `NEVER` (-1).

### SystemFunctionSwitchEnum

System function toggles.

| Value | Name | Description |
|---|---|---|
| 0 | `SFS_USB` | USB |
| 1 | `SFS_AUTOSLEEP` | Auto sleep |
| 2 | `SFS_SCREENON_CHARGING` | Screen on while charging |
| 3 | `SFS_OTG_CHARGING` | OTG charging |
| 4 | `SFS_RETURN_MENU_IN_2DMODE` | Return menu in 2D mode |
| 5 | `SFS_COMBINATION_KEY` | Combination key |
| 6 | `SFS_CALIBRATION_WITH_POWER_ON` | Calibration on power |
| 7 | `SFS_SYSTEM_UPDATE` | System update |
| 8 | `SFS_CAST_SERVICE` | Cast service |
| 9 | `SFS_EYE_PROTECTION` | Eye protection |
| 10 | `SFS_SECURITY_ZONE_PERMANENTLY` | Security zone permanent |
| 11 | `SFS_GLOBAL_CALIBRATION` | Global calibration |
| 12 | `SFS_Auto_Calibration` | Auto calibration |
| 13 | `SFS_USB_BOOT` | USB boot |
| 14 | `SFS_VOLUME_UI` | Volume UI |
| 15 | `SFS_CONTROLLER_UI` | Controller UI |
| 16 | `SFS_NAVGATION_SWITCH` | Navigation switch |

### FoveationLevel

| Value | Name | Description |
|---|---|---|
| -1 | `None` | No foveation |
| 0 | `Low` | Low foveation |
| 1 | `Med` | Medium foveation |
| 2 | `High` | High foveation |
| 3 | `TopHigh` | Maximum foveation |

### ExtraLatencyMode

| Value | Name |
|---|---|
| 0 | `ExtraLatencyModeOff` |
| 1 | `ExtraLatencyModeOn` |
| 2 | `ExtraLatencyModeDynamic` |

## Data Structures

### UserDefinedSettings

```csharp
public struct UserDefinedSettings {
    public ushort stereoRenderingMode;
    public ushort colorSpace;
    public float systemDisplayFrequency;
}
```

### EyeTrackingData / EyeTrackingGazeRay / ViewFrustum / BoundaryTestResult

Same structures as in the PicoVR Unity SDK — the Platform SDK mirrors these for its own subsystem implementations.

## API Surface

The `PXR_Plugin` static class in `PXR_Plugins.cs` is the primary API entry point. It wraps both P/Invoke calls (into `UnityPicoVR` and `Pvr_UnitySDK` native libraries) and Android JNI calls (via `AndroidJavaClass`/`AndroidJavaObject`).

### Rendering

- `UnityPicoVR_SetFoveationLevel(int level)` — Set FFR level
- `UnityPicoVR_GetFoveationLevel()` — Get FFR level
- `UnityPicoVR_SetFoveationParamets(float gainX, float gainY, float area, float minimum)` — Set custom FFR parameters
- `Pvr_GetStencilMesh(int eye, ...)` — Get lens stencil mesh
- `Pvr_EnableFoveation(bool enable)` — Enable/disable FFR

### Pass-Through Camera

- `UnityPicoVR_camera_start()` — Start pass-through camera
- `UnityPicoVR_camera_stop()` — Stop pass-through camera
- `UnityPicoVR_camera_destroy()` — Destroy camera resources
- `UnityPicoVR_camera_getRenderEventFunc()` — Get render event callback

### System Info

- `UPvr_GetSystemInfo(SystemInfoEnum type)` — Get device system info
- `UPvr_GetHmdHardwareVersion()` — HMD hardware version
- `UPvr_GetHmdFirmwareVersion()` — HMD firmware version
- `UPvr_GetHmdSerialNumber()` — HMD serial number
- `UPvr_GetHmdBatteryStatus()` — HMD battery level
- `UPvr_GetHmdBatteryTemperature()` — HMD battery temperature

### Device Control (ToB Service)

- `UPvr_ControlDevice(DeviceControlEnum action)` — Reboot or shutdown
- `UPvr_ControlPackage(PackageControlEnum action, string path)` — Silent install/uninstall
- `UPvr_SwitchSet(SwitchEnum type, SystemFunctionSwitchEnum function)` — Toggle system functions
- `UPvr_SetHomeKey(HomeEventEnum event, HomeFunctionEnum function)` — Configure home key behavior
- `UPvr_SetScreenOffDelay(ScreenOffDelayTimeEnum time)` — Set screen-off delay
- `UPvr_SetSleepDelay(SleepDelayTimeEnum time)` — Set sleep delay
- `UPvr_SetUSBConfigMode(USBConfigModeEnum mode)` — Set USB mode (MTP/Charge)

### Entitlement

- `UPvr_AppEntitlementCheck(string appid)` — Verify app entitlement
- `UPvr_AppEntitlementCheckExtra(string appid)` — Extended entitlement check (returns status code)

### Achievement

The `PXR_Achievement` class provides achievement operations:

- `GetAllAchievements()` — Fetch all achievement definitions
- `GetAchievementByName(string name)` — Fetch specific achievement
- `UnlockAchievement(string name)` — Unlock an achievement
- `AddCount(string name, int count)` — Increment achievement count
- `AddFields(string name, string fields, int count)` — Add fields to achievement

Uses callback-based async pattern via `PXR_Callback` and `PXR_Message` classes.

### Payment (IAP)

The `PicoPaymentSDK` class provides in-app purchase functionality:

- `Login()` — Pico account login
- `PayOrder(...)` — Create and pay an order
- `QueryOrder(...)` — Query order status
- `Subscribe(...)` — Subscription management

Demo scene available at `Assets/Payment/Demo/Scenes/Demo.unity`.

## Key Components

### PXR_Manager
Central manager MonoBehaviour. Configures and initializes all subsystems. Must be present in the scene.

### PXR_Loader
XR subsystem loader. Registers the Pico XR display and input subsystems with Unity's XR management system.

### PXR_PassThroughSystem
Implements the pass-through camera subsystem for see-through AR experiences.

### PXR_Boundary
Boundary/guardian system component. Provides boundary test, geometry, and visibility control.

### PXR_EyeTracking
Eye tracking component. Provides gaze data access via the `EyeTrackingData` struct.

### PXR_Input
Input system integration. Maps Pico controller inputs to Unity XR input usages.

### PXR_OverLay
Overlay layer component for composing 2D/360 overlays on top of VR content.

### PXR_ScreenFade
Screen fade transition component for smooth VR transitions.
