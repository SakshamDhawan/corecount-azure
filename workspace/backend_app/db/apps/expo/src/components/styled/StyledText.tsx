import type { ComponentProps } from "react";
import { Text } from "react-native";
import clsx from "clsx";

type StyledTextProps = ComponentProps<typeof Text> & {};

const StyledText = ({ style, className, ...props }: StyledTextProps) => {
  return (
    <Text
      className={clsx("text-light-10", className)}
      // @ts-ignore
      style={{ ...typography.body.regular, ...style }}
      {...props}
    />
  );
};

export const typography = {
  h1: {
    fontSize: 28,
    lineHeight: 32,
    fontFamily: "Chillax-Semibold",
  },
  h2: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "Chillax-Semibold",
  },
  h3: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "Chillax-Regular",
  },
  h4: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Chillax-Medium",
  },
  h5: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Chillax-Bold",
  },
  caption: {
    fontSize: 10,
    lineHeight: 14,
  },
  bigNumber: {
    fontFamily: "Chillax-Semibold",
    fontSize: 48,
    lineHeight: 52,
  },
  body: {
    large: {
      regular: {
        fontSize: 18,
        fontHeight: 24,
        fontFamily: "Chillax-Regular",
      },
      semibold: {
        fontSize: 18,
        fontHeight: 24,
        fontFamily: "Chillax-Semibold",
      },
    },
    small: {
      regular: {
        fontSize: 14,
        fontHeight: 20,
        fontFamily: "Chillax-Regular",
      },
      semibold: {
        fontSize: 14,
        fontHeight: 20,
        fontFamily: "Chillax-Semibold",
      },
    },
    regular: {
      fontSize: 16,
      fontHeight: 22,
      fontFamily: "Chillax-Regular",
    },
    semibold: {
      fontSize: 16,
      fontHeight: 22,
      fontFamily: "Chillax-Semibold",
    },
    medium: {
      fontSize: 16,
      fontHeight: 22,
      fontFamily: "Chillax-Medium",
    },
  },
  input: {
    regular: {
      fontSize: 13,
      fontHeight: 16,
      fontFamily: "Chillax-Regular",
    },
    medium: {
      fontSize: 13,
      fontHeight: 16,
      fontFamily: "Chillax-Medium",
    },
  },
  button: {
    medium: {
      fontSize: 14,
      fontHeight: 24,
      fontFamily: "Chillax-Medium",
    },
    semibold: {
      fontSize: 14,
      fontHeight: 24,
      fontFamily: "Chillax-Semibold",
    },
    small: {
      regular: {
        fontSize: 12,
        fontHeight: 16,
        fontFamily: "Chillax-Regular",
      },
      semibold: {
        fontSize: 12,
        fontHeight: 16,
        fontFamily: "Chillax-Semibold",
      },
    },
  },
};

export default StyledText;
