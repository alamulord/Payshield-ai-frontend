import React from 'react';
import {
  AttachMoney as PaymentsIcon,
  VerifiedUser as VerifiedUserIcon,
  Warning as WarningIcon,
  Gavel as GavelIcon,
  Security as SecurityIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  NotificationsActive as NotificationsActiveIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@mui/icons-material';
import { useCurrentTheme } from '../context/ThemeContext';

const DashboardPage: React.FC = () => {
  const {bgClass, textClass} = useCurrentTheme()
  return (
    <div
      className={`flex-1 overflow-y-auto p-6 scroll-smooth space-y-6 ${bgClass} ${textClass}`}
    >
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
                    Dashboard
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 className='text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight'>
            Platform Dashboard
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
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <button className='flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-subtle'>
              <span className='material-symbols-outlined text-[20px]'>
                calendar_today
              </span>
              <span>Today</span>
              <span className='material-symbols-outlined text-[16px] text-slate-400'>
                expand_more
              </span>
            </button>
          </div>
          <button className='flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-subtle'>
            <span className='material-symbols-outlined text-[20px]'>
              download
            </span>
            Export CSV
          </button>
          
        </div>
      </div>

      <div className='mx-auto space-y-6'>
        {/* KPI Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
          {/* Total Volume */}
          <div className='bg-light dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-start mb-2'>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium'>
                Total Volume
              </p>
              <div className='text-primary bg-primary/10 p-1 rounded text-[20px]'>
                <PaymentsIcon fontSize='small' />
              </div>
            </div>
            <div className='flex items-baseline gap-2'>
              <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>
                $4.2M
              </h3>
              <span className='text-xs font-medium text-success flex items-center'>
                <ArrowUpwardIcon fontSize='inherit' className='mr-0.5' /> 12%
              </span>
            </div>
            <p className='text-xs text-slate-400 mt-1'>vs. previous 24h</p>
          </div>

          {/* Fraud Prevented */}
          <div className='bg-light dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-start mb-2'>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium'>
                Fraud Prevented
              </p>
              <div className='text-success bg-success/10 p-1 rounded text-[20px]'>
                <VerifiedUserIcon fontSize='small' />
              </div>
            </div>
            <div className='flex items-baseline gap-2'>
              <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>
                $125k
              </h3>
              <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                320 txns
              </span>
            </div>
            <p className='text-xs text-slate-400 mt-1'>High severity blocks</p>
          </div>

          {/* Fraud Rate */}
          <div className='bg-light dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-start mb-2'>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium'>
                Fraud Rate
              </p>
              <div className='text-danger bg-danger/10 p-1 rounded text-[20px]'>
                <WarningIcon fontSize='small' />
              </div>
            </div>
            <div className='flex items-baseline gap-2'>
              <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>
                0.8%
              </h3>
              <span className='text-xs font-medium text-success flex items-center'>
                <ArrowDownwardIcon className='text-[14px]' />
                0.1%
              </span>
            </div>
            <p className='text-xs text-slate-400 mt-1'>
              Below threshold (1.0%)
            </p>
          </div>

          {/* False Positives */}
          <div className='bg-light dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-start mb-2'>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium'>
                False Positives
              </p>
              <div className='text-warning bg-warning/10 p-1 rounded text-[20px]'>
                <GavelIcon fontSize='small' />
              </div>
            </div>
            <div className='flex items-baseline gap-2'>
              <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>
                0.2%
              </h3>
              <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>
                Stable
              </span>
            </div>
            <p className='text-xs text-slate-400 mt-1'>Manual review queue</p>
          </div>

          {/* Model Health */}
          <div className='bg-light dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-start mb-2'>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium'>
                Model Health
              </p>
              <div className='text-primary bg-primary/10 p-1 rounded text-[20px]'>
                <SecurityIcon fontSize='small' />
              </div>
            </div>
            <div className='flex items-baseline gap-2'>
              <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>
                98.5%
              </h3>
              <span className='text-xs font-medium text-success'>Healthy</span>
            </div>
            <p className='text-xs text-slate-400 mt-1'>v2.4.1 Inference</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Transaction Trends */}
          <div className='lg:col-span-2 bg-light dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
              <div>
                <h3 className='text-base font-bold text-slate-900 dark:text-white'>
                  Transaction Trends
                </h3>
                <p className='text-sm text-slate-500 dark:text-slate-400'>
                  Hourly breakdown (24h)
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <div className='hidden md:flex items-center gap-3 text-xs'>
                  <div className='flex items-center gap-1.5 text-slate-500 dark:text-slate-400'>
                    <span className='size-2 rounded-full bg-primary'></span> Vol
                  </div>
                  <div className='flex items-center gap-1.5 text-slate-500 dark:text-slate-400'>
                    <span className='size-2 rounded-full bg-danger'></span>{' '}
                    Fraud
                  </div>
                </div>
                <div className='flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg'>
                  <button className='px-3 py-1 text-xs font-medium bg-white dark:bg-slate-600 text-slate-900 dark:text-white rounded-md shadow-sm transition-all'>
                    Overview
                  </button>
                  <button className='px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all'>
                    Volume
                  </button>
                  <button className='px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all'>
                    Fraud
                  </button>
                </div>
              </div>
            </div>
            <div className='relative h-[280px] w-full pb-3'>
              <svg
                className='w-full h-full'
                preserveAspectRatio='none'
                viewBox='0 0 800 280'
              >
                <defs>
                  <linearGradient id='volGradient' x1='0' x2='0' y1='0' y2='1'>
                    <stop offset='0%' stopColor='#144bb8' stopOpacity='0.2' />
                    <stop offset='100%' stopColor='#144bb8' stopOpacity='0' />
                  </linearGradient>
                </defs>
                <line
                  className='dark:stroke-slate-700'
                  stroke='#e2e8f0'
                  strokeWidth='1'
                  x1='0'
                  x2='800'
                  y1='280'
                  y2='280'
                />
                <line
                  className='dark:stroke-slate-800'
                  stroke='#e2e8f0'
                  strokeDasharray='4'
                  strokeWidth='1'
                  x1='0'
                  x2='800'
                  y1='210'
                  y2='210'
                />
                <line
                  className='dark:stroke-slate-800'
                  stroke='#e2e8f0'
                  strokeDasharray='4'
                  strokeWidth='1'
                  x1='0'
                  x2='800'
                  y1='140'
                  y2='140'
                />
                <line
                  className='dark:stroke-slate-800'
                  stroke='#e2e8f0'
                  strokeDasharray='4'
                  strokeWidth='1'
                  x1='0'
                  x2='800'
                  y1='70'
                  y2='70'
                />
                <path
                  d='M0,200 Q50,180 100,190 T200,150 T300,120 T400,160 T500,100 T600,80 T700,90 T800,60 L800,280 L0,280 Z'
                  fill='url(#volGradient)'
                />
                <path
                  d='M0,200 Q50,180 100,190 T200,150 T300,120 T400,160 T500,100 T600,80 T700,90 T800,60'
                  fill='none'
                  stroke='#144bb8'
                  strokeLinecap='round'
                  strokeWidth='3'
                />
                <path
                  d='M0,260 Q50,265 100,260 T200,255 T300,250 T400,230 T500,240 T600,250 T700,260 T800,255'
                  fill='none'
                  stroke='#DC2626'
                  strokeLinecap='round'
                  strokeWidth='2'
                />
              </svg>
              <div className='flex justify-between mt-2 text-xs text-slate-400 font-medium px-2'>
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
                <span>23:59</span>
              </div>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className='bg-light dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col'>
            <div className='flex justify-between items-start mb-6'>
              <div>
                <h3 className='text-base font-bold text-slate-900 dark:text-white'>
                  Risk Distribution
                </h3>
                <p className='text-sm text-slate-500 dark:text-slate-400 mt-1'>
                  By confidence score
                </p>
              </div>
              <div className='flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0'>
                <button className='px-3 py-1 text-xs font-medium bg-white dark:bg-slate-600 text-slate-900 dark:text-white rounded-md shadow-sm transition-all'>
                  Count
                </button>
                <button className='px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all'>
                  Value
                </button>
              </div>
            </div>
            <div className='flex-1 flex items-end justify-between gap-2 h-[200px]'>
              <div
                className='w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative group h-[20%]'
                title='Safe'
              >
                <div className='absolute bottom-0 w-full bg-success/80 rounded-t-md group-hover:bg-success transition-all h-full' />
              </div>
              <div
                className='w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative group h-[45%]'
                title='Low Risk'
              >
                <div className='absolute bottom-0 w-full bg-success/60 rounded-t-md group-hover:bg-success transition-all h-full' />
              </div>
              <div
                className='w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative group h-[75%]'
                title='Medium Risk'
              >
                <div className='absolute bottom-0 w-full bg-warning/60 rounded-t-md group-hover:bg-warning transition-all h-full' />
              </div>
              <div
                className='w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative group h-[30%]'
                title='High Risk'
              >
                <div className='absolute bottom-0 w-full bg-danger/60 rounded-t-md group-hover:bg-danger transition-all h-full' />
              </div>
              <div
                className='w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative group h-[10%]'
                title='Critical'
              >
                <div className='absolute bottom-0 w-full bg-danger rounded-t-md group-hover:bg-danger/90 transition-all h-full' />
              </div>
            </div>
            <div className='flex justify-between mt-3 text-xs text-slate-500 font-medium'>
              <span className='text-center w-full'>0-20</span>
              <span className='text-center w-full'>21-40</span>
              <span className='text-center w-full'>41-60</span>
              <span className='text-center w-full'>61-80</span>
              <span className='text-center w-full'>81-100</span>
            </div>
            <div className='mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800'>
              <div className='flex items-center gap-2 mb-1'>
                <InfoOutlinedIcon className='text-warning text-sm' />
                <span className='text-xs font-semibold text-slate-700 dark:text-slate-300'>
                  Insight
                </span>
              </div>
              <p className='text-xs text-slate-500 dark:text-slate-400'>
                Elevated risk scores detected in region{' '}
                <span className='font-bold text-slate-700 dark:text-slate-300'>
                  APAC
                </span>{' '}
                between 14:00-16:00.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Fraud Origins Heatmap */}
          <div className='lg:col-span-2 flex flex-col gap-6'>
            <div className='bg-light dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'>
              <div className='p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center'>
                <h3 className='text-base font-bold text-slate-900 dark:text-white'>
                  Fraud Origins Heatmap
                </h3>
                <button className='text-xs text-primary font-medium hover:underline'>
                  View Full Map
                </button>
              </div>
              <div
                className='h-64 w-full bg-slate-100 dark:bg-slate-800 relative bg-cover bg-center grayscale opacity-80'
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCr2F4lo5d1g0jWQUDi7bg3E_gTOHk9nfg6avxR3KiFmsxHoOoaQQyXEs4QLVQQUD0VlBHbiQ7rtIH0-8zgXWk0BVcrzmZ_YruIs79XSZ_rAh2Uv8CUIf-z_xYtVjXrX0QJ37Y8KRqj0R4NDNqnOupoexVrAV3Qj7_-2Ovyw6uB66nPmX_mdwOcV_OxEtUCbk73z0lHHy0qrSnbNvQ52GEAPwPYu4glSmz4NK-50XCjAzpWZdHQI4nD6LI3J0w-2qGFWzLqeVvdX6yw")',
                }}
              >
                <div className='absolute top-[30%] left-[20%] size-4 bg-danger/40 rounded-full animate-ping' />
                <div className='absolute top-[30%] left-[20%] size-2 bg-danger rounded-full' />
                <div className='absolute top-[40%] right-[30%] size-6 bg-warning/40 rounded-full animate-ping delay-75' />
                <div className='absolute top-[40%] right-[30%] size-3 bg-warning rounded-full' />
                <div className='absolute top-[25%] left-[45%] size-3 bg-danger/40 rounded-full animate-ping delay-150' />
                <div className='absolute top-[25%] left-[45%] size-1.5 bg-danger rounded-full' />
              </div>
            </div>

            {/* Risk Analysis */}
            <div className='bg-light dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm'>
              <div className='p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                <h3 className='text-base font-bold text-slate-900 dark:text-white'>
                  Risk Analysis
                </h3>
                <div className='flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto'>
                  <button className='px-3 py-1 text-xs font-medium bg-white dark:bg-slate-600 text-slate-900 dark:text-white rounded-md shadow-sm transition-all'>
                    Merchants
                  </button>
                  <button className='px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all'>
                    Regions
                  </button>
                  <button className='px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all'>
                    IPs
                  </button>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800'>
                      <th className='px-6 py-3 font-semibold uppercase'>
                        Merchant
                      </th>
                      <th className='px-6 py-3 font-semibold uppercase'>
                        Location
                      </th>
                      <th className='px-6 py-3 font-semibold uppercase'>
                        Flagged Vol
                      </th>
                      <th className='px-6 py-3 font-semibold uppercase text-right'>
                        Risk Score
                      </th>
                      <th className='px-6 py-3 font-semibold uppercase text-right'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-sm'>
                    <tr className='border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                      <td className='px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3'>
                        <div className='size-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500'>
                          TG
                        </div>
                        TechGadgets Inc.
                      </td>
                      <td className='px-6 py-4 text-slate-500'>
                        San Francisco, US
                      </td>
                      <td className='px-6 py-4 text-slate-900 dark:text-white font-medium'>
                        $24,500
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger/10 text-danger'>
                          92 / 100
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button className='text-primary hover:text-primary-dark font-medium text-xs'>
                          Investigate
                        </button>
                      </td>
                    </tr>
                    <tr className='border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                      <td className='px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3'>
                        <div className='size-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500'>
                          GL
                        </div>
                        Global Luxury Ltd
                      </td>
                      <td className='px-6 py-4 text-slate-500'>London, UK</td>
                      <td className='px-6 py-4 text-slate-900 dark:text-white font-medium'>
                        $18,200
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning'>
                          78 / 100
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button className='text-primary hover:text-primary-dark font-medium text-xs'>
                          Investigate
                        </button>
                      </td>
                    </tr>
                    <tr className='hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                      <td className='px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3'>
                        <div className='size-8 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500'>
                          DS
                        </div>
                        Digital Services XY
                      </td>
                      <td className='px-6 py-4 text-slate-500'>Berlin, DE</td>
                      <td className='px-6 py-4 text-slate-900 dark:text-white font-medium'>
                        $12,050
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning'>
                          65 / 100
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button className='text-primary hover:text-primary-dark font-medium text-xs'>
                          Investigate
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Live Alerts */}
          <div className='bg-light dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-full'>
            <div className='p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <NotificationsActiveIcon className='text-danger text-lg' />
                  <span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger ring-2 ring-white' />
                </div>
                <h3 className='text-base font-bold text-slate-900 dark:text-white'>
                  Live Alerts
                </h3>
              </div>
              <div className='flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto'>
                <button className='px-3 py-1 text-xs font-medium bg-white dark:bg-slate-600 text-slate-900 dark:text-white rounded-md shadow-sm transition-all'>
                  All
                </button>
                <button className='px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all'>
                  Critical
                </button>
                <button className='px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all'>
                  Warning
                </button>
              </div>
            </div>
            <div className='flex-1 overflow-y-auto p-4 space-y-3 max-h-[600px]'>
              {/* Alert Item */}
              <div className='p-3 bg-red-50 dark:bg-red-900/10 border-l-4 border-danger rounded-r-lg'>
                <div className='flex justify-between items-start'>
                  <p className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                    Velocity Spike Detected
                  </p>
                  <span className='text-[10px] text-slate-500 uppercase font-bold'>
                    Just Now
                  </span>
                </div>
                <p className='text-xs text-slate-600 dark:text-slate-400 mt-1'>
                  User ID #8921 initiated 15 transactions in 2 minutes.
                </p>
                <div className='mt-2 flex gap-2'>
                  <button className='text-[10px] bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-medium hover:bg-slate-50'>
                    Block User
                  </button>
                  <button className='text-[10px] text-primary hover:underline'>
                    View Details
                  </button>
                </div>
              </div>

              {/* More alert items */}
              <div className='p-3 bg-orange-50 dark:bg-orange-900/10 border-l-4 border-warning rounded-r-lg'>
                <div className='flex justify-between items-start'>
                  <p className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                    IP Mismatch
                  </p>
                  <span className='text-[10px] text-slate-500 uppercase font-bold'>
                    2m ago
                  </span>
                </div>
                <p className='text-xs text-slate-600 dark:text-slate-400 mt-1'>
                  Transaction originating from Nigeria, billing address in
                  Canada.
                </p>
              </div>

              <div className='p-3 bg-slate-50 dark:bg-slate-800/50 border-l-4 border-slate-300 dark:border-slate-600 rounded-r-lg'>
                <div className='flex justify-between items-start'>
                  <p className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                    Large Transaction
                  </p>
                  <span className='text-[10px] text-slate-500 uppercase font-bold'>
                    15m ago
                  </span>
                </div>
                <p className='text-xs text-slate-600 dark:text-slate-400 mt-1'>
                  $45,000 transfer flagged for review. Score: 45.
                </p>
              </div>

              <div className='p-3 bg-red-50 dark:bg-red-900/10 border-l-4 border-danger rounded-r-lg'>
                <div className='flex justify-between items-start'>
                  <p className='text-sm font-semibold text-slate-900 dark:text-slate-100'>
                    Blacklist Match
                  </p>
                  <span className='text-[10px] text-slate-500 uppercase font-bold'>
                    22m ago
                  </span>
                </div>
                <p className='text-xs text-slate-600 dark:text-slate-400 mt-1'>
                  Device ID matched known fraud cluster.
                </p>
              </div>
            </div>
            <div className='p-3 border-t border-slate-100 dark:border-slate-800 text-center'>
              <button className='text-xs font-medium text-primary hover:text-primary-dark'>
                View All Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
