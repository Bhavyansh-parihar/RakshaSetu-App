# RAKSHASETU AI Model Architecture & Evaluation Implementation Plan

**Project:** RAKSHASETU — Smart Emergency Response & Disaster Management System  
**Module:** Standalone AI Model Repository & Evaluation Suite  
**Document Version:** 1.0.0  
**Target Event:** Smart India Hackathon (SIH) Evaluation  

---

## 1. Project Objective

The primary objective of the **RAKSHASETU AI Model Module** is to establish a standalone, production-ready, backend-agnostic repository for managing, benchmarking, and evaluating real-time Computer Vision models. RAKSHASETU leverages deep learning object detection pipelines to detect critical hazards—specifically **Fire & Smoke** and **Road Potholes**—enabling rapid emergency alert generation, hazard mapping, and autonomous dispatching.

By decoupling the AI model artifacts, metadata, evaluation scripts, and hardware diagnostics from both frontend user interfaces and backend application frameworks (FastAPI/Flask), RAKSHASETU guarantees modularity, seamless model updates, and standardized benchmarking across diverse edge and cloud deployment hardware.

---

## 2. AI Pipeline Architecture

The RAKSHASETU AI vision pipeline is engineered as a multi-stage real-time stream processing framework:

```text
[ Video Stream / Image Input ]
              │
              ▼
    ┌──────────────────┐
    │  Preprocessing   │  <-- Resizing (640x640), Normalization, Tensor Conversion
    └─────────┬────────┘
              │
              ▼
    ┌──────────────────┐
    │ YOLO Inference   │  <-- GPU Acceleration (CUDA / TensorRT / PyTorch)
    └─────────┬────────┘
              │
              ▼
    ┌──────────────────┐
    │  Postprocessing  │  <-- Non-Maximum Suppression (NMS), Box Scaling
    └─────────┬────────┘
              │
              ▼
[ Bounding Boxes, Confidence Scores & Classes ]
```

### Pipeline Components:
1. **Input Layer**: Supports high-definition CCTV feeds, drone telemetry streams, and mobile user uploads.
2. **Preprocessing Engine**: Converts raw image tensors to standardized shape `(1, 3, 640, 640)` with zero-padding and aspect-ratio preservation.
3. **Inference Backbone**: Utilizes Ultralytics YOLO architectures optimized for real-time edge and server inference.
4. **Post-Processing Engine**: Applies IoU-based Non-Maximum Suppression (NMS) to eliminate duplicate detections and formats bounding box coordinates `[xmin, ymin, xmax, ymax]` with class confidence scores.

---

## 3. Model Repository Architecture

The standalone model repository is structured as a self-contained directory containing model weights, metadata descriptors, label maps, hardware diagnostic scripts, and evaluation reports:

```text
MODELS/
├── Fire-Detection/           # Fire & Smoke detection artifacts
│   ├── best.pt               # YOLO26s model weight pointer
│   ├── metadata.json         # Model JSON metadata
│   ├── classes.txt           # Target classes (fire, smoke)
│   └── README.md             # Task documentation
├── Pothole-Detection/        # Road hazard detection artifacts
│   ├── yolov9c.pt            # YOLOv9c model weight pointer
│   ├── metadata.json         # Model JSON metadata
│   ├── classes.txt           # Target class (pothole)
│   └── README.md             # Task documentation
├── shared/                   # Common resources
│   ├── labels/               # Shared taxonomy definitions
│   └── configs/              # Shared YAML / hyperparameter files
├── IMPLEMENTATION_PLAN.md    # Master AI implementation strategy
├── MODEL_CARD.md             # Detailed technical model cards
├── DATASET_REPORT.md         # Data provenance and annotations
├── PERFORMANCE_REPORT.md     # Hardware latency & accuracy metrics
├── EVALUATION_REPORT.md      # Computer vision metric reference guide
├── FINAL_SUMMARY.md          # SIH project milestone summary
├── check_models.py           # Model structure validator
├── gpu_check.py              # Hardware & CUDA environment inspector
├── latency_test.py           # Real-time inference latency benchmark
├── evaluate.py               # Validation & mAP evaluation script
└── requirements.txt          # Python dependencies
```

---

## 4. Fire Model Integration Strategy

* **Architecture Choice:** **YOLO26s** (Ultralytics Lightweight Detection Backbone).
* **Rationale:** Fire and smoke require high temporal resolution and low frame latency to trigger rapid early-warning alerts. YOLO26s offers optimal balance between small target recall and high FPS inference.
* **Target Classes:** `fire`, `smoke`.
* **Deployment Profile:** Deployed on edge nodes (jetson/drones) and cloud alert services.
* **Data Flow:** Video frames are passed through the fire detector; detections exceeding a confidence threshold of `0.45` trigger immediate geo-tagged emergency alerts.

