---
section: Known Quirks
order: 3
type: quirks
quirks:
  - label: Compositor crash on VR mode entry
    desc: The native compositor segfaults when entering VR mode after a cold boot on some units. Warm reboot fixes it. Tracked in decomp/pico-runtime.
  - label: Controller 6DOF drift
    desc: Electromagnetic tracking drifts after ~20 min of continuous use. Recalibration requires holding controllers together for 3 seconds.
  - label: Wi-Fi 5GHz channel lock
    desc: Driver only supports channels 36-48 on 5GHz. Channels 149-165 (used in US streaming setups) are unavailable despite hardware support.
  - label: USB-C display output disabled
    desc: DisplayPort alt-mode is disabled in kernel config. Hardware supports it but no driver path exists. Would need custom kernel to enable.
  - label: Pico Store servers offline
    desc: Pico Store backend went offline after the Quest acquisition. App downloads fail. All app installs must be sideloaded via APK.
  - label: No foveated rendering API
    desc: The XR runtime exposes no fixed foveated rendering extension. Performance-heavy apps must do full-resolution render, limiting frame rate.
  - label: Battery reporting inaccuracy
    desc: Reported percentage jumps from ~40% to ~15% suddenly. Charge controller calibration issue. See projects/battery-research.
---
