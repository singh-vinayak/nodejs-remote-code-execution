const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Worker } = require('bullmq')
const Redis = require('ioredis');
const redisConnection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null
})

const app = express();
app.use(express.json());

app.post('/run', async (req, res) => {

  const worker = new Worker(
    'code_execution',
    async (job) => {
      const task = job.data;
      console.log('Processing task:', task);
  
      // Execute the code (placeholder for execution logic)
      const result = await executeCode(task.code);
  
      console.log('Task result:', result);
      return result;
    },
    { connection: redisConnection }
  );
  
  worker.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
    return res.json({ success: true, output: result })
  });
  
  worker.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed with error:`, err);
    return res.status(500).json({ success: false, error: err.message });
  });
});

async function executeCode(code) {
  const tempFile = path.join(__dirname, 'tempCode.js');

  fs.writeFileSync(tempFile, code);

  return new Promise((resolve, reject) => {
    exec(`node ${tempFile}`, (error, stdout, stderr) => {
      fs.unlinkSync(tempFile); // Clean up
      if (error || stderr) {
         return reject(stderr)
      } else {
        resolve(stdout);
      }
    });
  })
}

app.listen(5002, () => console.log('JavaScript server running on port 5002'));
