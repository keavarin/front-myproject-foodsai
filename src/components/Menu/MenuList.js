import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/axios";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { OrderContext } from "../../contexts/OrderContextProvider";
import { Box, Image, Button, SimpleGrid } from "@chakra-ui/react";
import MenuCard from "./MenuCard";

function MenuList({ value, setValue }) {
  const [menuList, setMenuList] = useState([]);
  const { setRole, role, isAuthenticated, isAdmin } = useContext(AuthContext);

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
      {isAuthenticated &&
        menuList.map((menu) =>
          menu.status === "ACTIVE" ? <MenuCard menu={menu} /> : null
        )}
      {isAdmin && menuList.map((menu) => <MenuCard menu={menu} />)}
    </SimpleGrid>
  );
}
export default MenuList;
