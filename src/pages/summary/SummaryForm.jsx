import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ORDER_PHASE } from '../../constants';

export const SummaryForm = ({ setOrderPhase }) => {
  const [checked, setChecked] = useState(false);

  const onChangeHandle = (event) => setChecked(event.target.checked);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOrderPhase(ORDER_PHASE.COMPLETED);
  };
  const popover = (
    <Popover id='termsandconditions-popover'>
      No ice cream will actually be delivered
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
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
