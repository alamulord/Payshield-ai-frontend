import React from 'react';
import {
  FiAlertTriangle,
  FiClock,
  FiUser,
  FiCreditCard,
  FiGlobe,
  FiCheck,
  FiX,
} from 'react-icons/fi';

interface AlertCardProps {
  riskScore: number;
  amount: string;
  merchant: string;
  category: string;
  transactionId: string;
  username: string;
  country: string;
  countryCode: string;
  triggers: string[];
  status: 'New' | 'In Review' | 'Resolved';
  sla: string;
  slaColor: string;
  onDismiss: () => void;
  onInvestigate: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({
  riskScore,
  amount,
  merchant,
  category,
  transactionId,
  username,
  country,
  countryCode,
  triggers,
  status,
  sla,
  slaColor,
  onDismiss,
  onInvestigate,
}) => {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusColor = () => {
    switch (status) {
      case 'New':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'In Review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className='group relative flex flex-col md:flex-row gap-4 rounded-xl bg-white dark:bg-gray-800 border border-orange-300 dark:border-orange-900 p-5 shadow-sm hover:shadow-md transition-all'>
      <div className='absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-orange-500'></div>

      {/* Left: Score */}
      <div className='flex shrink-0 items-start md:items-center'>
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-orange-200 bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.15)]`}
        >
          <span className='font-mono text-xl font-bold'>{riskScore}</span>
        </div>
      </div>

      {/* Middle: Details */}
      <div className='flex-1 flex flex-col justify-center gap-2'>
        <div className='flex flex-wrap items-baseline gap-2'>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
            {amount}
          </h3>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            at {merchant}
          </span>
          <span className='rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-200'>
            {category}
          </span>
        </div>

        <div className='flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
          <div className='flex items-center gap-1'>
            <FiCreditCard className='w-4 h-4' />
            <span>{transactionId}</span>
          </div>
          <span className='h-1 w-1 rounded-full bg-gray-400'></span>
          <div className='flex items-center gap-1'>
            <FiUser className='w-4 h-4' />
            <span>{username}</span>
          </div>
          <span className='h-1 w-1 rounded-full bg-gray-400'></span>
          <div className='flex items-center gap-1'>
            <FiGlobe className='w-4 h-4' />
            <span>{country}</span>
          </div>
        </div>

        <div className='mt-1 flex gap-2 flex-wrap'>
          {triggers.map((trigger, index) => (
            <span
              key={index}
              className='inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
            >
              <FiAlertTriangle className='w-3 h-3' />
              {trigger}
            </span>
          ))}
        </div>
      </div>

      {/* Right: Status & Actions */}
      <div className='flex flex-col items-end gap-3'>
        <div className='flex items-center gap-2'>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {status}
          </span>
          <span
            className={`text-xs font-medium ${slaColor} flex items-center gap-1`}
          >
            <FiClock className='w-3 h-3' />
            {sla}
          </span>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={onDismiss}
            className='h-9 px-4 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-1'
          >
            <FiX className='w-4 h-4' />
            Dismiss
          </button>
          <button
            onClick={onInvestigate}
            className='h-9 px-4 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-1'
          >
            <FiAlertTriangle className='w-4 h-4' />
            Investigate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
