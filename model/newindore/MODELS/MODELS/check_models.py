from ultralytics import YOLO

print("Checking models...")

models = {
    "Fire": "../Fire-Detection/best.pt",
    "Pothole": "../Pothole-Detection/models/yolov9c.pt"
}

for name, path in models.items():
    print("\n" + "=" * 60)
    print(f"MODEL: {name}")

    model = YOLO(path)
    model.info()

    print("\nClasses:")
    print(model.names)