import React, { useState } from 'react';
import { useCurrentTheme } from '../context/ThemeContext';

interface KPIStat {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  icon: string;
  iconColor: string;
  statusColor: string;
}

interface Model {
  id: string;
  version: string;
  status: 'active' | 'shadow' | 'retired' | 'training';
  trainingDate: string;
  auc: number | null;
  precision: number | null;
  recall: number | null;
  isSelected: boolean;
}

interface FeatureImportance {
  feature: string;
  importance: number;
}

const ModelsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('Fraud-v4.2');
  const [canaryTraffic, setCanaryTraffic] = useState<number>(100);

  const kpiStats: KPIStat[] = [
    {
      title: 'Active Model Health',
      value: '98.5%',
      trend: '+0.4%',
      trendDirection: 'up',
      icon: 'ecg_heart',
      iconColor: 'text-green-500',
      statusColor: 'text-green-500',
    },
    {
      title: 'Daily Predictions',
      value: '1.2M',
      trend: '+12%',
      trendDirection: 'up',
      icon: 'query_stats',
      iconColor: 'text-primary',
      statusColor: 'text-green-500',
    },
    {
      title: 'Shadow Model Drift',
      value: '0.05%',
      trend: 'Stable',
      trendDirection: 'neutral',
      icon: 'warning',
      iconColor: 'text-orange-400',
      statusColor: 'text-orange-400',
    },
  ];

  const modelRegistry: Model[] = [
    {
      id: 'Fraud-v4.2',
      version: 'v4.2.0',
      status: 'active',
      trainingDate: 'Oct 24, 2023',
      auc: 0.94,
      precision: 0.92,
      recall: 0.89,
      isSelected: true,
    },
    {
      id: 'Fraud-v4.3-RC',
      version: 'v4.3.0',
      status: 'shadow',
      trainingDate: 'Oct 28, 2023',
      auc: 0.96,
      precision: 0.94,
      recall: 0.91,
      isSelected: false,
    },
    {
      id: 'Fraud-v4.1',
      version: 'v4.1.0',
      status: 'retired',
      trainingDate: 'Sep 15, 2023',
      auc: 0.91,
      precision: 0.88,
      recall: 0.85,
      isSelected: false,
    },
    {
      id: 'Fraud-Exp-A',
      version: 'v0.1.0',
      status: 'training',
      trainingDate: 'Nov 01, 2023',
      auc: null,
      precision: null,
      recall: null,
      isSelected: false,
    },
  ];

  const featureImportance: FeatureImportance[] = [
    { feature: 'IP Geolocation Mismatch', importance: 0.88 },
    { feature: 'Device Trust Score', importance: 0.72 },
    { feature: 'Transaction Velocity (1h)', importance: 0.54 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse'></span>
            Active
          </span>
        );
      case 'shadow':
        return (
          <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20'>
            <span className='material-symbols-outlined text-[14px]'>
              visibility
            </span>
            Shadow
          </span>
        );
      case 'retired':
        return (
          <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/30 text-slate-400 border border-slate-700/50'>
            Retired
          </span>
        );
      case 'training':
        return (
          <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20'>
            <span className='material-symbols-outlined text-[14px] animate-spin'>
              sync
            </span>
            Training
          </span>
        );
      default:
        return null;
    }
  };

  const { bgClass, textClass } = useCurrentTheme();

  return (
    <div
      className={`flex flex-col gap-6 max-w-[1600px] mx-auto min-h-screen p-6 ${bgClass} ${textClass}`}
    >
      {/* Breadcrumbs */}
      <div className='flex items-center gap-2 text-sm'>
        <a
          className={`${
            textClass === 'text-white'
              ? 'text-slate-400 hover:text-white'
              : 'text-gray-600 hover:text-primary'
          } transition-colors`}
          href='#'
        >
          Risk Management
        </a>
        <span
          className={
            textClass === 'text-white' ? 'text-slate-600' : 'text-gray-400'
          }
        >
          /
        </span>
        <span className={`${textClass} font-medium`}>AI Models</span>
      </div>

      {/* Title & Actions */}
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <h1 className={`text-3xl font-bold ${textClass} tracking-tight`}>
            AI Model Governance
          </h1>
          <p
            className={`${
              textClass === 'text-white' ? 'text-slate-400' : 'text-gray-600'
            } mt-1`}
          >
            Manage, evaluate, and deploy fraud detection models.
          </p>
        </div>
        <div className='flex gap-3'>
          <button className='flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-border-dark bg-surface-dark text-white text-sm font-medium hover:bg-border-dark transition-colors'>
            <span className='material-symbols-outlined text-[18px]'>
              compare_arrows
            </span>
            Compare
          </button>
          <button className='flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-[0_0_15px_rgba(19,218,236,0.3)] hover:shadow-[0_0_20px_rgba(19,218,236,0.5)] transition-all'>
            <span className='material-symbols-outlined text-[18px]'>add</span>
            Train New Model
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
        {kpiStats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 p-5 rounded-xl border ${
              textClass === 'text-white'
                ? 'border-border-dark bg-surface-dark/50'
                : 'border-slate-200 bg-light shadow-sm'
            } backdrop-blur-md`}
          >
            <div className='flex items-center justify-between'>
              <p className='text-slate-600 text-sm font-medium'>{stat.title}</p>
              <span
                className={`material-symbols-outlined ${stat.iconColor} text-lg`}
              >
                {stat.icon}
              </span>
            </div>
            <div className='flex items-end gap-2 mt-1'>
              <p className='text-slate-700 text-2xl font-bold'>{stat.value}</p>
              <span
                className={`text-xs font-medium ${stat.statusColor} bg-green-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5`}
              >
                {stat.trendDirection === 'up' && (
                  <span className='material-symbols-outlined text-[12px]'>
                    trending_up
                  </span>
                )}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: List vs Detail */}
      <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
        {/* Left Panel: Model Registry */}
        <div className='xl:col-span-8 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-white font-semibold text-lg flex items-center gap-2'>
              <span className='material-symbols-outlined text-primary'>
                list
              </span>
              Model Registry
            </h3>
            <div className='flex gap-2'>
              <div className='relative'>
                <span className='material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]'>
                  search
                </span>
                <input
                  className='h-9 pl-9 pr-4 bg-surface-dark border border-border-dark rounded-lg text-sm text-white focus:outline-none focus:border-primary placeholder-slate-500'
                  placeholder='Search versions...'
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className='h-9 px-3 rounded-lg border border-border-dark bg-surface-dark text-slate-300 hover:text-white hover:bg-border-dark transition-colors'>
                <span className='material-symbols-outlined text-[18px]'>
                  filter_list
                </span>
              </button>
            </div>
          </div>
          <div className='w-full overflow-hidden rounded-xl border border-border-dark bg-surface-dark/30 shadow-sm'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-surface-darker border-b border-border-dark text-xs uppercase text-slate-400 font-semibold tracking-wider'>
                    <th className='px-6 py-4'>Model ID</th>
                    <th className='px-6 py-4'>Status</th>
                    <th className='px-6 py-4'>Training Date</th>
                    <th className='px-6 py-4 text-right'>AUC</th>
                    <th className='px-6 py-4 text-right'>Precision</th>
                    <th className='px-6 py-4 text-right'>Recall</th>
                    <th className='px-6 py-4 w-10'></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border-dark text-sm'>
                  {modelRegistry.map((model, index) => (
                    <tr
                      key={index}
                      className={`group hover:bg-white/5 transition-colors cursor-pointer border-l-2 ${
                        model.isSelected
                          ? 'border-l-primary bg-white/[0.02]'
                          : 'border-l-transparent'
                      }`}
                      onClick={() => setSelectedModel(model.id)}
                    >
                      <td className='px-6 py-4'>
                        <div className='flex flex-col'>
                          <span
                            className={`font-medium ${
                              model.status === 'retired'
                                ? 'text-slate-400'
                                : 'text-white'
                            }`}
                          >
                            {model.id}
                          </span>
                          <span className='text-slate-500 text-xs'>
                            {model.version}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        {getStatusBadge(model.status)}
                      </td>
                      <td
                        className={`px-6 py-4 ${
                          model.status === 'retired'
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      >
                        {model.trainingDate}
                      </td>
                      <td
                        className={`px-6 py-4 text-right ${
                          model.status === 'retired'
                            ? 'text-slate-500 font-mono'
                            : 'text-white font-mono'
                        }`}
                      >
                        {model.auc || '-'}
                      </td>
                      <td
                        className={`px-6 py-4 text-right ${
                          model.status === 'retired'
                            ? 'text-slate-500 font-mono'
                            : 'text-slate-300 font-mono'
                        }`}
                      >
                        {model.precision || '-'}
                      </td>
                      <td
                        className={`px-6 py-4 text-right ${
                          model.status === 'retired'
                            ? 'text-slate-500 font-mono'
                            : 'text-slate-300 font-mono'
                        }`}
                      >
                        {model.recall || '-'}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button className='text-slate-500 hover:text-white p-1 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all'>
                          <span className='material-symbols-outlined text-[20px]'>
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Panel: Selected Model Detail */}
        <div className='xl:col-span-4 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-white font-semibold text-lg flex items-center gap-2'>
              <span className='material-symbols-outlined text-primary'>
                analytics
              </span>
              Model Analysis
            </h3>
            <span className='text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20'>
              {selectedModel}
            </span>
          </div>
          <div className='flex-1 flex flex-col gap-4 p-5 rounded-xl border border-border-dark bg-surface-dark shadow-xl'>
            {/* Performance Chart Placeholder */}
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <p className='text-sm font-medium text-white'>
                  ROC Curve Comparison
                </p>
                <div className='flex gap-2 text-[10px]'>
                  <div className='flex items-center gap-1 text-primary'>
                    <div className='w-2 h-2 rounded-full bg-primary'></div>
                    Current
                  </div>
                  <div className='flex items-center gap-1 text-slate-500'>
                    <div className='w-2 h-2 rounded-full bg-slate-500'></div>
                    Baseline
                  </div>
                </div>
              </div>
              <div className='h-40 w-full bg-surface-darker rounded-lg border border-border-dark relative overflow-hidden group cursor-crosshair'>
                {/* Grid lines */}
                <div className='absolute inset-0 flex flex-col justify-between p-4 opacity-20'>
                  <div className='w-full h-px bg-slate-500'></div>
                  <div className='w-full h-px bg-slate-500'></div>
                  <div className='w-full h-px bg-slate-500'></div>
                  <div className='w-full h-px bg-slate-500'></div>
                </div>
                {/* Gradient abstract chart */}
                <div
                  className='absolute bottom-0 left-0 right-0 h-full w-full bg-cover bg-no-repeat opacity-80'
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVGfgZkcOLiViHfj35uYDLTtbTu9EWGflIJh36-nEoO-cRuUotUX65jBF-PhEit2YQVmZGzd83QYsKCbLUGpGYGX4LY4gtsbRkYmY1DN197VMcVCuGJ6kEKLKPM85LilWQo7Yv1dM_UO4JimRQxX0a2YvrrICKMOAlwyWqNZ-LIAHUmjTwpZiS3a5qwjtmWycSPXLpta0s5w5yQ73_MhQphvpvzb7QoPgLp1qAX1agp6tv_t0W3Sp_AJRhbX8Y_ZiwWZhIVCJ9CLzz")',
                  }}
                ></div>
                {/* Tooltip hint */}
                <div className='absolute top-8 left-1/2 bg-surface-darker border border-border-dark px-2 py-1 rounded text-xs text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
                  AUC: 0.94
                </div>
              </div>
            </div>

            {/* Feature Importance */}
            <div className='flex flex-col gap-3 mt-2'>
              <p className='text-sm font-medium text-white'>
                Top Feature Importance
              </p>
              <div className='flex flex-col gap-3'>
                {featureImportance.map((item, index) => (
                  <div key={index} className='group'>
                    <div className='flex justify-between text-xs mb-1'>
                      <span className='text-slate-400 group-hover:text-white transition-colors'>
                        {item.feature}
                      </span>
                      <span className='text-primary font-mono'>
                        {item.importance}
                      </span>
                    </div>
                    <div className='h-1.5 w-full bg-surface-darker rounded-full overflow-hidden'>
                      <div
                        className={`h-full bg-primary rounded-full shadow-[0_0_10px_rgba(19,218,236,0.5)] ${
                          index === 0
                            ? 'w-[88%]'
                            : index === 1
                            ? 'w-[72%] bg-primary/70'
                            : 'w-[54%] bg-primary/50'
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='h-px bg-border-dark my-1'></div>

            {/* Deployment Zone */}
            <div className='flex flex-col gap-3'>
              <p className='text-sm font-medium text-white flex items-center gap-2'>
                <span className='material-symbols-outlined text-orange-400 text-sm'>
                  rocket_launch
                </span>
                Deployment Control
              </p>
              <div className='bg-surface-darker p-3 rounded-lg border border-border-dark'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-xs text-slate-400'>Canary Traffic</span>
                  <span className='text-xs font-bold text-white'>
                    {canaryTraffic}%
                  </span>
                </div>
                <input
                  className='w-full h-1 bg-border-dark rounded-lg appearance-none cursor-pointer accent-primary'
                  type='range'
                  min='0'
                  max='100'
                  value={canaryTraffic}
                  onChange={(e) => setCanaryTraffic(Number(e.target.value))}
                />
                <div className='flex justify-between mt-1 text-[10px] text-slate-500'>
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-3 mt-1'>
                <button className='flex items-center justify-center gap-2 h-9 rounded-lg border border-border-dark bg-transparent text-slate-300 text-xs font-medium hover:bg-white/5 hover:text-white hover:border-slate-500 transition-all'>
                  <span className='material-symbols-outlined text-sm'>
                    undo
                  </span>
                  Rollback
                </button>
                <button className='flex items-center justify-center gap-2 h-9 rounded-lg bg-white text-black text-xs font-bold hover:bg-slate-200 transition-all'>
                  <span className='material-symbols-outlined text-sm'>
                    publish
                  </span>
                  Promote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;
