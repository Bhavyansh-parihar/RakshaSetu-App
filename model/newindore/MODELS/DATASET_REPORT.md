# RAKSHASETU Dataset Specifications & Provenance Report

This document details the training and benchmark evaluation datasets associated with the RAKSHASETU Computer Vision models.

---

## 1. Fire & Smoke Detection Dataset

### 📊 Dataset Provenance

| Parameter | Details |
| :--- | :--- |
| **Dataset Source** | Roboflow Universe & Custom Wildfire Emergency Aggregations |
| **Hugging Face Repository** | `rakshasetu/fire-smoke-dataset` |
| **Dataset Type** | Computer Vision — Bounding Box Object Detection |
| **Annotation Format** | YOLO Darknet Format (`.txt` per image with normalized `class_id x_center y_center width height`) |
| **Label Names** | `fire`, `smoke` |
| **Number of Classes** | 2 |
| **Train / Validation / Test Split** | *TBD (Pending official dataset partition release)* |
| **Standardized Resolution** | 640 × 640 pixels |
| **Dataset License** | CC BY 4.0 (Creative Commons Attribution) |

### 🏷️ Class Breakdown

| Class Index | Label Name | Annotation Standard |
| :--- | :--- | :--- |
| `0` | `fire` | Bounding box tightly enclosing visible active combustion flames |
| `1` | `smoke` | Bounding box enclosing smoke columns, plumes, and early smoldering emissions |

---

## 2. Pothole Detection Dataset

### 📊 Dataset Provenance

| Parameter | Details |
| :--- | :--- |
| **Dataset Source** | Road Hazard Inspection Datasets & Municipal Dashcam Repositories |
| **Hugging Face Repository** | `rakshasetu/road-pothole-dataset` |
| **Dataset Type** | Computer Vision — Bounding Box Object Detection |
| **Annotation Format** | YOLO Darknet Format (`.txt` per image with normalized `class_id x_center y_center width height`) |
| **Label Names** | `pothole` |
| **Number of Classes** | 1 |
| **Train / Validation / Test Split** | *TBD (Pending official dataset partition release)* |
| **Standardized Resolution** | 640 × 640 pixels |
| **Dataset License** | Public Domain / CC0 |

### 🏷️ Class Breakdown

| Class Index | Label Name | Annotation Standard |
| :--- | :--- | :--- |
| `0` | `pothole` | Bounding box enclosing road asphalt depressions, cavities, and surface structural breaks |

---

## 3. Dataset Preprocessing Pipeline

To maintain consistency across diverse camera hardware (CCTV, drone, dashcam), all incoming dataset samples undergo the following automated transformations:

1. **Aspect-Ratio Preserved Resizing**: Resized to $640 \times 640$ pixels using letterbox padding.
2. **Channel Normalization**: Pixel values normalized from $[0, 255]$ to $[0.0, 1.0]$.
3. **Data Augmentation (Training Phase)**:
   - Random Horizontal Flip ($p = 0.5$)
   - HSV Color Space Jitter (Hue: $\pm 0.015$, Saturation: $\pm 0.7$, Value: $\pm 0.4$)
   - Mosaic Augmentation ($p = 1.0$)
   - Random Scale Translation ($\pm 10\%$)

---

## 4. Benchmark Verification Status

> [!NOTE]
> Exact image counts, class instance distributions, and validation split metrics are kept as **TBD (Pending Verification)** until final evaluation datasets are mounted during the SIH evaluation phase. No synthetic or fabricated image counts are included in this report.
