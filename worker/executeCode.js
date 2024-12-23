const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { languageConfig } = require('./configs/languageConfigs')

async function executeCode(code, language) {
    try {
        // Create a temporary file
        const tempDir = os.tmpdir();
        const filename = path.join(tempDir, `tempCode.${language}`);
        fs.writeFileSync(filename, code);
        if (language === 'java') {
            return new Promise((resolve,reject) => {
                exec()
            })
        } else if (language === 'cpp') {

        } else {
            const { image, command } = languageConfig(language)
            const finalCommand = `docker run --rm -v "${tempDir}:/app" ${image} sh -c "${command}"`;

            return new Promise((resolve, reject) => {

                exec(finalCommand, (error, stdout, stderr) => {

                    console.log(stdout)

                    // Clean up temp file
                    fs.unlinkSync(filename)

                    if (error) {
                        return reject(new Error(stderr || error.message));
                    }

                    resolve(stdout);
                });
            });
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = executeCode;
