# RAKSHASETU AI Model Cards

This document provides technical specifications, architectural parameters, target classes, and operational metadata for all Computer Vision models integrated into the RAKSHASETU emergency platform.

---

## 1. Fire & Smoke Detection Model Card

### 📋 Model Summary

| Property | Specification |
| :--- | :--- |
| **Model Name** | YOLO26s (Fire & Smoke Detector) |
| **Framework** | Ultralytics YOLO |
| **Learning Type** | Supervised Learning |
| **Architecture Family** | Real-Time Single-Stage Object Detector |
| **Layers** | 225 Layers |
| **Parameters** | 3.2 Million Parameters |
| **Target Classes** | 2 (`fire`, `smoke`) |
| **Input Resolution** | 640 × 640 pixels (RGB, 3-channel) |
| **Model Weight Size** | ~6.5 MB (`best.pt`) |
| **Fine-Tuned** | Yes (Fine-tuned on wildfire, aerial, and indoor fire hazard datasets) |
| **License** | AGPL-3.0 / Commercial License |
| **Deployment Status** | Ready for Integration |

### 🎯 Primary Intended Use

* **Application:** Early hazard detection for forest fires, industrial fires, and urban smoke plumes.
* **Target Environment:** CCTV surveillance networks, aerial drone video streams, and mobile alert systems.
* **Out-of-Scope Use:** Medical imaging, non-visual thermal telemetry without visual imagery.

### 🏷️ Target Class Specification

| Class Index | Class Name | Description |
| :--- | :--- | :--- |
| `0` | `fire` | Active flame, wildfire, structural fire combustion |
| `1` | `smoke` | Dense smoke column, industrial smoke plume, early smoldering smoke |

---

## 2. Pothole Detection Model Card

### 📋 Model Summary

| Property | Specification |
| :--- | :--- |
| **Model Name** | YOLOv9c (Road Pothole Detector) |
| **Framework** | Ultralytics YOLO |
| **Learning Type** | Supervised Learning |
| **Architecture Family** | Programmable Gradient Information (PGI) Object Detector |
| **Layers** | 384 Layers |
| **Parameters** | 25.3 Million Parameters |
| **Target Classes** | 1 (`pothole`) |
| **Input Resolution** | 640 × 640 pixels (RGB, 3-channel) |
| **Model Weight Size** | ~19.2 MB (`yolov9c.pt`) |
| **Fine-Tuned** | Yes (Fine-tuned on asphalt degradation and road distress datasets) |
| **License** | AGPL-3.0 / Open Source |
| **Deployment Status** | Ready for Integration |

### 🎯 Primary Intended Use

* **Application:** Automated road hazard detection and municipal infrastructure safety auditing.
* **Target Environment:** Dashcam feeds, municipal inspection vehicles, drone road sweeps.
* **Out-of-Scope Use:** Underwater terrain assessment, indoor structural damage inspection.

### 🏷️ Target Class Specification

| Class Index | Class Name | Description |
| :--- | :--- | :--- |
| `0` | `pothole` | Asphalt cavity, road surface depression, structural road break |

---

## 3. Comparative Architecture Matrix

| Feature | YOLO26s (Fire) | YOLOv9c (Pothole) |
| :--- | :--- | :--- |
| **Primary Focus** | High Frame Rate & Rapid Alert Trigger | High Feature Precision & Surface Extraction |
| **Backbone** | Lightweight CSP-Darknet Variant | Programmable Gradient Information (PGI) |
| **Precision Mode** | FP16 / FP32 | FP16 / FP32 |
| **Optimized Hardware** | NVIDIA Jetson Edge / Cloud GPU | Server GPU / Mobile Dashcam Edge |
| **Batch Inference Support** | Yes (Dynamic Batching) | Yes (Dynamic Batching) |
| **Output Representation** | `[x, y, w, h, confidence, class_id]` | `[x, y, w, h, confidence, class_id]` |
