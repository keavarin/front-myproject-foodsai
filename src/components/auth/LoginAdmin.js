import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
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

function LoginAdmin() {
  const [show, setShow] = React.useState(false);
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const history = useHistory();

  const validateInput = () => {
    const newError = {};
    if (!email) newError.email = "email is required";
    if (!password) newError.password = "password is required";

    setError(newError);
  };
  const handleClick = () => setShow(!show);

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
      validateInput();
      const { data } = await axios.post("http://localhost:8080/loginadmin", {
        email,
        password,
      });

      localStorageService.setToken(data.token);
      setAuth(jwtDecode(data.token));

      history.push("/");
    } catch (err) {
      console.dir(err);
    }
  };
  return (
    <Flex direction="column" alignItems="center">
      <Stack spacing={5}>
        <Box textAlign="center">Log In Admin Only</Box>

        <Input
          w="400px"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {error.email && <Box color={"red"}>{error.email}</Box>}
        <InputGroup w="400px" size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <InputRightElement width="4.5rem">
            <Button size="xs" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {error.password && <Box color={"red"}>{error.password}</Box>}

        <Flex alignItems="center" justify="center" direction="row">
          <Button size="md" onClick={handlerSubmit}>
            LOG IN
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default LoginAdmin;