---

## 5. Pothole Model Integration Strategy

* **Architecture Choice:** **YOLOv9c** (Programmable Gradient Information Backbone).
* **Rationale:** Pothole detection demands high feature extraction precision to distinguish subtle road surface deformations, shadows, and cracks under varying road conditions.
* **Target Class:** `pothole`.
* **Deployment Profile:** Embedded in mobile patrol vehicles and municipal road audit camera streams.
* **Data Flow:** Road video feeds are analyzed at regular intervals; detected potholes are mapped with GPS coordinates and categorized by confidence.

---

## 6. Evaluation Workflow

The evaluation methodology follows a rigid multi-phase validation protocol:

```text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ 1. Env & GPU    │ --> │ 2. Model Structure│ --> │ 3. Latency      │
│    Check        │     │    Inspection   │     │    Benchmarking │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │ 4. Validation   │
                                                │    & mAP Eval   │
                                                └─────────────────┘
```

1. **Environment Verification (`gpu_check.py`)**: Validates PyTorch installation, CUDA availability, VRAM availability, and CPU fallback paths.
2. **Structure Inspection (`check_models.py`)**: Verifies layer counts, parameters, target class mappings, and metadata schemas.
3. **Latency Benchmarking (`latency_test.py`)**: Measures isolated preprocessing, GPU tensor forward pass, and postprocessing latency across 100 warm-up and test iterations.
4. **Validation Evaluation (`evaluate.py`)**: Runs dataset validation via Ultralytics `model.val()` to calculate mAP@50, mAP@50-95, Precision, Recall, and F1 scores when valid datasets are mounted.

---

## 7. Future Backend Integration Strategy

While the current `MODELS` repository remains decoupled, the design guarantees seamless integration with future microservices (e.g., FastAPI or Triton Inference Server):

* **Standardized JSON Metadata**: Backends dynamically load model parameters, input dimensions, and label maps directly from `metadata.json`.
* **Modular Inference Wrapper**: Backends import model paths and run inference via PyTorch / ONNX Runtime without hardcoding model logic inside API routes.
* **REST / gRPC Endpoints**: Future API layer will expose `/api/v1/detect/fire` and `/api/v1/detect/pothole` endpoints consuming tensors pre-processed according to the model cards.

---

## 8. Implementation Timeline

| Phase | Milestone | Scope / Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Repository Architecture | Directory structure, metadata schema, label definitions | **Completed** |
| **Phase 2** | Technical Documentation | Implementation Plan, Model Cards, Dataset & Evaluation Reports | **Completed** |
| **Phase 3** | Diagnostic Tooling | Python scripts (`gpu_check.py`, `check_models.py`, `latency_test.py`, `evaluate.py`) | **Completed** |
| **Phase 4** | Weight Acquisition | Download official trained weights from Hugging Face Hub | **Planned** |
| **Phase 5** | Dataset Mounting | Mount SIH benchmark evaluation datasets & execute `evaluate.py` | **Planned** |
| **Phase 6** | API Service Layer | Wrap model repository with FastAPI inference endpoints | **Planned (Future)** |

---

## 9. Key Deliverables

* `IMPLEMENTATION_PLAN.md` — Complete engineering roadmap.
* `MODEL_CARD.md` — Standardized model cards for YOLO26s and YOLOv9c.
* `DATASET_REPORT.md` — Provenance and annotation documentation.
* `PERFORMANCE_REPORT.md` — Hardware diagnostics and latency benchmarks.
* `EVALUATION_REPORT.md` — Academic reference for CV metrics.
* `FINAL_SUMMARY.md` — Hackathon submission summary.
* Automated Python Test Scripts — `gpu_check.py`, `check_models.py`, `latency_test.py`, `evaluate.py`.

---

## 10. Risk Management & Mitigation Strategy

| Identified Risk | Risk Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| **CUDA Driver Incompatibility** | Medium | `gpu_check.py` includes automatic fallback to CPU execution mode with warning logs. |
| **Missing Model Weight Files** | Low | Model scripts safely detect placeholder `.pt` text pointers and output instructions to pull from Hugging Face. |
| **Missing Evaluation Datasets** | Low | `evaluate.py` catches dataset path errors gracefully without raising unhandled exceptions or reporting fake metrics. |
| **Frame Drop on High-Res Video** | Medium | Automated pre-processing downsamples inputs to fixed 640x640 resolution before tensor inference. |
