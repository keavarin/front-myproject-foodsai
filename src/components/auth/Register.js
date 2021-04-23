import React from "react";
import axios from "../../config/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useHistory } from "react-router-dom";
import localStorageService from "../../services/localStorageService";
import {
  Box,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  Flex,
  Stack,
} from "@chakra-ui/react";

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClick = () => setShowPassword(!showPassword);
  const handleClick2 = () => setShowConfirmPassword(!showConfirmPassword);

  const { setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const handlerSubmit = async (e) => {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      phoneNumber,
    } = input;

    e.preventDefault();
    axios
      .post("/register", {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        phoneNumber,
      })
      .then((res) => {
        localStorageService.setToken(res.data.token);
        setIsAuthenticated(true);
        history.push("/");
      })
      .catch((err) => {
        if (err.response) {
          setError({ server: err.response.data.message });
        } else {
          console.log(err.message);
          setError({ front: err.message });
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));
    //validate
    if (name === "email") {
      if (!value) {
        setError((prev) => ({ ...prev, email: "email is required" }));
        //validate email by  regex
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        setError((prev) => ({ ...prev, email: "invalid email address" }));
      } else {
        setError((prev) => ({ ...prev, email: false }));
      }
    }

    if (name === "firstName") {
      if (!value) {
        setError((prev) => ({ ...prev, firstName: "firstName is required" }));
      }
    }

    if (name === "lastName") {
      if (!value) {
        setError((prev) => ({ ...prev, lastName: "lastName is required" }));
      }
    }
    if (name === "password") {
      if (!value) {
        setError((prev) => ({ ...prev, password: "password is required" }));
      }
    }
    if (name === "confirmPassword") {
      if (!value) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "confirmPassword is required",
        }));
      }
    }
    if (name === "phoneNumber") {
      if (!value) {
        setError((prev) => ({
          ...prev,
          phoneNumber: "phoneNumber is required",
        }));
      }
    }
  };

  return (
    <Flex direction="column" alignItems="center">
      <Stack spacing={5}>
        <Box textAlign="center">Register</Box>
        {error.server && <Box color={"red"}>{error.server}</Box>}

        <Input
          w="400"
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={handleInputChange}
        />
        {error.email && <Box color={"red"}>{error.email}</Box>}

        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={input.password}
            onChange={handleInputChange}
          />

          <InputRightElement>
            <Button size="xs" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {error.password && <Box color={"red"}>{error.password}</Box>}

        <InputGroup size="md">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="confirmPassword"
            value={input.confirmPassword}
            onChange={handleInputChange}
          />

          <InputRightElement>
            <Button size="xs" onClick={handleClick2}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {error.confirmPassword && (
          <Box color={"red"}>{error.confirmPassword}</Box>
        )}

        <Input
          w="400px"
          name="phoneNumber"
          placeholder="PhoneNumber"
          value={input.phoneNumber}
          onChange={handleInputChange}
        />
        {error.phoneNumber && <Box color={"red"}>{error.phoneNumber}</Box>}

        <Input
          w="400px"
          name="firstName"
          placeholder="FirstName"
          value={input.firstName}
          onChange={handleInputChange}
        />
        {error.firstName && <Box color={"red"}>{error.firstName}</Box>}

        <Input
          w="400px"
          name="lastName"
          placeholder="LastName"
          value={input.lastName}
          onChange={handleInputChange}
        />
        {error.lastName && <Box color={"red"}>{error.lastName}</Box>}

        <Flex alignItems="center" justify="center" direction="row">
          <Button onClick={handlerSubmit}>Register</Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default Register;
