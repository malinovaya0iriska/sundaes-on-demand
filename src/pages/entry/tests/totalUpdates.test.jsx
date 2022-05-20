import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Options } from '../Options';
import { render } from '../../../test-utils/testing-library-utils';
import { ENDPOINTS } from '../../../mocks/api';
import { OrderEntry } from './../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType={ENDPOINTS.SCOOPS} />);

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType={ENDPOINTS.TOPPINGS} />);

  const toppingsTotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent('0.00');

  const mAndMsCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  userEvent.click(mAndMsCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  const cherrieCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherrieCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  userEvent.click(cherrieCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('update grand total when order change', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });

    userEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const grandTotal = screen.getByRole('heading', {
      name: /grand total:/i,
    });
    expect(grandTotal).toHaveTextContent('3.50');

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
