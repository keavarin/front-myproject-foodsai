import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";

import Login from "../components/auth/Login";
import {
  Box,
  Stack,
  SimpleGrid,
  Input,
  Grid,
  Flex,
  GridItem,
} from "@chakra-ui/react";
import MenuList from "../components/Menu/MenuList";

import Order from "../components/Menu/Order";
import { Button } from "@chakra-ui/button";

function OrderPage() {
  return (
    <>
      {" "}
      <Grid templateColumns="repeat(5, 1fr)" templateRows="repeat(20, 1fr)">
        <GridItem rowSpan={1} colSpan={5} rowStart={1}>
          <Box align="center" fontSize="20">
            <Navbar />
            ORDER NOW!
          </Box>
        </GridItem>

        <GridItem rowSpan={19} colSpan={4} rowStart={2}>
          <MenuList />
        </GridItem>

        <GridItem rowSpan={19} colSpan={1}>
          <Order />
        </GridItem>
      </Grid>
    </>
  );
}

export default OrderPage;
