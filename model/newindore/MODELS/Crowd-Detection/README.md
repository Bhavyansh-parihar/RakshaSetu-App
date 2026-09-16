---
license: cc-by-sa-4.0
library_name: ultralytics
pipeline_tag: object-detection
tags:
  - computer-vision
  - object-detection
  - crowd-counting
  - head-detection
  - yolov8
  - ultralytics
datasets:
  - rpee-heads
metrics:
  - precision
  - recall
  - map50
  - map50-95
---

# iRail Crowd Counting (YOLOv8n) — Head Detection Baseline

This repository contains a **YOLOv8n (nano)** model fine-tuned for **pedestrian head detection** in crowded environments (railway platforms + event entrances).  
The main objective is **crowd counting per frame** by detecting heads and **counting bounding boxes**.

This model is designed as an **educational baseline** for an iRail/Azure project extension where the iRail API does not provide occupancy, so we estimate a proxy crowd level from images/frames.

## Model

- Architecture: **YOLOv8n (Ultralytics)**
- Task: **Object detection**
- Class(es): `head` (single class)
- Training input size: **imgsz=832**
- Baseline inference settings used for counting eval:
  - `conf=0.25`
  - `iou=0.75`
  - `max_det=300`

## Dataset

Trained on **RPEE-Heads (Railway Platforms and Event Entrances-Heads)** with head bounding boxes.

- 1,886 images
- 109,913 head annotations
- Split:
  - Train: 1,346 images
  - Val: 246 images
  - Test: 294 images
- License: **CC BY-SA 4.0** (dataset + derived model share-alike requirements apply)

Paper reference:
**RPEE-Heads Benchmark: A Dataset and Empirical Comparison of Deep Learning Algorithms for Pedestrian Head Detection in Crowds**  
Mohamad Abubaker, Zubaida AlSadder, Hamed Abdelhaq, Maik Boltes, Ahmed Alia  
DOI: 10.34735/ped.2024.2  
Dataset URL: http://ped.fz-juelich.de/da/2024rpee_heads

## Baseline Evaluation (Detection)

Ultralytics validation metrics on Val/Test (single class: head):

**Validation (246 images / 16,022 instances)**
- Precision: **0.910**
- Recall: **0.805**
- mAP@0.50: **0.881**
- mAP@0.50:0.95: **0.522**

**Test (294 images / 15,285 instances)**
- Precision: **0.908**
- Recall: **0.803**
- mAP@0.50: **0.878**
- mAP@0.50:0.95: **0.515**

## Crowd Counting Evaluation (Counting boxes per image)

Counting is computed as:  
**predicted_count = number of detected boxes** (after NMS at chosen `conf` and `iou`).

Baseline counting settings:
- `imgsz=832`, `conf=0.25`, `iou=0.75`

**Metrics**
- MAE: **4.67**
- RMSE: **8**
- Bias (pred - gt): **0.097** (slight undercount)


## Intended Use

- Educational demo of:
  - fine-tuning YOLOv8 for head detection
  - evaluating detection metrics
  - converting detections to a crowd count proxy
- A building block for a larger iRail/Azure pipeline (occupancy proxy)

## Limitations

- Not trained on Belgian station camera viewpoints specifically.
- Counting via “number of boxes” can undercount in very dense crowds.
- Domain shift (camera height, lens distortion, resolution, lighting) may reduce performance.

## Author
Amine Samoudi - GitHub: [@AmineSam](https://github.com/AmineSam)


