---
section: Pico Enterprise Assistant
order: 6
type: table
rows:
  - key: Tool Name
    value: Pico Enterprise Assistant
  - key: Version
    value: 1.1.1.30 (Build 20210730)
  - key: Platform
    value: Windows PC
  - key: License
    value: Pico SDK License Agreement (<code>https://developer.pico-interactive.com/sdk</code>)
  - key: File
    value: <code>EnterpriseAssistant-PC-1.1.1_30-20210730.exe</code> (70.6 MB)
  - key: Purpose
    value: PC-side tool for device management — app deployment, device configuration, screen mirroring, log capture, firmware updates
  - key: Download
    value: Not available for download on this site
---

## Overview

The Pico Enterprise Assistant is a Windows desktop application for managing Pico headsets from a PC. It is not an SDK for app development but a utility tool for deploying and debugging apps on the headset. It connects via USB and provides a GUI for common device management tasks.

## Connection

The tool connects to the headset via USB using ADB (Android Debug Bridge). The headset must have USB debugging enabled in Developer Options. No additional drivers are required on Windows beyond the standard ADB driver.

## Features

### App Management
- **Install APK**: Deploy APK files to the headset by dragging and dropping or browsing
- **Uninstall**: Remove installed apps from the device
- **App list**: View all installed applications with package names and versions

### Device Configuration
- **WiFi configuration**: Set WiFi SSID and password on the headset
- **Screen brightness**: Adjust headset display brightness
- **Volume control**: Set media volume on the device
- **System settings**: Toggle developer options, USB debugging, etc.
- **Kiosk mode**: Lock the headset to a single application
- **Home key configuration**: Set home button behavior

### Screen Mirroring
- Real-time screen mirroring from headset to PC window
- Supports both 2D and VR mode mirroring
- Capture screenshots from the mirrored view

### Log Capture
- View real-time logcat output from the headset
- Filter by log level (Debug, Info, Warning, Error)
- Filter by tag or keyword
- Export logs to file for bug reports

### Firmware Updates
- Check for available firmware updates
- Download and install firmware updates to the headset
- View current firmware version and changelog

### File Management
- Browse the headset filesystem
- Upload files from PC to headset
- Download files from headset to PC
- Delete files on the headset

### Batch Operations
- Connect multiple headsets simultaneously
- Apply configuration changes to multiple devices at once
- Install APKs to multiple devices in parallel

## Relationship to SDKs

The Enterprise Assistant provides a GUI for many of the same device management functions available programmatically through the PICOEnterprise plugin in the Unreal SDK and the ToB Service APIs in the Platform SDK. It is useful for:
- Quick device setup during development
- Deploying test builds without full CI/CD
- Debugging on-device issues with log capture
- Enterprise deployments requiring batch configuration
