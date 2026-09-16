# RAKSHASETU Computer Vision & Machine Learning Evaluation Guide

This document provides a concise academic reference guide explaining core Machine Learning paradigms, evaluation metrics, and hardware acceleration concepts utilized in the RAKSHASETU AI evaluation suite.

---

## 1. Machine Learning Paradigms

### Supervised Learning
A machine learning paradigm where models are trained on labeled datasets containing explicit input-output pairs. In RAKSHASETU, object detection models learn to predict bounding boxes and hazard classes by mapping images to human-annotated ground-truth labels.

### Unsupervised Learning
A training approach that discovers hidden patterns, clusters, or representations in unlabeled data without explicit ground-truth targets. Used in advanced anomaly detection modules to identify unusual environmental shifts prior to labeled hazard detection.

### Reinforcement Learning
An agent-based learning framework where an agent learns decision-making policies through trial-and-error interactions with an environment, receiving scalar rewards or penalties. Applicable to autonomous drone flight path optimization during disaster surveillance.

### Transfer Learning
A machine learning technique where knowledge gained from solving one task (e.g., general object recognition on COCO) is leveraged to jumpstart learning on a related target task. Enables RAKSHASETU models to achieve high accuracy with smaller specialized hazard datasets.

### Fine-tuning
The process of taking a pre-trained neural network model and further training its weights on a smaller, domain-specific dataset with lower learning rates. RAKSHASETU fine-tunes baseline YOLO checkpoints specifically on fire, smoke, and pothole instances.

---

## 2. Detection & Accuracy Metrics

### Precision
The ratio of true positive detections to the total number of positive detections predicted by the model ($\text{Precision} = \frac{TP}{TP + FP}$). It measures the model's ability to avoid false alarms (e.g., misidentifying glare as fire).

### Recall
The ratio of true positive detections to the total number of actual ground-truth objects present ($\text{Recall} = \frac{TP}{TP + FN}$). It quantifies the model's sensitivity to detecting all real hazard instances without missing critical threats.

### F1 Score
The harmonic mean of Precision and Recall ($\text{F1} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$). Serves as a balanced single-metric evaluation when optimizing trade-offs between false positives and missed detections.

### mAP@50 (Mean Average Precision at IoU threshold 0.50)
The average Precision calculated across all classes when a detection bounding box is considered correct if its Intersection over Union (IoU) with the ground truth is at least $50\%$. Primary benchmark for object detection accuracy.

### mAP@50–95
The mean Average Precision averaged over 10 IoU thresholds ranging from $0.50$ to $0.95$ in steps of $0.05$ ($\text{mAP@[0.50:0.05:0.95]}$). Demands high spatial localization precision across varied bounding box overlap criteria.

### IoU (Intersection over Union)
The ratio of the area of overlap between the predicted bounding box ($A_p$) and ground-truth box ($A_g$) to the area of their total combined union ($\text{IoU} = \frac{|A_p \cap A_g|}{|A_p \cup A_g|}$). Quantifies spatial localization accuracy.

---

## 3. System & Compute Metrics

### Latency
The total time taken (in milliseconds) to process a single input frame through the complete AI pipeline. Critical for real-time emergency systems where low latency correlates directly with faster emergency response dispatching.

### Throughput
The number of input items (frames or batches) processed by the neural network per unit time, measured in Frames Per Second (FPS). Higher throughput allows parallel analysis of multiple surveillance camera streams.

### GPU Acceleration
The utilization of specialized Graphics Processing Units (GPUs) alongside Parallel Compute Architectures (NVIDIA CUDA, TensorRT) to accelerate matrix operations. Enables real-time deep learning inference compared to CPU execution.

### Parameters
The total count of learnable weights and biases within the neural network layers optimized during training. Parameter size influences memory consumption, weight file footprint, and model representational capacity.

### Layers
The sequential architectural depth of neural network operations (convolutional blocks, attention modules, feature fusion necks, detection heads). Dictates feature hierarchy abstraction from low-level edges to complex semantic objects.
