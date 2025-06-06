import { RiverData, RiverAlert, Shelter } from '../types/river';

// Dados simulados
const mockRivers: RiverData[] = [
  {
    id: '1',
    name: 'Rio Tietê',
    currentLevel: 4.2,
    lastUpdate: new Date().toISOString(),
    alertLevel: 'yellow',
    weatherForecast: 'Chuva moderada nos próximos 3 dias. Risco de aumento do nível do rio.',
    shelters: [
      {
        name: 'Escola Municipal João da Silva',
        address: 'Rua das Flores, 123',
        capacity: 200,
        distance: 1.2,
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        name: 'Centro Comunitário São José',
        address: 'Av. Principal, 456',
        capacity: 150,
        distance: 2.5,
        latitude: -23.5510,
        longitude: -46.6340,
      },
    ],
    location: {
      latitude: -23.5505,
      longitude: -46.6333,
    },
    historicalData: [
      {
        date: '2024-03-01',
        level: 3.8,
      },
      {
        date: '2024-03-02',
        level: 4.0,
      },
      {
        date: '2024-03-03',
        level: 4.2,
      },
    ],
  },
  {
    id: '2',
    name: 'Rio Pinheiros',
    currentLevel: 2.8,
    lastUpdate: new Date().toISOString(),
    alertLevel: 'green',
    weatherForecast: 'Tempo seco nos próximos dias. Nível do rio estável.',
    shelters: [
      {
        name: 'Ginásio Municipal',
        address: 'Rua dos Esportes, 789',
        capacity: 300,
        distance: 0.8,
        latitude: -23.5705,
        longitude: -46.6933,
      },
    ],
    location: {
      latitude: -23.5705,
      longitude: -46.6933,
    },
    historicalData: [
      {
        date: '2024-03-01',
        level: 2.7,
      },
      {
        date: '2024-03-02',
        level: 2.8,
      },
      {
        date: '2024-03-03',
        level: 2.8,
      },
    ],
  },
  {
    id: '3',
    name: 'Rio Paranapanema',
    currentLevel: 5.5,
    lastUpdate: new Date().toISOString(),
    alertLevel: 'red',
    weatherForecast: 'Chuva forte prevista para as próximas 24 horas. Risco de enchente.',
    shelters: [
      {
        name: 'Centro de Eventos Municipal',
        address: 'Av. Principal, 1000',
        capacity: 500,
        distance: 1.5,
        latitude: -22.9071,
        longitude: -47.0632,
      },
      {
        name: 'Escola Estadual São Paulo',
        address: 'Rua da Escola, 200',
        capacity: 300,
        distance: 2.0,
        latitude: -22.9080,
        longitude: -47.0640,
      },
    ],
    location: {
      latitude: -22.9071,
      longitude: -47.0632,
    },
    historicalData: [
      {
        date: '2024-03-01',
        level: 4.8,
      },
      {
        date: '2024-03-02',
        level: 5.2,
      },
      {
        date: '2024-03-03',
        level: 5.5,
      },
    ],
  },
];

const mockAlerts: RiverAlert[] = [
  {
    id: '1',
    riverId: '1',
    level: 'green',
    message: 'Nível normal do rio. Não há riscos imediatos.',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    riverId: '2',
    level: 'yellow',
    message: 'Nível elevado. Mantenha-se atento às atualizações.',
    timestamp: new Date().toISOString(),
  },
  {
    id: '3',
    riverId: '3',
    level: 'red',
    message: 'Nível crítico! Procure um local seguro imediatamente.',
    timestamp: new Date().toISOString(),
  },
];

const mockWeatherForecasts: Record<string, string> = {
  'São Paulo': 'Tempo estável, sem previsão de chuva para os próximos dias.',
  'Santos': 'Chuva moderada prevista para as próximas 24 horas.',
  'Campinas': 'Chuva forte com possibilidade de tempestade.',
};

// Função para determinar o nível de alerta com base na altura do rio
const determineAlertLevel = (level: number): 'green' | 'yellow' | 'red' => {
  if (level <= 2.0) return 'green';
  if (level <= 3.5) return 'yellow';
  return 'red';
};

// Simulação de delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class RiverService {
  // GET /rios
  async getRivers(): Promise<RiverData[]> {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRivers);
      }, 1000);
    });
  }

  // GET /alerta/:id
  async getRiverAlert(riverId: string): Promise<RiverAlert | null> {
    await delay(800);
    const alert = mockAlerts.find(a => a.riverId === riverId);
    return alert || null;
  }

  // GET /abrigos
  async getShelters(): Promise<Shelter[]> {
    await delay(1000);
    return mockRivers.flatMap(river => river.shelters);
  }

  // GET /previsao/:cidade
  async getWeatherForecast(city: string): Promise<string> {
    await delay(800);
    return mockWeatherForecasts[city] || 'Previsão não disponível para esta cidade.';
  }

  // Método auxiliar para atualizar o nível do rio
  async updateRiverLevel(id: string, level: number): Promise<RiverData | null> {
    const river = await this.getRivers();
    const riverIndex = river.findIndex(r => r.id === id);
    
    if (riverIndex === -1) {
      throw new Error('Rio não encontrado');
    }

    const updatedRiver = {
      ...river[riverIndex],
      currentLevel: level,
      lastUpdate: new Date().toISOString(),
      alertLevel: this.calculateAlertLevel(level),
    };

    // Simulando atualização no backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(updatedRiver);
      }, 500);
    });
  }

  private calculateAlertLevel(level: number): 'green' | 'yellow' | 'red' {
    if (level >= 5.0) return 'red';
    if (level >= 4.0) return 'yellow';
    return 'green';
  }
}

export const riverService = new RiverService(); 