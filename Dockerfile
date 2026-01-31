# Build backend when Railway (or Docker) runs from repo root. Railway uses this if Root Directory is not set.
FROM python:3.11-slim

WORKDIR /app

# Backend deps
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Backend code (includes start.sh)
COPY backend/ .
RUN chmod +x start.sh

ENV PORT=8000
EXPOSE 8000

CMD ["./start.sh"]
