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

type RiversScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RiversScreen = () => {
  const navigation = useNavigation<RiversScreenNavigationProp>();
  const [rivers, setRivers] = useState<RiverData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRivers = async () => {
    try {
      const data = await riverService.getRivers();
      setRivers(data);
    } catch (error) {
      console.error('Error loading rivers:', error);
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

  const renderRiverItem = ({ item }: { item: RiverData }) => (
    <TouchableOpacity
      style={styles.riverItem}
      onPress={() => navigation.navigate('RiverDetails', { riverId: item.id })}
    >
      <View style={styles.riverInfo}>
        <Text style={styles.riverName}>{item.name}</Text>
        <Text style={styles.riverLevel}>
          Nível atual: {item.currentLevel.toFixed(1)}m
        </Text>
        <Text style={styles.lastUpdate}>
          Última atualização: {new Date(item.lastUpdate).toLocaleString()}
        </Text>
      </View>
      <View style={styles.alertContainer}>
        <View
          style={[
            styles.alertIndicator,
            { backgroundColor: getAlertColor(item.alertLevel) },
          ]}
        />
        <Icon name="chevron-right" size={24} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rivers}
        renderItem={renderRiverItem}
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
  listContainer: {
    padding: 16,
  },
  riverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
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
    marginBottom: 4,
  },
  riverLevel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  lastUpdate: {
    fontSize: 14,
    color: colors.textLight,
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  alertIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  separator: {
    height: 12,
  },
}); 