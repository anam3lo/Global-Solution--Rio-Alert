import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { AlertLevel } from '../../types/river';

interface RiverStatusProps {
  level: AlertLevel;
  currentLevel: number;
  name: string;
  lastUpdate: string;
}

const getAlertColor = (level: AlertLevel) => {
  switch (level) {
    case 'red':
      return colors.danger;
    case 'yellow':
      return colors.warning;
    case 'green':
      return colors.success;
    default:
      return colors.gray;
  }
};

export const RiverStatus: React.FC<RiverStatusProps> = ({
  level,
  currentLevel,
  name,
  lastUpdate,
}) => {
  return (
    <View style={[styles.container, { borderColor: getAlertColor(level) }]}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.level}>Nível atual: {currentLevel}m</Text>
        <View style={[styles.statusIndicator, { backgroundColor: getAlertColor(level) }]} />
      </View>
      <Text style={styles.lastUpdate}>
        Última atualização: {new Date(lastUpdate).toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 8,
    backgroundColor: colors.white,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  level: {
    fontSize: 16,
    color: colors.text,
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  lastUpdate: {
    fontSize: 12,
    color: colors.textLight,
  },
}); 