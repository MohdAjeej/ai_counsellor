#!/bin/sh
# Use PORT from env (Railway sets it); default 8000
exec uvicorn main:app --host 0.0.0.0 --port "${PORT:-8000}"
