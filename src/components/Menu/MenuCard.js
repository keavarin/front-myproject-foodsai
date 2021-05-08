import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../config/axios";
import { OrderContext } from "../../contexts/OrderContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import {
  Box,
  Image,
  Button,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Grid,
  Input,
  FormControl,
} from "@chakra-ui/react";

function SliderInput({ value, setValue }) {
  const handleChange = (value) => {
    setValue(value);
  };
  return (
    <Flex alignItems="center" justifyContent="center" p={2}>
      <NumberInput
        min="0"
        maxW="100px"
        mr="1rem"
        value={value}
        onChange={handleChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
}

function MenuCard({ menu }) {
  const [value, setValue] = useState(0);
  const { orders, setOrders } = useContext(OrderContext);
  const { auth } = useContext(AuthContext);
  const [error, setError] = useState({});
  const [file, setFile] = useState(null);
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const history = useHistory();
  console.log(menu);

  const handleFileChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
  };
  const handlerMenuUpdatePicture = (e) => {
    e.preventDefault();
    const { id } = menu;
    const formData = new FormData();
    formData.append("imgUrl", file ? file : menu.imgUrl);

    axios
      .put(`/product/updateproductimg/${id}`, formData)
      .then((res) => {
        console.log(res.data.product);
        alert("update success");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };

  console.log(menu);
  console.log(updatePrice);

  const onAddMenu = (menu) => {
    const index = orders.findIndex((order) => order.id === menu.id);
    if (index === -1) {
      setOrders([...orders, menu]);
    } else {
      const newOrder = [...orders];
      newOrder[index].amount = menu.amount;
      setOrders(newOrder);
    }
  };

  const handlerMenuUpdateNonActive = async (e) => {
    const { id } = menu;
    console.log(menu);
    e.preventDefault();
    axios
      .put(`/product/updateproduct/${id}`, {
        price: updatePrice ? updatePrice : menu.price,
        status: (menu.status = "NONACTIVE"),
      })
      .then((res) => {
        console.log(res.data);
        alert("change status success");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };

  const handlerMenuUpdateActive = async (e) => {
    const { id } = menu;
    console.log(menu);
    e.preventDefault();
    axios
      .put(`/product/updateproduct/${id}`, {
        price: updatePrice ? updatePrice : menu.price,
        status: (menu.status = "ACTIVE"),
      })
      .then((res) => {
        console.log(res.data);
        alert("change status success");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };
  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={2} key={menu.id}>
      <Box p={1} shadow="sm" borderWidth="1px">
        <Image w="100%" h="300" objectFit="cover" src={menu.imgUrl} />

        <Box textAlign="center" mt={5}>
          {menu.name}
        </Box>
        <SliderInput menu={menu} value={value} setValue={setValue} />

        {auth?.role === "admin" ? (
          <>
            <FormControl>
              <Input
                placeholder="imgUrl"
                name="imgUrl"
                type="file"
                onChange={handleFileChange}
              />
              <Button onClick={(e) => handlerMenuUpdatePicture(e)}>
                summit
              </Button>
            </FormControl>

            <Input
              placeholder="update price"
              name="price"
              value={updatePrice}
              onChange={(e) => {
                setUpdatePrice(e.target.value);
              }}
            ></Input>
            <Button onClick={(e) => handlerMenuUpdateNonActive(e)}>
              Update Product Status NONACTIVE
            </Button>

            <Button onClick={(e) => handlerMenuUpdateActive(e)}>
              Update Product Status ACTIVE
            </Button>
            {/* <Button onClick={() => history.push("/findorder")}>
                go to update status order
              </Button> */}
          </>
        ) : (
          <>
            <Button
              onClick={() => onAddMenu({ ...menu, amount: value })}
              disabled={value <= 0}
            >
              {menu.price} บาท
            </Button>
          </>
        )}
      </Box>
    </Grid>
  );
}
export default MenuCard;
