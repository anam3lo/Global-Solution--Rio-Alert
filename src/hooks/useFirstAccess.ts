import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_ACCESS_KEY = '@FloodMonitor:firstAccess';

export const useFirstAccess = () => {
  const [isFirstAccess, setIsFirstAccess] = useState<boolean | null>(null);

  useEffect(() => {
    checkFirstAccess();
  }, []);

  const checkFirstAccess = async () => {
    try {
      const value = await AsyncStorage.getItem(FIRST_ACCESS_KEY);
      setIsFirstAccess(value === null);
    } catch (error) {
      console.error('Error checking first access:', error);
      setIsFirstAccess(true);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(FIRST_ACCESS_KEY, 'false');
      setIsFirstAccess(false);
    } catch (error) {
      console.error('Error saving first access:', error);
    }
  };

  return {
    isFirstAccess,
    completeOnboarding,
  };
}; 