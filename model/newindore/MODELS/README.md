# RAKSHASETU AI Models

Welcome to the central AI Model Repository for the **RAKSHASETU** platform. This repository serves as a standalone, backend-agnostic, and frontend-agnostic asset store for organizing vision and AI models, weight specifications, class labels, model metadata, and model registries used throughout the project.

---

## 📌 Repository Purpose

The `MODELS/` directory acts as the single source of truth for all machine learning and deep learning models deployed within RAKSHASETU. By keeping model specifications, weights, class lists, and documentation isolated from application logic, any backend framework (e.g., FastAPI, PyTorch Serving, Triton, or ONNX Runtime) or frontend client can interface with or pull models cleanly without tight coupling.

---

## 📁 Directory Structure

```text
MODELS/
│
├── README.md                 # Main AI Models Repository Documentation
│
├── Fire-Detection/           # Fire & Smoke Detection Model
│   ├── best.pt               # Model weights (placeholder / HuggingFace remote reference)
│   ├── README.md             # Fire detection model documentation
│   ├── classes.txt           # Class labels (fire, smoke)
│   └── metadata.json         # Standardized JSON metadata
│
├── Pothole-Detection/        # Road Pothole Detection Model
│   ├── yolov9c.pt            # Model weights (placeholder / HuggingFace remote reference)
│   ├── README.md             # Pothole detection model documentation
│   ├── classes.txt           # Class labels (pothole)
│   └── metadata.json         # Standardized JSON metadata
│
├── shared/                   # Common resources across models
│   ├── labels/               # Shared label maps and multi-task class definitions
│   └── configs/              # Model configuration specs (YAML, JSON, hyperparams)
│
└── docs/                     # Global repository documentation
    └── MODEL_REGISTRY.md     # Master model registry and status tracker
```

---

## 🏷️ Naming & Structure Conventions

To maintain uniformity as new AI models are integrated into RAKSHASETU, strictly adhere to the following standards:

1. **Folder Naming**: `Task-Name` in Title-Kebab-Case (e.g., `Fire-Detection`, `Flood-Detection`, `Landslide-Detection`).
2. **Model Weights**: `.pt` (PyTorch/Ultralytics standard), `.onnx`, or `.engine` extension.
3. **Class Labels (`classes.txt`)**: Plain text file containing one class name per line matching the model's output indices.
4. **Metadata Specification (`metadata.json`)**:
   ```json
   {
     "name": "<Model Name>",
     "version": "<Version>",
     "framework": "<Framework Name>",
     "task": "<Task Category>",
     "weights": "<filename>",
     "input": ["image", "video"],
     "output": ["bbox", "confidence"],
     "status": "ready | training | planned"
   }
   ```

---

## 🚀 How to Add Future Models

When adding a new AI model to this repository, follow these steps:

1. Create a new directory named after the detection task (e.g., `MODELS/Flood-Detection/`).
2. Add the model weights file (e.g., `model.pt` or place a remote download placeholder).
3. Create `classes.txt` listing all output classes in index order.
4. Add a standard `metadata.json` defining model properties and inputs/outputs.
5. Create a model-specific `README.md` documenting architecture, performance, and usage details.
6. Register the model in `docs/MODEL_REGISTRY.md` table.

---

## 🎯 Supported Task Categories

The RAKSHASETU AI suite encompasses disaster monitoring, hazard detection, and infrastructure safety:

* 🔥 **Fire & Smoke Detection** (Active)
* 🕳️ **Pothole Detection** (Active)
* 🌊 **Flood Detection** (Planned)
* ⛰️ **Landslide Detection** (Planned)
* 🧱 **Crack Detection** (Planned)
* 🏗️ **Structural Damage Detection** (Planned)

---

## 📦 Weight Storage Notice

Large model weight files (`.pt`, `.onnx`) are stored as placeholders in this repository structure. Actual pre-trained weights will be downloaded directly from the official **Hugging Face Hub** repository during deployment pipelines.
