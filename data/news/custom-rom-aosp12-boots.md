---
date: 2026-07-06
title: Custom ROM — AOSP 12 boots on the Neo 2
author: calico
summary: AOSP 12 base now boots on the Pico Neo 2. Display and sensors init correctly, but GPU acceleration is still missing.
tags:
  - projects
  - rom
  - aosp
---

## Progress

The custom ROM project hit a major milestone — AOSP 12 now boots to the launcher on the Pico Neo 2. This is a plain AOSP build, no Pico OS components.

### What works

- Display panel init (both eyes)
- Touch and IMU sensors
- Wi-Fi and Bluetooth
- Audio (built-in speakers)

### What doesn't

- GPU acceleration — Adreno 640 driver crashes on context creation. Currently running on SwiftShader (software rendering, ~2fps)
- Tracking cameras — not initialized, no 6DOF
- Controllers — no input service yet

## Next steps

GPU is the blocker. We need to either fix the Qualcomm mesa driver or write a minimal Vulkan ICD. The decomp work on the compositor should help us understand what the runtime expects.
