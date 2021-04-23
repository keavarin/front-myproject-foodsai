import React, { useState, useEffect, useContext } from "react";
import { OrderContext } from "../../contexts/OrderContextProvider";
import {
  Box,
  Image,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  MenuIcon,
  Grid,
} from "@chakra-ui/react";
import Order from "./OrderItem";

function SliderInput({ value, setValue }) {
  const handleChange = (value) => {
    setValue(value);
  };
  return (
    <Flex alignItems="center" justifyContent="center" p={2}>
      <NumberInput
        min="0"
        maxW="100px"
        mr="1rem"
        value={value}
        onChange={handleChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
}

function MenuCard({ menu }) {
  const [value, setValue] = useState(0);
  const { orders, setOrders } = useContext(OrderContext);

  const onAddMenu = (menu) => {
    const index = orders.findIndex((order) => order.id === menu.id);
    if (index === -1) {
      setOrders([...orders, menu]);
    } else {
      const newOrder = [...orders];
      newOrder[index].amount = menu.amount;
      setOrders(newOrder);
    }
  };
  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={2} key={menu.id}>
      <Box p={1} shadow="sm" borderWidth="1px">
        <Image w="100%" h="300" objectFit="cover" src={menu.imgUrl} />

        <Box textAlign="center" mt={5}>
          {menu.name}
        </Box>
        <SliderInput menu={menu} value={value} setValue={setValue} />
        <Button onClick={() => onAddMenu({ ...menu, amount: value })}>
          {menu.price} บาท
        </Button>
      </Box>
    </Grid>
  );
}
export default MenuCard;
