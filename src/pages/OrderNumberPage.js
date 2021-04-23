import React, { useState, useContext } from "react";
import axios from "../config/axios";
import localStorageService from "../services/localStorageService";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import { OrderContext } from "../contexts/OrderContextProvider";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Image,
} from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar";
import OrderNumber from "../components/layout/OrderNumber";

function OrderNumberPage() {
  return (
    <>
      <Navbar />
      <Flex direction="column" alignItems="center" mt={10}>
        <Box fontSize="18">รายการสั่งซื้อเลขที่</Box>
        <Image src="./pic/favicon.ico" w={10} />
        <OrderNumber />
        {/* <OrderTracking /> */}
      </Flex>

      {/* <Stack align="center">
            <Button colorScheme="red" size="lg">สั่งเลย</Button>
          </Stack> */}
    </>
  );
}

export default OrderNumberPage;
