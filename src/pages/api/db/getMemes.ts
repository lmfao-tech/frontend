import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'redis';

const client = createClient(({url: process.env.REDIS_URL}));

