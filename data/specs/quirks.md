---
section: Known Quirks
order: 3
type: quirks
quirks:
  - label: Compositor crash on VR mode entry
    desc: Unknown — cannot verify without running apps on the headset. Needs testing.
  - label: Controller 6DOF tracking via CV (not electromagnetic)
    desc: Controllers use computer vision tracking (<code>ro.pvr.controller.service=cv</code>), not electromagnetic tracking as previously documented. 3DOF fallback mode exists (<code>pvr.running.app.3dof</code> flag).
  - label: Wi-Fi 5GHz channel lock
    desc: Unknown — <code>ro.boot.wificountrycode=CN</code> may restrict 5GHz channels. Needs testing with a 5GHz AP on channels 36-48 and 149-165.
  - label: USB-C display output
    desc: DisplayPort alt-mode appears disabled — <code>card0-DP-1</code> reports disconnected. No DP alt-mode config found in props. Hardware may support it but kernel path is missing.
  - label: Pico Store status
    desc: Pico Store app is installed (<code>com.picovr.store</code> v2.0.75) but backend availability is unknown. App installs can be sideloaded via APK regardless.
  - label: Foveated rendering
    desc: FFR is supported via <code>xrGetFoveationConfigPICO</code> / <code>pxr_set_ffr_info</code> — previous claim of "no foveated rendering API" was incorrect.
  - label: Battery reporting
    desc: Battery technology is Li-ion, measured full charge ~4050 mAh (<code>charge_full=4050000</code> µAh). Reporting accuracy quirks are unknown without extended testing.
  - label: Eye tracking hardware absent
    desc: Runtime supports eye tracking APIs (<code>xrGetEyeTrackingDataPICO</code>) and Tobii calibration packages are installed, but <code>pxr.vendorhw.eye=0</code> indicates no eye tracking hardware on this unit.
  - label: Bootloader unlocked
    desc: Bootloader is locked by default but can be unlocked.
  - label: Stale security patch
    desc: Security patch level is 2019-01-05, over 7 years behind. No further updates expected (EOL device).
---
