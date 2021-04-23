import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../config/axios";
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
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { OrderContext } from "../../contexts/OrderContextProvider";

function OrderHistory({ reset }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const [orderTrack, setOrderTrack] = useState({ orderTracking: "" });
  const { historyOrder, setHistoryOrder } = useContext(OrderContext);

  const history = useHistory();

  console.log(historyOrder);
  return (
    <>
      <Box> รายการทั้งหมด {historyOrder.length} รายการ</Box>
      {reset &&
        historyOrder.map((i, index) => (
          <Flex alignItems="center">
            <Box>
              <Box>
                {index + 1}.orderเลขที่: {i.orderTracking}
              </Box>
              <Box>
                {i.OrderItems.map((i, index) => (
                  <UnorderedList>
                    <ListItem> รายการที่สั่ง: {i.Product.name}</ListItem>
                  </UnorderedList>
                ))}
              </Box>
            </Box>
          </Flex>
        ))}
    </>
  );
}
export default OrderHistory;
