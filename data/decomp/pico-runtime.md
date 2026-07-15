---
name: pico-runtime
category: decomp
status: broken
updated: 2026-07-08
author: calico
notes: SIGSEGV in compositor when entering VR mode, see issue #14
tags:
  - runtime
  - compositor
---

## Overview

Reverse engineering of the Pico native XR runtime (`libpico_xr.so`) and its supporting services.

## Current Blocker

The native compositor segfaults when entering VR mode after a cold boot on some units. Warm reboot works around it. Tracked in issue #14.
