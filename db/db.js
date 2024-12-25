const { Pool } = require('pg');
require('dotenv').config()
// PostgreSQL configuration
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'admin', // Replace with your PostgreSQL username
  host: process.env.POSTGRES_HOST || 'localhost', // Replace with your PostgreSQL host
  database: process.env.POSTGRES_DATABASE || 'mydb', // Replace with your PostgreSQL database
  password: process.env.POSTGRES_PASSWORD || 'admin', // Replace with your PostgreSQL password
  port: process.env.POSTGRES_PORT || 5432, // Replace with your PostgreSQL port
});

// Function to create 'job_results' table if not already present
const connectToDB = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS job_results (
      id SERIAL PRIMARY KEY,
      job_id UUID NOT NULL,
      language VARCHAR(50) NOT NULL,
      code TEXT NOT NULL,
      output TEXT,
      status VARCHAR(50) NOT NULL,
      error TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const client = await pool.connect();
    await client.query(query);
    console.log('job_results table is ready.');
    client.release();
  } catch (err) {
    console.error('Error creating job_results table:', err);
    process.exit(1); // Exit on failure
  }
};

connectToDB()
// Export pool and initialization function
module.exports = {
  pool
};
