const axios = require('axios');

const BASE_URL = 'http://localhost:8000/api/v1';

test('Submit and Read status of a task', async () => {
    // Submit API
    const submitResponse = await axios.post(`${BASE_URL}/submit`, {
        code: 'print("Hello, world!");',
        language: 'py',
    });
    expect(submitResponse.status).toBe(202);
    const taskId = submitResponse.data.taskId;
    console.log(taskId)

    let statusResponse;
    do {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        statusResponse = await axios.get(`${BASE_URL}/status/${taskId}`);
        console.log(statusResponse)
    } while (statusResponse.data.status === 'running');


    // Verify the result
    expect(statusResponse.data.status).toBe('completed');
    expect(statusResponse.data.result.trim()).toBe('Hello, world!');
});