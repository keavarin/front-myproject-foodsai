import React, { useState, useContext } from "react";
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
import Coupon from "../components/layout/Coupon";

function GetCouponPage() {
  return (
    <>
      <Navbar />
      <Flex direction="column" alignItems="center" mt={10}>
        <Box fontSize="18">รหัส คูปอง</Box>
        <Image src="./pic/favicon.ico" w={10} />
        <Coupon />
      </Flex>
    </>
  );
}

export default GetCouponPage;
