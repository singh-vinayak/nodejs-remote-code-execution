const redis = require('../redis');
const crypto = require('crypto');


module.exports.submitCode =  async (req, res) => {
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

    res.status(202).json({ taskId, message: 'Task queued successfully' });
};

