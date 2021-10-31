import React, { Fragment, useCallback, useState, useEffect } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  Menu,
  Divider,
  HelperText,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

const FormSelect = ({ label, value, options, onChange, error }) => {
  const theme = useTheme();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  const errorMessage = error?.message;
  const textColor = errorMessage ? theme.colors.error : theme.colors.text;

  const styles = StyleSheet.create({
    textInputStyle: {
      color: textColor,
    },
    menuStyle: {
      minWidth: width,
      width: width,
      marginTop: height,
    },
    menuItemStyle: {
      width: width,
      minWidth: width,
      maxWidth: width,
    },
  });

  useEffect(() => {
    const _label = options.find((_) => _.value === value)?.label;

    if (_label) {
      setDisplayValue(_label);
    }
  }, [options, value]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleMenuItemPress = (itemValue) => {
    onChange(itemValue);
    closeMenu();
  };

  const onLayout = useCallback((event) => {
    const { width: _width, height: _height } = event.nativeEvent.layout;

    setWidth(_width);
    setHeight(_height);
  }, []);

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={styles.menuStyle}
        anchor={
          <TouchableRipple
            onPress={() => {
              Keyboard.dismiss();
              openMenu();
            }}
          >
            <View pointerEvents={"none"} onLayout={onLayout}>
              <TextInput
                value={displayValue}
                mode={"outlined"}
                label={label}
                pointerEvents={"none"}
                right={
                  <TextInput.Icon name={visible ? "menu-up" : "menu-down"} />
                }
                error={errorMessage ? true : false}
                style={styles.textInputStyle}
              />
            </View>
          </TouchableRipple>
        }
      >
        {options.map(({ label: _label, value: _value }, _index) => {
          return (
            <Fragment key={_value}>
              <Menu.Item
                title={_label}
                onPress={() => {
                  handleMenuItemPress(_value);
                }}
                style={styles.menuItemStyle}
                titleStyle={{
                  color:
                    _value === value ? theme.colors.primary : theme.colors.text,
                }}
              />
              {_index < options.length - 1 && <Divider />}
            </Fragment>
          );
        })}
      </Menu>
      {errorMessage && <HelperText type={"error"}>{errorMessage}</HelperText>}
    </>
  );
};

export default FormSelect;
