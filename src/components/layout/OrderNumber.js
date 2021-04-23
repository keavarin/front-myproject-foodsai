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
} from "@chakra-ui/react";
import { OrderContext } from "../../contexts/OrderContextProvider";
import Step from "./Step";

function OrderNumber() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const [orderTrack, setOrderTrack] = useState({ orderTracking: "" });
  const { trackNumber, setTrackNumber } = useContext(OrderContext);
  const history = useHistory();

  const orderDate = new Date(trackNumber.date);
  console.log(trackNumber);
  return (
    <>
      <Flex alignItems="center" direction="column" mt={10}>
        <Box p={5} shadow="lg" borderWidth="2px">
          <Box m={3} textAlign="center">
            <Box fontSize="20">
              Order เลขที่: {trackNumber.orderTracking}{" "}
              <Box>ส่วนลด {trackNumber.discount * 100} %</Box>
            </Box>
            <Box>
              วันที่: {orderDate.getDate()} เดือน: {orderDate.getMonth()} ปีคศ:{" "}
              {orderDate.getFullYear()}
            </Box>
            <Box>
              เวลา: {orderDate.getHours()}:{orderDate.getMinutes()}
            </Box>
            <Box>เบอร์ติดต่อ: {trackNumber.phoneNumberToOrder}</Box>
            <Button size="sm" onClick={() => history.push("/order")}>
              ตกลง
            </Button>{" "}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
export default OrderNumber;
