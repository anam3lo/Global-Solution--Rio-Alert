import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../theme/colors';

export const ChecklistScreen = () => {
  // Define the checklist items
  const [checklistItems, setChecklistItems] = useState([
    { id: '1', text: 'Fechar registro de gás', checked: false },
    { id: '2', text: 'Organizar mochila de emergência', checked: false },
    { id: '3', text: 'Fechar registro de gás', checked: false }, // Note: Duplicate text from item 1
    { id: '4', text: 'Guardar documentos em local seguro', checked: false },
    { id: '5', text: 'Evitar móveis no chão', checked: false },
  ]);

  // Function to toggle the checked state of an item
  const toggleItem = (id: string) => {
    setChecklistItems(checklistItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ALERTA AMARELO</Text>
      <Text style={styles.subtitle}>Checklist de segurança</Text>
      <View style={styles.separator} />
      <ScrollView>
        {checklistItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.checklistIem}
            onPress={() => toggleItem(item.id)}
          >
            <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
              {item.checked && <Text style={styles.checkboxCheck}>✓</Text>}
            </View>
            <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.warning, // Using warning color for yellow alert title
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.warning, // Using warning color for subtitle
    textAlign: 'center',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border, // Using a border color for separator
    marginVertical: 16,
  },
  checklistIem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.warning, // Using warning color for checkbox border
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.warning, // Using warning color for checked checkbox
  },
  checkboxCheck: {
    color: colors.white,
    fontSize: 16,
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
    flex: 1, // Allow text to wrap
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: colors.textLight,
  },
}); 