import Navbar from "../components/layout/Navbar";
import Login from "../components/auth/Login";
import { Box, Stack } from "@chakra-ui/layout";
import Banner from "../components/banner/Banner";
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  return (
    <>
      <Navbar />
      <Box align="center" fontSize="30">
        Promotion!{" "}
      </Box>
      <Banner />
      <Stack align="center">
        <Button
          colorScheme="red"
          size="lg"
          onClick={() => {
            history.push("/order");
          }}
        >
          สั่งเลย
        </Button>
      </Stack>
    </>
  );
}

export default Home;
