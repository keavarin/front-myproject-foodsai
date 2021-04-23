import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { Box, Button, Flex } from "@chakra-ui/react";
function SignIn() {
  const history = useHistory();
  const { setIsAuthenticated } = useContext(AuthContext);
  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
      // validateInput();
      // const res = await axios.post('http://localhost:8080/login', {email, password})

      // localStorageService.setToken(res.data.token)

      setIsAuthenticated(false);
      history.push("/login");
    } catch (err) {
      console.dir(err);
    }
  };
  //const {isAuthenticated} = useContext(AuthContext);
  return (
    <>
      {/* //<Flex p={2} alignItems="center" direction="row" justify="space-between" width="100%" height="80px" bg="#F04B3A" color="white"> */}

      <Button onClick={handlerSubmit} textAlign="right" variant="ghost">
        เข้าสู่ระบบ
      </Button>

      {/* </Flex> */}

      {/* <Logo />
            {isAuthenticated && <Menu />} */}
    </>
  );
}

export default SignIn;
