const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/run', (req, res) => {
  const code = req.body.code;
  const tempFile = path.join(__dirname, 'tempCode.go');

  fs.writeFileSync(tempFile, code);

  exec(`go run ${tempFile}`, (error, stdout, stderr) => {
    fs.unlinkSync(tempFile); // Clean up
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(5003, () => console.log('Golang server running on port 5003'));
