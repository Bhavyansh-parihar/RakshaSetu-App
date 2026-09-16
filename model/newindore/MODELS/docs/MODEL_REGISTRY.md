# RAKSHASETU Master AI Model Registry

This registry tracks the status, framework, task classification, versioning, and download pointers for all AI models in the RAKSHASETU ecosystem.

---

## 📊 Model Registry Summary Table

| Model | Task | Framework | Status | Model File | Version |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **YOLOv26** | Fire & Smoke Detection | Ultralytics | `Ready` | `Fire-Detection/best.pt` | `1.0` |
| **YOLOv9c** | Pothole Detection | Ultralytics | `Ready` | `Pothole-Detection/yolov9c.pt` | `1.0` |
| *TBD* | Flood Detection | Ultralytics / SegFormer | `Planned` | *TBA (HuggingFace)* | `-` |
| *TBD* | Landslide Detection | PyTorch Vision | `Planned` | *TBA (HuggingFace)* | `-` |
| *TBD* | Crack Detection | Ultralytics | `Planned` | *TBA (HuggingFace)* | `-` |
| *TBD* | Structural Damage Detection | Mask R-CNN / YOLO | `Planned` | *TBA (HuggingFace)* | `-` |

---

## 🗂️ Active Models Details

### 1. Fire & Smoke Detection
* **Model Identifier:** `YOLOv26`
* **Task Category:** Fire Detection
* **Framework:** Ultralytics YOLO
* **Primary Directory:** [Fire-Detection](../Fire-Detection/)
* **Weights Path:** `Fire-Detection/best.pt`
* **Output Classes:** `fire`, `smoke`
* **Status:** Ready for Integration

### 2. Pothole Detection
* **Model Identifier:** `YOLOv9c`
* **Task Category:** Pothole Detection
* **Framework:** Ultralytics YOLO
* **Primary Directory:** [Pothole-Detection](../Pothole-Detection/)
* **Weights Path:** `Pothole-Detection/yolov9c.pt`
* **Output Classes:** `pothole`
* **Status:** Ready for Integration

---

## 🔮 Planned Model Extensions

### 3. Flood Detection
* **Task:** Water level monitoring & flood surface segmentation
* **Target Framework:** Ultralytics / SegFormer
* **Status:** Planned

### 4. Landslide Detection
* **Task:** Terrain instability and landslide risk area detection
* **Target Framework:** PyTorch Vision
* **Status:** Planned

### 5. Crack Detection
* **Task:** Road and concrete surface crack identification
* **Target Framework:** Ultralytics
* **Status:** Planned

### 6. Structural Damage Detection
* **Task:** Post-disaster building and bridge structural damage assessment
* **Target Framework:** Mask R-CNN / YOLO
* **Status:** Planned

---

## 📦 Weight Distribution Policy

All binary weight files (`.pt`, `.onnx`) are referenced as placeholders in this repository. Actual weight files are stored and versioned on Hugging Face Model Hub and pulled dynamically during model deployment or container initialization.
