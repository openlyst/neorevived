---
date: 2026-07-13
title: Input service fully reversed — 6DOF tracking understood
author: calico
summary: The Pico input service has been fully documented. Controller 6DOF tracking, button mapping, and haptics are all understood now.
tags:
  - decomp
  - input
  - tracking
---

## Milestone reached

After three weeks of work, the input service (`pico_input_service`) is fully reversed. Here's what we now understand:

- 6DOF electromagnetic tracking pipeline — from sensor read to pose output
- Button and trigger mapping, including the capacitive touch sensors
- Haptic feedback commands and their amplitude/duration encoding
- The recalibration protocol (the "hold controllers together" thing)

## Why this matters

This unblocks two things: the hand tracking shim (we can now feed custom pose data through the same pipeline) and the custom ROM project (input is usually the hardest part of porting Android to a headset).

Full notes are in the decomp/input-service entry.
