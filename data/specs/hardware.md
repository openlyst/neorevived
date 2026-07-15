---
section: Hardware
order: 1
type: table
rows:
  - key: SoC
    value: Qualcomm Snapdragon 845 (SDA845)
  - key: CPU
    value: 8x Kryo 385 (4x 2.8 GHz Gold + 4x 1.7 GHz Silver), ARMv8-A 64-bit
  - key: GPU
    value: Adreno 630, max 710 MHz
  - key: RAM
    value: 6 GB (5822388 kB reported by <code>/proc/meminfo</code>), LPDDR4X (per SDM845 spec)
  - key: Storage
    value: 64GB Mainland Chinese, 128 GB WW, UFS 2.1 (per SDM845 spec)
  - key: Display
    value: Single LCD panel (JDI554K), 2160x3840 portrait / 3840x2160 landscape, 72 Hz refresh
  - key: FOV
    value: Unknown
  - key: IPD
    value: Software settable — runtime exposes <code>xrGetIPDPICO</code> / <code>xrSetIPDPICO</code>
  - key: Tracking
    value: 6DOF inside-out, computer vision based (<code>ro.pvr.controller.service=cv</code>), <code>persist.pvr.global_6dof=true</code>
  - key: Controllers
    value: 6DOF via CV tracking, 3DOF fallback mode (<code>pvr.running.app.3dof</code> flag present)
  - key: Battery
    value: Li-ion, measured full charge ~4050 mAh (<code>charge_full=4050000</code> µAh) — design capacity unknown
  - key: Weight
    value: Unknown
  - key: Connectivity
    value: Wi-Fi (wlan0, SDM845 supports 802.11ac), Bluetooth 5.0 (Qualcomm WCN3990 "cherokee"), USB-C (dwc3 controller)
  - key: Sensors
    value: Accelerometer (Bosch BMA2x2), Gyroscope (Bosch BMG160), Magnetometer (Bosch BMM150), Proximity (Sensortek STK3x1x), Hall Effect (ROHM BU52053NVX), 6DOF Pose (ICM206XX)
  - key: Audio
    value: Built-in speakers (Qualcomm fluence audio), 3.5mm jack, USB-C audio
  - key: Eye tracking
    value: Tobii calibration packages present (<code>com.tobii.usercalibration.pico</code>, <code>com.pvr.tobservice</code> v2.1.3), but <code>pxr.vendorhw.eye=0</code> — hardware not available at time of testing
---
