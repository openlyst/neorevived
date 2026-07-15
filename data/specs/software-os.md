---
section: Software & OS
order: 2
type: table
rows:
  - key: OS
    value: Pico OS (Android-based, AOSP fork)
  - key: Android base
    value: Android 8.1 (Oreo, API 27) — heavily modified
  - key: Kernel
    value: Linux 4.9, Qualcomm vendor branch <code>sdm845-4.9</code>
  - key: Last official update
    value: Pico OS 3.x (early 2021), EOL since
  - key: Runtime
    value: Pico Native SDK (C/C++), proprietary XR runtime via <code>libpico_xr.so</code>
  - key: OpenXR
    value: Not supported natively — requires shim (see Shims tab)
  - key: OpenGL ES
    value: "3.2"
  - key: Vulkan
    value: 1.1 (Adreno driver, buggy on some paths)
  - key: App distribution
    value: Pico Store (defunct), sideload via APK, no Play Store
  - key: USB modes
    value: ADB, MTP, USB tethering
  - key: Bootloader
    value: Locked by default, unlockable via fastboot <code>oem unlock</code>
---
