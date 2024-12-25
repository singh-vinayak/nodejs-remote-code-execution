const redis = require('../redis');
const crypto = require('crypto');
const { insertJobRecord } = require('../../db/dbExecutions')

module.exports.submitCode = async (req, res) => {
    try {
        const { code, language } = req.body;

        if (!code || !language) {
            return res.status(400).json({ error: 'Code and language are required' });
        }

        const taskId = crypto.randomUUID();

        const task = {
            taskId,
            code,
            language,
            status: 'queued'
        };
        await redis.lpush('codeQueue', JSON.stringify(task));

        await redis.set(`task:${taskId}`, JSON.stringify({ status: 'queued' }));
        const dbUpdation = await insertJobRecord({
            job_id: taskId,
            language: language,
            code: code,
            output: '',
            status: 'queued',
            error: ''
        })
        if(dbUpdation.success) {
            return res.status(202).json({ taskId, message: 'Task queued successfully' });
        } else {
            // console.log(dbUpdation.error)
            return res.status(500).json({ error: dbUpdation.error });
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

