import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowUp,
  FiArrowDown,
  FiDownload,
  FiFilter,
  FiShoppingBag,
  FiShoppingCart,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { BsCreditCard, BsPaypal, BsCurrencyDollar } from 'react-icons/bs';
import {
  FaShieldAlt,
  FaHourglassHalf,
  FaChartLine,
  FaStore,
  FaCoffee,
} from 'react-icons/fa';
import { useTransactions } from '../hooks/useApi';
import { useCurrentTheme } from '../context/ThemeContext';

const getMerchantIcon = (iconName: string) => {
  switch (iconName) {
    case 'store':
      return <FaStore className='text-gray-500 text-sm' />;
    case 'shopping-bag':
      return <FiShoppingBag className='text-gray-500 text-sm' />;
    default:
      return <FiShoppingCart className='text-gray-500 text-sm' />;
  }
};

const getPaymentIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'visa':
    case 'mastercard':
    case 'amex':
      return <BsCreditCard className='text-[#144bb8]' />;
    case 'paypal':
      return <BsPaypal className='text-[#111318]' />;
    default:
      return <BsCreditCard className='text-gray-500' />;
  }
};

const getStatusBadge = (status: string, color: string) => {
  const colorMap: Record<string, string> = {
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-900/50',
    yellow:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900/50',
    green:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-900/50',
    default:
      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        colorMap[color] || colorMap.default
      }`}
    >
      {status}
    </span>
  );
};

type RiskLevel = 'high' | 'medium' | 'low';

interface RiskLevelStyles {
  textColor: string;
  bgColor: string;
  text: string;
}

const getRiskLevelStyles = (riskLevel: RiskLevel): RiskLevelStyles => {
  const styles: Record<RiskLevel, RiskLevelStyles> = {
    high: {
      textColor: 'text-red-600',
      bgColor: 'bg-red-600',
      text: 'High',
    },
    medium: {
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-500',
      text: 'Medium',
    },
    low: {
      textColor: 'text-green-600',
      bgColor: 'bg-green-500',
      text: 'Low',
    },
  };

  return styles[riskLevel] || styles.medium; // Default to medium if invalid risk level
};

const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bgClass, textClass } = useCurrentTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const pageSize = 15;

  const { data: txData, loading, error } = useTransactions({
    page: currentPage,
    page_size: pageSize,
    status: statusFilter || undefined,
    risk_level: riskFilter || undefined,
  });

  const transactions = txData?.items || [];
  const totalPages = txData?.total_pages || 1;
  const totalItems = txData?.total || 0;

  // Compute stats from real data
  const totalVolume = useMemo(() => transactions.reduce((sum, tx) => sum + tx.amount, 0), [transactions]);
  const highRiskCount = useMemo(() => transactions.filter(tx => tx.risk_level === 'high').length, [transactions]);
  const reviewCount = useMemo(() => transactions.filter(tx => tx.status === 'review' || tx.status === 'pending').length, [transactions]);
  const avgRisk = useMemo(() => {
    if (transactions.length === 0) return 0;
    return Math.round(transactions.reduce((sum, tx) => sum + tx.risk_score, 0) / transactions.length);
  }, [transactions]);
  return (
    <div
      className={`bg-background-light dark:bg-background-dark p-6 min-h-screen ${bgClass} ${textClass}`}
    >
      <div className='max-w-[1400px] mx-auto flex flex-col gap-6'>
        {/* Page Heading & Actions */}
        <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-[#111318] dark:text-white text-3xl font-bold tracking-tight'>
              Transactions
            </h1>
            <p className='text-[#636f88] dark:text-gray-400 text-sm'>
              Real-time fraud detection and payment analysis stream.
            </p>
          </div>
          <div className='flex gap-3'>
            <button className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a202c] border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-[#111318] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm'>
              <FiDownload className='text-lg' />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Total Volume Card */}
          <div className='bg-white dark:bg-[#1a202c] rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
              <p className='text-[#636f88] dark:text-gray-400 text-sm font-medium'>
                Total Volume (24h)
              </p>
              <BsCurrencyDollar className='text-gray-400' />
            </div>
            <div className='flex items-end gap-2'>
              <p className='text-2xl font-bold text-[#111318] dark:text-white'>
                ${totalVolume >= 1000000 ? `${(totalVolume / 1000000).toFixed(1)}M` : totalVolume >= 1000 ? `${(totalVolume / 1000).toFixed(1)}K` : totalVolume.toFixed(0)}
              </p>
              <span className='flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded mb-1'>
                <FiArrowUp className='mr-0.5' />
                12%
              </span>
            </div>
          </div>

          {/* High Risk Flagged Card */}
          <div className='bg-white dark:bg-[#1a202c] rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
              <p className='text-[#636f88] dark:text-gray-400 text-sm font-medium'>
                High Risk Flagged
              </p>
              <FaShieldAlt className='text-gray-400' />
            </div>
            <div className='flex items-end gap-2'>
              <p className='text-2xl font-bold text-[#111318] dark:text-white'>
                {highRiskCount}
              </p>
              <span className='flex items-center text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded mb-1'>
                <FiArrowUp className='mr-0.5' />
                5%
              </span>
            </div>
          </div>

          {/* Pending Review Card */}
          <div className='bg-white dark:bg-[#1a202c] rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
              <p className='text-[#636f88] dark:text-gray-400 text-sm font-medium'>
                Pending Review
              </p>
              <FaHourglassHalf className='text-gray-400' />
            </div>
            <div className='flex items-end gap-2'>
              <p className='text-2xl font-bold text-[#111318] dark:text-white'>
                {reviewCount}
              </p>
              <span className='flex items-center text-xs font-medium text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded mb-1'>
                <FiArrowDown className='mr-0.5' />
                2%
              </span>
            </div>
          </div>

          {/* Avg Risk Score Card */}
          <div className='bg-white dark:bg-[#1a202c] rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
              <p className='text-[#636f88] dark:text-gray-400 text-sm font-medium'>
                Avg Risk Score
              </p>
              <FaChartLine className='text-gray-400' />
            </div>
            <div className='flex items-end gap-2'>
              <p className='text-2xl font-bold text-[#111318] dark:text-white'>
                {avgRisk}
              </p>
              <span className='flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded mb-1'>
                <FiArrowDown className='mr-0.5' />1 pt
              </span>
            </div>
          </div>
        </div>

        {/* Main Table Section */}
        <div className='bg-white dark:bg-[#1a202c] border border-border-light dark:border-border-dark rounded-xl shadow-sm flex flex-col'>
          {/* Filters Toolbar */}
          <div className='p-4 border-b border-border-light dark:border-border-dark flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center'>
            {/* Left Filters */}
            <div className='flex flex-wrap items-center gap-3 w-full lg:w-auto'>
              <div className='relative min-w-[140px]'>
                <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className='w-full appearance-none bg-background-light dark:bg-gray-800 border border-transparent focus:border-primary text-sm text-[#111318] dark:text-white rounded-lg px-3 py-2 pr-8 outline-none focus:ring-1 focus:ring-primary cursor-pointer'>
                  <option value=''>All Statuses</option>
                  <option value='completed'>Completed</option>
                  <option value='review'>Review</option>
                  <option value='blocked'>Blocked</option>
                  <option value='fraud'>Fraud</option>
                  <option value='flagged'>Flagged</option>
                </select>
              </div>
              <div className='relative min-w-[140px]'>
                <select value={riskFilter} onChange={(e) => { setRiskFilter(e.target.value); setCurrentPage(1); }} className='w-full appearance-none bg-background-light dark:bg-gray-800 border border-transparent focus:border-primary text-sm text-[#111318] dark:text-white rounded-lg px-3 py-2 pr-8 outline-none focus:ring-1 focus:ring-primary cursor-pointer'>
                  <option value=''>Risk Score: All</option>
                  <option value='high'>High</option>
                  <option value='medium'>Medium</option>
                  <option value='low'>Low</option>
                </select>
              </div>
              <div className='relative min-w-[140px]'>
                <select className='w-full appearance-none bg-background-light dark:bg-gray-800 border border-transparent focus:border-primary text-sm text-[#111318] dark:text-white rounded-lg px-3 py-2 pr-8 outline-none focus:ring-1 focus:ring-primary cursor-pointer'>
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 24 Hours</option>
                  <option>Custom Range</option>
                </select>
              </div>
            </div>
            {/* Right Actions */}
            <div className='flex items-center gap-3 w-full lg:w-auto'>
              <a
                className='text-sm text-[#636f88] hover:text-primary font-medium whitespace-nowrap'
                href='#'
              >
                Clear filters
              </a>
              <div className='h-4 w-px bg-border-light dark:bg-border-dark'></div>
              <button className='flex items-center gap-2 px-3 py-2 bg-background-light dark:bg-gray-800 text-[#111318] dark:text-white rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
                <FiFilter className='text-lg' />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-gray-800/50'>
                  <th className='px-6 py-4 text-xs font-semibold text-[#636f88] dark:text-gray-400 uppercase tracking-wider w-[140px]'>
                    Transaction ID
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-[#636f88] dark:text-gray-400 uppercase tracking-wider'>
                    Date & Time
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-[#636f88] dark:text-gray-400 uppercase tracking-wider'>
                    Merchant
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-[#636f88] dark:text-gray-400 uppercase tracking-wider text-right'>
                    Amount
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-[#636f88] dark:text-gray-400 uppercase tracking-wider'>
                    Payment Method
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-[#636f88] dark:text-gray-400 uppercase tracking-wider w-[200px]'>
                    Risk Score
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-[#636f88] dark:text-gray-400 uppercase tracking-wider text-right'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border-light dark:divide-border-dark'>
                {loading ? (
                  <tr><td colSpan={7} className='px-6 py-12 text-center'>
                    <div className='flex justify-center'><div className='w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin'></div></div>
                    <p className='text-slate-500 mt-2 text-sm'>Loading transactions...</p>
                  </td></tr>
                ) : transactions.map((transaction) => {
                  const riskLevel = transaction.risk_level as RiskLevel;
                  const { textColor, bgColor, text: riskText } = getRiskLevelStyles(riskLevel);
                  const ts = new Date(transaction.timestamp);
                  return (
                  <tr
                    key={transaction.id}
                    className='group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer'
                    onClick={() => navigate(`/app/transactions/app/${transaction.tx_id}`)}
                  >
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <span className='font-mono text-sm font-medium text-primary'>{transaction.tx_id}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <p className='text-sm text-[#111318] dark:text-white'>{ts.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <p className='text-xs text-[#636f88]'>{ts.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <div className='bg-gray-100 rounded p-1'>{getMerchantIcon(transaction.merchant_icon || 'store')}</div>
                        <span className='text-sm font-medium text-[#111318] dark:text-white'>{transaction.merchant_name}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right'>
                      <span className='text-sm font-bold text-[#111318] dark:text-white'>
                        ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        {getPaymentIcon(transaction.payment_method)}
                        <span className='text-sm text-[#111318] dark:text-white'>
                          {transaction.payment_method}{transaction.card_last4 ? ` •••• ${transaction.card_last4}` : ''}
                        </span>
                        <div className='w-px h-3 bg-gray-300 mx-1'></div>
                        <span className='text-xs text-[#636f88]'>{transaction.country}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap align-middle'>
                      <div className='flex flex-col gap-1 w-full max-w-[160px]'>
                        <div className='flex justify-between items-center text-xs'>
                          <span className={`font-bold ${textColor}`}>{transaction.risk_score}/100</span>
                          <span className={`${textColor} font-medium`}>{riskText}</span>
                        </div>
                        <div className='w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                          <div className={`h-full rounded-full ${bgColor}`} style={{ width: `${transaction.risk_score}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right'>
                      {getStatusBadge(transaction.status, transaction.status_color)}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className='p-4 border-t border-border-light dark:border-border-dark flex items-center justify-between'>
            <p className='text-sm text-[#636f88] dark:text-gray-400'>
              Showing <span className='font-medium text-[#111318] dark:text-white'>{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span className='font-medium text-[#111318] dark:text-white'>{Math.min(currentPage * pageSize, totalItems)}</span> of{' '}
              <span className='font-medium text-[#111318] dark:text-white'>{totalItems}</span> transactions
            </p>
            <div className='flex items-center gap-2'>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1}
                className='p-2 rounded-lg border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                <FiChevronLeft />
              </button>
              <span className='text-sm font-medium text-[#111318] dark:text-white px-3'>{currentPage} / {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}
                className='p-2 rounded-lg border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'>
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
