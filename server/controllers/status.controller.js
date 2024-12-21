const redis = require('../redis');

module.exports.getStatus = async (req, res) => {
    const { taskId } = req.params;

    // Fetch task status from Redis
    const taskData = await redis.get(`task:${taskId}`);

    if (!taskData) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(JSON.parse(taskData));
};

