@echo off
echo Starting zWSL Manager Environment...
python -m pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install requirements. Please ensure Python is installed.
    pause
    exit /b
)
echo Launching GUI...
python zWSL_Manager.py
pause
