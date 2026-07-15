---
name: openxr-shim
category: shims
status: working
updated: 2026-07-10
author: calico
notes: Drops in as libopenxr_loader.so, translates OpenXR 1.0 to native runtime
tags:
  - openxr
  - api-shim
  - native
---

## Overview

A drop-in replacement for `libopenxr_loader.so` that translates OpenXR 1.0 calls to the Pico Neo 2's native XR runtime. Lets modern OpenXR-based apps run without modification.

## Installation

1. Download `openxr-shim.so` from the latest release
2. Push to device: `adb push openxr-shim.so /data/local/tmp/libopenxr_loader.so`
3. Set `XR_RUNTIME_JSON` to point at the bundled `active_runtime.json`
4. Launch your OpenXR app — it should pick up the shim automatically

## Known Issues

- Hand tracking extension (`XR_EXT_hand_tracking`) not yet implemented
- Performance overhead is ~2ms per frame on heavy scenes
- Does not work with apps that statically link the OpenXR loader

## Source

Repository and release artifacts are linked from the project's GitLab repo. License: MIT.
