import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { riverService } from '../../services/riverService';
import { RiverData } from '../../types/river';
import Icon from 'react-native-vector-icons/MaterialIcons';

type AlertsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AlertsScreen = () => {
  const navigation = useNavigation<AlertsScreenNavigationProp>();
  const [rivers, setRivers] = useState<RiverData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRivers = async () => {
    try {
      const data = await riverService.getRivers();
      // Filtrar apenas rios com alerta amarelo ou vermelho
      const alertRivers = data.filter(
        (river) => river.alertLevel === 'yellow' || river.alertLevel === 'red',
      );
      setRivers(alertRivers);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRivers();
  }, []);

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

  const renderAlertItem = ({ item }: { item: RiverData }) => (
    <TouchableOpacity
      style={styles.alertItem}
      onPress={() => navigation.navigate('RiverDetails', { riverId: item.id })}
    >
      <View style={styles.alertHeader}>
        <View style={styles.alertInfo}>
          <Text style={styles.riverName}>{item.name}</Text>
          <View style={styles.alertBadge}>
            <View
              style={[
                styles.alertIndicator,
                { backgroundColor: getAlertColor(item.alertLevel) },
              ]}
            />
            <Text style={styles.alertText}>
              {getAlertDescription(item.alertLevel)}
            </Text>
          </View>
        </View>
        <Icon name="chevron-right" size={24} color={colors.textLight} />
      </View>

      <View style={styles.alertDetails}>
        <Text style={styles.levelText}>
          Nível atual: {item.currentLevel.toFixed(1)}m
        </Text>
        <Text style={styles.updateText}>
          Última atualização: {new Date(item.lastUpdate).toLocaleString()}
        </Text>
      </View>

      {item.weatherForecast && (
        <View style={styles.weatherContainer}>
          <Icon name="cloud" size={16} color={colors.textLight} />
          <Text style={styles.weatherText}>{item.weatherForecast}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (rivers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="check-circle" size={48} color={colors.success} />
        <Text style={styles.emptyText}>Nenhum alerta ativo</Text>
        <Text style={styles.emptySubtext}>
          Todos os rios estão em níveis seguros
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rivers}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  alertItem: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertInfo: {
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
  alertDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  levelText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  updateText: {
    fontSize: 14,
    color: colors.textLight,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  weatherText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
  separator: {
    height: 12,
  },
}); 