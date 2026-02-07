import type { ComponentProps } from "react";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { cssInterop } from "nativewind";

import LabelBar from "~/components/ui/LabelBar";

type InputProps = ComponentProps<typeof TextInput> & {
  label?: string;
  action?: any;
  icon?: any;
  value: any;
};

cssInterop(TextInput, {
  className: {
    target: "style", // map className->style
    nativeStyleToProp: {
      textAlign: true, // extract `textAlign` styles and pass them to the `textAlign` prop
    },
  },
  placeholderClassName: {
    target: false, // Don't pass this as a prop
    nativeStyleToProp: {
      color: "placeholderTextColor", // extract `color` and pass it to the `placeholderTextColor`prop
    },
  },
  selectionClassName: {
    target: false, // Don't pass this as a prop
    nativeStyleToProp: {
      color: "selectionColor", // extract `color` and pass it to the `selectionColor`prop
    },
  },
});

const Input = ({ ...props }: InputProps) => {
  const [active, setActive] = useState(false);

  return (
    <View className={""}>
      {props.label && <LabelBar label={props.label} />}

      <View
        className={"flex flex-row items-center rounded-md border px-5 py-5"}
        style={{ borderColor: active ? "#01CFCC" : "rgba(255,255,255,0.3)" }}
      >
        {props.icon && (
          <View className={"size-6 items-center justify-center"}>
            <props.icon width={24} height={24} stroke={"#425A6E"} />
          </View>
        )}
        <TextInput
          {...props}
          onEndEditing={() => setActive(false)}
          onFocus={() => setActive(true)}
          placeholderTextColor="#72808F"
          textAlignVertical="top"
          style={{
            paddingLeft: 8,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        ></TextInput>
      </View>
    </View>
  );
};

export default Input;
