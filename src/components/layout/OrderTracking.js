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
  ButtonGroup,
} from "@chakra-ui/react";
import { OrderContext } from "../../contexts/OrderContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import Step from "./Step";

function CancelOrderModal({ cancelOrder, handlerCancelOrder }) {
  const { isOpen, onOpen, onClose } = cancelOrder;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ต้องการยกเลิกคำสั่งชื้อ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>คุณต้องการยกเลิกคำสั่งซื้อใช่ไหม ...</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                handlerCancelOrder(e);
                onClose();
              }}
            >
              YES
            </Button>
            <Button onClick={onClose}>NO</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function OrderTracking() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const [orderTrack, setOrderTrack] = useState({ orderTracking: "" });
  const { orderTrackData, setOrderTrackData } = useContext(OrderContext);
  const { role } = useContext(AuthContext);
  const history = useHistory();
  console.log(role);
  console.log(orderTrack);
  console.log(orderTrackData.orderTracking);
  const validateInput = () => {
    const newError = {};

    if (!orderTrack.orderTracking)
      newError.orderTrack = "orderTack is required";

    // if (orderTrack.orderTracking !== orderTrackData.orderTracking)
    //   newError.orderTrack = "orderTack invalid";
    if (
      orderTrackData.orderTracking === null ||
      orderTrackData.orderTracking === undefined
    )
      newError.orderTrack = "ไม่มีเลขที่ orderนี้";

    setError(newError);
  };
  const handleFindOrder = (e) => {
    const { name, value } = e.target;
    setOrderTrack((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmitFindOrder = async (e) => {
    const { orderTracking } = orderTrack;
    e.preventDefault();
    validateInput();
    axios
      .get(`/order/${orderTracking}`)
      .then((res) => {
        setOrderTrackData(res.data.order);

        if (res.data.order === null) setShow(false);
        if (res.data.order !== null) setShow(true);
        if (res.data.order.status === "ORDERCANCEL") setShow(false);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };

  const handlerCancelOrder = async (e) => {
    const { orderTracking } = orderTrack;
    e.preventDefault();
    axios
      .put(`/order/statusorder/${orderTracking}`, {
        status: "ORDERCANCEL",
      })
      .then((res) => {
        console.log(res.data.order);
        if (res.data.order === null) setShow(false);
        if (res.data.order !== null) setShow(true);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };
  const handlerConfirmOrder = async (e) => {
    const { orderTracking } = orderTrack;
    e.preventDefault();
    axios
      .put(`/order/statusorder/${orderTracking}`, {
        status: "ORDERCONFIRM",
      })
      .then((res) => {
        console.log(res.data);
        // history.push("/findorder");
        // if (res.data.order === null) setShow(false);
        // if (res.data.order !== null) setShow(true);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };
  const handlerOnProcessOrder = async (e) => {
    const { orderTracking } = orderTrack;
    e.preventDefault();
    axios
      .put(`/order/statusorder/${orderTracking}`, {
        status: "ORDERONPROCESS",
      })
      .then((res) => {
        console.log(res.data);
        // history.push("/findorder");
        // if (res.data.order === null) setShow(false);
        // if (res.data.order !== null) setShow(true);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };
  const handlerOnDeliveryOrder = async (e) => {
    const { orderTracking } = orderTrack;
    e.preventDefault();
    axios
      .put(`/order/statusorder/${orderTracking}`, {
        status: "ONTHEWAY",
      })
      .then((res) => {
        console.log(res.data);
        // history.push("/findorder");
        // if (res.data.order === null) setShow(false);
        // if (res.data.order !== null) setShow(true);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };
  const handlerArriveOrder = async (e) => {
    const { orderTracking } = orderTrack;
    e.preventDefault();
    axios
      .put(`/order/statusorder/${orderTracking}`, {
        status: "ARRIVE",
      })
      .then((res) => {
        console.log(res.data.order);
        // history.push("/findorder");
        // if (res.data.order === null) setShow(false);
        // if (res.data.order !== null) setShow(true);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };

  const cancelOrder = useDisclosure();

  function handleOpenModal(check) {
    const { onOpen } = check;
    onOpen();
  }
  return (
    <>
      <Flex alignItems="center" direction="column" m={30}>
        {Object.entries(orderTrack).map(([key, value]) => (
          <Box p={5} shadow="lg" borderWidth="2px">
            <Input
              placeholder="เลขที่ order"
              size="md"
              w={500}
              name={key}
              type="number"
              value={value}
              onChange={handleFindOrder}
            />
            {error.orderTrack && <Box color={"red"}>{error.orderTrack}</Box>}
            <Button size="sm" m={2} onClick={handlerSubmitFindOrder}>
              ค้นหา
            </Button>
          </Box>
        ))}
        {orderTrackData.status === "ORDERCANCEL" ? (
          <>
            <Box>Order ถูกยกเลิกแล้ว</Box>
          </>
        ) : (
          <Button
            colorScheme="red"
            m={4}
            onClick={() => handleOpenModal(cancelOrder)}
          >
            ต้องการยกเลิกคำสั่งชื้อ?
          </Button>
        )}
        {show && (
          <>
            <Box
              p={5}
              shadow="lg"
              borderWidth="2px"
              w={500}
              m={5}
              background-color="red"
            >
              <Box textAlign="center">
                Orderเลขที่: {orderTrackData.orderTracking}
              </Box>
              <Box>
                Khun. {orderTrackData.Customer.firstName} เบอร์โทร.
                {orderTrackData.phoneNumberToOrder}
              </Box>
              <Box>
                จัดส่งที่. บ้านเลขที่ {orderTrackData.houseNumberToOrder}
                <Box>เขต {orderTrackData.subDistrictToOrder}</Box>
                <Box>อำเภอ {orderTrackData.districtToOrder}</Box>
                <Box>
                  จังหวัด{orderTrackData.provinceToOrder} รหัสไปรษณีย์
                  {orderTrackData.postalCodeToOrder}
                </Box>
              </Box>
            </Box>
          </>
        )}
        <Step />
      </Flex>
      <CancelOrderModal
        cancelOrder={cancelOrder}
        handlerCancelOrder={handlerCancelOrder}
      />
      {role === "admin" ? (
        <>
          <Button onClick={(e) => handlerConfirmOrder(e)}>
            update order confirm
          </Button>
          <Button onClick={(e) => handlerOnProcessOrder(e)}>
            update order on process
          </Button>
          <Button onClick={(e) => handlerOnDeliveryOrder(e)}>
            update order delivery
          </Button>
          <Button onClick={(e) => handlerArriveOrder(e)}>
            update order arrive
          </Button>
        </>
      ) : null}
    </>
  );
}
export default OrderTracking;
