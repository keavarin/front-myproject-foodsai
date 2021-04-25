import { useContext } from "react";
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { OrderContext } from "../../contexts/OrderContextProvider";

function OrderHistory({ reset }) {
  const { historyOrder, setHistoryOrder } = useContext(OrderContext);
  const countArrive = historyOrder.filter((i) => i.status === "ARRIVE");

  return (
    <>
      {reset && (
        <>
          <Box> รายการทั้งหมด {countArrive.length} รายการ</Box>
          {countArrive.map((i, index) => (
            <>
              <Flex alignItems="center">
                <Box>
                  <Box>
                    {index + 1}: orderเลขที่: {i.orderTracking}
                  </Box>
                  <Box>
                    {i.OrderItems.map((i, index) => (
                      <UnorderedList>
                        <ListItem> รายการที่สั่ง: {i.Product.name}</ListItem>
                      </UnorderedList>
                    ))}
                  </Box>
                </Box>
              </Flex>
            </>
          ))}
        </>
      )}
    </>
  );
}
export default OrderHistory;
