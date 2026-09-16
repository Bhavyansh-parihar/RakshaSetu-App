"""
RAKSHASETU AI Engine — Accuracy & mAP Validation Evaluation Suite
Calculates Precision, Recall, mAP@50, mAP@50-95, and F1 Score using Ultralytics model.val().
Handles dataset and weight unavailability gracefully without reporting fake metrics.
"""

import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def run_evaluation():
    print("=" * 70)
    print(" [EVALUATION] RAKSHASETU AI ENGINE -- ACCURACY & MAP EVALUATION SUITE")
    print("=" * 70)

    model_configs = [
        {
            "name": "YOLO26s Fire & Smoke Detector",
            "weights": "Fire-Detection/best.pt",
            "data_config": "shared/configs/fire_dataset.yaml"
        },
        {
            "name": "YOLOv9c Pothole Detector",
            "weights": "Pothole-Detection/yolov9c.pt",
            "data_config": "shared/configs/pothole_dataset.yaml"
        }
    ]

    base_dir = os.path.dirname(os.path.abspath(__file__))

    ultralytics_available = False
    try:
        from ultralytics import YOLO
        ultralytics_available = True
    except Exception as e:
        print(f"[WARNING] Ultralytics import unavailable: {e}")

    for item in model_configs:
        print("\n" + "-" * 70)
        print(f" EVALUATION TARGET: {item['name']}")
        print("-" * 70)

        weights_path = os.path.join(base_dir, item["weights"])
        yaml_path = os.path.join(base_dir, item["data_config"])

        if not os.path.exists(weights_path):
            print(f"[ERROR] Model weights file not found at: {item['weights']}")
            continue

        is_placeholder = False
        try:
            with open(weights_path, "r", encoding="utf-8", errors="ignore") as f:
                header = f.read(100)
                if "Placeholder" in header or "RAKSHASETU" in header:
                    is_placeholder = True
        except Exception:
            pass

        if is_placeholder:
            print(f"[WARNING] Evaluation skipped for '{item['name']}'.")
            print(f"    * Cause   : Weights file '{item['weights']}' is a repository placeholder pointer.")
            print(f"    * Action  : Download binary PyTorch (.pt) weights from Hugging Face before running evaluate.py.")
            print(f"    * Metrics : Kept as TBD (No synthetic values generated).")
            continue

        if not os.path.exists(yaml_path):
            print(f"[WARNING] Evaluation dataset configuration not found at: '{item['data_config']}'")
            print(f"    * Cause   : Dataset YAML / image directory is not mounted.")
            print(f"    * Action  : Mount SIH validation dataset to '{item['data_config']}'.")
            print(f"    * Metrics : Kept as TBD (No synthetic values generated).")
            continue

        if ultralytics_available:
            try:
                print(f"[EXEC] Running model.val() on mounted dataset split...")
                model = YOLO(weights_path)
                metrics = model.val(data=yaml_path)

                precision = metrics.box.mp
                recall = metrics.box.mr
                map50 = metrics.box.map50
                map50_95 = metrics.box.map
                f1_score = 2 * (precision * recall) / (precision + recall + 1e-16)

                print("\n[VALIDATION RESULTS COMPUTED]")
                print(f"  * Precision (P)    : {precision:.4f}")
                print(f"  * Recall (R)       : {recall:.4f}")
                print(f"  * F1 Score         : {f1_score:.4f}")
                print(f"  * mAP@50           : {map50:.4f}")
                print(f"  * mAP@50-95        : {map50_95:.4f}")

            except Exception as ex:
                print(f"[EVALUATION ERROR] Execution failed: {str(ex)}")
                print(f"    * Metrics kept as TBD.")

    print("\n" + "=" * 70)

if __name__ == "__main__":
    run_evaluation()
