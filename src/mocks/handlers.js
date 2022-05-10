import { rest } from 'msw';
import { mockAPI } from './api';

export const handlers = [
  rest.get(`${mockAPI}/scoops`, (req, res, ctx) =>
    res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  ),
];
