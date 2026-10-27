@echo off
REM Запускает локальный сервер и открывает портфолио в браузере.
cd /d "%~dp0"
start "" http://localhost:8765/
py -m http.server 8765 2>nul || python -m http.server 8765
