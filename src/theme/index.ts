import { extendTheme } from "@chakra-ui/react";

const colors = {
  card: {
    bg: "#ffffff15"
  },
  text: { bg: "#69686484" },
  app: { bg: "#FF3CAC" }
};

const shadows = { "dark-lg": "0 8px 32px rgba(0, 0, 0, 0.36)" };

export const theme = extendTheme({
  colors,
  shadows,
  components: {
    Button: {
      baseStyle: {
        bgColor: "whiteAlpha.200 !important",
        _hover: {
          bgColor: "whiteAlpha.300 !important"
        }
      }
    }
  }
});
