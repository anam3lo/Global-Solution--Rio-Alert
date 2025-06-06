import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { RiverData } from '../../../types/river';

interface GreenAlertProps {
  riverData: RiverData;
}

export const GreenAlert: React.FC<GreenAlertProps> = ({ riverData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={[styles.indicator, { backgroundColor: colors.success }]} />
        <Text style={styles.statusText}>Situação Normal</Text>
      </View>

      <View style={styles.levelContainer}>
        <Text style={styles.levelLabel}>Nível atual do rio</Text>
        <Text style={styles.levelValue}>{riverData.currentLevel.toFixed(1)}m</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Tudo em ordem! Mas fique sempre atento aos canais oficiais.
        </Text>
      </View>

      <View style={styles.weatherContainer}>
        <Text style={styles.weatherTitle}>Previsão do tempo</Text>
        <Text style={styles.weatherText}>
          {riverData.weatherForecast || 'Sem previsão disponível no momento'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    color: colors.success,
  },
  levelContainer: {
    marginBottom: 16,
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
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.successLight,
    borderRadius: 8,
  },
  message: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  weatherContainer: {
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  weatherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  weatherText: {
    fontSize: 14,
    color: colors.textLight,
  },
}); 