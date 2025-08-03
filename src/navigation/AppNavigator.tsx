import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import DetailScreen from '../screens/DetailScreen';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: { animeId: number };
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['animeexplorer://', 'https://animeexplorer.com'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Home: 'home',
          Favorites: 'favorites',
        },
      },
      Detail: 'anime/:animeId',
    },
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const getTabBarIcon = (routeName: string, color: string, size: number, focused: boolean) => {
  const iconMap: Record<string, [string, string]> = {
    Home: ['home-outline', 'home'],
    Favorites: ['heart-outline', 'heart'],
  };

  const [outline, filled] = iconMap[routeName] || ['help-outline', 'help'];
  const icon = focused ? filled : outline;

  return <Ionicons name={icon as any} size={size} color={color} />;
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => getTabBarIcon(route.name, color, size, focused),

        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: '',
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
