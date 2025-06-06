import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authService } from '../../services/authService';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderSettingItem = (
    title: string,
    icon: string,
    onPress?: () => void,
    rightElement?: React.ReactNode,
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Icon name={icon} size={24} color={colors.primary} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {rightElement || <Icon name="chevron-right" size={24} color={colors.textLight} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        {renderSettingItem(
          'Alertas de Enchente',
          'notifications',
          undefined,
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />,
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Localização</Text>
        {renderSettingItem(
          'Usar Localização',
          'location-on',
          undefined,
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />,
        )}
        {renderSettingItem('Alterar Localização', 'edit-location', () => {
          navigation.navigate('LocationSetup');
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        {renderSettingItem('Editar Perfil', 'person', () => {})}
        {renderSettingItem('Alterar Senha', 'lock', () => {})}
        {renderSettingItem('Sair', 'exit-to-app', handleLogout)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        {renderSettingItem('Termos de Uso', 'description', () => {})}
        {renderSettingItem('Política de Privacidade', 'privacy-tip', () => {})}
        {renderSettingItem('Versão do App', 'info', () => {}, (
          <Text style={styles.versionText}>1.0.0</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: 16,
    backgroundColor: colors.white,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
    marginLeft: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  versionText: {
    fontSize: 14,
    color: colors.textLight,
  },
}); 