FROM python:3.9-alpine

WORKDIR /app
COPY run_code.py /app/
EXPOSE 5000

CMD ["python", "run_code.py"]