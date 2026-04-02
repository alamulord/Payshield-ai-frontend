// src/types/api.ts
import { useState, useEffect } from 'react';

// Standard API response type
export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
  timestamp?: number;
}

// Standard pagination interface
export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Standard filter interface
export interface FilterOptions {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  timeRange?: string;
  region?: string;
  merchantType?: string;
  [key: string]: any;
}

// Standard API response with pagination
export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

// Standard error response
export interface ErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

// API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function to handle API calls
export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Custom hook for data fetching
export function useFetch<T>(
  endpoint: string,
  params: Record<string, any> = {},
  initialData: T
) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryString = new URLSearchParams(params).toString();
        const url = `${endpoint}${queryString ? `?${queryString}` : ''}`;
        const result = await fetchApi<T>(url);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
}

// Custom hook for paginated data fetching
export function usePaginatedFetch<T>(
  endpoint: string,
  params: {
    page: number;
    pageSize: number;
    [key: string]: any;
  },
  initialData: T[] = [] as T[]
) {
  const [data, setData] = useState<PaginatedResponse<T>>({
    items: initialData,
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      totalItems: 0,
      totalPages: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryString = new URLSearchParams(
          Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(([key, value]) => [key, String(value)])
        ).toString();

        const result = await fetchApi<PaginatedResponse<T>>(
          `${endpoint}?${queryString}`
        );
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return {
    data: data.items,
    pagination: data.pagination,
    loading,
    error,
  };
}
