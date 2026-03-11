import cron from 'node-cron';
import axios from 'axios';

export const startRenderSelfPing = () => {
  const BACKEND_URL = 'https://upkar-backend.onrender.com';

  console.log(' Render self-ping service initialized...');

  // Ping every 2 minutes
  cron.schedule('*/2 * * * *', async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/health`);
      console.log(' Self-ping successful:', res.data?.message || 'OK');
    } catch (err) {
      console.error(' Self-ping failed:', err.message);
    }
  });
};
