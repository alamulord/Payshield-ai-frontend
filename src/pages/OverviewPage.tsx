import React, { useState, useEffect } from 'react';
import { useOverview, useVelocity, useLiveActivity, useSystemHealth, useTransactions, useFraudByType } from '../hooks/useApi';

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

const DashboardPage: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24H');

  // ── API Hooks ──
  const { data: overview, loading: overviewLoading } = useOverview();
  const { data: velocity } = useVelocity(selectedTimeRange);
  const { data: activity } = useLiveActivity(6);
  const { data: healthData } = useSystemHealth();
  const { data: txData, loading: txLoading } = useTransactions({ page: 1, page_size: 5 });
  const { data: fraudByType } = useFraudByType();

  // Map API KPI data to frontend format with styling
  const colorConfig: Record<string, { iconColor: string; trendColor: string }> = {
    blue: {
      iconColor: 'text-blue-600',
      trendColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-900/50',
    },
    red: {
      iconColor: 'text-red-600',
      trendColor: 'text-red-600 bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-900/50',
    },
    emerald: {
      iconColor: 'text-emerald-600',
      trendColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-900/50',
    },
    purple: {
      iconColor: 'text-purple-600',
      trendColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-900/50',
    },
  };

  const kpiStats: KPIStat[] = overview
    ? overview.kpi_stats.map((stat) => {
        const colors = colorConfig[stat.color] || colorConfig.blue;
        return {
          title: stat.title,
          value: stat.value,
          trend: stat.trend,
          trendDirection: stat.trend_direction as 'up' | 'down',
          icon: stat.icon,
          progress: stat.progress,
          subtitle: stat.subtitle,
          color: stat.color,
          iconColor: colors.iconColor,
          trendColor: colors.trendColor,
        };
      })
    : [];

  // Map API transactions to display format
  const transactions = txData
    ? txData.items.map((tx) => ({
        id: `#${tx.tx_id}`,
        timestamp: new Date(tx.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        amount: `$${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        status: tx.status,
        merchant: tx.merchant_name,
        riskScore: tx.risk_score,
        country: tx.country,
        paymentMethod: tx.payment_method,
      }))
    : [];

  // Map activity feed
  const activityItems = activity?.items || [];

  // Color map for activity severity
  const severityColors: Record<string, string> = {
    high: 'bg-red-500 ring-red-50 dark:ring-red-500/10',
    medium: 'bg-orange-500 ring-orange-50 dark:ring-orange-500/10',
    low: 'bg-blue-500 ring-blue-50 dark:ring-blue-500/10',
    info: 'bg-emerald-500 ring-emerald-50 dark:ring-emerald-500/10',
  };

  const severityHoverColors: Record<string, string> = {
    high: 'group-hover:text-red-500 dark:group-hover:text-red-400',
    medium: 'group-hover:text-orange-500 dark:group-hover:text-orange-400',
    low: 'group-hover:text-blue-500 dark:group-hover:text-blue-400',
    info: 'group-hover:text-emerald-500 dark:group-hover:text-emerald-400',
  };

  // Helper functions
  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      blocked: 'bg-red-100 text-red-800',
      review: 'bg-blue-100 text-blue-800',
      flagged: 'bg-purple-100 text-purple-800',
      fraud: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getStatusColors = (riskScore: number) => {
    if (riskScore >= 70) return { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20', dot: 'bg-red-500', label: 'High Risk' };
    if (riskScore >= 30) return { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', dot: 'bg-yellow-500', label: 'Review' };
    return { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20', dot: 'bg-green-500', label: 'Approved' };
  };

  // Velocity chart data
  const velocityData = velocity?.data_points || [];
  const maxVolume = Math.max(...velocityData.map((d) => d.volume), 1);

  // Generate SVG path from velocity data
  const generatePath = (points: { volume: number }[], maxVal: number) => {
    if (points.length === 0) return 'M0 50';
    const xStep = 100 / (points.length - 1 || 1);
    return points
      .map((p, i) => {
        const x = i * xStep;
        const y = 50 - (p.volume / maxVal) * 45;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const chartPath = generatePath(velocityData, maxVolume);
  const fillPath = chartPath + ' V 50 H 0 Z';

  // Fraud by type data
  const fraudTypes = fraudByType?.types || [];
  const totalFraud = fraudByType?.total || 0;
  const fraudColorMap: Record<string, string> = { primary: 'bg-primary', danger: 'bg-danger', warning: 'bg-warning', info: 'bg-info', secondary: 'bg-secondary' };

  // System health from API
  const healthMetrics = healthData?.metrics || [];

  // Loading state
  if (overviewLoading) {
    return (
      <div className='p-6 flex items-center justify-center min-h-[400px]'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin'></div>
          <p className='text-slate-500 dark:text-slate-400 text-sm font-medium'>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <nav className='flex mb-2' aria-label='Breadcrumb'>
            <ol className='inline-flex items-center space-x-1 md:space-x-2'>
              <li className='inline-flex items-center'>
                <a href='#' className='inline-flex items-center text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white'>
                  <span className='material-symbols-outlined text-base mr-2'>home</span>
                  Home
                </a>
              </li>
              <li>
                <div className='flex items-center'>
                  <span className='material-symbols-outlined text-slate-400 text-base'>chevron_right</span>
                  <span className='ml-1 text-sm font-medium text-slate-900 dark:text-white md:ml-2'>Overview</span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className='text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight'>Platform Overview</h1>
          <p className='mt-1 text-sm text-slate-500'>
            Real-time fraud monitoring and risk assessment for{' '}
            <span className='font-semibold text-slate-700 dark:text-slate-300'>
              Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </p>
        </div>
        <div className='flex items-center md:flex-row flex-col gap-3'>
          <div className='relative'>
            <button className='flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-subtle'>
              <span className='material-symbols-outlined text-[20px]'>calendar_today</span>
              <span>Today</span>
              <span className='material-symbols-outlined text-[16px] text-slate-400'>expand_more</span>
            </button>
          </div>
          <button className='flex items-center justify-center gap-2 w-full md:max-w-md px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-subtle'>
            <span className='material-symbols-outlined text-[20px]'>download</span>
            Export
          </button>
          <button className='flex items-center justify-center gap-2 px-4 py-2.5 w-full md:max-w-md bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25'>
            <span className='material-symbols-outlined text-[20px]'>add</span>
            New Investigation
          </button>
        </div>
      </div>

      {/* KPI Cards — from API */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
        {kpiStats.map((stat, index) => (
          <div
            key={index}
            className={`group flex flex-col p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-card hover:shadow-lg hover:border-${stat.color}-200 dark:hover:border-${stat.color}-900 transition-all duration-300 relative overflow-hidden`}
          >
            <div className='absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity'>
              <span className={`material-symbols-outlined text-[64px] text-${stat.color}-600`}>{stat.icon}</span>
            </div>
            <div className='flex items-start justify-between mb-4 relative z-10'>
              <div className={`p-2.5 bg-${stat.color}-50 dark:bg-${stat.color}-900/30 rounded-lg ${stat.iconColor} ring-1 ring-${stat.color}-100 dark:ring-${stat.color}-800`}>
                <span className='material-symbols-outlined text-[24px]'>{stat.icon}</span>
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold ${stat.trendColor} px-2 py-1 rounded-full border`}>
                <span className='material-symbols-outlined text-[14px]'>{stat.trendDirection === 'up' ? 'trending_up' : 'trending_down'}</span>
                {stat.trend}
              </span>
            </div>
            <div className='relative z-10'>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium mb-1'>{stat.title}</p>
              <p className='text-slate-900 dark:text-white text-3xl font-bold tracking-tight'>{stat.value}</p>
              {stat.subtitle && <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>{stat.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity Feed */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Chart — from API velocity data */}
        <div className='lg:col-span-2 flex flex-col rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 relative overflow-hidden'>
          <div className='absolute top-0 right-0 p-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none -mr-16 -mt-16'></div>
          <div className='flex flex-col sm:flex-row sm:items-start justify-between mb-6 relative z-10 gap-4'>
            <div>
              <h3 className='text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2'>Transaction Velocity vs. Anomalies</h3>
              <p className='text-slate-500 dark:text-slate-400 text-sm mt-1'>Real-time monitoring of traffic spikes and detected threats.</p>
            </div>
            <div className='flex bg-slate-100 dark:bg-slate-900/80 rounded-lg p-1 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm'>
              {['1H', '24H', '7D', 'Live'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-4 py-1.5 rounded-md text-xs font-${selectedTimeRange === range ? 'semibold' : 'medium'} ${
                    selectedTimeRange === range
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-600/50'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  } transition-all`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className='relative h-[280px] w-full mt-2 z-10'>
            <svg className='w-full h-full overflow-visible' preserveAspectRatio='none' viewBox='0 0 100 50'>
              {[0, 12.5, 25, 37.5, 50].map((y, i) => (
                <line key={i} className='text-slate-100 dark:text-slate-700/50' stroke='currentColor' strokeWidth={y === 50 ? '0.2' : '0.1'} strokeDasharray={y !== 50 ? '1,1' : 'none'} x1='0' x2='100' y1={y} y2={y} />
              ))}
              <path d={chartPath} fill='none' stroke='url(#blueLineGrad)' strokeWidth='0.8' className='animate-[dash_3s_ease-out_forwards]' />
              <path d={fillPath} fill='url(#blueGradient)' opacity='0.4' className='animate-[fade_2s_ease-in-out_forwards]' />
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
            <div className='flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-3 px-1'>
              {velocityData.slice(0, 7).map((d, i) => (
                <span key={i}>{d.time}</span>
              ))}
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-6 mt-4 border-t border-slate-100 dark:border-slate-700/80 pt-5 z-10'>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full bg-[#144bb8] shadow-[0_0_8px_rgba(20,75,184,0.6)]' />
              <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>Approved Vol</span>
              <span className='text-xs font-bold text-slate-900 dark:text-white ml-1'>
                {velocity ? `${(velocity.total_volume / 1000).toFixed(0)}K` : '—'}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full bg-[#fa6238] shadow-[0_0_8px_rgba(250,98,56,0.6)]' />
              <span className='text-sm font-medium text-slate-600 dark:text-slate-300'>Fraud Attempts</span>
              <span className='text-xs font-bold text-slate-900 dark:text-white ml-1'>{velocity?.total_anomalies ?? '—'}</span>
            </div>
          </div>
        </div>

        {/* Live Activity Feed — from API */}
        <div className='bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 flex flex-col h-[460px] lg:h-auto shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden'>
          <div className='absolute top-0 left-0 p-24 bg-red-500/5 blur-3xl rounded-full pointer-events-none -ml-12 -mt-12'></div>
          <div className='flex justify-between items-center mb-6 shrink-0 relative z-10'>
            <div className='flex items-center gap-2'>
              <span className='relative flex h-2.5 w-2.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'></span>
              </span>
              <h3 className='font-bold text-slate-900 dark:text-white text-lg'>Live Activity Feed</h3>
            </div>
            <button className='text-primary hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-xs font-semibold flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-md'>
              View All
            </button>
          </div>
          <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10'>
            <div className='space-y-1 -mx-2 px-2'>
              {activityItems.map((item, idx) => (
                <div key={item.id || idx} className='flex gap-4 group p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer'>
                  <div className='flex flex-col items-center pt-1'>
                    <div className={`w-2.5 h-2.5 rounded-full ${severityColors[item.severity] || severityColors.info} ring-4 z-10`}></div>
                    {idx < activityItems.length - 1 && <div className='w-[1.5px] flex-1 bg-slate-100 dark:bg-slate-700/80 -mt-1'></div>}
                  </div>
                  <div className={`flex-1 ${idx < activityItems.length - 1 ? 'pb-4' : 'pb-2'}`}>
                    <div className='flex justify-between items-start mb-1'>
                      <p className={`text-sm font-semibold text-slate-900 dark:text-white ${severityHoverColors[item.severity] || ''} transition-colors`}>{item.title}</p>
                      <span className='text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md'>{item.timestamp}</span>
                    </div>
                    <p className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2.5'>{item.description}</p>
                    <div className='flex items-center gap-2'>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                        item.severity === 'high' ? 'bg-red-50 text-red-600 border-red-100/50 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400' :
                        item.severity === 'medium' ? 'bg-orange-50 text-orange-600 border-orange-100/50 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400' :
                        'bg-blue-50 text-blue-600 border-blue-100/50 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400'
                      }`}>
                        {item.severity === 'high' ? 'High Severity' : item.severity === 'medium' ? 'Medium' : item.severity === 'info' ? 'Info' : 'Low'}
                      </span>
                      {item.tx_id && (
                        <span className='text-[10px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-600/50'>
                          {item.tx_id}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Health + Fraud by Type — from API */}
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='flex-1 rounded-xl border border-slate-200 dark:border-dark bg-white dark:bg-slate-800 dark:bg-card-dark shadow-sm p-6'>
          <h3 className='text-slate-900 dark:text-white text-lg font-bold mb-4'>System Health</h3>
          <div className='flex flex-col gap-4'>
            {healthMetrics.slice(0, 2).map((metric: any, i: number) => (
              <React.Fragment key={metric.name}>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center justify-center size-8 rounded bg-primary/10 text-primary'>
                      <span className='material-symbols-outlined text-[18px]'>{metric.icon}</span>
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-slate-900 dark:text-white'>{metric.name}</p>
                      <p className='text-xs text-slate-500 dark:text-text-secondary'>{metric.description || metric.value}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className={`size-2 rounded-full ${metric.status === 'operational' ? 'bg-accent-success animate-pulse' : 'bg-yellow-500'}`}></div>
                    <span className={`text-xs font-medium ${metric.status === 'operational' ? 'text-accent-success' : 'text-yellow-500'}`}>
                      {metric.status === 'operational' ? 'Operational' : metric.status}
                    </span>
                  </div>
                </div>
                {i < 1 && <div className='h-px bg-slate-600 dark:bg-border-dark w-full'></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className='flex-1 rounded-xl border border-slate-200 dark:border-dark bg-white dark:bg-slate-800 dark:bg-card-dark shadow-sm p-6'>
          <h3 className='text-slate-900 dark:text-white text-lg font-bold mb-4'>Fraud by Type</h3>
          <div className='flex items-center gap-4'>
            <div className='relative size-32 shrink-0'>
              <svg className='block w-full h-full rotate-[-90deg]' viewBox='0 0 36 36'>
                <path className='text-slate-100 dark:text-[#2a3241]' d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831' fill='none' stroke='currentColor' strokeWidth='4.5'></path>
                {fraudTypes.slice(0, 3).map((type, i) => {
                  const offsets = [0, -fraudTypes[0]?.percentage || 0, -(fraudTypes[0]?.percentage || 0) - (fraudTypes[1]?.percentage || 0)];
                  const colorClasses = ['text-primary', 'text-danger', 'text-warning'];
                  return (
                    <path key={type.name} className={colorClasses[i] || 'text-info'} d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831' fill='none' stroke='currentColor' strokeDasharray={`${type.percentage}, 100`} strokeDashoffset={`${offsets[i] || 0}`} strokeWidth='4.5'></path>
                  );
                })}
              </svg>
              <div className='absolute inset-0 flex items-center justify-center flex-col'>
                <span className='text-2xl font-bold text-slate-900 dark:text-white'>{totalFraud}</span>
                <span className='text-[10px] uppercase text-slate-500 dark:text-text-secondary tracking-wider'>Total</span>
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              {fraudTypes.slice(0, 3).map((type, i) => {
                const dotColors = ['bg-primary', 'bg-danger', 'bg-warning'];
                return (
                  <div key={type.name} className='flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-2'>
                      <span className={`size-2.5 rounded-sm ${dotColors[i] || 'bg-info'}`}></span>
                      <span className='text-slate-600 dark:text-secondary'>{type.name}</span>
                    </div>
                    <span className='font-medium text-slate-900 dark:text-white'>{type.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* System Health Metrics — from API */}
      <div>
        <h3 className='text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1'>System Health</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            { label: 'API Latency', value: healthData?.metrics?.find((m: any) => m.name === 'API Latency')?.value || '45ms', icon: 'api', color: 'indigo', trend: healthData?.metrics?.find((m: any) => m.name === 'API Latency')?.trend },
            { label: 'Database Load', value: healthData?.metrics?.find((m: any) => m.name === 'Database Load')?.value || '24%', icon: 'database', color: 'pink', desc: 'Optimal Range' },
            { label: 'Model Uptime', value: healthData?.metrics?.find((m: any) => m.name === 'Model Uptime')?.value || '99.99%', icon: 'dns', color: 'cyan', desc: 'Last 30d' },
          ].map((metric) => (
            <div key={metric.label} className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow'>
              <div className={`p-3 bg-${metric.color}-50 dark:bg-${metric.color}-900/30 rounded-lg text-${metric.color}-600 dark:text-${metric.color}-400`}>
                <span className='material-symbols-outlined'>{metric.icon}</span>
              </div>
              <div className='flex-1'>
                <div className='flex justify-between items-start'>
                  <p className='text-xs font-medium text-slate-500 uppercase tracking-wide'>{metric.label}</p>
                  <span className='h-2 w-2 rounded-full bg-emerald-500'></span>
                </div>
                <div className='flex items-baseline gap-2 mt-1'>
                  <h4 className='text-xl font-bold text-slate-900 dark:text-white'>{metric.value}</h4>
                  {metric.trend && (
                    <span className='text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center'>
                      <span className='material-symbols-outlined text-[12px] mr-0.5'>arrow_downward</span>
                      {metric.trend}
                    </span>
                  )}
                  {metric.desc && <span className='text-xs font-medium text-slate-500'>{metric.desc}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Transaction Table — from API */}
      <div className='flex flex-col rounded-xl border border-slate-300 dark:border-slate-700 dark:border-border-dark bg-slate-50 dark:bg-slate-800 dark:bg-card-dark shadow-sm'>
        <div className='flex items-center justify-between p-6 border-b border-slate-300 dark:border-border-dark'>
          <h2 className='text-slate-900 dark:text-white text-lg font-bold leading-tight'>Recent Transactions</h2>
          <button className='text-sm font-semibold text-primary hover:text-blue-400'>View All Transactions</button>
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
                const status = getStatusColors(transaction.riskScore);
                return (
                  <tr key={transaction.id} className='group hover:bg-slate-50 dark:hover:bg-[#2a3241] transition-colors'>
                    <td className='px-6 py-4 font-mono text-slate-900 dark:text-white font-medium'>{transaction.id}</td>
                    <td className='px-6 py-4 text-slate-500 dark:text-slate-400'>{transaction.timestamp}</td>
                    <td className='px-6 py-4 text-slate-900 dark:text-white font-semibold'>{transaction.amount}</td>
                    <td className='px-6 py-4'>
                      <span className='text-slate-700 dark:text-slate-300'>{transaction.merchant}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden'>
                        <div className={`h-full rounded-full ${status.dot}`} style={{ width: `${transaction.riskScore}%` }} />
                      </div>
                      <span className={`text-xs ${status.text} font-bold mt-1 block`}>{transaction.riskScore}/100</span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text} border ${status.border}`}>
                        <span className={`size-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button className='text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-white transition-colors'>
                        <span className='material-symbols-outlined'>more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6'>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700 dark:text-gray-300'>
              Showing <span className='font-medium'>1</span> to <span className='font-medium'>{transactions.length}</span> of{' '}
              <span className='font-medium'>{txData?.total || 0}</span> results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
