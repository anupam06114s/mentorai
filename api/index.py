import sys
from pathlib import Path

# Add project root and backend to Python sys.path
root_dir = Path(__file__).resolve().parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

from backend.app.main import app

# Vercel ASGI entry point
app = app
