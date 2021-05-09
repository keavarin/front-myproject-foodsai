import { extendTheme } from "@chakra-ui/react";

//สร้าง config โดยสร้าง themeขึ้นมา
export const theme = extendTheme({
  fonts: {
    heading: "Fredoka One", //ชื่อของ fontface
    body: "Fredoka One",
  },
  //customizeตัว component
  // components: {
  //   Button,
  // },
});
