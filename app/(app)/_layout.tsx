import { Tabs } from "expo-router";

import HomeIcon from "../../assets/images/house.svg";
import HistoryIcon from "../../assets/images/clock.svg";
import ProfileIcon from "../../assets/images/user-round.svg";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 30, // border radius
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#585858",
        tabBarInactiveTintColor: "#585858",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "BalooTammudu2-Bold",
          marginTop: -5,
        },
      }}
    >
      <Tabs.Screen
        name="upload"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="video-gallery"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <HistoryIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="video-output"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="change-email"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="change-password"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
