require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3000
const PYTHON_HOST = process.env.PYTHON_HOST ?? 'python_runtime'
const PYTHON_PORT = process.env.PYTHON_PORT ?? 5000
const JAVA_HOST = process.env.JAVA_HOST ?? 'java_runtime'
const JAVA_PORT = process.env.JAVA_PORT ?? 5001
const JAVASCRIPT_HOST = process.env.JAVASCRIPT_HOST ?? 'javascript_runtime'
const JAVASCRIPT_PORT = process.env.JAVASCRIPT_PORT ?? 5002
const GOLANG_HOST = process.env.GOLANG_HOST ?? 'golang_runtime'
const GOLANG_PORT = process.env.GOLANG_PORT ?? 5003
const CPP_HOST = process.env.CPP_HOST ?? 'cpp_runtime'
const CPP_PORT = process.env.CPP_PORT ?? 5004
const axios = require('axios')
app.use(express.json())
app.use(express.text())

app.get('/api/v1/hello', (req, res, next) => {
    res.status(200).send({
        status: true,
        message: 'API is up and running. Hello World!!!'
    })
})

const endpoints = {
    python: `http://${PYTHON_HOST}:${PYTHON_PORT}/run`,
    java: `http://${JAVA_HOST}:${JAVA_PORT}/run`,
    javascript: `http://${JAVASCRIPT_HOST}:${JAVASCRIPT_PORT}/run`,
    golang: `http://${GOLANG_HOST}:${GOLANG_PORT}/run`,
    cpp: `http://${CPP_HOST}:${CPP_PORT}/run`,
};

app.post('/submit', async (req, res) => {
    const { code, language } = req.body;
    const endpoint = endpoints[language];

    if (!endpoint) {
        return res.status(400).json({ error: 'Unsupported language.' });
    }

    try {
        const response = await axios.post(endpoint, { code });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Execution failed.', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})