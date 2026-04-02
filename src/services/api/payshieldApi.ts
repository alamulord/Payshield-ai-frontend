// src/services/api/payshieldApi.ts — Typed API service for PayShield backend
import { apiClient } from './apiClient';

// ─── Types ────────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  tx_id: string;
  amount: number;
  currency: string;
  merchant_name: string;
  merchant_category: string | null;
  merchant_icon: string;
  payment_method: string;
  card_last4: string | null;
  country: string;
  country_name: string | null;
  ip_address: string | null;
  device: string | null;
  risk_score: number;
  risk_level: 'low' | 'medium' | 'high';
  risk_factors: string | null;
  status: string;
  status_color: string;
  timestamp: string;
  processed_at: string | null;
  created_at: string;
  risk_explanation?: any;
  related_alerts?: any[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface Alert {
  id: string;
  case_id: string;
  transaction_id: string;
  amount: number;
  merchant: string;
  category: string | null;
  username: string | null;
  country: string | null;
  country_code: string | null;
  risk_score: number;
  triggers: string[];
  status: string;
  sla: string | null;
  sla_color: string;
  payment_method: string | null;
  ip_address: string | null;
  device: string | null;
  user_agent: string | null;
  verdict: string | null;
  timestamp: string;
  created_at: string;
}

export interface AlertStats {
  total_value_at_risk: number;
  open_alerts: number;
  sla_breaches: number;
  total_value_change: string;
  open_alerts_change: string;
}

export interface KPIStat {
  title: string;
  value: string;
  trend: string;
  trend_direction: 'up' | 'down';
  icon: string;
  progress: number | null;
  subtitle: string;
  color: string;
}

export interface OverviewData {
  kpi_stats: KPIStat[];
  total_transactions_24h: number;
  total_volume_24h: number;
  fraud_rate: number;
  prevention_rate: number;
  active_investigations: number;
}

export interface VelocityData {
  data_points: { time: string; volume: number; anomalies: number }[];
  total_volume: number;
  total_anomalies: number;
  time_range: string;
}

export interface FraudByType {
  types: { name: string; count: number; percentage: number; color: string }[];
  total: number;
}

export interface LiveActivity {
  items: {
    id: string;
    type: string;
    title: string;
    description: string;
    severity: string;
    color: string;
    timestamp: string;
    tx_id?: string;
    action_label?: string;
    action_type?: string;
  }[];
  total: number;
}

export interface Investigation {
  id: string;
  case_id: string;
  alert_id: string | null;
  analyst_id: string | null;
  analyst_name: string | null;
  title: string;
  description: string | null;
  severity: string;
  status: string;
  verdict: string | null;
  notes: string | null;
  timeline: any[];
  created_at: string;
  updated_at: string;
  closed_at: string | null;
}

export interface ModelInfo {
  id: string;
  name: string;
  version: string;
  model_type: string;
  description: string | null;
  accuracy: number | null;
  precision_score: number | null;
  recall: number | null;
  f1_score: number | null;
  auc_roc: number | null;
  false_positive_rate: number | null;
  latency_ms: number | null;
  status: string;
  is_active: boolean;
  training_samples: number | null;
  feature_count: number | null;
  drift_score: number | null;
  created_at: string;
  deployed_at: string | null;
}

export interface HealthData {
  status: string;
  timestamp: string;
  uptime_seconds: number;
  version: string;
  services: { name: string; status: string; latency_ms: number; version: string; details: string }[];
  database: { name: string; status: string; latency_ms: number; version: string; details: string };
  api_latency_ms: number;
  model_uptime_pct: number;
  db_load_pct: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: { id: string; email: string; name: string; role: string; avatar_url: string | null };
}

// ─── API Service ──────────────────────────────────────────────────────────

const payshieldApi = {
  // ── Auth ──
  login: async (data: LoginRequest) => {
    const res = await apiClient.post<TokenResponse>('/auth/login', data);
    return res.data;
  },

  register: async (data: { name: string; email: string; password: string; role?: string }) => {
    const res = await apiClient.post<TokenResponse>('/auth/register', data);
    return res.data;
  },

  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },

  // ── Transactions ──
  getTransactions: async (params: {
    page?: number;
    page_size?: number;
    status?: string;
    risk_level?: string;
    search?: string;
  } = {}) => {
    const res = await apiClient.get<PaginatedResponse<Transaction>>('/transactions', { params });
    return res.data;
  },

  getTransaction: async (id: string) => {
    const res = await apiClient.get<Transaction>(`/transactions/${id}`);
    return res.data;
  },

  createTransaction: async (data: any) => {
    const res = await apiClient.post<Transaction>('/transactions', data);
    return res.data;
  },

  // ── Alerts ──
  getAlerts: async (params: {
    page?: number;
    page_size?: number;
    status?: string;
    risk_level?: string;
    search?: string;
  } = {}) => {
    const res = await apiClient.get<PaginatedResponse<Alert>>('/alerts', { params });
    return res.data;
  },

  getAlert: async (id: string) => {
    const res = await apiClient.get<Alert>(`/alerts/${id}`);
    return res.data;
  },

  getAlertStats: async () => {
    const res = await apiClient.get<AlertStats>('/alerts/stats');
    return res.data;
  },

  updateAlertStatus: async (id: string, data: { status: string; verdict?: string; notes?: string }) => {
    const res = await apiClient.put(`/alerts/${id}/status`, data);
    return res.data;
  },

  // ── Analytics ──
  getOverview: async () => {
    const res = await apiClient.get<OverviewData>('/analytics/overview');
    return res.data;
  },

  getVelocity: async (timeRange: string = '24H') => {
    const res = await apiClient.get<VelocityData>('/analytics/velocity', { params: { time_range: timeRange } });
    return res.data;
  },

  getFraudByType: async () => {
    const res = await apiClient.get<FraudByType>('/analytics/fraud-by-type');
    return res.data;
  },

  getTrends: async (months: number = 12) => {
    const res = await apiClient.get('/analytics/trends', { params: { months } });
    return res.data;
  },

  getLiveActivity: async (limit: number = 10) => {
    const res = await apiClient.get<LiveActivity>('/analytics/live-activity', { params: { limit } });
    return res.data;
  },

  getFullAnalytics: async () => {
    const res = await apiClient.get('/analytics/full');
    return res.data;
  },

  getSystemHealth: async () => {
    const res = await apiClient.get('/analytics/system-health');
    return res.data;
  },

  // ── Investigations ──
  getInvestigations: async (params: {
    page?: number;
    page_size?: number;
    status?: string;
    severity?: string;
    search?: string;
  } = {}) => {
    const res = await apiClient.get<PaginatedResponse<Investigation>>('/investigations', { params });
    return res.data;
  },

  getInvestigation: async (id: string) => {
    const res = await apiClient.get<Investigation>(`/investigations/${id}`);
    return res.data;
  },

  createInvestigation: async (data: { alert_id?: string; title: string; description?: string; severity?: string }) => {
    const res = await apiClient.post<Investigation>('/investigations', data);
    return res.data;
  },

  submitVerdict: async (id: string, data: { verdict: string; notes?: string }) => {
    const res = await apiClient.put(`/investigations/${id}/verdict`, data);
    return res.data;
  },

  // ── Models ──
  getModels: async () => {
    const res = await apiClient.get<{ items: ModelInfo[]; total: number }>('/models');
    return res.data;
  },

  getModel: async (id: string) => {
    const res = await apiClient.get<ModelInfo>(`/models/${id}`);
    return res.data;
  },

  getModelPerformance: async (id: string) => {
    const res = await apiClient.get(`/models/${id}/performance`);
    return res.data;
  },

  trainNewModel: async (data: { model_type?: string; description?: string } = {}) => {
    const res = await apiClient.post('/models/train-new', data);
    return res.data;
  },

  // ── Score ──
  scoreTransaction: async (data: {
    amount: number;
    country: string;
    merchant_category?: string;
    payment_method?: string;
  }) => {
    const res = await apiClient.post('/score', data);
    return res.data;
  },

  // ── Health ──
  getHealth: async () => {
    const res = await apiClient.get<HealthData>('/health');
    return res.data;
  },

  ping: async () => {
    const res = await apiClient.get('/health/ping');
    return res.data;
  },
};

export default payshieldApi;
