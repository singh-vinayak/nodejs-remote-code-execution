const languageConfig = (language) => {
    const images = {
        js: 'node:current-alpine',
        py: 'python:3.9-alpine',
        java: 'openjdk:11-jdk',
        cpp: 'gcc:latest',
    };

    const commands = {
        js: `node /app/tempCode.js`,
        py: `python3 /app/tempCode.py`,
        java: `/bin/sh -c "javac /app/tempCode.java && java -cp /app tempCode"`,
        cpp: `/bin/sh -c "g++ /app/tempCode.cpp -o /app/a.out && /app/a.out"`,
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