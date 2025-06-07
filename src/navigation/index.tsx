import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from './types';
import { HomeScreen } from '../screens/Home';
import { RiversScreen } from '../screens/Rivers';
import { AlertsScreen } from '../screens/Alerts';
import { SettingsScreen } from '../screens/Settings';
import { RiverDetailsScreen } from '../screens/RiverDetails';
import { colors } from '../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChecklistScreen } from '../screens/ChecklistScreen';
import { PreventionTipsScreen } from '../screens/PreventionTips';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
  </SafeAreaView>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: ({ route }) => (
          <CustomHeader
            title="RioAlert"
            subtitle={
              route.name === 'Home'
                ? 'Início'
                : route.name === 'Rios'
                ? 'Rios'
                : route.name === 'Alertas'
                ? 'Alertas'
                : 'Configurações'
            }
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Rios"
        component={RiversScreen}
        options={{
          tabBarLabel: 'Rios',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="water" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Alertas"
        component={AlertsScreen}
        options={{
          tabBarLabel: 'Alertas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Configurações"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="RiverDetails" 
        component={RiverDetailsScreen}
        options={{
          headerShown: true,
          title: 'Detalhes do Rio',
        }}
      />
      <Stack.Screen 
        name="Checklist" 
        component={ChecklistScreen}
        options={{
          headerShown: true,
          title: 'Checklist',
        }}
      />
      <Stack.Screen 
        name="PreventionTips" 
        component={PreventionTipsScreen}
        options={{
          headerShown: true,
          title: 'Dicas de Prevenção',
        }}
      />
      <Stack.Screen 
        name="Alertas" 
        component={AlertsScreen}
        options={{
          headerShown: true,
          title: 'Alertas',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
}); 