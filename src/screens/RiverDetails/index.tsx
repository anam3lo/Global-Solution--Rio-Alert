import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { riverService } from '../../services/riverService';
import { RiverData } from '../../types/river';
import { Button } from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RiverDetailsRouteProp = RouteProp<RootStackParamList, 'RiverDetails'>;
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RiverDetailsScreen = () => {
  const route = useRoute<RiverDetailsRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [riverData, setRiverData] = useState<RiverData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadRiverData = async () => {
    try {
      const rivers = await riverService.getRivers();
      const river = rivers.find(r => r.id === route.params.riverId);
      setRiverData(river || null);
    } catch (error) {
      console.error('Error loading river data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRiverData();
  }, [route.params.riverId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!riverData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Rio não encontrado</Text>
      </View>
    );
  }

  const getAlertColor = () => {
    switch (riverData.alertLevel) {
      case 'red':
        return colors.danger;
      case 'yellow':
        return colors.warning;
      case 'green':
        return colors.success;
      default:
        return colors.success;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{riverData.name}</Text>
        <View style={[styles.alertIndicator, { backgroundColor: getAlertColor() }]} />
      </View>

      {riverData.alertLevel === 'yellow' ? (
        <View style={styles.yellowAlertMainContainer}>
          <View style={styles.yellowAlertTopSection}>
            <Image
              source={require('../../../assets/warning-icon.png')}
              style={styles.yellowAlertBackgroundImage}
              resizeMode="cover"
            />
            <Image
              source={require('../../../assets/alerta-amarelo.png')}
              style={styles.yellowAlertOverlayImage}
              resizeMode="contain"
            />
          </View>
          <ScrollView style={styles.yellowAlertBottomSection}>
            <View style={styles.yellowAlertContent}>
              <Text style={styles.yellowAlertTitle}>ALERTA AMARELO</Text>
              <Text style={styles.yellowAlertSubtitle}>Atenção</Text>
              <Text style={styles.yellowAlertText}>
                O nível do Rio Tietê atingiu {riverData.currentLevel.toFixed(1)}m, se aproximando
                do limite de risco.
              </Text>
              <Text style={styles.yellowAlertText}>
                Atenção redobrada nas áreas próximas.
              </Text>
              <Text style={styles.yellowAlertText}>
                Prepare documentos e itens essenciais. Mantenha mochilas
                de emergência prontas.
              </Text>
              <Text style={styles.yellowAlertText}>
                Acompanhe atualizações e planeje rotas de saída seguras.
              </Text>
              <Button
                title="Ver checklist de segurança"
                onPress={() => navigation.navigate('Checklist')}
                style={styles.yellowActionButton}
              />
              <Button
                title="Conferir rotas para fuga"
                onPress={() => Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=saferoute')}
                style={styles.yellowActionButton}
              />
            </View>
          </ScrollView>
        </View>
      ) : riverData.alertLevel === 'green' ? (
        <View style={styles.greenAlertMainContainer}>
          <View style={styles.greenAlertTopSection}>
            <Image
              source={require('../../../assets/warning-icon.png')}
              style={styles.yellowAlertBackgroundImage}
              resizeMode="cover"
            />
            <Image
              source={require('../../../assets/alerta-verde.png')}
              style={styles.greenAlertOverlayImage}
              resizeMode="contain"
            />
          </View>
          <ScrollView style={styles.greenAlertBottomSection}>
            <View style={styles.greenAlertContent}>
              <Text style={styles.greenAlertTitle}>ALERTA VERDE</Text>
              <Text style={styles.greenAlertSubtitle}>Situação normal</Text>
              <Text style={styles.greenAlertText}>
                O nível do Rio Pinheiros está em {riverData.currentLevel.toFixed(1)}m, dentro da faixa de segurança.
              </Text>
              <Text style={styles.greenAlertText}>
                Não há risco de alagamento no momento.
              </Text>
              <Text style={styles.greenAlertText}>
                Continue acompanhando pelo aplicativo e fique atento às mudanças nas condições climáticas.
              </Text>
              <Button
                title="Ver previsão do tempo"
                onPress={() => Linking.openURL('https://www.google.com/search?q=previsao+do+tempo')}
                style={styles.greenActionButton}
              />
              <Button
                title="Dicas de prevenção"
                onPress={() => navigation.navigate('PreventionTips')}
                style={styles.greenActionButton}
              />
            </View>
          </ScrollView>
        </View>
      ) : riverData.alertLevel === 'red' ? (
        <View style={styles.redAlertMainContainer}>
          <View style={styles.redAlertTopSection}>
            <Image
              source={require('../../../assets/warning-icon.png')}
              style={styles.yellowAlertBackgroundImage}
              resizeMode="cover"
            />
            <Image
              source={require('../../../assets/alerta-vermelho.png')}
              style={styles.redAlertOverlayImage}
              resizeMode="contain"
            />
          </View>
          <ScrollView style={styles.redAlertBottomSection}>
            <View style={styles.redAlertContent}>
              <Text style={styles.redAlertTitle}>ALERTA VERMELHO</Text>
              <Text style={styles.redAlertSubtitle}>Cheia / Emergência</Text>
              <Text style={styles.redAlertText}>
                O nível do Rio Paranapanema atingiu {riverData.currentLevel.toFixed(1)}m, acima do limite crítico de 5.00m.
              </Text>
              <Text style={styles.redAlertText}>
                Áreas próximas podem ser alagadas a qualquer momento.
              </Text>
              <Text style={styles.redAlertText}>
                Evacue imediatamente para locais seguros indicados pela Defesa Civil.
              </Text>
              <Text style={styles.redAlertText}>
                 Ligue para 199 ou 193 em caso de emergência.
              </Text>
              <Button
                title="Ligue para emergência"
                onPress={() => Linking.openURL('tel:199')}
                style={styles.redActionButton}
              />
              <Button
                title="Conferir rotas para fuga"
                onPress={() => Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=saferoute')}
                style={styles.redActionButton}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nível Atual</Text>
            <Text style={styles.levelValue}>{riverData.currentLevel.toFixed(1)}m</Text>
            <Text style={styles.lastUpdate}>
              Última atualização: {new Date(riverData.lastUpdate).toLocaleString()}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Previsão do Tempo</Text>
            <Text style={styles.weatherText}>
              {riverData.weatherForecast || 'Sem previsão disponível'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Abrigos Próximos</Text>
            {riverData.shelters.map((shelter, index) => (
              <View key={index} style={styles.shelterItem}>
                <Icon name="place" size={24} color={colors.primary} />
                <View style={styles.shelterInfo}>
                  <Text style={styles.shelterName}>{shelter.name}</Text>
                  <Text style={styles.shelterAddress}>{shelter.address}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <Button
              title="Ver no Mapa"
              icon={<Icon name="map" size={24} color={colors.white} />}
              onPress={() => {}}
              style={styles.actionButton}
            />
            <Button
              title="Compartilhar"
              icon={<Icon name="share" size={24} color={colors.white} />}
              onPress={() => {}}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  alertIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  section: {
    padding: 16,
    backgroundColor: colors.white,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  levelValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  lastUpdate: {
    fontSize: 14,
    color: colors.textLight,
  },
  weatherText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  shelterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  actions: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  yellowAlertMainContainer: {
    flex: 1,
  },
  yellowAlertTopSection: {
    height: Dimensions.get('window').height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    overflow: 'hidden',
    position: 'relative',
  },
  yellowAlertBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  yellowAlertOverlayImage: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.8 * (1),
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -Dimensions.get('window').width * 0.3 / 2 },
      { translateY: -Dimensions.get('window').width * 0.8 * (1) / 2 },
    ],
  },
  yellowAlertBottomSection: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -80,
    overflow: 'hidden',
  },
  yellowAlertContent: {
    padding: 16,
    alignItems: 'center',
  },
  yellowAlertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.warning,
    marginBottom: 8,
  },
  yellowAlertSubtitle: {
    fontSize: 18,
    color: colors.warning,
    marginBottom: 16,
  },
  yellowAlertText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  yellowActionButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: colors.warning,
  },
  greenAlertMainContainer: {
    flex: 1,
  },
  greenAlertTopSection: {
    height: Dimensions.get('window').height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  greenAlertOverlayImage: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.6 * (0.4),
    resizeMode: 'contain',
    position: 'absolute',
    left: '50%',
    top: '30%',
    transform: [
      { translateX: -Dimensions.get('window').width * 0.4 / 2 },
      { translateY: -Dimensions.get('window').width * 0.14 * (-2) / 2 },
    ],
  },
  greenAlertBottomSection: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -40,
    overflow: 'hidden',
  },
  greenAlertContent: {
    padding: 16,
    alignItems: 'center',
  },
  greenAlertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 8,
  },
  greenAlertSubtitle: {
    fontSize: 18,
    color: colors.success,
    marginBottom: 16,
  },
  greenAlertText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  greenActionButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#4F984B',
  },
  redAlertMainContainer: {
    flex: 1,
  },
  redAlertTopSection: {
    height: Dimensions.get('window').height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  redAlertOverlayImage: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6 * (0.3),
    resizeMode: 'contain',
    position: 'absolute',
    left: '50%',
    top: '30%',
    transform: [
      { translateX: -Dimensions.get('window').width * 0.6 / 2 },
      { translateY: -Dimensions.get('window').width * 0.1* (0.3) / 2 },
    ],
  },
  redAlertBottomSection: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -80,
    overflow: 'hidden',
  },
  redAlertContent: {
    padding: 16,
    alignItems: 'center',
  },
  redAlertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.danger,
    marginBottom: 8,
  },
  redAlertSubtitle: {
    fontSize: 18,
    color: colors.danger,
    marginBottom: 16,
  },
  redAlertText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  redActionButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#EA1135',
  },
});

const { height } = Dimensions.get('window');