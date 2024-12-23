FROM openjdk:18-jdk-slim

WORKDIR /app

# Copy the script to handle code execution
COPY run_code.java.sh /app/
RUN chmod +x run_code.java.sh

EXPOSE 5000

CMD ["sh", "run_code.java.sh"]