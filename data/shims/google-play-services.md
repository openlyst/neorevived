---
name: google-play-services
category: shims
status: planned
updated: 2026-06-15
author: calico
notes: Stub GMS for apps that refuse to launch without it
tags:
  - gms
  - compat
---

## Overview

A stub Google Play Services package so apps that check for GMS at launch don't bail out immediately. No real services implemented — just enough to pass the presence check.

## Status

Not started. Waiting on the package-svc decomp to understand how the install flow verifies provider signatures.
