import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import { OrderContext } from "../../contexts/OrderContextProvider";
function Coupon() {
  const [show, setShow] = useState(false);
  const { coupon, setCoupon } = useContext(OrderContext);
  const history = useHistory();
  // console.log(coupon);
  return (
    <>
      <Flex alignItems="center" direction="column" mt={10}>
        <Box p={5} shadow="lg" borderWidth="2px">
          <Box m={3} textAlign="center">
            <Box>COUPON CODE :</Box>
            {coupon.code}
            <Box>ส่วนลด {coupon.discount.toFixed(2) * 100}% !!</Box>
          </Box>
          <Button size="sm" onClick={() => history.push("/order")}>
            ตกลง
          </Button>
        </Box>
      </Flex>
    </>
  );
}
export default Coupon;
