import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const NavigationDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Custom Item 1"
        onPress={() => {
          // Do something when the custom item is pressed
        }}
      />
      <DrawerItem
        label="Custom Item 2"
        onPress={() => {
          // Do something when the custom item is pressed
        }}
      />
    </DrawerContentScrollView>
  );
};

export default NavigationDrawer;
