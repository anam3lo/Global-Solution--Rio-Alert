import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../components/Button';

type PreventionTipsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PreventionTipsScreen = () => {
  const navigation = useNavigation<PreventionTipsNavigationProp>();

  const tips = [
    {
      title: 'Dicas Gerais',
      items: [
        'Acompanhe previsões do tempo em canais oficiais (Defesa Civil, INMET, etc).',
        'Mantenha contato com vizinhos ou líderes comunitários para ações em grupo.',
        'Mantenha documentos importantes em sacos plásticos e em local alto.',
        'Tenha sempre uma lanterna com pilhas e carregador portátil para celular.',
        'Separe uma mochila com itens essenciais (remédios, água, cópias de documentos).',
        'Identifique os pontos de abrigo da sua região com antecedência.',
      ],
    },
    {
      title: 'Cuidados com o ambiente',
      items: [
        'Evite entulhos, móveis e lixo nas margens dos rios e ruas — isso agrava alagamentos.',
        'Faça revisões em instalações elétricas, especialmente em áreas sujeitas à água.',
        'Mantenha animais domésticos com guia ou caixas de transporte acessíveis.',
        'Marque pontos de risco em casa: locais que costumam alagar ou onde a água já entrou.',
      ],
    },
    {
      title: 'Rotas e comunicação',
      items: [
        'Planeje com sua família uma rota de fuga segura.',
        'Combine um ponto de encontro com familiares em caso de evacuação.',
        'Mantenha seu celular carregado e anote contatos úteis (Defesa Civil, bombeiros, vizinhos de confiança).',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Previna-se antes da emergência</Text>
          <Text style={styles.subtitle}>
            Mesmo em dias tranquilos, a prevenção faz a diferença. Veja algumas atitudes simples que podem salvar vidas:
          </Text>
        </View>

        {tips.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="check-circle" size={24} color={colors.success} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.tipItem}>
                <Icon name="arrow-right" size={20} color={colors.primary} />
                <Text style={styles.tipText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Voltar para o início"
          onPress={() => navigation.navigate('Main')}
          style={styles.backButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    lineHeight: 24,
  },
  section: {
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  backButton: {
    backgroundColor: colors.primary,
  },
}); 