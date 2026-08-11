import os
try:
    from PIL import Image
    print("PIL is installed!")
except ImportError:
    print("PIL is not installed.")
