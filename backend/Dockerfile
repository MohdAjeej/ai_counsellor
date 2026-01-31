# Railway (and others): use this so the build plan works. Railway builds with Dockerfile when present.
FROM python:3.11-slim

WORKDIR /app

# Install dependencies first for better layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Railway sets PORT at runtime; default for local
ENV PORT=8000
EXPOSE 8000

# start.sh reads PORT from env so Railway's $PORT is used
COPY start.sh .
RUN chmod +x start.sh
CMD ["./start.sh"]
