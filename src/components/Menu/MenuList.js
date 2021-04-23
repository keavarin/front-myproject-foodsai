import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/axios";
import { OrderContext } from "../../contexts/OrderContextProvider";
import {
  Box,
  Image,
  Button,
  SimpleGrid,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import MenuCard from "./MenuCard";

function MenuList({ value, setValue }) {
  const [menuList, setMenuList] = useState([]);

  const fetchMenuList = async () => {
    try {
      const res = await axios.get("/product/");
      setMenuList(res.data.products);
    } catch (err) {}
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <SimpleGrid columns={2} spacing={2}>
      {menuList.map((menu) =>
        menu.status === "ACTIVE" ? <MenuCard menu={menu} /> : null
      )}
    </SimpleGrid>
  );
}
export default MenuList;
