import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const SummaryForm = () => {
  const [checked, setChecked] = useState(false);

  const onChangeHandle = (event) => setChecked(event.target.checked);

  const checkboxLabel = (
    <span>
      I agree <span style={{ color: 'blue' }}>Terms and Conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={checked}
          onChange={onChangeHandle}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!checked}>
        Confirm order
      </Button>
    </Form>
  );
};
