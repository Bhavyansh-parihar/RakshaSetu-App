"""
RAKSHASETU AI Engine — GPU & Compute Hardware Inspector
Detects CUDA availability, active GPU device parameters, VRAM allocation, and CPU fallback paths.
"""

import sys
import torch

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def inspect_gpu():
    print("=" * 70)
    print(" [HARDWARE] RAKSHASETU AI ENGINE -- HARDWARE & COMPUTE DIAGNOSTICS")
    print("=" * 70)

    print(f"Python Version : {sys.version.split()[0]}")
    print(f"PyTorch Version: {torch.__version__}")

    cuda_available = torch.cuda.is_available()
    
    if cuda_available:
        device_count = torch.cuda.device_count()
        device_name = torch.cuda.get_device_name(0)
        cuda_version = torch.version.cuda
        
        print("\n[STATUS] GPU ACCELERATION: AVAILABLE [OK]")
        print(f"  * CUDA Version    : {cuda_version}")
        print(f"  * GPU Device Count: {device_count}")
        print(f"  * Primary Device  : {device_name}")
        
        total_mem_bytes = torch.cuda.get_device_properties(0).total_memory
        total_mem_gb = total_mem_bytes / (1024 ** 3)
        print(f"  * Total GPU VRAM  : {total_mem_gb:.2f} GB")
        
        print("\n[RECOMMENDATION] System is configured for high-performance GPU tensor inference.")
    else:
        print("\n[STATUS] GPU ACCELERATION: NOT AVAILABLE [CPU FALLBACK]")
        print("  * Compute Engine  : CPU Fallback Mode")
        print("  * Reason         : CUDA-capable GPU or PyTorch CUDA runtime not detected.")
        print("\n[RECOMMENDATION] Inference will execute on CPU. For real-time 60+ FPS processing, install CUDA drivers.")

    print("=" * 70)

if __name__ == "__main__":
    inspect_gpu()
