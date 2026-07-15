---
section: Runtime & SDK Details
order: 4
type: table
rows:
  - key: Native SDK
    value: Pico Native SDK 2.x (C/C++), links against <code>libpico_xr.so</code>
  - key: SDK version (last)
    value: 2.1.3 (2021-01)
  - key: Rendering backends
    value: OpenGL ES 2.0/3.0/3.2, Vulkan 1.1 (partial)
  - key: Tracking API
    value: Proprietary <code>Pxr_GetTrackingState()</code>, 6DOF head + controllers
  - key: Boundary system
    value: Stationary + guardian-style boundary, stored in <code>/data/pico/boundary/</code>
  - key: Overlay support
    value: Limited — single overlay layer, no composited multi-overlay
  - key: Hand tracking
    value: Not available in stock runtime. Community shim in progress.
  - key: Reprojection
    value: None (no ASW/ATW equivalent). App must hit 90fps or stutter.
  - key: System services
    value: <code>pico_system_service</code>, <code>pico_input_service</code>, <code>pico_compositor</code> — see Decomp tab
---
