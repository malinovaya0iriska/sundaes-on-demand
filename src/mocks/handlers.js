import { rest } from 'msv';
import { mockAPI } from './api';

export const handlers = [
  rest.get(mockAPI, (req, res, ctx) =>
    res(
      ctx.json([
        { name: 'Cholate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  ),
];
