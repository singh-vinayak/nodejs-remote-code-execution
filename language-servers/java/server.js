const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/run', (req, res) => {
  const code = req.body.code;
  const tempFile = path.join(__dirname, 'TempCode.java');

  fs.writeFileSync(tempFile, code);

  exec(`javac ${tempFile} && java -cp ${path.dirname(tempFile)} TempCode`, (error, stdout, stderr) => {
    fs.unlinkSync(tempFile);
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(5001, () => console.log('Java server running on port 5001'));
