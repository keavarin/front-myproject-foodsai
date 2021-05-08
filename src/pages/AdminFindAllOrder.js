import Navbar from "../components/layout/Navbar";
import FindAllOrder from "../components/layout/FindAllOrdere";
import { Box, Flex, Image } from "@chakra-ui/react";

function AdminFindAllOrder() {
  return (
    <>
      <Navbar />
      <Flex direction="column" alignItems="center" mt={10}>
        <Box>
          find all orders
          <FindAllOrder />
        </Box>
      </Flex>
    </>
  );
}

export default AdminFindAllOrder;
