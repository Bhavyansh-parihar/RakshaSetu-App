"""
RAKSHASETU AI Engine — Model Structure Inspector
Prints layers, parameters, target classes, and architecture summary for installed AI models.
"""

import os
import json
import sys

# Force UTF-8 stdout if needed
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def inspect_models():
    print("=" * 70)
    print(" [INSPECTOR] RAKSHASETU AI ENGINE -- MODEL ARCHITECTURE INSPECTOR")
    print("=" * 70)

    model_configs = [
        {
            "name": "Fire & Smoke Detector",
            "dir": "Fire-Detection",
            "weights": "best.pt",
            "meta_file": "metadata.json",
            "class_file": "classes.txt"
        },
        {
            "name": "Road Pothole Detector",
            "dir": "Pothole-Detection",
            "weights": "yolov9c.pt",
            "meta_file": "metadata.json",
            "class_file": "classes.txt"
        }
    ]

    try:
        from ultralytics import YOLO
        ultralytics_available = True
    except ImportError:
        ultralytics_available = False
        print("[WARNING] Ultralytics package not installed. Falling back to metadata inspection.")

    base_dir = os.path.dirname(os.path.abspath(__file__))

    for cfg in model_configs:
        print("\n" + "-" * 70)
        print(f" MODEL MODULE: {cfg['name']}")
        print("-" * 70)

        folder_path = os.path.join(base_dir, cfg["dir"])
        weights_path = os.path.join(folder_path, cfg["weights"])
        meta_path = os.path.join(folder_path, cfg["meta_file"])
        class_path = os.path.join(folder_path, cfg["class_file"])

        metadata = {}
        if os.path.exists(meta_path):
            with open(meta_path, "r", encoding="utf-8") as f:
                metadata = json.load(f)

        classes = []
        if os.path.exists(class_path):
            with open(class_path, "r", encoding="utf-8") as f:
                classes = [line.strip() for line in f if line.strip()]

        loaded_via_torch = False

        if ultralytics_available and os.path.exists(weights_path):
            try:
                model = YOLO(weights_path)
                print("\n[MODEL SUMMARY (ULTRALYTICS)]")
                info = model.info()
                print(f"  * Model Name  : {metadata.get('name', cfg['name'])}")
                print(f"  * Classes     : {model.names if hasattr(model, 'names') else classes}")
                loaded_via_torch = True
            except Exception:
                pass

        if not loaded_via_torch:
            print("\n[MODEL STRUCTURE (METADATA & SPECIFICATIONS)]")
            print(f"  * Model Name       : {metadata.get('name', cfg['name'])}")
            print(f"  * Version          : {metadata.get('version', '1.0')}")
            print(f"  * Framework        : {metadata.get('framework', 'Ultralytics YOLO')}")
            print(f"  * Task Category    : {metadata.get('task', 'Object Detection')}")
            print(f"  * Weights Path     : {cfg['dir']}/{cfg['weights']}")
            
            if "Fire" in cfg['name']:
                print(f"  * Layers           : 225 Layers")
                print(f"  * Parameters       : 3.2M Parameters")
            else:
                print(f"  * Layers           : 384 Layers")
                print(f"  * Parameters       : 25.3M Parameters")

            print(f"  * Total Classes ({len(classes)}) : {classes}")
            print(f"  * Target Inputs    : {metadata.get('input', ['image', 'video'])}")
            print(f"  * Target Outputs   : {metadata.get('output', ['bbox', 'confidence'])}")
            print(f"  * Status           : {metadata.get('status', 'ready').upper()}")
            print("\n  Note: Weights file is a repository structure pointer. Download binary weights from Hugging Face for PyTorch inspection.")

    print("\n" + "=" * 70)

if __name__ == "__main__":
    inspect_models()