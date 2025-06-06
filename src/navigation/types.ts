export type RootStackParamList = {
  Main: undefined;
  RiverDetails: { riverId: string };
  LocationSetup: { onComplete?: () => void };
  Auth: { onAuthenticated?: () => void };
  Onboarding: undefined;
  Splash: undefined;
  Rios: undefined;
  Alertas: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Rios: undefined;
  Alertas: undefined;
  Configurações: undefined;
}; 