import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }
  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateOptionCount = (itemName, newItemCount, optionType) => {
      const newOptionsCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType.slice(1)];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionsCounts);
    };

    // alternate updateItemCount that DOES NOT mutate state. Reference Q&A:
    // https://www.udemy.com/course/react-testing-library/learn/#questions/14446658/
    // const updateItemCount = (itemName, newItemCount, optionType) => {
    //   // get option Map and make a copy
    //   const { [optionType]: optionMap } = optionCounts;
    //   const newOptionMap = new Map(optionMap);

    //   // update the copied Map
    //   newOptionMap.set(itemName, parseInt(newItemCount));

    //   // create new object with the old optionCounts plus new map
    //   const newOptionCounts = { ...optionCounts };
    //   newOptionCounts[optionType] = newOptionMap;

    //   // update state
    //   setOptionCounts(newOptionCounts);
    // }

    const resetOrder = () => {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    };

    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount

    return [{ ...optionCounts, totals }, updateOptionCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
