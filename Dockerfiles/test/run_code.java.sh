#!/bin/bash

# Simple HTTP server using nc (netcat) for demonstration
while true; do
    echo -e "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n$(handle_request)" | nc -l -p 5000
done

handle_request() {
    # Read input code from POST data
    read code
    echo "$code" > tempCode.java

    # Compile and run the Java code
    javac tempCode.java
    if [ $? -eq 0 ]; then
        output=$(java tempCode 2>&1)
        echo "{\"output\": \"$output\"}"
    else
        echo "{\"error\": \"Compilation failed.\"}"
    fi
}
