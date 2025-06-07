import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { riverService } from '../../services/riverService';
import { RiverData } from '../../types/river';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../components/Button';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [rivers, setRivers] = useState<RiverData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRivers = async () => {
    try {
      const data = await riverService.getRivers();
      setRivers(data);
    } catch (error) {
      console.error('Error loading rivers:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRivers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadRivers();
  };

  const getAlertColor = (alertLevel: string) => {
    switch (alertLevel) {
      case 'red':
        return colors.danger;
      case 'yellow':
        return colors.warning;
      default:
        return colors.success;
    }
  };

  const getAlertDescription = (alertLevel: string) => {
    switch (alertLevel) {
      case 'red':
        return 'Alerta de Enchente';
      case 'yellow':
        return 'Alerta de Atenção';
      default:
        return 'Nível Normal';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Monitoramento de Rios</Text>
        <Text style={styles.subtitle}>
          Acompanhe o nível dos rios em sua região
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rios Monitorados</Text>
        {rivers.map((river) => (
          <TouchableOpacity
            key={river.id}
            style={styles.riverCard}
            onPress={() => navigation.navigate('RiverDetails', { riverId: river.id })}
          >
            <View style={styles.riverInfo}>
              <Text style={styles.riverName}>{river.name}</Text>
              <View style={styles.alertBadge}>
                <View
                  style={[
                    styles.alertIndicator,
                    { backgroundColor: getAlertColor(river.alertLevel) },
                  ]}
                />
                <Text style={styles.alertText}>
                  {getAlertDescription(river.alertLevel)}
                </Text>
              </View>
            </View>
            <View style={styles.levelContainer}>
              <Text style={styles.levelValue}>{river.currentLevel.toFixed(1)}m</Text>
              <Text style={styles.levelLabel}>Nível Atual</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.actionsContainer}>
          <Button
            title="Ver Todos os Rios"
            icon={<Icon name="water" size={24} color={colors.white} />}
            onPress={() => navigation.navigate('Rios')}
            style={styles.actionButton}
          />
          <Button
            title="Ver Alertas"
            icon={<Icon name="notifications" size={24} color={colors.white} />}
            onPress={() => navigation.navigate('Alertas')}
            variant="secondary"
            style={styles.actionButton}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações</Text>
        <View style={styles.infoCard}>
          <Icon name="info" size={24} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Como Interpretar os Níveis</Text>
            <Text style={styles.infoText}>
              • Verde: Nível normal, sem riscos{'\n'}
              • Amarelo: Atenção, nível elevado{'\n'}
              • Vermelho: Alerta de enchente
            </Text>
          </View>
        </View>
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
  header: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  riverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  riverInfo: {
    flex: 1,
  },
  riverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  alertText: {
    fontSize: 14,
    color: colors.text,
  },
  levelContainer: {
    alignItems: 'center',
  },
  levelValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  levelLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContent: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
}); 