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
} from "@chakra-ui/react";

export const CustomModal = ({
  customerOrderDataModal,
  modalHeader,
  customerOrderData,
  handleCustomerOrderChange,
  handlerSubmitCustomerData,
  validateInput,
  setShow,
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
                {/* <validateInput customerOrderData={key} /> */}
              </FormControl>
            </ModalBody>
          ))}

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

export const PaymentModal = ({
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
  console.log(coupon.status);
  console.log(coupon.code);
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

  const totalPrice = orders.reduce((total, order) => {
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
      discount,
      couponId,
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
    axios
      .post("/order/", {
        status,
        discount: couponCode === coupon.code ? coupon.discount : 0,
        couponId: couponCode === coupon.code ? coupon.id : null,
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
        setTrackNumber(res.data.orders);
        setOr_id(res.data.orders.id);

        // history.push("/ordersummary");
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
    <Grid
      h="200px"
      templateRows="repeat(5, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={6}>
        <Navbar />
      </GridItem>

      <GridItem rowSpan={2} colSpan={6}>
        <Box align="center" fontSize="25">
          ชำระรายการสินค้า
        </Box>
      </GridItem>

      <GridItem rowSpan={2} colSpan={6}>
        <Box align="center" fontSize="18">
          สรุปรายการทั้งหมด
          <Box>{orders.length} รายการ ราคาทั้งหมด:</Box>
          {orders.map((order) => (
            <>
              {coupon.code === couponCode ? (
                <>
                  <Text as="s">{order.amount * order.price} บาท</Text>
                  <Badge colorScheme="red" fontSize="18">
                    {(
                      order.amount *
                      order.price *
                      (1 - coupon.discount)
                    ).toFixed(2)}
                    บาท
                  </Badge>
                </>
              ) : (
                order.amount * order.price
              )}

              <Box>
                {order.amount} X {order.name} ราคา
                {totalPrice} บาท
              </Box>
            </>
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
            {couponCode === coupon.code ? (
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
      </GridItem>
      <CustomModal
        customerOrderDataModal={customerOrderDataModal}
        modalHeader="จัดส่งที่"
        customerOrderData={customerOrderData}
        setCustomerOrderData={customerOrderData}
        handleCustomerOrderChange={handleCustomerOrderChange}
        handlerSubmitCustomerData={handlerSubmitCustomerData}
        validateInput={validateInput}
        setShow={setShow}
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
    </Grid>
  );
}

export default OrderSummaryPage;
