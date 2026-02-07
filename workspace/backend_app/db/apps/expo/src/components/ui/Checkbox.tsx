import { Pressable, View } from "react-native";

import { colors } from "@corecount/tailwind-config/constants";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

function MyCheckbox({ checked, onChange }: CheckboxProps) {
  return (
    <Pressable
      style={{
        borderColor: checked ? "#fff" : "rgba(255,255,255,0.24)",
        backgroundColor: colors.dark["90"],
      }}
      className={"flex size-6 justify-center rounded-full border"}
      onPress={() => onChange()}
    >
      {checked && <View style={{ backgroundColor: "#01CFCC" }} className={"mx-auto size-4 rounded-full"}></View>}
    </Pressable>
  );
}

export default MyCheckbox;
