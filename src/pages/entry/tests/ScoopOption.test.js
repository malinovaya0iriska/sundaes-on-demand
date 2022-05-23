import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScoopOption } from '../ScoopOption';

test('invalidate input turns red', () => {
  render(<ScoopOption name='' imagePath='' updateItemCount={jest.fn()} />);

  const vanillaInput = screen.getByRole('spinbutton');

  // expect input to be invalid with negative number
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-4');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with decimal input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1.8');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with input that's too high
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '3');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
