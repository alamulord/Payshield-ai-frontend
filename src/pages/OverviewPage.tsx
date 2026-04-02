import React, { useState } from 'react';

interface KPIStat {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  icon: string;
  progress: number | null;
  subtitle: string;
  color?: string;
  iconColor?: string;
  trendColor?: string;
}

interface Transaction {
  id: string;
  timestamp: string;
  amount: string;
  status: 'completed' | 'pending' | 'blocked' | 'review' | 'flagged';
  merchant: string;
  riskScore: number;
  country: string;
  paymentMethod: string;
  entity?: string;
  entityLogo?: string;
  severity?: 'high' | 'medium' | 'low';
  description?: string;
  txId?: string;
}

const DashboardPage: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1H');

  const kpiStats: KPIStat[] = [
    {
      title: 'Total Transactions',
      value: '1.2M',
      trend: '5.2%',
      trendDirection: 'up',
      icon: 'payments',
      progress: 75,
      subtitle: '24h Volume',
      color: 'blue',
      iconColor: 'text-blue-600',
      trendColor:
        'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-900/50',
    },
    {
      title: 'Fraud Rate',
      value: '1.24%',
      trend: '0.05%',
      trendDirection: 'up',
      icon: 'gpp_maybe',
      progress: null,
      subtitle: '24h Average',
      color: 'red',
      iconColor: 'text-red-600',
      trendColor:
        'text-red-600 bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-900/50',
    },
    {
      title: 'Prevention Rate',
      value: '99.8%',
      trend: '0.1%',
      trendDirection: 'up',
      icon: 'verified_user',
      progress: null,
      subtitle: 'Success Rate',
      color: 'emerald',
      iconColor: 'text-emerald-600',
      trendColor:
        'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-900/50',
    },
    {
      title: 'Active Investigations',
      value: '15',
      trend: '2.5%',
      trendDirection: 'down',
      icon: 'manage_search',
      progress: null,
      subtitle: 'In Progress',
      color: 'purple',
      iconColor: 'text-purple-600',
      trendColor:
        'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-900/50',
    },
  ];

  const transactions: Transaction[] = [
    {
      id: '#TXN-88392',
      timestamp: 'Just now',
      amount: '$4,500.00',
      status: 'completed',
      merchant: 'Acme Corp',
      riskScore: 12,
      country: 'US',
      paymentMethod: 'visa',
      entity: 'Acme Corp',
      entityLogo: 'https://example.com/acme-logo.jpg',
    },
    {
      id: '#TXN-88391',
      timestamp: '2 min ago',
      amount: '$120.50',
      status: 'completed',
      merchant: 'TechGadgets Inc',
      riskScore: 8,
      country: 'GB',
      paymentMethod: 'mastercard',
      entity: 'TechGadgets Inc',
      entityLogo: 'https://example.com/techgadgets-logo.jpg',
    },
    {
      id: '#TXN-88390',
      timestamp: '5 min ago',
      amount: '$2,340.00',
      status: 'blocked',
      merchant: 'Luxury Watches',
      riskScore: 92,
      country: 'CN',
      paymentMethod: 'amex',
      entity: 'Luxury Watches',
      entityLogo: 'https://example.com/luxury-watches-logo.jpg',
    },
    {
      id: '#TXN-88389',
      timestamp: '10 min ago',
      amount: '$78.30',
      status: 'review',
      merchant: 'Global Retail',
      riskScore: 65,
      country: 'FR',
      paymentMethod: 'visa',
      entity: 'Global Retail',
      entityLogo: 'https://example.com/global-retail-logo.jpg',
    },
  ];

  // Helper functions for rendering
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      blocked: 'bg-red-100 text-red-800',
      review: 'bg-blue-100 text-blue-800',
      flagged: 'bg-purple-100 text-purple-800',
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          statusClasses[status as keyof typeof statusClasses] ||
          'bg-gray-100 text-gray-800'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'bg-green-500';
    if (score <= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskScoreTextColor = (score: number) => {
    if (score <= 30) return 'text-green-600';
    if (score <= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <nav className='flex mb-2' aria-label='Breadcrumb'>
            <ol className='inline-flex items-center space-x-1 md:space-x-2'>
              <li className='inline-flex items-center'>
                <a
                  href='#'
                  className='inline-flex items-center text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white'
                >
                  <span className='material-symbols-outlined text-base mr-2'>
                    home
                  </span>
                  Home
                </a>
              </li>
              <li>
                <div className='flex items-center'>
                  <span className='material-symbols-outlined text-slate-400 text-base'>
                    chevron_right
                  </span>
                  <span className='ml-1 text-sm font-medium text-slate-900 dark:text-white md:ml-2'>
                    Overview
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className='text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight'>
            Platform Overview
          </h1>
          <p className='mt-1 text-sm text-slate-500'>
            Real-time fraud monitoring and risk assessment for{' '}
            <span className='font-semibold text-slate-700 dark:text-slate-300'>
              Today,{' '}
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </p>
        </div>
        <div className='flex items-center md:flex-row flex-col gap-3'>
          <div className='relative '>
            <button className='flex items-center justify-center  gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-subtle'>
              <span className='material-symbols-outlined text-[20px]'>
                calendar_today
              </span>
              <span>Today</span>
              <span className='material-symbols-outlined text-[16px] text-slate-400'>
                expand_more
              </span>
            </button>
          </div>
          <button className='flex items-center justify-center gap-2 w-full md:max-w-md px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-subtle'>
            <span className='material-symbols-outlined text-[20px]'>
              download
            </span>
            Export
          </button>
          <button className='flex items-center justify-center gap-2 px-4 py-2.5 w-full md:max-w-md bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25'>
            <span className='material-symbols-outlined text-[20px]'>add</span>
            New Investigation
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
        {kpiStats.map((stat, index) => (
          <div
            key={index}
            className={`group flex flex-col p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-card hover:shadow-lg hover:border-${stat.color}-200 dark:hover:border-${stat.color}-900 transition-all duration-300 relative overflow-hidden`}
          >
            <div className='absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity'>
              <span
                className={`material-symbols-outlined text-[64px] text-${stat.color}-600`}
              >
                {stat.icon}
              </span>
            </div>
            <div className='flex items-start justify-between mb-4 relative z-10'>
              <div
                className={`p-2.5 bg-${stat.color}-50 dark:bg-${stat.color}-900/30 rounded-lg ${stat.iconColor} ring-1 ring-${stat.color}-100 dark:ring-${stat.color}-800`}
              >
                <span className='material-symbols-outlined text-[24px]'>
                  {stat.icon}
                </span>
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-bold ${stat.trendColor} px-2 py-1 rounded-full border`}
              >
                <span className='material-symbols-outlined text-[14px]'>
                  {stat.trendDirection === 'up'
                    ? 'trending_up'
                    : 'trending_down'}
                </span>
                {stat.trend}
              </span>
            </div>
            <div className='relative z-10'>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium mb-1'>
                {stat.title}
              </p>
              <p className='text-slate-900 dark:text-white text-3xl font-bold tracking-tight'>
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>
                  {stat.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity Feed */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Chart */}
        <div className='lg:col-span-2 flex flex-col rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 relative overflow-hidden'>
          <div className='absolute top-0 right-0 p-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none -mr-16 -mt-16'></div>
          <div className='flex flex-col sm:flex-row sm:items-start justify-between mb-6 relative z-10 gap-4'>
            <div>
              <h3 className='text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2'>
                Transaction Velocity vs. Anomalies
              </h3>
              <p className='text-slate-500 dark:text-slate-400 text-sm mt-1'>
                Real-time monitoring of traffic spikes and detected threats.
              </p>
            </div>
            <div className='flex bg-slate-100 dark:bg-slate-900/80 rounded-lg p-1 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm'>
              <button className='px-4 py-1.5 rounded-md text-xs font-semibold bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-600/50 transition-all'>
                1H
              </button>
              <button className='px-4 py-1.5 rounded-md text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all'>
                24H
              </button>
              <button className='px-4 py-1.5 rounded-md text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all'>
                7D
              </button>
              <button className='px-4 py-1.5 rounded-md text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all'>
                Live
              </button>
            </div>
          </div>
          <div className='relative h-[280px] w-full mt-2 z-10'>
            {/* Chart SVG */}
            <svg
              className='w-full h-full overflow-visible'
              preserveAspectRatio='none'
              viewBox='0 0 100 50'
            >
              {/* Grid Lines */}
              {[0, 12.5, 25, 37.5, 50].map((y, i) => (
                <line
                  key={i}
                  className='text-slate-100 dark:text-slate-700/50'
                  stroke='currentColor'
                  strokeWidth={y === 50 ? '0.2' : '0.1'}
                  strokeDasharray={y !== 50 ? '1,1' : 'none'}
                  x1='0'
                  x2='100'
                  y1={y}
                  y2={y}
                />
              ))}
              
              {/* Data Line (Blue - Volume) */}
              <path
                d='M0 40 Q 10 35, 20 38 T 40 25 T 60 30 T 80 15 T 100 20'
                fill='none'
                stroke='url(#blueLineGrad)'
                strokeWidth='0.8'
                className='animate-[dash_3s_ease-out_forwards]'
              />
              {/* Fill under blue line */}
              <path
                d='M0 40 Q 10 35, 20 38 T 40 25 T 60 30 T 80 15 T 100 20 V 50 H 0 Z'
                fill='url(#blueGradient)'
                opacity='0.4'
                className='animate-[fade_2s_ease-in-out_forwards]'
              />
              {/* Data Line (Red - Fraud) */}
              <path
                d='M0 48 Q 10 47, 20 48 T 40 45 T 60 46 T 80 42 T 100 44'
                fill='none'
                stroke='#fa6238'
                strokeDasharray='1,0.5'
                strokeWidth='0.8'
                className='animate-[dash_3s_ease-out_forwards]'
              />
              
              {/* Data Points (Blue) */}
              <circle cx='40' cy='25' r='1' fill='#144bb8' className='animate-pulse' />
              <circle cx='80' cy='15' r='1' fill='#144bb8' className='animate-pulse' />
              
              {/* Data Points (Red) */}
              <circle cx='60' cy='46' r='0.8' fill='#fa6238' />
              
              <defs>
                <linearGradient id='blueGradient' x1='0' x2='0' y1='0' y2='1'>
                  <stop offset='0%' stopColor='#144bb8' stopOpacity='0.5' />
                  <stop offset='100%' stopColor='#144bb8' stopOpacity='0' />
                </linearGradient>
                <linearGradient id='blueLineGrad' x1='0' x2='100' y1='0' y2='0' gradientUnits='userSpaceOnUse'>
                  <stop offset='0%' stopColor='#60a5fa' />
                  <stop offset='100%' stopColor='#144bb8' />
                </linearGradient>
              </defs>
            </svg>
            {/* X Axis Labels */}
            <div className='flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-3 px-1'>
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>23:59</span>
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-6 mt-4 border-t border-slate-100 dark:border-slate-700/80 pt-5 z-10'>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full bg-[#144bb8] shadow-[0_0_8px_rgba(20,75,184,0.6)]' />
              <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                Approved Vol
              </span>
              <span className='text-xs font-bold text-slate-900 dark:text-white ml-1'>
                1,245K
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full bg-[#fa6238] shadow-[0_0_8px_rgba(250,98,56,0.6)]' />
              <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>
                Fraud Attempts
              </span>
              <span className='text-xs font-bold text-slate-900 dark:text-white ml-1'>
                23
              </span>
            </div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className='bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 flex flex-col h-[460px] lg:h-auto shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden'>
          <div className='absolute top-0 left-0 p-24 bg-red-500/5 blur-3xl rounded-full pointer-events-none -ml-12 -mt-12'></div>
          <div className='flex justify-between items-center mb-6 shrink-0 relative z-10'>
            <div className='flex items-center gap-2'>
              <span className='relative flex h-2.5 w-2.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'></span>
              </span>
              <h3 className='font-bold text-slate-900 dark:text-white text-lg'>
                Live Activity Feed
              </h3>
            </div>
            <button className='text-primary hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-xs font-semibold flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-md'>
              View All
            </button>
          </div>
          <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10'>
            <div className='space-y-1 -mx-2 px-2'>
              {/* Activity Item */}
              <div className='flex gap-4 group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer'>
                <div className='flex flex-col items-center pt-1'>
                  <div className='w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-red-50 dark:ring-red-500/10 z-10'></div>
                  <div className='w-[1.5px] flex-1 bg-slate-100 dark:bg-slate-700/80 -mt-1'></div>
                </div>
                <div className='flex-1 pb-4'>
                  <div className='flex justify-between items-start mb-1'>
                    <p className='text-sm font-semibold text-slate-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors'>
                      Suspicious Velocity
                    </p>
                    <span className='text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md'>
                      2m ago
                    </span>
                  </div>
                  <p className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2.5'>
                    High transaction volume detected for user{' '}
                    <span className='font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-1 rounded'>
                      @alex_m
                    </span>
                    . 15 txs in 2 mins.
                  </p>
                  <div className='flex items-center gap-2'>
                    <span className='text-[10px] font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-md border border-red-100/50 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'>
                      High Severity
                    </span>
                    <span className='text-[10px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-600/50'>
                      TX-99283
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className='flex gap-4 group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer'>
                <div className='flex flex-col items-center pt-1'>
                  <div className='w-2.5 h-2.5 rounded-full bg-orange-500 ring-4 ring-orange-50 dark:ring-orange-500/10 z-10'></div>
                  <div className='w-[1.5px] flex-1 bg-slate-100 dark:bg-slate-700/80 -mt-1 group-last:hidden'></div>
                </div>
                <div className='flex-1 pb-4 group-last:pb-0'>
                  <div className='flex justify-between items-start mb-1'>
                    <p className='text-sm font-semibold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors'>
                      IP Mismatch
                    </p>
                    <span className='text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md'>
                      14m ago
                    </span>
                  </div>
                  <p className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2.5'>
                    Login attempt from unknown location (Lagos, NG) for US-based
                    account.
                  </p>
                  <div className='flex items-center'>
                    <button className='text-[11px] font-semibold text-primary hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors bg-blue-50/50 dark:bg-blue-500/10 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-500/20'>
                      <span className='material-symbols-outlined text-[14px]'>
                        map
                      </span>
                      View Geo-Map
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Activity Item 3 */}
              <div className='flex gap-4 group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer'>
                <div className='flex flex-col items-center pt-1'>
                  <div className='w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-50 dark:ring-blue-500/10 z-10'></div>
                  <div className='w-[1.5px] flex-1 bg-slate-100 dark:bg-slate-700/80 -mt-1 group-last:hidden'></div>
                </div>
                <div className='flex-1 pb-4 group-last:pb-0'>
                  <div className='flex justify-between items-start mb-1'>
                    <p className='text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors'>
                      New Device
                    </p>
                    <span className='text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md'>
                      25m ago
                    </span>
                  </div>
                  <p className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed'>
                    User{' '}
                    <span className='font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-1 rounded'>
                      @sarah_k
                    </span>{' '}
                    logged in from iPhone 15 (First seen).
                  </p>
                </div>
              </div>
              
              {/* Activity Item 4 */}
              <div className='flex gap-4 group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer'>
                <div className='flex flex-col items-center pt-1'>
                  <div className='w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-500/10 z-10'></div>
                  <div className='w-[1.5px] flex-1 bg-slate-100 dark:bg-slate-700/80 -mt-1 group-last:hidden'></div>
                </div>
                <div className='flex-1 pb-2 group-last:pb-0'>
                  <div className='flex justify-between items-start mb-1'>
                    <p className='text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors'>
                      System Auto-Resolve
                    </p>
                    <span className='text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md'>
                      1h ago
                    </span>
                  </div>
                  <p className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed'>
                    Alert #4002 cleared by AI Model v2.4 (False Positive).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <div className='flex-1 rounded-xl border border-slate-200 dark:border-dark bg-white dark:bg-slate-800 dark:bg-card-dark shadow-sm p-6'>
          <h3 className='text-slate-900 dark:text-white text-lg font-bold mb-4'>
            System Health
          </h3>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center size-8 rounded bg-primary/10 text-primary'>
                  <span className='material-symbols-outlined text-[18px]'>
                    memory
                  </span>
                </div>
                <div>
                  <p className='text-sm font-semibold text-slate-900 dark:text-white'>
                    AI Engine
                  </p>
                  <p className='text-xs text-slate-500 dark:text-text-secondary'>
                    v2.4.1 (Latest)
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='size-2 rounded-full bg-accent-success animate-pulse'></div>
                <span className='text-xs font-medium text-accent-success'>
                  Operational
                </span>
              </div>
            </div>
            <div className='h-px bg-slate-600 dark:bg-border-dark w-full'></div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center size-8 rounded bg-primary/10 text-primary'>
                  <span className='material-symbols-outlined text-[18px]'>
                    dns
                  </span>
                </div>
                <div>
                  <p className='text-sm font-semibold text-slate-900 dark:text-white'>
                    Gateway Latency
                  </p>
                  <p className='text-xs text-slate-500 dark:text-text-secondary'>
                    US-East-1
                  </p>
                </div>
              </div>
              <span className='text-sm font-mono font-medium text-slate-900 dark:text-white'>
                45ms
              </span>
            </div>
          </div>
        </div>

        <div className='flex-1 rounded-xl border border-slate-200 dark:border-dark bg-white dark:bg-slate-800 dark:bg-card-dark shadow-sm p-6'>
          <h3 className='text-slate-900 dark:text-white text-lg font-bold mb-4'>
            Fraud by Type
          </h3>
          <div className='flex items-center gap-4'>
            <div className='relative size-32 shrink-0'>
              <svg
                className='block w-full h-full rotate-[-90deg]'
                viewBox='0 0 36 36'
              >
                <path
                  className='text-slate-100 dark:text-[#2a3241]'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='4.5'
                ></path>

                <path
                  className='text-primary'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeDasharray='40, 100'
                  strokeWidth='4.5'
                ></path>

                <path
                  className='text-danger'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeDasharray='25, 100'
                  strokeDashoffset='-40'
                  strokeWidth='4.5'
                ></path>

                <path
                  className='text-warning'
                  d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                  fill='none'
                  stroke='currentColor'
                  strokeDasharray='15, 100'
                  strokeDashoffset='-65'
                  strokeWidth='4.5'
                ></path>
              </svg>
              <div className='absolute inset-0 flex items-center justify-center flex-col'>
                <span className='text-2xl font-bold text-slate-900 dark:text-white'>
                  245
                </span>
                <span className='text-[10px] uppercase text-slate-500 dark:text-text-secondary tracking-wider'>
                  Total
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='size-2.5 rounded-sm bg-primary'></span>
                  <span className='text-slate-600 dark:text-secondary'>
                    Account Takeover
                  </span>
                </div>
                <span className='font-medium text-slate-900 dark:text-white'>
                  40%
                </span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='size-2.5 rounded-sm bg-danger'></span>
                  <span className='text-slate-600 dark:text-secondary'>
                    Carding
                  </span>
                </div>
                <span className='font-medium text-slate-900 dark:text-white'>
                  25%
                </span>
              </div>
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                  <span className='size-2.5 rounded-sm bg-warning'></span>
                  <span className='text-slate-600 dark:text-secondary'>
                    Phishing
                  </span>
                </div>
                <span className='font-medium text-slate-900 dark:text-white'>
                  15%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div>
        <h3 className='text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1'>
          System Health
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Health Metric */}
          <div className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow'>
            <div className='p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400'>
              <span className='material-symbols-outlined'>api</span>
            </div>
            <div className='flex-1'>
              <div className='flex justify-between items-start'>
                <p className='text-xs font-medium text-slate-500 uppercase tracking-wide'>
                  API Latency
                </p>
                <span className='h-2 w-2 rounded-full bg-emerald-500'></span>
              </div>
              <div className='flex items-baseline gap-2 mt-1'>
                <h4 className='text-xl font-bold text-slate-900 dark:text-white'>
                  45ms
                </h4>
                <span className='text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center'>
                  <span className='material-symbols-outlined text-[12px] mr-0.5'>
                    arrow_downward
                  </span>
                  12ms
                </span>
              </div>
            </div>
          </div>

          {/* More health metrics would go here */}
          <div className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow'>
            <div className='p-3 bg-pink-50 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400'>
              <span className='material-symbols-outlined'>database</span>
            </div>
            <div className='flex-1'>
              <div className='flex justify-between items-start'>
                <p className='text-xs font-medium text-slate-500 uppercase tracking-wide'>
                  Database Load
                </p>
                <span className='h-2 w-2 rounded-full bg-emerald-500'></span>
              </div>
              <div className='flex items-baseline gap-2 mt-1'>
                <h4 className='text-xl font-bold text-slate-900 dark:text-white'>
                  24%
                </h4>
                <span className='text-xs font-medium text-slate-500'>
                  Optimal Range
                </span>
              </div>
            </div>
          </div>
          <div className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow'>
            <div className='p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg text-cyan-600 dark:text-cyan-400'>
              <span className='material-symbols-outlined'>dns</span>
            </div>
            <div className='flex-1'>
              <div className='flex justify-between items-start'>
                <p className='text-xs font-medium text-slate-500 uppercase tracking-wide'>
                  Model Uptime
                </p>
                <span className='h-2 w-2 rounded-full bg-emerald-500'></span>
              </div>
              <div className='flex items-baseline gap-2 mt-1'>
                <h4 className='text-xl font-bold text-slate-900 dark:text-white'>
                  99.99%
                </h4>
                <span className='text-xs font-medium text-slate-400'>
                  Last 30d
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col rounded-xl border border-slate-300 dark:border-slate-700 dark:border-border-dark bg-slate-50  dark:bg-slate-800 dark:bg-card-dark shadow-sm'>
        <div className='flex items-center justify-between p-6 border-b border-slate-300 dark:border-border-dark'>
          <h2 className='text-slate-900 dark:text-white text-lg font-bold leading-tight'>
            Live Activity Feed
          </h2>
          <button className='text-sm font-semibold text-primary hover:text-blue-400'>
            View All Transactions
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-200 dark:bg-[#111318]/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold'>
                <th className='px-6 py-4'>Transaction ID</th>
                <th className='px-6 py-4'>Timestamp</th>
                <th className='px-6 py-4'>Amount</th>
                <th className='px-6 py-4'>Entity</th>
                <th className='px-6 py-4'>Risk Score</th>
                <th className='px-6 py-4'>Status</th>
                <th className='px-6 py-4 text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-300 dark:divide-slate-700 text-sm'>
              {transactions.map((transaction) => {
                // Determine status colors based on risk score
                const getStatusColors = (riskScore: number) => {
                  if (riskScore >= 70) {
                    return {
                      bg: 'bg-red-500/10',
                      text: 'text-red-500',
                      border: 'border-red-500/20',
                      dot: 'bg-red-500',
                      label: 'High Risk',
                    };
                  } else if (riskScore >= 30) {
                    return {
                      bg: 'bg-yellow-500/10',
                      text: 'text-yellow-500',
                      border: 'border-yellow-500/20',
                      dot: 'bg-yellow-500',
                      label: 'Review',
                    };
                  } else {
                    return {
                      bg: 'bg-green-500/10',
                      text: 'text-green-500',
                      border: 'border-green-500/20',
                      dot: 'bg-green-500',
                      label: 'Approved',
                    };
                  }
                };

                const status = getStatusColors(transaction.riskScore);

                return (
                  <tr
                    key={transaction.id}
                    className='group hover:bg-slate-50 dark:hover:bg-[#2a3241] transition-colors'
                  >
                    <td className='px-6 py-4 font-mono text-slate-900 dark:text-white font-medium'>
                      {transaction.id}
                    </td>
                    <td className='px-6 py-4 text-slate-500 dark:text-slate-400'>
                      {transaction.timestamp}
                    </td>
                    <td className='px-6 py-4 text-slate-900 dark:text-white font-semibold'>
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <div
                          className='size-5 rounded-full bg-cover'
                          style={{
                            backgroundImage: `url(${transaction.entityLogo})`,
                          }}
                        />
                        <span className='text-slate-700 dark:text-slate-300'>
                          {transaction.merchant}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden'>
                        <div
                          className={`h-full rounded-full ${status.dot.replace(
                            'bg-',
                            'bg-'
                          )}`}
                          style={{ width: `${transaction.riskScore}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs ${status.text} font-bold mt-1 block`}
                      >
                        {transaction.riskScore}/100
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text} border ${status.border}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${status.dot}`}
                        />
                        {status.label}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button className='text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-white transition-colors'>
                        <span className='material-symbols-outlined'>
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6'>
        <div className='flex-1 flex justify-between sm:hidden'>
          <button
            type='button'
            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
          >
            Previous
          </button>
          <button
            type='button'
            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
          >
            Next
          </button>
        </div>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700 dark:text-gray-300'>
              Showing <span className='font-medium'>1</span> to{' '}
              <span className='font-medium'>4</span> of{' '}
              <span className='font-medium'>24</span> results
            </p>
          </div>
          <div>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              <button
                type='button'
                className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
              >
                <span className='sr-only'>Previous</span>
                <span className='material-symbols-outlined'>chevron_left</span>
              </button>
              <button
                type='button'
                className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-primary-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              >
                1
              </button>
              <button
                type='button'
                className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
              >
                2
              </button>
              <button
                type='button'
                className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
              >
                3
              </button>
              <button
                type='button'
                className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
              >
                <span className='sr-only'>Next</span>
                <span className='material-symbols-outlined'>chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
