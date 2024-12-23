#!/bin/bash

# Check if the file argument is provided
if [ -z "$1" ]; then
  echo "Error: No file name provided."
  exit 1
fi

# Get the file name (without extension) and full path
FILE_NAME=$(basename -- "$1")
CLASS_NAME="${FILE_NAME%.*}"
FILE_DIR=$(dirname "$1")

# Navigate to the directory containing the file
cd "$FILE_DIR" || exit 1

# Compile the Java file
javac "$FILE_NAME"
if [ $? -ne 0 ]; then
  echo "Compilation Error."
  exit 1
fi

# Run the compiled Java program
java "$CLASS_NAME"
