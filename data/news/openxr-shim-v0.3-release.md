---
date: 2026-07-14
title: OpenXR shim v0.3 released — hand tracking next
author: calico
summary: v0.3 brings full OpenXR 1.0 conformance for the core API. Hand tracking extension is next on the roadmap.
tags:
  - shims
  - openxr
  - release
---

## What's new

Version 0.3 of the OpenXR shim is out. This release covers the full OpenXR 1.0 core API — all instances, sessions, swapchains, and action sets work without crashes.

- Fixed swapchain format negotiation (was picking sRGB when apps expected linear)
- Reduced per-frame overhead from ~4ms to ~2ms by caching tracking state reads
- Added `XR_KHR_composition_layer_depth` support

## What's next

Hand tracking (`XR_EXT_hand_tracking`) is the priority for v0.4. The input-service decomp gave us enough to understand the controller tracking pipeline, and we're confident the same data path can expose hand joints.

## Try it

Download from the shims tab entry, or grab the APK directly. Feedback welcome via MR or issue.
