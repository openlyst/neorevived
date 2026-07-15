---
name: custom-rom
category: projects
status: in-progress
updated: 2026-07-06
author: calico
notes: AOSP 12 base boots, sensors and display init working
tags:
  - aosp
  - rom
---

## Overview

A custom AOSP 12 ROM for the Neo 2, replacing Pico OS entirely.

## What Works

- Display panel init (both eyes)
- Touch and IMU sensors
- Wi-Fi and Bluetooth
- Audio (built-in speakers)

## What Doesn't

- GPU acceleration — Adreno 640 driver crashes on context creation. Currently running on SwiftShader (software rendering)
- Tracking cameras — not initialized, no 6DOF
- Controllers — no input service yet

## Next Steps

GPU is the blocker. Either fix the Qualcomm mesa driver or write a minimal Vulkan ICD. The compositor decomp should clarify what the runtime expects.
