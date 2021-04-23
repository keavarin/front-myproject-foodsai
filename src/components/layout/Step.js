import Stepper from "react-stepper-horizontal";
import { useContext } from "react";
import { Box, Button, ButtonGroup, Flex, Input, Stack } from "@chakra-ui/react";
import { OrderContext } from "../../contexts/OrderContextProvider";

function Step() {
  const { orderTrackData, setOrderTrackData } = useContext(OrderContext);

  return (
    <>
      {orderTrackData ? (
        <>
          {orderTrackData.status === "ORDERPLACE" ? (
            <Stepper
              steps={[
                { title: "กำลังสั่งorder" },
                { title: "ยกเลิกorder" },
                { title: "ยืนยันorder" },
                { title: "กำลังปรุง" },
                { title: "กำลังส่ง" },
                { title: "สำเร็จ !" },
              ]}
              activeStep={0}
              activeColor="#F04B3A"
              completeColor="#F04B3A"
            />
          ) : null}

          {orderTrackData.status === "ORDERCONFIRM" ? (
            <Stepper
              steps={[
                { title: "กำลังสั่งorder" },
                { title: "ยกเลิกorder" },
                { title: "ยืนยันorder" },
                { title: "กำลังปรุง" },
                { title: "กำลังส่ง" },
                { title: "สำเร็จ !" },
              ]}
              activeStep={2}
              activeColor="#F04B3A"
              completeColor="#F04B3A"
            />
          ) : null}

          {orderTrackData.status === "ORDERONPROCESS" ? (
            <Stepper
              steps={[
                { title: "กำลังสั่งorder" },
                { title: "ยกเลิกorder" },
                { title: "ยืนยันorder" },
                { title: "กำลังปรุง" },
                { title: "กำลังส่ง" },
                { title: "สำเร็จ !" },
              ]}
              activeStep={3}
              activeColor="#F04B3A"
              completeColor="#F04B3A"
            />
          ) : null}
          {orderTrackData.status === "ONTHEWAY" ? (
            <Stepper
              steps={[
                { title: "กำลังสั่งorder" },
                { title: "ยกเลิกorder" },
                { title: "ยืนยันorder" },
                { title: "กำลังปรุง" },
                { title: "กำลังส่ง" },
                { title: "สำเร็จ !" },
              ]}
              activeStep={4}
              activeColor="#F04B3A"
              completeColor="#F04B3A"
            />
          ) : null}
          {orderTrackData.status === "ARRIVE" ? (
            <Stepper
              steps={[
                { title: "กำลังสั่งorder" },
                { title: "ยกเลิกorder" },
                { title: "ยืนยันorder" },
                { title: "กำลังปรุง" },
                { title: "กำลังส่ง" },
                { title: "สำเร็จ !" },
              ]}
              activeStep={5}
              activeColor="#F04B3A"
              completeColor="#F04B3A"
            />
          ) : null}
          {orderTrackData.status === "ORDERCANCEL" ? (
            <Stepper
              steps={[
                { title: "กำลังสั่งorder" },
                { title: "ยกเลิกorderแล้ว" },
              ]}
              activeStep={1}
              activeColor="#F04B3A"
              completeColor="#F04B3A"
            />
          ) : null}
        </>
      ) : (
        <>
          <Box p={5} shadow="lg" borderWidth="2px" mt={30} color="red">
            <Box>ไม่มีเลขที่order นี้</Box>
          </Box>
        </>
      )}
    </>
  );
}
export default Step;
