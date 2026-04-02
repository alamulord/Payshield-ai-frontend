// src/hooks/useApi.ts — React hooks for PayShield backend API consumption
import { useState, useEffect, useCallback, useRef } from 'react';
import payshieldApi from '../services/api/payshieldApi';
import type {
  Transaction,
  Alert,
  OverviewData,
  VelocityData,
  FraudByType,
  LiveActivity,
  Investigation,
  ModelInfo,
  HealthData,
  AlertStats,
  PaginatedResponse,
} from '../services/api/payshieldApi';

// ─── Generic fetch hook ───────────────────────────────────────────────────

function useApiCall<T>(
  fetcher: () => Promise<T>,
  deps: any[] = [],
  initialData?: T
) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      if (mountedRef.current) {
        setData(result);
      }
    } catch (err: any) {
      if (mountedRef.current) {
        setError(err?.response?.data?.detail || err.message || 'An error occurred');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    refetch();
    return () => {
      mountedRef.current = false;
    };
  }, [refetch]);

  return { data, loading, error, refetch, setData };
}

// ─── Overview / Dashboard ─────────────────────────────────────────────────

export function useOverview() {
  return useApiCall<OverviewData>(() => payshieldApi.getOverview());
}

export function useVelocity(timeRange: string = '24H') {
  return useApiCall<VelocityData>(
    () => payshieldApi.getVelocity(timeRange),
    [timeRange]
  );
}

export function useFraudByType() {
  return useApiCall<FraudByType>(() => payshieldApi.getFraudByType());
}

export function useLiveActivity(limit: number = 10) {
  return useApiCall<LiveActivity>(
    () => payshieldApi.getLiveActivity(limit),
    [limit]
  );
}

export function useSystemHealth() {
  return useApiCall(() => payshieldApi.getSystemHealth());
}

// ─── Transactions ─────────────────────────────────────────────────────────

export function useTransactions(params: {
  page?: number;
  page_size?: number;
  status?: string;
  risk_level?: string;
  search?: string;
} = {}) {
  return useApiCall<PaginatedResponse<Transaction>>(
    () => payshieldApi.getTransactions(params),
    [JSON.stringify(params)]
  );
}

export function useTransaction(id: string) {
  return useApiCall<Transaction>(
    () => payshieldApi.getTransaction(id),
    [id]
  );
}

// ─── Alerts ───────────────────────────────────────────────────────────────

export function useAlerts(params: {
  page?: number;
  page_size?: number;
  status?: string;
  risk_level?: string;
  search?: string;
} = {}) {
  return useApiCall<PaginatedResponse<Alert>>(
    () => payshieldApi.getAlerts(params),
    [JSON.stringify(params)]
  );
}

export function useAlertStats() {
  return useApiCall<AlertStats>(() => payshieldApi.getAlertStats());
}

// ─── Investigations ───────────────────────────────────────────────────────

export function useInvestigations(params: {
  page?: number;
  page_size?: number;
  status?: string;
  severity?: string;
  search?: string;
} = {}) {
  return useApiCall<PaginatedResponse<Investigation>>(
    () => payshieldApi.getInvestigations(params),
    [JSON.stringify(params)]
  );
}

export function useInvestigation(id: string) {
  return useApiCall<Investigation>(
    () => payshieldApi.getInvestigation(id),
    [id]
  );
}

// ─── Models ───────────────────────────────────────────────────────────────

export function useModels() {
  return useApiCall<{ items: ModelInfo[]; total: number }>(
    () => payshieldApi.getModels()
  );
}

export function useModelPerformance(id: string) {
  return useApiCall(
    () => payshieldApi.getModelPerformance(id),
    [id]
  );
}

// ─── Analytics ────────────────────────────────────────────────────────────

export function useFullAnalytics() {
  return useApiCall(() => payshieldApi.getFullAnalytics());
}

export function useTrends(months: number = 12) {
  return useApiCall(
    () => payshieldApi.getTrends(months),
    [months]
  );
}

// ─── Health ───────────────────────────────────────────────────────────────

export function useHealth() {
  return useApiCall<HealthData>(() => payshieldApi.getHealth());
}
