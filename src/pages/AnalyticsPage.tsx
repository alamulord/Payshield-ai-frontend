// src/pages/AnalyticsPage.tsx
import React, { useState, useEffect } from 'react';
import { useCurrentTheme } from '../context/ThemeContext';
import { fetchApi, useFetch, usePaginatedFetch } from '../types/api';
import {
  FiCalendar,
  FiChevronDown,
  FiSearch,
  FiTrendingUp,
  FiAlertTriangle,
  FiDollarSign,
  FiShield,
  FiBarChart2,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiDownload,
} from 'react-icons/fi';

// Types
interface Merchant {
  id: string;
  name: string;
  initials: string;
  region: string;
  riskScore: number;
  volume: string;
  chargebackRatio: string;
  status: 'high' | 'medium' | 'low';
}

interface AnalyticsData {
  totalVolume: number;
  fraudRate: number;
  preventedLosses: number;
  topMerchants: Merchant[];
  fraudTrends: any[];
  fraudByMethod: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
}

type TimeRange = '24h' | '7d' | '30d' | '90d';
type Region = 'all' | 'na' | 'eu' | 'as' | 'sa';
type MerchantType =
  | 'all'
  | 'retail'
  | 'ecommerce'
  | 'digital'
  | 'service'
  | 'travel'
  | 'gaming'
  | 'other';

interface FilterState {
  timeRange: TimeRange;
  region: Region;
  merchantType: MerchantType;
  searchQuery: string;
}

