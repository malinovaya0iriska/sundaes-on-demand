import { rest } from 'msw';
import { ENDPOINTS, mockURL } from './api';

export const handlers = [
  rest.get(`${mockURL}${ENDPOINTS.SCOOPS}`, (req, res, ctx) =>
    res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  ),
  rest.get(`${mockURL}${ENDPOINTS.TOPPINGS}`, (req, res, ctx) =>
    res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
      ])
    )
  ),
];
