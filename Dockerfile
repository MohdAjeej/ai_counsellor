# Build backend when Railway (or Docker) runs from repo root. Railway uses this if Root Directory is not set.
FROM python:3.11-slim

WORKDIR /app

# Backend deps
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Backend code
COPY backend/ .

ENV PORT=8000
EXPOSE $PORT

CMD uvicorn main:app --host 0.0.0.0 --port ${PORT}
