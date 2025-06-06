import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { RiverData } from '../../types/river';

interface RiverStatusCardProps {
  data: RiverData;
  onPress: () => void;
}

const getAlertDescription = (level: RiverData['alertLevel']) => {
  switch (level) {
    case 'red':
      return 'Nível crítico - Risco de enchente';
    case 'yellow':
      return 'Nível elevado - Atenção';
    case 'green':
      return 'Nível normal';
    default:
      return '';
  }
};

const getAlertColor = (level: RiverData['alertLevel']) => {
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

export const RiverStatusCard: React.FC<RiverStatusCardProps> = ({
  data,
  onPress,
}) => {
  const alertColor = getAlertColor(data.alertLevel);
  const alertDescription = getAlertDescription(data.alertLevel);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.name}</Text>
        <View style={[styles.alertIndicator, { backgroundColor: alertColor }]} />
      </View>

      <View style={styles.content}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelLabel}>Nível atual</Text>
          <Text style={styles.levelValue}>{data.currentLevel.toFixed(1)}m</Text>
        </View>

        <View style={styles.alertContainer}>
          <Text style={[styles.alertText, { color: alertColor }]}>
            {alertDescription}
          </Text>
        </View>

        <Text style={styles.lastUpdate}>
          Última atualização: {new Date(data.lastUpdate).toLocaleString()}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.detailsButton}>Ver mais detalhes</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  alertIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  content: {
    marginBottom: 16,
  },
  levelContainer: {
    marginBottom: 12,
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
  alertContainer: {
    marginBottom: 12,
  },
  alertText: {
    fontSize: 16,
    fontWeight: '500',
  },
  lastUpdate: {
    fontSize: 12,
    color: colors.textLight,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  detailsButton: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
}); 