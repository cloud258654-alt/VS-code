import sys
import os

project_dir = os.path.join(os.path.dirname(__file__), "VS-004 SVM kernel")
sys.path.insert(0, project_dir)
os.chdir(project_dir)

target = os.path.join(project_dir, "phase3_streamlit_app.py")
with open(target, encoding="utf-8") as f:
    code = compile(f.read(), target, "exec")
    exec(code, {"__name__": "__main__"})
