import React, { useState, useContext } from "react";
import {
  Flex,
  Icon,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
function OrderItem({ order, deleteItem }) {
  return (
    <Flex>
      <UnorderedList>
        <ListItem>
          {order.amount}X {order.name}
        </ListItem>
      </UnorderedList>
      <DeleteIcon color="red" onClick={deleteItem} />
    </Flex>
  );
}

export default OrderItem;
