import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../../theme/colors';
import { RiverData } from '../../../types/river';

interface YellowAlertProps {
  riverData: RiverData;
}

const preventionChecklist = [
  'Mantenha-se informado sobre as condições climáticas',
  'Tenha um plano de evacuação preparado',
  'Mantenha documentos importantes em local seguro',
  'Tenha uma mochila de emergência pronta',
  'Conheça os pontos de encontro e abrigos próximos',
  'Mantenha contatos de emergência atualizados',
  'Verifique se há vazamentos em casa',
  'Mantenha calhas e bueiros desobstruídos',
];

export const YellowAlert: React.FC<YellowAlertProps> = ({ riverData }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={[styles.indicator, { backgroundColor: colors.warning }]} />
        <Text style={styles.statusText}>Atenção - Nível Elevado</Text>
      </View>

      <View style={styles.levelContainer}>
        <Text style={styles.levelLabel}>Nível atual do rio</Text>
        <Text style={styles.levelValue}>{riverData.currentLevel.toFixed(1)}m</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          O nível do rio está elevado. Tome as precauções necessárias.
        </Text>
      </View>

      <View style={styles.checklistContainer}>
        <Text style={styles.checklistTitle}>Checklist de Prevenção</Text>
        {preventionChecklist.map((item, index) => (
          <View key={index} style={styles.checklistItem}>
            <View style={styles.checkbox} />
            <Text style={styles.checklistText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.weatherContainer}>
        <Text style={styles.weatherTitle}>Previsão do tempo</Text>
        <Text style={styles.weatherText}>
          {riverData.weatherForecast || 'Sem previsão disponível no momento'}
        </Text>
      </View>
    </ScrollView>
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
    color: colors.warning,
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
    backgroundColor: colors.warningLight,
    margin: 16,
    borderRadius: 8,
  },
  message: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  checklistContainer: {
    padding: 16,
  },
  checklistTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.warning,
    borderRadius: 4,
    marginRight: 12,
  },
  checklistText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  weatherContainer: {
    padding: 16,
    backgroundColor: colors.background,
    margin: 16,
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