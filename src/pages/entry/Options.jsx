import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { ScoopOption } from './ScoopOption';
import { ToppingOption } from './ToppingOption';
import { ENDPOINTS, mockURL } from './../../mocks/api';
import { AlertBanner } from '../common/AlertBanner';

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  const ItemComponent =
    optionType === ENDPOINTS.SCOOPS ? ScoopOption : ToppingOption;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  useEffect(() => {
    axios
      .get(`${mockURL}${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }
  return <Row>{optionItems}</Row>;
};