const AnalyticsPage: React.FC = () => {
  const { bgClass, textClass } = useCurrentTheme();
  const [filters, setFilters] = useState<FilterState>({
    timeRange: '7d',
    region: 'all',
    merchantType: 'all',
    searchQuery: '',
  });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch analytics data
  const { data: analyticsData, loading: analyticsLoading } =
    useFetch<AnalyticsData>(
      '/analytics',
      {
        timeRange: filters.timeRange,
        region: filters.region !== 'all' ? filters.region : undefined,
        merchantType:
          filters.merchantType !== 'all' ? filters.merchantType : undefined,
      },
      {
        totalVolume: 0,
        fraudRate: 0,
        preventedLosses: 0,
        topMerchants: [],
        fraudTrends: [],
        fraudByMethod: [],
      }
    );

  // Fetch merchants with pagination
  const {
    data: merchants = [],
    pagination,
    loading: merchantsLoading,
  } = usePaginatedFetch<Merchant>('/merchants', {
    page,
    pageSize,
    search: filters.searchQuery || undefined,
    timeRange: filters.timeRange,
    region: filters.region !== 'all' ? filters.region : undefined,
    merchantType:
      filters.merchantType !== 'all' ? filters.merchantType : undefined,
  });

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key !== 'searchQuery') {
      setPage(1);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.searchQuery]);

  // Handle refresh
  const handleRefresh = () => {
    setPage(1);
  };

  // Get status styles
  const getStatusStyles = (status: 'high' | 'medium' | 'low') => {
    const styles = {
      high: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
      medium:
        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
      low: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    };
    return (
      styles[status] ||
      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  // Loading and error states
  const isLoading = analyticsLoading || merchantsLoading;

  // Extract data from responses
  const analytics = analyticsData || {
    totalVolume: 0,
    fraudRate: 0,
    preventedLosses: 0,
    topMerchants: [],
    fraudTrends: [],
    fraudByMethod: [],
  };

  const paginationData = pagination || {
    page: 1,
    pageSize,
    totalItems: 0,
    totalPages: 1,
  };

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} p-6`}>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold'>Analytics Dashboard</h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Monitor fraud patterns and merchant activities
            </p>
          </div>
          <div className='mt-4 md:mt-0 flex items-center space-x-3'>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className='flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
            >
              <FiRefreshCw
                className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
          {/* Time Range Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Time Range
            </label>
            <select
              value={filters.timeRange}
              onChange={(e) =>
                handleFilterChange('timeRange', e.target.value as TimeRange)
              }
              className='w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-3'
            >
              <option value='24h'>Last 24 hours</option>
              <option value='7d'>Last 7 days</option>
              <option value='30d'>Last 30 days</option>
              <option value='90d'>Last 90 days</option>
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Region
            </label>
            <select
              value={filters.region}
              onChange={(e) =>
                handleFilterChange('region', e.target.value as Region)
              }
              className='w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-3'
            >
              <option value='all'>All Regions</option>
              <option value='na'>North America</option>
              <option value='eu'>Europe</option>
              <option value='as'>Asia</option>
              <option value='sa'>South America</option>
            </select>
          </div>

          {/* Merchant Type Filter */}
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 '>
              Merchant Type
            </label>
            <select
              value={filters.merchantType}
              onChange={(e) =>
                handleFilterChange(
                  'merchantType',
                  e.target.value as MerchantType
                )
              }
              className='w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-3'
            >
              <option value='all'>All Types</option>
              <option value='retail'>Retail</option>
              <option value='ecommerce'>E-commerce</option>
              <option value='digital'>Digital Goods</option>
              <option value='service'>Services</option>
              <option value='travel'>Travel</option>
              <option value='gaming'>Gaming</option>
              <option value='other'>Other</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiSearch className='h-4 w-4 text-gray-400' />
              </div>
              <input
                type='text'
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                placeholder='Search merchants...'
                value={filters.searchQuery}
                onChange={(e) =>
                  handleFilterChange('searchQuery', e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          {/* Total Volume Card */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Total Volume
                </p>
                <p className='text-2xl font-semibold text-gray-900 dark:text-white'>
                  {formatCurrency(analytics.totalVolume)}
                </p>
                <div className='flex items-center mt-1 text-sm text-green-600 dark:text-green-400'>
                  <FiTrendingUp className='mr-1' />
                  <span>12.5% from last period</span>
                </div>
              </div>
              <div className='p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'>
                <FiDollarSign className='h-6 w-6' />
              </div>
            </div>
          </div>

          {/* Fraud Rate Card */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Fraud Rate
                </p>
                <p className='text-2xl font-semibold text-gray-900 dark:text-white'>
                  {formatPercentage(analytics.fraudRate)}
                </p>
                <div className='flex items-center mt-1 text-sm text-red-600 dark:text-red-400'>
                  <FiTrendingUp className='mr-1' />
                  <span>2.3% from last period</span>
                </div>
              </div>
              <div className='p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'>
                <FiAlertTriangle className='h-6 w-6' />
              </div>
            </div>
          </div>

          {/* Prevented Losses Card */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Prevented Losses
                </p>
                <p className='text-2xl font-semibold text-gray-900 dark:text-white'>
                  {formatCurrency(analytics.preventedLosses)}
                </p>
                <div className='flex items-center mt-1 text-sm text-green-600 dark:text-green-400'>
                  <FiShield className='mr-1' />
                  <span>98.7% success rate</span>
                </div>
              </div>
              <div className='p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'>
                <FiShield className='h-6 w-6' />
              </div>
            </div>
          </div>

          {/* Top Merchants Card */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Top Merchants
                </p>
                <p className='text-2xl font-semibold text-gray-900 dark:text-white'>
                  {analytics.topMerchants.length}
                </p>
                <div className='flex items-center mt-1 text-sm text-blue-600 dark:text-blue-400'>
                  <FiBarChart2 className='mr-1' />
                  <span>View all</span>
                </div>
              </div>
              <div className='p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'>
                <FiBarChart2 className='h-6 w-6' />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
          {/* Main Chart */}
          <div className='lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Fraud Trends
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Last 30 days
                </p>
              </div>
              <div className='flex space-x-2'>
                <button className='px-3 py-1 text-sm rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'>
                  Daily
                </button>
                <button className='px-3 py-1 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'>
                  Weekly
                </button>
                <button className='px-3 py-1 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'>
                  Monthly
                </button>
              </div>
            </div>
            <div className='h-64'>
              <div className='flex items-center justify-center h-full text-gray-400'>
                <FiBarChart2 className='h-12 w-12' />
                <p className='ml-2'>
                  Fraud trends chart will be displayed here
                </p>
              </div>
            </div>
          </div>

          {/* Fraud by Method */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow p-6'>
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Fraud by Method
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Last 30 days
                </p>
              </div>
              <button className='text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'>
                View all
              </button>
            </div>
            <div className='space-y-4'>
              {analytics.fraudByMethod.map((method, index) => (
                <div key={index} className='space-y-1'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-700 dark:text-gray-300'>
                      {method.name}
                    </span>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {formatCurrency(method.amount)}
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                    <div
                      className={`h-2 rounded-full ${
                        index % 3 === 0
                          ? 'bg-blue-500'
                          : index % 3 === 1
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Merchants Table */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                High-Risk Merchants
              </h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Merchants with high risk scores in the last 24 hours
              </p>
            </div>
            <div className='flex space-x-2'>
              <button className='px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center'>
                <FiFilter className='mr-2' />
                Filter
              </button>
              <button className='px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center'>
                <FiDownload className='mr-2' />
                Export
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              <thead className='bg-gray-50 dark:bg-gray-700'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Merchant
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Risk Score
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Volume (30d)
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Chargeback Rate
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                {merchants.map((merchant) => (
                  <tr
                    key={merchant.id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-700'
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
                          <span className='text-blue-600 dark:text-blue-400 font-medium'>
                            {merchant.initials}
                          </span>
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900 dark:text-white'>
                            {merchant.name}
                          </div>
                          <div className='text-sm text-gray-500 dark:text-gray-400'>
                            {merchant.region.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900 dark:text-white'>
                        {merchant.riskScore}
                        <span className='ml-1 text-xs text-gray-500'>/100</span>
                      </div>
                      <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1'>
                        <div
                          className={`h-1.5 rounded-full ${
                            merchant.riskScore > 70
                              ? 'bg-red-500'
                              : merchant.riskScore > 40
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${merchant.riskScore}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                      {merchant.volume}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          parseFloat(merchant.chargebackRatio) > 5
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                            : parseFloat(merchant.chargebackRatio) > 2
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                        }`}
                      >
                        {merchant.chargebackRatio}%
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(
                          merchant.status
                        )}`}
                      >
                        {merchant.status.charAt(0).toUpperCase() +
                          merchant.status.slice(1)}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => {
                          // Handle view details
                        }}
                        className='text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4'
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          // Handle block action
                        }}
                        className='text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300'
                      >
                        Block
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className='bg-white dark:bg-gray-800 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700'>
            <div className='flex-1 flex justify-between sm:hidden'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={paginationData.page === 1}
                className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={paginationData.page >= paginationData.totalPages}
                className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
              >
                Next
              </button>
            </div>
            <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm text-gray-700 dark:text-gray-300'>
                  Showing{' '}
                  <span className='font-medium'>
                    {(paginationData.page - 1) * paginationData.pageSize + 1}
                  </span>{' '}
                  to{' '}
                  <span className='font-medium'>
                    {Math.min(
                      paginationData.page * paginationData.pageSize,
                      paginationData.totalItems
                    )}
                  </span>{' '}
                  of{' '}
                  <span className='font-medium'>
                    {paginationData.totalItems}
                  </span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav
                  className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                  aria-label='Pagination'
                >
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={paginationData.page === 1}
                    className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                  >
                    <span className='sr-only'>Previous</span>
                    <FiChevronLeft className='h-5 w-5' />
                  </button>
                  {Array.from(
                    { length: Math.min(5, paginationData.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (paginationData.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (paginationData.page <= 3) {
                        pageNum = i + 1;
                      } else if (
                        paginationData.page >=
                        paginationData.totalPages - 2
                      ) {
                        pageNum = paginationData.totalPages - 4 + i;
                      } else {
                        pageNum = paginationData.page - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            paginationData.page === pageNum
                              ? 'z-10 bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-300'
                              : 'bg-white dark:bg-gray-800 border-gray-300 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={paginationData.page >= paginationData.totalPages}
                    className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                  >
                    <span className='sr-only'>Next</span>
                    <FiChevronRight className='h-5 w-5' />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
