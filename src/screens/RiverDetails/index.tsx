import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { riverService } from '../../services/riverService';
import { RiverData } from '../../types/river';
import { Button } from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RiverDetailsRouteProp = RouteProp<RootStackParamList, 'RiverDetails'>;

export const RiverDetailsScreen = () => {
  const route = useRoute<RiverDetailsRouteProp>();
  const [riverData, setRiverData] = useState<RiverData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadRiverData = async () => {
    try {
      const rivers = await riverService.getRivers();
      const river = rivers.find(r => r.id === route.params.riverId);
      setRiverData(river || null);
    } catch (error) {
      console.error('Error loading river data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRiverData();
  }, [route.params.riverId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!riverData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Rio não encontrado</Text>
      </View>
    );
  }

  const getAlertColor = () => {
    switch (riverData.alertLevel) {
      case 'red':
        return colors.danger;
      case 'yellow':
        return colors.warning;
      default:
        return colors.success;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{riverData.name}</Text>
        <View style={[styles.alertIndicator, { backgroundColor: getAlertColor() }]} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nível Atual</Text>
        <Text style={styles.levelValue}>{riverData.currentLevel.toFixed(1)}m</Text>
        <Text style={styles.lastUpdate}>
          Última atualização: {new Date(riverData.lastUpdate).toLocaleString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Previsão do Tempo</Text>
        <Text style={styles.weatherText}>
          {riverData.weatherForecast || 'Sem previsão disponível'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Abrigos Próximos</Text>
        {riverData.shelters.map((shelter, index) => (
          <View key={index} style={styles.shelterItem}>
            <Icon name="place" size={24} color={colors.primary} />
            <View style={styles.shelterInfo}>
              <Text style={styles.shelterName}>{shelter.name}</Text>
              <Text style={styles.shelterAddress}>{shelter.address}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          title="Ver no Mapa"
          icon={<Icon name="map" size={24} color={colors.white} />}
          onPress={() => {}}
          style={styles.actionButton}
        />
        <Button
          title="Compartilhar"
          icon={<Icon name="share" size={24} color={colors.white} />}
          onPress={() => {}}
          variant="secondary"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  alertIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  section: {
    padding: 16,
    backgroundColor: colors.white,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  levelValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  lastUpdate: {
    fontSize: 14,
    color: colors.textLight,
  },
  weatherText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  shelterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  shelterInfo: {
    marginLeft: 12,
    flex: 1,
  },
  shelterName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  shelterAddress: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
}); 