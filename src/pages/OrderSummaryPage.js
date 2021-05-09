import React, { useState, useContext } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
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
  GridItem,
  Grid,
  Badge,
  Flex,
} from "@chakra-ui/react";

const CustomModal = ({
  customerOrderDataModal,
  modalHeader,
  customerOrderData,
  handleCustomerOrderChange,
  handlerSubmitCustomerData,
  validateInput,
  setShow,
  error,
}) => {
  const { isOpen, onClose } = customerOrderDataModal;
  const initialRef = React.useRef();
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />

          {Object.entries(customerOrderData).map(([key, value]) => (
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>{key}</FormLabel>
                <Input
                  ref={initialRef}
                  name={key}
                  placeholder={key}
                  value={value}
                  onChange={handleCustomerOrderChange}
                />
              </FormControl>
            </ModalBody>
          ))}
          {error.server && <Box color={"red"}>{error.server}</Box>}

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={(e) => {
                handlerSubmitCustomerData(e);
                onClose();
                setShow(true);
              }}
            >
              Confirm Order
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const PaymentModal = ({
  modalHeader,
  paymentDataModal,
  paymentData,
  handlePaymentDataChange,
}) => {
  const { isOpen, onOpen, onClose } = paymentDataModal;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />

          {Object.entries(paymentData).map(([key, value]) => (
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>{key}</FormLabel>
                <Input
                  name={key}
                  placeholder={key}
                  value={value}
                  onChange={handlePaymentDataChange}
                />
              </FormControl>
            </ModalBody>
          ))}

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
              }}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function OrderSummaryPage() {
  const {
    orders,
    setOrders,
    couponId,
    setCouponId,
    or_id,
    setOr_id,
    trackNumber,
    setTrackNumber,
    coupon,
    setCoupon,
  } = useContext(OrderContext);

  const history = useHistory();

  const [error, setError] = useState({});
  const [value, setValue] = React.useState("1");
  const [show, setShow] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const arrOrder = orders.map((order) => order);
  let item = [];
  for (let order of arrOrder) {
    item.push({ productId: order.id, amount: order.amount });
  }

  let totalPrice = orders.reduce((total, order) => {
    if (order.discount === undefined || order.discount === null)
      return total + order.price * order.amount;
    if (coupon.code === couponCode)
      return total + order.price * order.amount * (1 - coupon.discount);
  }, 0);
  console.log(totalPrice);

  const customerOrderDataModal = useDisclosure();
  const paymentDataModal = useDisclosure();

  const [customerOrderData, setCustomerOrderData] = useState({
    phoneNumberToOrder: "",
    houseNumberToOrder: "",
    villageToOrder: "",
    roadToOrder: "",
    districtToOrder: "",
    subDistrictToOrder: "",
    provinceToOrder: "",
    postalCodeToOrder: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardHolderName: "",
    cardNumber: "",
    cardExp: "",
    securityCard: "",
  });

  const [paymentCustomerType, setPaymentCustomerType] = useState({
    paymentType: "",
  });
  console.log(paymentCustomerType);
  console.log("or_id", or_id);

  const validateInput = () => {
    const {
      phoneNumberToOrder,
      houseNumberToOrder,
      villageToOrder,
      roadToOrder,
      districtToOrder,
      subDistrictToOrder,
      provinceToOrder,
      postalCodeToOrder,
    } = customerOrderData;
    const newError = {};

    if (!phoneNumberToOrder) newError.phoneNumberToOrder = "กรุณากรอกเบอร์";
    if (!houseNumberToOrder)
      newError.houseNumberToOrder = "กรุณากรอกเลขที่บ้าน";
    if (!districtToOrder) newError.districtToOrder = "กรุณากรอกตำบล/อำเภอ";
    if (!subDistrictToOrder) newError.subDistrictToOrder = "กรุณากรอกแขวง/เขต";
    if (!provinceToOrder) newError.provinceToOrder = "กรุณากรอกจังหวัด";
    if (!postalCodeToOrder)
      newError.postalCodeToOrder = "กรุณากรอกรหัสไปรษณีย์";

    setError(newError);
  };

  const handleCustomerOrderChange = (e) => {
    const { name, value } = e.target;
    setCustomerOrderData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePaymentCustomerTypeChange = (e) => {
    const { name, value } = e.target;
    setPaymentCustomerType((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmitCustomerData = async (e) => {
    const {
      status,
      phoneNumberToOrder,
      houseNumberToOrder,
      roadToOrder,
      districtToOrder,
      subDistrictToOrder,
      provinceToOrder,
      postalCodeToOrder,
      villageToOrder,
    } = customerOrderData;

    e.preventDefault();
    console.log("orderSumm submitted");
    axios
      .post("/order/", {
        status,
        discount: couponCode === coupon?.code ? coupon?.discount : 0,
        couponId: couponCode === coupon?.code ? coupon?.id : null,
        phoneNumberToOrder,
        houseNumberToOrder,
        roadToOrder,
        districtToOrder,
        subDistrictToOrder,
        provinceToOrder,
        postalCodeToOrder,
        villageToOrder,

        items: item,
      })
      .then((res) => {
        console.log("resp", res.data);
        setTrackNumber(res.data.orders); //TrackNumber มีก้อนดาต้าordersอยู่
        setOr_id(res.data.orders.id);
        setCoupon(res.data.coupon);

        console.log(res.data.coupon);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };

  const handlerSubmitPaymentData = async (e) => {
    const { paymentType } = paymentCustomerType;
    e.preventDefault();
    console.log("submit payment orId", or_id);
    axios
      .post("/payment/createpayment", {
        paymentType,
        orderId: or_id,
      })
      .then((res) => {
        history.push("/numberorder");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };

  function handleOpenModal(check) {
    const { onOpen } = check;
    onOpen();
  }
  return (
    <>
      <Navbar />
      <Flex direction="column" alignItems="center">
        <Box align="center" fontSize="25">
          ชำระรายการสินค้า
        </Box>

        <Box p={5} shadow="lg" borderWidth="2px">
          <Box align="center" fontSize="18">
            สรุปรายการทั้งหมด
            <Box>
              {orders.length} รายการ ราคาทั้งหมด:
              {coupon?.code === couponCode ? (
                <Text as="s">
                  {totalPrice} บาท
                  <Badge colorScheme="red" fontSize="18">
                    {(totalPrice * (1 - coupon.discount)).toFixed(2)}
                    บาท
                  </Badge>
                </Text>
              ) : (
                <Text>{totalPrice} บาท</Text>
              )}
            </Box>
            {orders.map((order) => (
              <Text>
                {order.amount} X {order.name} ราคา
                {order.amount * order.price} บาท
              </Text>
            ))}
            <Box>
              Coupon Discount:
              <Input
                type="text"
                w={200}
                placeholder="Enter Coupon"
                name="code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              {couponCode === coupon?.code && coupon?.status === "TRUE" ? (
                <Text color="green">correct !</Text>
              ) : (
                <Text color="red">invalid code</Text>
              )}
            </Box>
            <Box alignItems="center">
              <Button
                colorScheme="yellow"
                size="md"
                onClick={() => {
                  handleOpenModal(customerOrderDataModal);
                }}
              >
                CONFIRM ORDER
              </Button>
              <Button
                colorScheme="red"
                size="md"
                onClick={() => history.push("/order")}
              >
                CANCEL
              </Button>
              {show && (
                <Box>
                  <Box>Payment:</Box>
                  <RadioGroup onChange={setValue} value={value}>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      direction="row"
                    >
                      <Radio
                        name="paymentType"
                        value="CASH"
                        colorScheme="red"
                        onChange={handlePaymentCustomerTypeChange}
                      >
                        เงินสด
                      </Radio>

                      <Radio
                        name="paymentType"
                        value="CREDIT"
                        colorScheme="red"
                        onChange={handlePaymentCustomerTypeChange}
                        onClick={() => handleOpenModal(paymentDataModal)}
                      >
                        บัตรเครดิต
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Button
                    colorScheme="red"
                    size="md"
                    onClick={handlerSubmitPaymentData}
                  >
                    ใช่
                  </Button>
                  <Button
                    colorScheme="blackAlpha"
                    size="md"
                    onClick={() => history.push("/order")}
                  >
                    ไม่ใช่
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>

      <CustomModal
        customerOrderDataModal={customerOrderDataModal}
        modalHeader="จัดส่งที่"
        customerOrderData={customerOrderData}
        setCustomerOrderData={customerOrderData}
        handleCustomerOrderChange={handleCustomerOrderChange}
        handlerSubmitCustomerData={handlerSubmitCustomerData}
        validateInput={validateInput}
        setShow={setShow}
        error={error}
      />
      <PaymentModal
        modalHeader="ชำระผ่านบัตร"
        paymentDataModal={paymentDataModal}
        paymentData={paymentData}
        setPaymentData={setPaymentData}
        handlePaymentDataChange={handlePaymentDataChange}
        handlePaymentCustomerTypeChange={handlePaymentCustomerTypeChange}
        handlerSubmitPaymentData={handlerSubmitPaymentData}
        paymentCustomerType={paymentCustomerType}
        setPaymentCustomerType={setPaymentCustomerType}
      />
    </>
  );
}

export default OrderSummaryPage;
