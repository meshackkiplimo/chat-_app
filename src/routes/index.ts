import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Chat App Backend Running');
});

export default router;