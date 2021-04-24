import OrderTracking from "../components/layout/OrderTracking";
import Navbar from "../components/layout/Navbar";
import { Box, Flex, Input } from "@chakra-ui/react";
function AdminOrderTrackingPage() {
  return (
    <>
      <Navbar />
      <Flex direction="column" alignItems="center">
        <Box fontSize="18">ค้นหา order ที่นี่ </Box>

        <OrderTracking />
      </Flex>
    </>
  );
}

export default AdminOrderTrackingPage;
