const redis = require('../server/redis');
const executeCode = require('./executeCode');
const { pool } = require('../db/db')
const { insertJobRecord } = require('../db/dbExecutions')

async function processQueue() {
    console.log('Worker started, waiting for tasks...');

    while (true) {
        // Fetch task from Redis queue
        const taskData = await redis.brpop('codeQueue', 0);
        const task = JSON.parse(taskData[1]);

        console.log(`Processing task: ${task.taskId}`);

        // Update task status
        await redis.set(`task:${task.taskId}`, JSON.stringify({ status: 'running' }));

        try {
            // Execute code
            const result = await executeCode(task.code, task.language);
            // Save result to Redis
            await redis.set(`task:${task.taskId}`, JSON.stringify({ status: 'completed', result }));

            const dbUpdation = await insertJobRecord({
                job_id: task.taskId,
                language: task.language,
                code: task.code,
                output: result,
                status: 'completed',
                error: null
            })

            if (dbUpdation.success) {
                console.log(`Task ${task.taskId} completed.`);
            } else {
                await redis.set(`task:${task.taskId}`, JSON.stringify({ status: 'failed', error: dbUpdation.error }));
            }
        } catch (error) {
            // Save error to Redis
            // console.log(error);
            await redis.set(`task:${task.taskId}`, JSON.stringify({ status: 'failed', error: error.message }));
            const dbUpdation = await insertJobRecord({
                job_id: task.taskId,
                language: task.language,
                code: task.code,
                output: null,
                status: 'failed',
                error: error.message
            })
            console.error(`Task ${task.taskId} failed:`, error.message);
        }
    }
}

processQueue();
