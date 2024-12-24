const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/run', (req, res) => {
  const code = req.body.code;
  const tempFile = path.join(__dirname, 'tempCode.cpp');
  const outputFile = path.join(__dirname, 'a.out');

  fs.writeFileSync(tempFile, code);

  exec(`g++ ${tempFile} -o ${outputFile} && ${outputFile}`, (error, stdout, stderr) => {
    fs.unlinkSync(tempFile); // Clean up
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(5004, () => console.log('C++ server running on port 5004'));
