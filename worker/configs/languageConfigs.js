const languageConfig = (language) => {
    const images = {
        js: 'node:current-alpine',
        py: 'python:3.9-alpine',
        java: 'openjdk:11-jdk',
        cpp: 'gcc:latest',
        ruby: 'ruby:latest', // Adding Ruby
        go: 'golang:1.24rc1-alpine3.21', // Adding Go
    };

    const commands = {
        js: `node /app/tempCode.js`,
        py: `python3 /app/tempCode.py`,
        java: `javac /app/tempCode.java && java -cp /app tempCode`,
        cpp: `g++ /app/tempCode.cpp -o /app/a.out && /app/a.out`,
        go: `go run /app/tempCode.go`,
        ruby: `ruby /app/tempCode.rb`
    };

    if (!images[language] || !commands[language]) {
        return new Error(`Unsupported language: ${language}`);
    }

    return {
        image: images[language],
        command: commands[language]
    };
}

module.exports.languageConfig = languageConfig