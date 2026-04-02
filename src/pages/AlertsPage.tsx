import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiChevronDown,
  FiAlertTriangle,
  FiClock,
  FiDollarSign,
  FiAlertCircle,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiGlobe,
  FiCreditCard,
  FiSmartphone,
  FiMoreVertical,
  FiCheck,
  FiX,
  FiAlertOctagon,
  FiShield,
} from 'react-icons/fi';

// Types
type AlertStatus = 'New' | 'In Review' | 'Resolved';
type RiskLevel = 'High' | 'Medium' | 'Low';

interface Alert {
  id: string;
  caseId: string;
  amount: number;
  merchant: string;
  category: string;
  transactionId: string;
  username: string;
  country: string;
  countryCode: string;
  riskScore: number;
  status: AlertStatus;
  timestamp: string;
  sla: string;
  triggers: string[];
  paymentMethod: string;
  ipAddress: string;
  device: string;
  userAgent: string;
  slaColor: string;
}

const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedRisk, setSelectedRisk] = useState('All Risk Levels');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  // Mock data
  const alerts: Alert[] = [
    {
      id: '1',
      caseId: 'CASE-001',
      amount: 4520.0,
      merchant: 'Apple Store',
      category: 'eCommerce',
      transactionId: 'TXN-88329',
      username: 'john.doe',
      country: 'United States',
      countryCode: 'US',
      riskScore: 98,
      status: 'New',
      timestamp: '2023-11-25T14:32:10Z',
      sla: '12m',
      triggers: ['Velocity Spike', 'New Device'],
      paymentMethod: 'VISA •••• 4242',
      ipAddress: '192.168.1.1',
      device: 'iPhone 13',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      slaColor: 'text-red-500',
    },
    {
      id: '2',
      caseId: 'CASE-002',
      amount: 1250.0,
      merchant: 'Amazon',
      category: 'Marketplace',
      transactionId: 'TXN-77218',
      username: 'jane.smith',
      country: 'Canada',
      countryCode: 'CA',
      riskScore: 85,
      status: 'In Review',
      timestamp: '2023-11-25T13:45:22Z',
      sla: '25m',
      triggers: ['High Risk Country', 'Unusual Time'],
      paymentMethod: 'Mastercard •••• 5555',
      ipAddress: '203.0.113.45',
      device: 'MacBook Pro',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      slaColor: 'text-yellow-500',
    },
    {
      id: '3',
      caseId: 'CASE-003',
      amount: 3200.0,
      merchant: 'Best Buy',
      category: 'Electronics',
      transactionId: 'TXN-66107',
      username: 'mike.johnson',
      country: 'United Kingdom',
      countryCode: 'GB',
      riskScore: 92,
      status: 'New',
      timestamp: '2023-11-25T15:10:05Z',
      sla: '8m',
      triggers: ['Large Amount', 'New Merchant'],
      paymentMethod: 'AMEX •••• 1005',
      ipAddress: '198.51.100.22',
      device: 'Windows PC',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      slaColor: 'text-red-500',
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Handle row click
  const handleRowClick = (caseId: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.closest('input')
    ) {
      return;
    }
    navigate(`/app/investigations/app/${caseId}`);
  };

  // Toggle alert selection
  const toggleSelectAlert = (id: string) => {
    setSelectedAlerts((prev) =>
      prev.includes(id)
        ? prev.filter((alertId) => alertId !== id)
        : [...prev, id]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedAlerts.length === currentItems.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(currentItems.map((alert) => alert.id));
    }
  };

  // Handle dismiss
  const handleDismiss = (id: string) => {
    console.log('Dismiss alert:', id);
    // Implement actual dismiss logic
  };

  // Handle investigate
  const handleInvestigate = (id: string) => {
    navigate(`/app/investigations/app/${id}`);
  };

  // Filter and sort logic
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch =
        alert.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.transactionId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'All Statuses' || alert.status === selectedStatus;

      const matchesRisk =
        selectedRisk === 'All Risk Levels' ||
        (selectedRisk === 'High' && alert.riskScore >= 80) ||
        (selectedRisk === 'Medium' &&
          alert.riskScore >= 50 &&
          alert.riskScore < 80) ||
        (selectedRisk === 'Low' && alert.riskScore < 50);

      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [alerts, searchQuery, selectedStatus, selectedRisk]);

  // Pagination
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const currentItems = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = [
    {
      title: 'Total Value at Risk',
      value: '$452,000',
      change: '+12%',
      isPositive: true,
      icon: <FiDollarSign className='text-blue-500' />,
    },
    {
      title: 'Open Alerts',
      value: '42',
      change: '+5%',
      isPositive: true,
      icon: <FiAlertTriangle className='text-orange-500' />,
    },
    {
      title: 'SLA Breaches',
      value: '3',
      change: 'Critical',
      isPositive: false,
      icon: <FiClock className='text-red-500' />,
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <header className='mb-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Fraud Alerts Queue
              </h1>
              <p className='text-gray-500 dark:text-gray-400 mt-2'>
                Review and manage potential fraud cases
              </p>
            </div>
            <button className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
              <FiDownload className='w-4 h-4' />
              Export CSV
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700'
            >
              <div className='flex justify-between items-start'>
                <div>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {stat.title}
                  </p>
                  <p className='text-2xl font-bold mt-1 text-gray-900 dark:text-white'>
                    {stat.value}
                  </p>
                </div>
                <div className='p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg'>
                  {stat.icon}
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.isPositive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {stat.change}
                  {stat.isPositive ? (
                    <svg
                      className='-mr-0.5 ml-1 h-3 w-3 text-green-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='-mr-0.5 ml-1 h-3 w-3 text-red-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6'>
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Search Bar */}
            <div className='relative flex-1'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FiSearch className='h-4 w-4 text-gray-400' />
              </div>
              <input
                type='text'
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm'
                placeholder='Search alerts...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className='relative'>
              <select
                className='appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>All Statuses</option>
                <option>New</option>
                <option>In Review</option>
                <option>Resolved</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300'>
                <FiChevronDown className='h-4 w-4' />
              </div>
            </div>

            {/* Risk Filter */}
            <div className='relative'>
              <select
                className='appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
              >
                <option>All Risk Levels</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300'>
                <FiChevronDown className='h-4 w-4' />
              </div>
            </div>

            <button className='flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
              <FiFilter className='h-4 w-4' />
              More Filters
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden'>
          {/* Table Header */}
          <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  checked={
                    selectedAlerts.length > 0 &&
                    selectedAlerts.length === currentItems.length
                  }
                  onChange={toggleSelectAll}
                />
                <span className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {selectedAlerts.length > 0
                    ? `${selectedAlerts.length} selected`
                    : 'Select all'}
                </span>
              </div>
              {selectedAlerts.length > 0 && (
                <div className='flex items-center space-x-2'>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {selectedAlerts.length} selected
                  </span>
                  <button
                    onClick={() => {
                      // Handle dismiss selected
                      selectedAlerts.forEach(handleDismiss);
                      setSelectedAlerts([]);
                    }}
                    className='inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  >
                    Dismiss Selected
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className='divide-y divide-gray-200 dark:divide-gray-700'>
            {currentItems.length > 0 ? (
              currentItems.map((alert) => (
                <div
                  key={alert.id}
                  onClick={(e) => handleRowClick(alert.caseId, e)}
                  className='relative hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors'
                >
                  <div className='px-6 py-4'>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                      {/* Left: Alert Info */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center space-x-3'>
                          <div className='flex-shrink-0'>
                            <div
                              className={`h-3 w-3 rounded-full ${
                                alert.riskScore >= 80
                                  ? 'bg-red-500'
                                  : alert.riskScore >= 50
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}
                            ></div>
                          </div>
                          <div className='min-w-0 flex-1'>
                            <div className='flex items-center space-x-2'>
                              <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                                {formatCurrency(alert.amount)}
                              </p>
                              <span className='text-sm text-gray-500 dark:text-gray-400'>
                                at {alert.merchant}
                              </span>
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'>
                                {alert.category}
                              </span>
                            </div>
                            <div className='mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400'>
                              <div className='flex items-center'>
                                <FiCreditCard className='mr-1 h-3 w-3' />
                                <span>{alert.transactionId}</span>
                              </div>
                              <div className='flex items-center'>
                                <FiUser className='mr-1 h-3 w-3' />
                                <span>{alert.username}</span>
                              </div>
                              <div className='flex items-center'>
                                <FiGlobe className='mr-1 h-3 w-3' />
                                <span>{alert.country}</span>
                              </div>
                            </div>
                            <div className='mt-2 flex flex-wrap gap-1'>
                              {alert.triggers.map((trigger, index) => (
                                <span
                                  key={index}
                                  className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                >
                                  {trigger}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className='flex items-center space-x-2'>
                        <div className='flex items-center space-x-1'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              alert.status === 'New'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                : alert.status === 'In Review'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}
                          >
                            {alert.status}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              alert.riskScore >= 80
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : alert.riskScore >= 50
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}
                          >
                            {alert.riskScore} -{' '}
                            {alert.riskScore >= 80
                              ? 'High'
                              : alert.riskScore >= 50
                              ? 'Medium'
                              : 'Low'}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              alert.slaColor === 'text-red-500'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}
                          >
                            SLA: {alert.sla}
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDismiss(alert.id);
                            }}
                            className='inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                          >
                            Dismiss
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInvestigate(alert.caseId);
                            }}
                            className='inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                          >
                            Investigate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='px-6 py-12 text-center'>
                <FiShield className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-medium text-gray-900 dark:text-white'>
                  No alerts found
                </h3>
                <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                  No alerts match your current filters. Try adjusting your
                  search or filter criteria.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {currentItems.length > 0 && (
            <div className='px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'>
              <div className='flex items-center justify-between'>
                <div className='flex-1 flex justify-between sm:hidden'>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className='relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(filteredAlerts.length / itemsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage * itemsPerPage >= filteredAlerts.length
                    }
                    className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  >
                    Next
                  </button>
                </div>
                <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                  <div>
                    <p className='text-sm text-gray-700 dark:text-gray-300'>
                      Showing <span className='font-medium'>1</span> to{' '}
                      <span className='font-medium'>
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredAlerts.length
                        )}
                      </span>{' '}
                      of{' '}
                      <span className='font-medium'>
                        {filteredAlerts.length}
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
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <span className='sr-only'>Previous</span>
                        <FiChevronLeft className='h-5 w-5' aria-hidden='true' />
                      </button>
                      {Array.from(
                        {
                          length: Math.min(
                            5,
                            Math.ceil(filteredAlerts.length / itemsPerPage)
                          ),
                        },
                        (_, i) => {
                          let pageNum;
                          const totalPages = Math.ceil(
                            filteredAlerts.length / itemsPerPage
                          );

                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNum
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(
                              prev + 1,
                              Math.ceil(filteredAlerts.length / itemsPerPage)
                            )
                          )
                        }
                        disabled={
                          currentPage * itemsPerPage >= filteredAlerts.length
                        }
                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <span className='sr-only'>Next</span>
                        <FiChevronRight
                          className='h-5 w-5'
                          aria-hidden='true'
                        />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
