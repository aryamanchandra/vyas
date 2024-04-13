import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Marketplace from "./src/screens/Marketplace";
import Community from "./src/screens/Community";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import You from "./src/screens/You";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import Enterprise from "./src/screens/Enterprise";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      style={styles.bottomBar}
      screenOptions={{
        tabBarStyle: {
          height: 60,
          marginBottom:20,
          position: 'absolute',
          borderRadius:40,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          width:"95%",
          marginLeft: 10,
          marginRight:10,
          textAlign:"center",
          paddingBottom:5,
        },
        tabBarActiveTintColor: "#00ADB5",
        tabBarItemStyle: {
          // margin:0,
        },
      }}
    >
      <Tab.Screen
        name="Marketplace"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <FeatherIcon
                name="shopping-bag"
                size={30}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
                style={styles.icons}
              />
            );
          },
        }}
        component={Marketplace}
      />

      <Tab.Screen
        name="Community"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <AntDesign
                name="earth"
                size={28}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
              />
            );
          },
        }}
        component={Community}
      />
      <Tab.Screen
        name="You"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icons
                name="account"
                size={26}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
              />
            );
          },
        }}
        component={You}
      />
    </Tab.Navigator>
  );
};

const MainCompany = () => {
  return (
    <Tab.Navigator
      style={styles.bottomBar}
      screenOptions={{
        tabBarStyle: {
          height: 60,
          marginBottom:20,
          position: 'absolute',
          borderRadius:40,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          width:"95%",
          marginLeft: 10,
          marginRight:10,
          textAlign:"center",
          paddingBottom:5,
        },
        tabBarActiveTintColor: "#00ADB5",
        tabBarItemStyle: {
          // margin:0,
        },
      }}
    >
      <Tab.Screen
        name="Marketplace"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <FeatherIcon
                name="shopping-bag"
                size={30}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
                style={styles.icons}
              />
            );
          },
        }}
        component={Marketplace}
      />

      <Tab.Screen
        name="Community"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <AntDesign
                name="earth"
                size={28}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
              />
            );
          },
        }}
        component={Community}
      />

      <Tab.Screen
        name="Enterprise"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name="building-o"
                size={28}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
              />
            );
          },
        }}
        component={Enterprise}
      />

      <Tab.Screen
        name="You"
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icons
                name="account"
                size={26}
                color={tabInfo.focused ? "#00ADB5" : "#8e8e93"}
              />
            );
          },
        }}
        component={You}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainCompany"
          component={MainCompany}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "#00ADB5",
  },
  bottomBar: {
    // backgroundColor: "fff",
    marginHorizontal: 0,
    marginVertical: 0,
  },
  icons: {
    padding: 0,
    margin: 0,
  },
});
