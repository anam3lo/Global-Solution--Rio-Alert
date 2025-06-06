import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { RiverData } from '../../../types/river';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RedAlertProps {
  riverData: RiverData;
}

const DEFESA_CIVIL_PHONE = '199';

export const RedAlert: React.FC<RedAlertProps> = ({ riverData }) => {
  const handleCallDefesaCivil = () => {
    Linking.openURL(`tel:${DEFESA_CIVIL_PHONE}`);
  };

  const handleOpenMaps = () => {
    const scheme = Platform.select({
      ios: 'maps:',
      android: 'geo:',
    });
    const url = Platform.select({
      ios: `${scheme}?q=${riverData.shelters[0]?.latitude},${riverData.shelters[0]?.longitude}`,
      android: `${scheme}0,0?q=${riverData.shelters[0]?.latitude},${riverData.shelters[0]?.longitude}`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={[styles.indicator, { backgroundColor: colors.danger }]} />
        <Text style={styles.statusText}>Alerta - Nível Crítico</Text>
      </View>

      <View style={styles.levelContainer}>
        <Text style={styles.levelLabel}>Nível atual do rio</Text>
        <Text style={styles.levelValue}>{riverData.currentLevel.toFixed(1)}m</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Nível crítico detectado! Procure um local seguro imediatamente.
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={handleCallDefesaCivil}
        >
          <Icon name="phone" size={24} color={colors.white} />
          <Text style={styles.actionButtonText}>Ligar para Defesa Civil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.mapButton]}
          onPress={handleOpenMaps}
        >
          <Icon name="location-on" size={24} color={colors.white} />
          <Text style={styles.actionButtonText}>Ver Abrigos no Mapa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sheltersContainer}>
        <Text style={styles.sheltersTitle}>Abrigos Próximos</Text>
        {riverData.shelters.map((shelter, index) => (
          <View key={index} style={styles.shelterItem}>
            <Icon name="place" size={20} color={colors.danger} />
            <View style={styles.shelterInfo}>
              <Text style={styles.shelterName}>{shelter.name}</Text>
              <Text style={styles.shelterAddress}>{shelter.address}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.danger,
  },
  levelContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  levelLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  levelValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  messageContainer: {
    padding: 16,
    backgroundColor: colors.dangerLight,
    margin: 16,
    borderRadius: 8,
  },
  message: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  callButton: {
    backgroundColor: colors.danger,
  },
  mapButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sheltersContainer: {
    padding: 16,
  },
  sheltersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  shelterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
}); 