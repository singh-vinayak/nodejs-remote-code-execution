const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/run', (req, res) => {
  const code = req.body.code;
  const tempFile = path.join(__dirname, 'tempCode.js');

  fs.writeFileSync(tempFile, code);

  exec(`node ${tempFile}`, (error, stdout, stderr) => {
    fs.unlinkSync(tempFile); // Clean up
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(5002, () => console.log('JavaScript server running on port 5002'));
