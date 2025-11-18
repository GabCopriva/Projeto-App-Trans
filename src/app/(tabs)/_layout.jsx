import { Tabs } from "expo-router";
import {
  BookOpen,
  Users,
  Hospital,
  Newspaper,
  Briefcase,
  Home,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: 4,
        },
        tabBarActiveTintColor: "#EC4899",
        tabBarInactiveTintColor: "#6B6B6B",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="guias"
        options={{
          title: "Guias",
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="providers"
        options={{
          title: "Profissionais",
          tabBarIcon: ({ color, size }) => <Users color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="hospitals"
        options={{
          title: "Hospitais",
          tabBarIcon: ({ color, size }) => <Hospital color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "Notícias",
          tabBarIcon: ({ color, size }) => (
            <Newspaper color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="opportunities"
        options={{
          title: "Oportunidades",
          tabBarIcon: ({ color, size }) => (
            <Briefcase color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
