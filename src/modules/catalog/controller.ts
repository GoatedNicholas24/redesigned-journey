import { Router } from 'express';
import { z } from 'zod';
import { supabaseAuth } from '../../middleware/auth.js';
import { getFeed } from './service.js';

const router = Router();

router.get('/feed', async (req, res) => {
  const feed = await getFeed(req.query);
  res.json({ data: feed });
});

export default router;
