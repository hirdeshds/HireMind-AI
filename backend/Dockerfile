FROM python:3.11-slim

# Create a non-root user (Hugging Face Spaces requirement)
RUN useradd -m -u 1000 user

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application files and ensure the non-root user owns them
# This allows the SQLite database to be created successfully in the /app directory
COPY --chown=user:user . .

USER user

# Hugging Face Spaces expose port 7860
EXPOSE 7860

# Use Gunicorn with Uvicorn workers for production
CMD ["gunicorn", "app.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:7860"]
