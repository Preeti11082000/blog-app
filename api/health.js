import { connectDB } from '../lib/mongodb.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const hasUri = !!process.env.MONGODB_URI;
  let dbStatus = 'unknown';
  let error = null;

  try {
    if (!hasUri) throw new Error('MONGODB_URI not set');
    await connectDB();
    dbStatus = 'connected';
  } catch (e) {
    dbStatus = 'disconnected';
    error = e.message;
  }

  return res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    env: {
      hasMONGODB_URI: hasUri,
      nodeEnv: process.env.NODE_ENV || 'unknown',
    },
    db: {
      status: dbStatus,
      error,
      fallback: 'in-memory store active when DB disconnected - add MONGODB_URI in Vercel env vars for persistence',
    },
  });
}
