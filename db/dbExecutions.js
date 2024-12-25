const { pool } = require('./db');

const insertJobRecord = async (record) => {
    const { job_id, language, code, output, status, error } = record;

    const query = `
      INSERT INTO job_results (job_id, language, code, output, status, error)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
  
    const values = [job_id, language, code, output, status, error];
  
    try {
      const result = await pool.query(query, values);
      return {
        success: true,
        result: result.rows[0]
    };
    } catch (err) {
      console.error('Error saving job result:', err);
      return {
        success: false,
        error: new Error(`Failed to save job result - ${err}`)
      };
    }
};

module.exports.insertJobRecord = insertJobRecord;