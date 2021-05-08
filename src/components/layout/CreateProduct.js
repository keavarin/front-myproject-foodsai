import React from "react";
import axios from "../../config/axios";
import localStorageService from "../../services/localStorageService";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useContext, useState, useEffect } from "react";
import { Box, Flex, Image, Button, Input, FormControl } from "@chakra-ui/react";

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [productImg, setProductImg] = useState("");
  const [error, setError] = useState({});

  const handleFileChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
  };

  const handlerSubmitCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("status", status);
    formData.append("imgUrl", file);

    axios
      .post(`/product/createproduct`, formData)
      .then((res) => {
        console.log(res.data.product);
        alert("create success");
        // setProductImg(res.data.product.imgUrl);
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          setError({ front: err.message });
        }
      });
  };
  const handlerSubmitCreateCoupon = (e) => {
    e.preventDefault();
    axios
      .post(`/coupon/createcoupon`, {
        code,
        discount,
      })
      .then((res) => {
        console.log(res.data.coupon);
        alert("create success");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          console.error(err.message);
          setError({ front: err.message });
        }
      });
  };
  return (
    <>
      {" "}
      <Flex
        alignItems="center"
        direction="column"
        w={500}
        justifyContent="center"
      >
        <Box p={5} shadow="lg" borderWidth="2px">
          <Box>Create Product</Box>
          <FormControl>
            <Input
              placeholder="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <Input
              placeholder="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Input
              placeholder="imgUrl"
              name="imgUrl"
              type="file"
              onChange={handleFileChange}
            />
            <Button onClick={(e) => handlerSubmitCreateProduct(e)}>
              SUBMIT
            </Button>
          </FormControl>
        </Box>
        <Box p={5} shadow="lg" borderWidth="2px" mt={10}>
          <Box>Create Coupon </Box>
          <Input
            placeholder="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Input
            placeholder="discount"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <Button onClick={(e) => handlerSubmitCreateCoupon(e)}>SUBMIT</Button>
        </Box>
      </Flex>
    </>
  );
}
export default CreateProduct;
