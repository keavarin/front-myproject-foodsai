import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { OrderContext } from "../../contexts/OrderContextProvider";
function Coupon() {
  const [show, setShow] = useState(false);
  const { coupon, setCoupon } = useContext(OrderContext);
  const history = useHistory();
  console.log(coupon);
  return (
    <>
      <Flex alignItems="center" direction="column" mt={10}>
        <Box p={5} shadow="lg" borderWidth="2px">
          <Box m={3} textAlign="center">
            {coupon.code}
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
