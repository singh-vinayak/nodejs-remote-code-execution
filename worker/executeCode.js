const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { languageConfig } = require('./configs/languageConfigs')

let filename = ``

async function executeCode(code, language) {
    try {
        // Create a temporary file
        const tempDir = os.tmpdir();
        filename = path.join(tempDir, `tempCode.${language}`);
        fs.writeFileSync(filename, code);
        if (language === 'java') {

            return executeCommand(`sh ./Scripts/javaCompilation.sh ${filename}`
            )
        } else if (language === 'cpp') {

        } else {
            const { image, command } = languageConfig(language)
            const finalCommand = `docker run --rm -v "${tempDir}:/app" ${image} sh -c "${command}"`;

            return executeCommand(finalCommand);
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const executeCommand = async (command) => {
    return new Promise((resolve, reject) => {

        exec(command, (error, stdout, stderr) => {

            console.log(stdout)

            // Clean up temp file
            fs.unlinkSync(filename)

            if (error) {
                console.log(error)
                return reject(new Error(stderr || error.message));
            }
            resolve(stdout);
        });
    });
}

module.exports = executeCode;
