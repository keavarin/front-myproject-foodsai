import React from "react";
import axios from "../../config/axios";
import localStorageService from "../../services/localStorageService";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useContext, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import SignIn from "./SingIn";
import OrderHistory from "./OrderHistory";
import { OrderContext } from "../../contexts/OrderContextProvider";

const CustomModal = ({
  updateCustomerModal,
  modalHeader,
  customerData,
  setCustomerData,
  handleInputCustomerDataChange,
  handlerSubmitCustomerData,
  error,
}) => {
  const { isOpen, onClose } = updateCustomerModal;
  const initialRef = React.useRef();
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />

          {Object.entries(customerData).map(([key, value]) => (
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>{key}</FormLabel>
                <Input
                  ref={initialRef}
                  name={key}
                  placeholder={key}
                  value={value}
                  onChange={handleInputCustomerDataChange}
                />
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
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const ChangePasswordModal = ({
  modalHeader,
  handleInputChangePasswordChange,
  setChangePassword,
  handlerSubmitChangePassword,
  changePasswordModal,
  changePassword,
}) => {
  const { isOpen, onClose } = changePasswordModal;
  const initialRef = React.useRef();
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />

          {Object.entries(changePassword).map(([key, value]) => (
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>{key}</FormLabel>
                <Input
                  ref={initialRef}
                  name={key}
                  placeholder={key}
                  value={value}
                  onChange={handleInputChangePasswordChange}
                />
              </FormControl>
            </ModalBody>
          ))}

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={(e) => {
                handlerSubmitChangePassword(e);
                onClose();
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const LastOrderModal = ({ lastOrderModal, reset, onClear }) => {
  const { isOpen, onClose, onOpen } = lastOrderModal;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order History</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <>
              <Flex alignItems="center" direction="column">
                <OrderHistory reset={reset} />
              </Flex>
            </>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Close
            </Button>
            <Button onClick={onClear} colorScheme="red" mr={3}>
              Clear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function Navbar() {
  const { auth, setAuth } = useContext(AuthContext);

  const { historyOrder, setHistoryOrder } = useContext(OrderContext);
  const [error, setError] = useState({});
  const history = useHistory();

  const updateCustomerModal = useDisclosure();
  const changePasswordModal = useDisclosure();
  const lastOrderModal = useDisclosure();
  const [reset, setReset] = useState(true);

  const isAuthenticated = auth?.role;
  const isAdmin = auth?.role === "admin";

  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    houseNumber: "",
    road: "",
    village: "",
    district: "",
    subDistrict: "",
    province: "",
    postalCode: "",
  });
  const handleInputCustomerDataChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChangePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };
  const [changePassword, setChangePassword] = useState({
    newPassword: "",
    password: "",
    confirmNewPassword: "",
  });
  const handlerSubmitCustomerData = async (e) => {
    const {
      firstName,
      lastName,
      phoneNumber,
      houseNumber,
      road,
      village,
      district,
      subDistrict,
      province,
      postalCode,
    } = customerData;

    e.preventDefault();
    axios
      .put("/customer/", {
        firstName,
        lastName,
        phoneNumber,
        houseNumber,
        road,
        village,
        district,
        subDistrict,
        province,
        postalCode,
      })
      .then((res) => {
        history.push("/order");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };

  const handlerSubmitFindOrder = async (e) => {
    e.preventDefault();
    axios
      .get(`/order/customer/`)
      .then((res) => {
        setHistoryOrder(res.data.order);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };

  const validateInput = ({ customerData }) => {
    const {
      firstName,
      lastName,
      phoneNumber,
      houseNumber,
      district,
      subDistrict,
      province,
      postalCode,
    } = customerData;
    const newError = {};
    if (!firstName) newError.firstName = "กรุณาใส่ชื่อ";
    if (!lastName) newError.lastName = "กรุณาใส่นามสกุล";
    if (!phoneNumber) newError.phoneNumber = "กรุณากรอกเบอร์";
    if (!houseNumber) newError.houseNumber = "กรุณากรอกเลขที่บ้าน";
    if (!district) newError.district = "กรุณากรอกตำบล/อำเภอ";
    if (!subDistrict) newError.subDistrict = "กรุณากรอกแขวง/เขต";
    if (!province) newError.province = "กรุณากรอกจังหวัด";
    if (!postalCode) newError.postalCode = "กรุณากรอกรหัสไปรษณีย์";

    setError(newError);
  };
  const validateChangePassword = ({ changePassword }) => {
    const { newPassword, password, confirmNewPassword } = changePassword;

    const newError = {};
    if (!newPassword) newError.newPassword = "กรุณาใส่รหัสผ่านใหม่";
    if (!password) newError.password = "กรุณาใส่รหัสผ่านเดิม";
    if (!confirmNewPassword)
      newError.confirmNewPassword = "กรุณากรอกยืนยันรหัสใหม่";

    setError(newError);
  };

  const handlerSubmitChangePassword = async (e) => {
    const { newPassword, password, confirmNewPassword } = changePassword;

    e.preventDefault();
    axios
      .put("/customer/changepassword", {
        newPassword,
        password,
        confirmNewPassword,
      })
      .then((res) => {
        history.push("/order");
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
  const onClear = (e) => {
    e.preventDefault();
    setReset(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorageService.clearToken();
    setAuth({});
    // role === "admin" ? setIsAdmin(false) : setIsAuthenticated(false);
    history.push("/login");
  };

  return (
    <>
      <Flex
        p={2}
        alignItems="center"
        direction="row"
        justify="space-between"
        width="100%"
        height="80px"
        bg="#F04B3A"
        color="white"
      >
        <Flex direction="row">
          <Box onClick={() => history.push("./")}>FOODSAI</Box>
          <Image src="/favicon.ico" w={8} />
        </Flex>

        {isAdmin && (
          <Menu>
            <MenuButton>
              <Avatar name={`${auth.email} `} />
            </MenuButton>
            <MenuList color="black">
              <MenuItem onClick={() => history.push("/findorder")}>
                Find Order
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push("/admincreateproduct");
                }}
              >
                Create Product
              </MenuItem>

              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        )}
        {!isAuthenticated && <SignIn />}
        {isAuthenticated && (
          <Menu>
            <MenuButton>
              {/* <Avatar name={`${user.firstName} ${user.lastName}`} /> */}
              {!isAdmin && (
                <Avatar name={`${auth?.firstName} ${auth?.lastName}`} />
              )}
            </MenuButton>
            <MenuList color="black">
              <MenuItem onClick={() => handleOpenModal(updateCustomerModal)}>
                Update...
              </MenuItem>
              <MenuItem onClick={() => history.push("/findorder")}>
                Find Order
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handlerSubmitFindOrder(e);
                  handleOpenModal(lastOrderModal);
                }}
              >
                Order History
              </MenuItem>
              <MenuItem onClick={() => handleOpenModal(changePasswordModal)}>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <CustomModal
        updateCustomerModal={updateCustomerModal}
        modalHeader="Update Account"
        customerData={customerData}
        handleInputCustomerDataChange={handleInputCustomerDataChange}
        setCustomerData={setCustomerData}
        handlerSubmitCustomerData={handlerSubmitCustomerData}
      />
      <ChangePasswordModal
        changePasswordModal={changePasswordModal}
        modalHeader="Change Password"
        changePassword={changePassword}
        handleInputChangePasswordChange={handleInputChangePasswordChange}
        setChangePassword={setChangePassword}
        handlerSubmitChangePassword={handlerSubmitChangePassword}
        validateChangePassword={validateChangePassword}
        error={error}
      />
      <LastOrderModal
        lastOrderModal={lastOrderModal}
        reset={reset}
        setReset={setReset}
        onClear={onClear}
      />
    </>
  );
}

export default Navbar;
