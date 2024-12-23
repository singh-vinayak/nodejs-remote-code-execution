const languageConfig = (language, code) => {
    const images = {
        js: 'node:22-alpine',
        py: 'python:3.9-alpine',
        java: 'openjdk:11-jdk',
        cpp: 'gcc:latest',
    };

    const commands = {
        js: `node tempCode.js`,
        py: `python3 tempCode.py`,
        java: `echo '${code}' > Main.java && javac Main.java && java Main`,
        cpp: `echo '${code}' > main.cpp && g++ -o main main.cpp && ./main`,
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