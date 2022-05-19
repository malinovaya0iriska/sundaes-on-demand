import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { ScoopOption } from './ScoopOption';
import { ToppingOption } from './ToppingOption';
import { ENDPOINTS, mockURL } from './../../mocks/api';
import { AlertBanner } from '../common/AlertBanner';
import { pricePerItem } from './../../constants';
import { useOrderDetails } from '../../context/OrderDetailes';

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  const ItemComponent =
    optionType === ENDPOINTS.SCOOPS ? ScoopOption : ToppingOption;

  const title = optionType[1].toUpperCase() + optionType.slice(2).toLowerCase();

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent
      key={name}
      name={name}
      imagePath={imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  console.log(orderDetails.totals);
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
  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails?.totals[optionType.slice(1)]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};
