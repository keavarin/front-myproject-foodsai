import Navbar from "../components/layout/Navbar";
import Login from "../components/auth/Login";
import { Box, Stack, Flex } from "@chakra-ui/layout";
import Banner from "../components/banner/Banner";
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  return (
    <>
      <Navbar />
      <Flex direction="column" alignItems="center">
        <Box align="center" fontSize="30">
          Promotion!{" "}
        </Box>
        <Banner />
        <Stack align="center">
          <Button
            mt={5}
            colorScheme="red"
            size="lg"
            onClick={() => {
              history.push("/order");
            }}
          >
            สั่งเลย
          </Button>
        </Stack>
      </Flex>
    </>
  );
}

export default Home;
