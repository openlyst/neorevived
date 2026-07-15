---
name: alvr
category: streaming
status: in-progress
updated: 2026-07-12
author: calico
notes: Latency over 5GHz WiFi still rough, color compression artifacts
tags:
  - alvr
  - pc-streaming
---

## Overview

ALVR streams PC VR content to the headset over Wi-Fi. The Neo 2 port connects and renders, but the experience isn't comfortable yet.

## Current State

- Connects to the ALVR server on a 5GHz link
- Latency is still rough for fast motion
- Color compression artifacts visible in dark scenes

## Blockers

The 5GHz driver only exposes channels 36-48 (see specs/quirks), which limits usable Wi-Fi bandwidth in some regions.
