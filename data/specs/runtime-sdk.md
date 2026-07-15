---
section: Runtime & SDK Details
order: 4
type: table
rows:
  - key: Runtime
    value: Pico OpenXR runtime (Monado-based), <code>libruntime.pxr.so</code> v2.8.5.0
  - key: SDK
    value: PicoSDK3 (Unity + UE4 bindings), native libs <code>libpvr.so</code>, <code>libPvr_UnitySDK.so</code>, <code>libPvr_UESDKExt2.so</code>
  - key: OpenXR version
    value: 1.0 (based on extension set and API patterns)
  - key: OpenXR extensions
    value: <code>XR_KHR_opengl_es_enable</code>, <code>XR_KHR_vulkan_enable</code>, <code>XR_KHR_convert_timespec_time</code>, <code>XR_KHR_android_create_instance</code>, <code>XR_KHR_composition_layer_depth</code>, <code>XR_KHR_composition_layer_cylinder</code>, <code>XR_KHR_composition_layer_equirect2</code>, <code>XR_EXT_debug_utils</code>, <code>XR_EXT_hand_tracking</code>, <code>XR_EXTX_overlay</code>, <code>XR_MND_headless</code>, <code>XR_PICO_android_swapchain_ext_enable</code>, <code>XR_PICO_android_controller_function_ext_enable</code>, <code>XR_PICO_view_state_ext_enable</code>
  - key: PICO extensions
    value: <code>xrGetIPDPICO</code>, <code>xrSetIPDPICO</code>, <code>xrGetEyeTrackingDataPICO</code>, <code>xrGetFoveationConfigPICO</code>, <code>xrGetBoundaryGeometryPICO</code>, <code>xrBoundaryTestPointPICO</code>, <code>xrSetTrackingModePICO</code>, <code>xrResetSensorPICO</code>, <code>xrGetStencilmeshPICO</code>, <code>xrGetFrustumParametersPICO</code>, <code>xrGetControllerConnectionStatePico</code>
  - key: Rendering backends
    value: OpenGL ES 3.2, Vulkan 1.1
  - key: Tracking API
    value: OpenXR <code>xrLocateViews</code> / <code>xrLocateSpace</code>, plus PICO-specific <code>xrSetTrackingModePICO</code>. 6DOF head + controllers
  - key: Boundary system
    value: <code>xrGetBoundaryGeometryPICO</code>, <code>xrBoundaryTestPointPICO</code>, <code>xrBoundaryTestNodePICO</code>, <code>xrGetBoundaryDimensionsPICO</code>, storage path unknown
  - key: Overlay support
    value: Supported via <code>XR_EXTX_overlay</code> extension, compositor overlay layers in <code>libcompositor.pxr.so</code>
  - key: Hand tracking
    value: Supported via <code>XR_EXT_hand_tracking</code> extension (runtime checks for it at runtime)
  - key: Eye tracking
    value: Runtime supports <code>xrGetEyeTrackingDataPICO</code> and <code>xrGetEyeTrackingAutoIPDPICO</code>, but <code>pxr.vendorhw.eye=0</code>, hardware not present on this unit
  - key: Foveated rendering
    value: Fixed foveated rendering (FFR) supported via <code>xrGetFoveationConfigPICO</code> / <code>pxr_set_ffr_info</code>
  - key: Reprojection
    value: TimeWarp supported in compositor (<code>svrBeginTimeWarp</code>, <code>svrEndTimeWarp</code>, <code>gDisableReprojection</code> flag)
  - key: System services
    value: <code>pvrservice</code>, <code>com.pvr.configuration</code>, <code>com.pvr.home</code>, <code>com.picovr.initserver</code>, <code>com.picovr.hummingbirdsvc</code>, <code>com.picovr.picovrlib.cvcontroller</code>
---
