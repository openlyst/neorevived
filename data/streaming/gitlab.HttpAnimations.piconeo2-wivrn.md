---
name: gitlab.HttpAnimations.piconeo2-wivrn
humanname: Pico Neo 2 WiVRn
category: streaming
status: working
updated: 2026-07-20
author: calico
license: AGPL-3.0
readme_url: https://gitlab.com/HttpAnimations/piconeo2-wivrn/-/raw/main/README.md
sourceurl: https://gitlab.com/HttpAnimations/piconeo2-wivrn
downloads: true
download_list:
  - version: Beta 1.0
    date: 2026-07-20
    url: https://github.com/openlyst/piconeo2-wivrn/releases/download/Beta-1.0/wivrn-pvr-Beta-1.0.apk
    commit: 229e8067bb4a2aba37d9642faf90e49bafb28810
    notes: Port back to PVR, passthrough support, movable UI, removed broken rescale, update to wivrn server 26.6.2, fix UI stuttering on low power mode, fix crash clicking pair
  - version: RC6
    date: 2026-07-15
    url: https://files.catbox.moe/0dwyyf.apk
    commit: 510a0a58a3b83b93e817c4e16c40a0e32e80df95
    notes: Eye tracking for Neo 2 Eye, pupil dilation, fix audio stuttering, dynamic bitrate, 21ms motion-to-photon latency, joystick axis fix, recenter position fix
  - version: RC5
    date: 2026-07-08
    notes: Fix lobby flickering on low battery, improve stuttering, bitrate slider, USB pairing fixes
  - version: RC4
    date: 2026-07-01
    notes: Harden rendering, fix controller buttons, 300Hz tracking, native resolution, IPD slider, microphone support
  - version: RC3
    date: 2026-06-20
    notes: Fix all stuttering and jitters, fix memory leak
  - version: RC2
    date: 2026-06-15
    notes: Port to OpenXR, fix tracking and height, audio support, recenter ability
  - version: RC1
    date: 2026-06-10
    notes: Initial release (PVR-based)
notes: WiVRn client for the Pico Neo 2 and Neo 2 Eye, stream PC VR over Wi-Fi or USB
tags:
  - wivrn
  - openxr
  - pvr
  - streaming
  - pico-neo-2
---