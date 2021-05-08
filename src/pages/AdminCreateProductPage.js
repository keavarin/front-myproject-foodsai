import Navbar from "../components/layout/Navbar";
import CreateProduct from "../components/layout/CreateProduct";
import { Box, Flex, Image } from "@chakra-ui/react";
function AdminCreateProductPage() {
  return (
    <>
      <Navbar />
      <Flex direction="column" alignItems="center" mt={10}>
        <CreateProduct />
      </Flex>
    </>
  );
}

export default AdminCreateProductPage;
