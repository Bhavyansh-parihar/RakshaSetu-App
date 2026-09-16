# RAKSHASETU Model Hardware & Performance Benchmarks

This report documents hardware specs, latency breakdowns, and accuracy evaluation structures for the RAKSHASETU AI models.

---

## 1. Hardware Environment Specification

Hardware detection and CUDA capabilities are inspected dynamically using `gpu_check.py`.

### 🖥️ Target Execution Environments

| Environment Profile | Compute Device | CUDA Support | Recommended Batch Size | Target FPS |
| :--- | :--- | :--- | :--- | :--- |
| **Cloud GPU Server** | NVIDIA RTX 4090 / A100 | CUDA 12.x Enabled | 8 / 16 | 60+ FPS |
| **Workstation GPU** | NVIDIA RTX 3060 / 4060 | CUDA 11.8 / 12.1 Enabled | 4 | 45+ FPS |
| **Edge Compute (Drone/Jetson)** | NVIDIA Jetson Orin Nano | CUDA / TensorRT | 1 | 30+ FPS |
| **CPU Fallback** | Intel Core i7 / AMD Ryzen | CPU (OpenMP / ONNX) | 1 | 10–15 FPS |

---

## 2. Latency Performance Analysis

Latency testing measures isolated pipeline components in milliseconds ($\text{ms}$) per frame using `latency_test.py`.

### ⏱️ Latency Component Breakdown

* **Preprocessing Latency:** Includes image loading, letterbox resizing to $640 \times 640$, array transposition from HWC to CHW format, channel normalization, and PyTorch tensor conversion.
* **Inference Latency:** Measures the forward pass time through the deep neural network backbone, feature pyramid network (FPN), and detection head.
* **Postprocessing Latency:** Measures Non-Maximum Suppression (NMS) bounding box filtering, confidence thresholding, and coordinate rescaling to original frame dimensions.
* **Total End-to-End Latency:** Sum of Preprocessing + Inference + Postprocessing latency.

$$\text{Total Latency} = t_{\text{preprocess}} + t_{\text{inference}} + t_{\text{postprocess}}$$

> [!TIP]
> Run `python latency_test.py` to calculate exact real-time latency numbers on your host GPU/CPU hardware once official model weights are mounted.

---

## 3. Accuracy Metrics Benchmark Table

The following table records validation accuracy metrics computed on mounted test splits using `evaluate.py`.

| Metric | Fire Model (YOLO26s) | Pothole Model (YOLOv9c) | Target Benchmark |
| :--- | :--- | :--- | :--- |
| **Precision** | TBD | TBD | $> 0.85$ |
| **Recall** | TBD | TBD | $> 0.80$ |
| **F1 Score** | TBD | TBD | $> 0.82$ |
| **mAP@50** | TBD | TBD | $> 0.88$ |
| **mAP@50–95** | TBD | TBD | $> 0.65$ |
| **IoU (Intersection over Union)** | TBD | TBD | $> 0.70$ |

> [!IMPORTANT]
> In accordance with strict evaluation protocols, accuracy values are marked as **TBD** until official validation datasets are mounted and evaluated via `python evaluate.py`. No benchmark values have been fabricated.
