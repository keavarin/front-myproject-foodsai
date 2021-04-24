import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../config/axios";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { OrderContext } from "../../contexts/OrderContextProvider";
import {
  Box,
  Image,
  Button,
  SimpleGrid,
  Flex,
  Icon,
  Badge,
  Grid,
} from "@chakra-ui/react";
import OrderItem from "./OrderItem";

function Order() {
  const { orders, setOrders } = useContext(OrderContext);
  const history = useHistory();
  const [show, setShow] = useState(false);

  const totalPrice = orders.reduce((total, order) => {
    return total + order.price * order.amount;
  }, 0);

  const deleteItem = (index) => {
    const newOrder = [...orders];
    newOrder.splice(index, 1);
    setOrders(newOrder);
  };

  return (
    <>
      <Grid
        p={5}
        shadow="lg"
        borderWidth="1px"
        alignItems="center"
        bg="red.200"
      >
        <Badge colorScheme="purple" fontSize="20">
          Your Order
        </Badge>
        {orders.map((order, index) => (
          <OrderItem
            key={order.id}
            order={order}
            totalPrice={totalPrice}
            deleteItem={deleteItem}
          ></OrderItem>
        ))}

        {orders.length === 0 ? null : (
          <Box w={20}>
            <Badge colorScheme="yellow" fontSize="20">
              ราคาทั้งหมด: {totalPrice} บาท
            </Badge>

            <Button
              colorScheme="red"
              onClick={() => history.push("/ordersummary")}
            >
              ยืนยัน
            </Button>
          </Box>
        )}
      </Grid>
    </>
  );
}
export default Order;
