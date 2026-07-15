---
name: androidx-shim
category: shims
status: in-progress
updated: 2026-07-08
author: calico
notes: Backports AndroidX bindings for apps targeting newer SDKs
tags:
  - androidx
  - compat
---

## Overview

Backports the AndroidX (Jetpack) bindings so apps built against newer Android SDKs can run on the Neo 2's Android 8.1 base. Targets the subset of AndroidX libraries most VR apps depend on.

## Status

Core `androidx.core` and `androidx.appcompat` bindings work. Fragment and lifecycle libraries are partially mapped. See the issue tracker for the supported API surface.
