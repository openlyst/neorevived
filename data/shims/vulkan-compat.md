---
name: vulkan-compat
category: shims
status: broken
updated: 2026-06-29
author: calico
notes: Vulkan 1.1 layer crashes on swapchain creation, see issue #7
tags:
  - vulkan
  - graphics
---

## Overview

A Vulkan 1.1 compatibility layer intended to smooth over the Adreno driver's rougher paths on the Neo 2.

## Current Blocker

Crashes during swapchain creation. The Adreno 640 driver returns a surface format the layer doesn't account for. Tracked in issue #7.
