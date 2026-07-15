---
section: Sources
order: 5
type: table
rows:
  - key: Verification method
    value: All specs verified via <code>adb</code> on device <code>PA7B40NGF1110010W</code> (Pico Neo 2, Pico OS 4.1.3). No apps were run on the headset during verification.
  - key: Teardown
    value: See projects/teardown-notes for board photos and chip IDs
  - key: Decomp
    value: See decomp/pico-runtime, decomp/input-service, decomp/compositor
  - key: Runtime strings
    value: Extracted from <code>libruntime.pxr.so</code>, <code>libcompositor.pxr.so</code> via <code>adb shell strings</code>
  - key: Official docs
    value: Pico developer portal (archived, partially offline)
  - key: Community
    value: Contributed via MR — add corrections in <code>/data/specs/</code>
---
