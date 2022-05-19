import { render, screen, waitFor } from '@testing-library/react';
import { OrderEntry } from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { OrderDetailsProvider } from '../../../context/OrderDetailes';
import { mockURL, ENDPOINTS } from '../../../mocks/api';

test('handle error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get(`${mockURL}${ENDPOINTS.SCOOPS}`, (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  server.resetHandlers(
    rest.get(`${mockURL}${ENDPOINTS.TOPPINGS}`, (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry />, {
    wrapper: OrderDetailsProvider,
  });
  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test.skip('test that is skipped', () => {});
