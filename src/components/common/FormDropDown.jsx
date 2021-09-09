import React from "react";
import DropDown from "react-native-paper-dropdown";

const FormDropDown = ({ labelName, dropdownList, ...rest }) => {
  const [showDropDown, setShowDropDown] = React.useState(false);

  return (
    <DropDown
      label={"Type"}
      mode={"outlined"}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      list={dropdownList}
      {...rest}
    />
  );
};

export default FormDropDown;
