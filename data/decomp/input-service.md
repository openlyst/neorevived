---
name: input-service
category: decomp
status: working
updated: 2026-07-13
author: calico
notes: Controller input fully reversed, 6DOF tracking understood
tags:
  - input
  - tracking
---

## Overview

Decomp of the Pico input service (`pico_input_service`).

## Documented

- 6DOF electromagnetic tracking pipeline, from sensor read to pose output
- Button and trigger mapping, including capacitive touch sensors
- Haptic feedback commands and their amplitude/duration encoding
- The recalibration protocol (the "hold controllers together" step)

## Why It Matters

Unblocks the hand tracking shim (custom pose data can now feed the same pipeline) and the custom ROM project (input is usually the hardest part of porting Android to a headset).
