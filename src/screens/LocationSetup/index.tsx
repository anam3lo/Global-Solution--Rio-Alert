import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { authService } from '../../services/authService';
import { useCurrentUser } from '../../hooks/useCurrentUser';

type LocationSetupRouteProp = RouteProp<RootStackParamList, 'LocationSetup'>;
type LocationSetupNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LocationSetup = () => {
  const navigation = useNavigation<LocationSetupNavigationProp>();
  const route = useRoute<LocationSetupRouteProp>();
  const { user, refreshUser } = useCurrentUser();
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    if (route.params?.onComplete) {
      route.params.onComplete();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  };

  const handleManualLocation = async () => {
    if (!location.trim()) {
      Alert.alert('Erro', 'Por favor, digite sua localização');
      return;
    }

    setIsLoading(true);

    try {
      if (user) {
        await authService.updateUserLocation(user.id, {
          city: location,
        });
        await refreshUser();
        handleComplete();
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar sua localização');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    setIsLoading(true);

    try {
      if (user) {
        await authService.updateUserLocation(user.id, {
          coordinates: {
            latitude: -23.5505,
            longitude: -46.6333,
          },
        });
        await refreshUser();
        handleComplete();
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter sua localização atual');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configure sua localização</Text>
      <Text style={styles.subtitle}>
        Isso nos ajudará a fornecer alertas mais precisos para sua região
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua cidade ou bairro"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleManualLocation}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Salvando...' : 'Salvar localização'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton, isLoading && styles.buttonDisabled]}
        onPress={handleUseCurrentLocation}
        disabled={isLoading}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Usar minha localização
        </Text>
      </TouchableOpacity>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 