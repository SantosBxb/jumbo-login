export interface LoginJumboInput {
  user: string;
  password: string;
}

export interface LoginJumboOutput {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  homePhone: unknown;
  allData: LoginJumboResponse;
}

export interface LoginJumboResponse {
  token: string;
  user: User;
  authClient: AuthClient;
  authStatus: string;
}

interface AuthClient {
  Name: string;
  Value: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  homePhone?: string;
  tel_update?: any;
  xIsEmployee?: any;
  orderFormIdJumbocl?: any;
  orderFormIdSISA?: any;
  terms_acceptance_date?: any;
  last_shipping_address?: any;
  persistentCart?: any;
  lastShippingAddress?: any;
  CencoPrime_2020?: any;
  CencoPrime_CAT?: any;
  termsAcceptanceDate?: any;
  prime_invitation_date?: any;
  countOrder: number;
  clusterScheduledOrders?: any;
  clusterUpsellingOffline: boolean;
  onboarding?: any;
  pagoPrime?: any;
  cencoPay?: any;
  clusterCencopay?: any;
  hasWallet: boolean;
  gtmSegment: string;
}
