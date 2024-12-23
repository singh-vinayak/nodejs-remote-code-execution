const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { languageConfig } = require('./configs/languageConfigs')

async function executeCode(code, language) {
    try {
        // Create a temporary file
        const filename = path.join(__dirname, 'shared', `tempCode.${language}`);
        console.log('filename --->', filename)
        fs.writeFileSync(filename, code);

        if (!fs.existsSync(filename)) {
            console.error(`File does not exist: ${filePath}`);
            process.exit(1);
        }
        else {

            setTimeout(() => {
                const { image, command } = languageConfig(language, code)
                const finalCommand = `docker run --rm ${image} sh -c "${command}"`;
                console.log('finalCommand --->', finalCommand)
                return new Promise((resolve, reject) => {

                    exec(finalCommand, {timeout: 10000}, (error, stdout, stderr) => {

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
            }, 2000)
        }
    } catch (error) {
        throw error
    }
}

module.exports = executeCode;
