import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/axios";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";

function FindAllOrder() {
  const [allOrder, setAllOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage, setOrderPerPage] = useState(10);

  const fetchAllOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/order/");
      setAllOrder(res.data.orders);
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);
  const indexOfLastOrder = currentPage * orderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
  const currentOrder = allOrder.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalOrder = allOrder.length;

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allOrder.length / orderPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {loading && <h2>Loading...</h2>}

      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Order number</Th>
            <Th>STATUS</Th>
            <Th>PhoneNumber</Th>
            <Th>Customer_Id</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentOrder.map((order) => (
            <Tr>
              <Td>{order.date}</Td>
              <Td>{order.id}</Td>
              <Td>{order.status}</Td>
              <Td>{order.phoneNumberToOrder}</Td>
              <Td>{order.customerId}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="center">
        {" "}
        {pageNumbers.map((number) => (
          <span key={number} onClick={() => setCurrentPage(number)}>
            <Box
              m={3}
              p={3}
              borderWidth="1px"
              _active={{ bg: "red" }}
              _hover={{ bg: "#ebedf0" }}
            >
              <span>{number}</span>
            </Box>
          </span>
        ))}
      </Flex>
    </>
  );
}
export default FindAllOrder;
