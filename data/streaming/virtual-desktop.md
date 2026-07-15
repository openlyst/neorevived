---
name: virtual-desktop
category: streaming
status: broken
updated: 2026-07-05
author: calico
notes: Server side refuses connection from unknown device ID
tags:
  - virtual-desktop
  - pc-streaming
---

## Overview

Virtual Desktop streaming client. The server side refuses connections from the Neo 2 because its device ID isn't on the recognized list.

## Blocker

Needs either a server-side patch (out of our control) or a client that spoofs a recognized device ID. Tracked but no clean path yet.
