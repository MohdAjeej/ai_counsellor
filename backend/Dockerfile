# Railway (and others): use this so the build plan works. Railway builds with Dockerfile when present.
FROM python:3.11-slim

WORKDIR /app

# Install dependencies first for better layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Railway sets PORT; default for local
ENV PORT=8000
EXPOSE $PORT

# Run FastAPI with uvicorn
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT}
