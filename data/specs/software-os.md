---
section: Software & OS
order: 2
type: table
rows:
  - key: OS
    value: Pico OS (Android-based, AOSP fork)
  - key: Android base
    value: Android 8.1.0 (Oreo, API 27)
  - key: Kernel
    value: Linux 4.9.65-perf+ (built Fri Apr 9 2021, Qualcomm SDM845 vendor branch)
  - key: Pico OS version
    value: 4.1.3 (<code>ro.build.display.id</code>, <code>ro.pui.build.version</code>)
  - key: Internal version
    value: C086_RF01_BV1.3_SV1.82_20210409_B346
  - key: Build fingerprint
    value: <code>Pico/A7B10/PICOA7B10:8.1.0/OPM1.171019.026/eng.scmbui.20210409.201441:user/test-keys</code>
  - key: Security patch
    value: "2019-01-05"
  - key: Runtime
    value: Pico OpenXR runtime via <code>libruntime.pxr.so</code> (Monado-based), native VR via <code>libpvr.so</code>
  - key: OpenXR
    value: Supported natively, active runtime at <code>/vendor/etc/openxr/1/active_runtime.json</code>, library <code>libruntime.pxr.so</code>
  - key: OpenGL ES
    value: "3.2 (<code>ro.opengles.version=196610</code>)"
  - key: Vulkan
    value: 1.1 (driver <code>vulkan.sdm845.so</code>, Adreno 630)
  - key: App distribution
    value: Pico Store (<code>com.picovr.store</code> v2.0.75 installed), sideload via APK, no Play Store
  - key: USB modes
    value: MTP + ADB (<code>persist.sys.usb.config=mtp,adb</code>)
  - key: Bootloader
    value: Locked by default can be unlocked.
  - key: Build keys
    value: test-keys
  - key: Target FPS
    value: "72 (<code>persist.pvr.config.target_fps=72</code>)"
---
