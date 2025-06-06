import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from './src/navigation';
import { SplashScreen } from './src/screens/SplashScreen';
import { Onboarding } from './src/screens/Onboarding';
import { AuthScreen } from './src/screens/Auth';
import { LocationSetup } from './src/screens/LocationSetup';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLocationComplete = () => {
    setHasLocation(true);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onFinish={handleOnboardingComplete} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen 
              name="Auth" 
              component={AuthScreen} 
              initialParams={{ onAuthenticated: handleAuthenticated }}
            />
          ) : !hasLocation ? (
            <Stack.Screen 
              name="LocationSetup" 
              component={LocationSetup} 
              initialParams={{ onComplete: handleLocationComplete }}
            />
          ) : (
            <Stack.Screen name="Main" component={Navigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App; 