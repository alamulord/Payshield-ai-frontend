import React, { useState, useMemo } from 'react';
import { useCurrentTheme } from '../context/ThemeContext';

type IntegrationStatus = 'all' | 'connected' | 'disconnected' | 'error';

interface Integration {
  id: number;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  statusText: string;
  lastSynced: string;
  environment: string;
  logo: string;
  provider: string;
  lastUpdated: Date;
}

const IntegrationsPage: React.FC = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<IntegrationStatus>('all');
  const [sortBy, setSortBy] = useState<'name' | 'lastUpdated'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock data for integrations
  const allIntegrations: Integration[] = [
    {
      id: 1,
      name: 'Stripe Payments',
      description: 'Primary payment gateway for NA/EU regions.',
      status: 'connected',
      statusText: 'Connected',
      lastSynced: '2 mins ago',
      environment: 'Production',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZCR5BRhxqmbL7-vxDCnyRRIj3CiywX5TKVcuq04FdUUDUV0aBzxSZnANJppO8_YJKo510MnzrO--zn0nTLJe5R1arErR72qMNfr5Sa5uymXaZsQ-eDH8PebzKoFK6RHQtWqfm2D0L81wtpvlHkPCAxsYZyMHB5VONu-spctQ3lFA-A4v6fLovs0nE1zcPMew-fvDf693RtuVntDgQ2trGWxIZ3Zq9zzvNlSyt29LbVpYRKTjMKWbrICFgk5FoFbvkbnGEE6hGJ9FJ',
      provider: 'stripe',
      lastUpdated: new Date('2023-06-15T10:30:00'),
    },
    {
      id: 2,
      name: 'PayPal Sandbox',
      description: 'Testing environment for new checkout flows.',
      status: 'error',
      statusText: 'Sync Error',
      lastSynced: '1 hour ago',
      environment: 'Sandbox',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2-XCIbnNadCYQvvl_kfaJNDPIOFW7kRF8z_8DLrSXZRUfVUWS4t7g5yOjijuDW120ykR5opw4M0mW-adR-rLj3oZLNbOeDgxXfLs61ZxXGiv6SglUR1vTkZ4nioJt0F7QvG8iU1_TCWP9e49TftRRcjwaMWDi4Td80JIkHjrk8IvTmBljRrVa_dKd8WehVYScEa8URYP027Ms4TxYwKY3XNtxTD1X_FzbUqlfQTWvuD8ShqF9kym3WGIVLDVIglUMMr2z4iAkViD_',
      provider: 'paypal',
      lastUpdated: new Date('2023-06-14T14:45:00'),
    },
    {
      id: 3,
      name: 'Adyen',
      description: 'Global payment processing platform.',
      status: 'connected',
      statusText: 'Connected',
      lastSynced: '5 mins ago',
      environment: 'Production',
      logo: 'https://logo.clearbit.com/adyen.com',
      provider: 'adyen',
      lastUpdated: new Date('2023-06-16T09:15:00'),
    },
  ];

  // Filter and sort integrations based on search and filters
  const filteredIntegrations = useMemo(() => {
    return allIntegrations
      .filter((integration: Integration) => {
        const matchesSearch =
          integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          integration.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          integration.provider
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === 'all' || integration.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a: Integration, b: Integration) => {
        if (sortBy === 'name') {
          return sortDirection === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          return sortDirection === 'asc'
            ? a.lastUpdated.getTime() - b.lastUpdated.getTime()
            : b.lastUpdated.getTime() - a.lastUpdated.getTime();
        }
      });
  }, [searchQuery, statusFilter, sortBy, sortDirection]);

  // Count integrations by status
  const statusCounts = useMemo(() => {
    return allIntegrations.reduce(
      (acc: Record<string, number>, integration: Integration) => {
        acc[integration.status] = (acc[integration.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, []);

  const totalIntegrations = allIntegrations.length;
  const connectedCount = statusCounts['connected'] || 0;
  const disconnectedCount = statusCounts['disconnected'] || 0;
  const errorCount = statusCounts['error'] || 0;

  // Toggle sort direction
  const toggleSort = (field: 'name' | 'lastUpdated') => {
    if (sortBy === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Format date to relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getStatusStyles = (status: string): string => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      case 'disconnected':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600';
    }
  };
   const { bgClass, textClass } = useCurrentTheme();

  return (
    <div className={`flex-1 px-4 md:px-8 py-8 ${bgClass} ${textClass}`}>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-6'>
        {/* Page Heading */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white'>
              Integrations
            </h1>
            <p className='text-slate-500 dark:text-slate-400 max-w-2xl'>
              Manage secure connections with payment gateways, fraud databases,
              and identity verification providers.
            </p>
          </div>

          {/* Stats Widget */}
          <div className='flex gap-4 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm'>
            <div className='flex flex-col px-2'>
              <span className='text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider'>
                Active
              </span>
              <span className='text-xl font-bold text-slate-900 dark:text-white'>
                12
              </span>
            </div>
            <div className='w-px bg-slate-200 dark:bg-slate-700'></div>
            <div className='flex flex-col px-2'>
              <span className='text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider'>
                Health
              </span>
              <span className='text-xl font-bold text-green-500'>98%</span>
            </div>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm'>
          {/* Search */}
          <div className='w-full lg:w-96 relative group'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors'>
              <span className='material-symbols-outlined'>search</span>
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full h-10 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all'
              placeholder='Search providers (e.g. Stripe, Adyen)...'
              type='text'
            />
          </div>

          {/* Filters */}
          <div className='flex flex-wrap gap-2 w-full lg:w-auto'>
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-semibold transition-colors ${
                statusFilter === 'all'
                  ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span>All Providers</span>
              <span
                className={`${
                  statusFilter === 'all'
                    ? 'bg-primary text-slate-900'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white'
                } text-[10px] px-1.5 py-0.5 rounded-full font-bold`}
              >
                {totalIntegrations}
              </span>
            </button>
            <button
              onClick={() => setStatusFilter('connected')}
              className={`flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'connected'
                  ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span>Connected</span>
              <span
                className={`${
                  statusFilter === 'connected'
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white'
                } text-[10px] px-1.5 py-0.5 rounded-full font-bold`}
              >
                {connectedCount}
              </span>
            </button>
            <button
              onClick={() => setStatusFilter('disconnected')}
              className={`flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'disconnected'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span>Disconnected</span>
              <span
                className={`${
                  statusFilter === 'disconnected'
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white'
                } text-[10px] px-1.5 py-0.5 rounded-full font-bold`}
              >
                {disconnectedCount}
              </span>
            </button>
            <button
              onClick={() => setStatusFilter('error')}
              className={`flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'error'
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span>Errors</span>
              <span
                className={`${
                  statusFilter === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white'
                } text-[10px] px-1.5 py-0.5 rounded-full font-bold`}
              >
                {errorCount}
              </span>
            </button>
            <div className='w-px h-9 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block'></div>
            <div className='relative group'>
              <button
                className='px-2 h-9 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors'
                title='Sort view'
                onClick={() => toggleSort('name')}
              >
                <span className='material-symbols-outlined'>sort_by_alpha</span>
                {sortBy === 'name' && (
                  <span className='absolute -top-1 -right-1 text-[10px] text-primary'>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </div>
            <div className='relative group'>
              <button
                className='px-2 h-9 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors'
                title='Sort by last updated'
                onClick={() => toggleSort('lastUpdated')}
              >
                <span className='material-symbols-outlined'>update</span>
                {sortBy === 'lastUpdated' && (
                  <span className='absolute -top-1 -right-1 text-[10px] text-primary'>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Integration Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredIntegrations.length === 0 ? (
            <div className='col-span-full flex flex-col items-center justify-center py-12 text-center'>
              <div className='bg-slate-100 dark:bg-slate-800 rounded-full p-4 mb-4'>
                <span className='material-symbols-outlined text-3xl text-slate-400'>
                  search_off
                </span>
              </div>
              <h3 className='text-lg font-medium text-slate-900 dark:text-white mb-1'>
                No integrations found
              </h3>
              <p className='text-slate-500 dark:text-slate-400 max-w-md'>
                No integrations match your search criteria. Try adjusting your
                filters or search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className='mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium'
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredIntegrations.map((integration: Integration) => (
              <div
                key={integration.id}
                className={`relative flex flex-col h-full p-6 bg-white dark:bg-slate-800 rounded-xl border ${
                  integration.status === 'error'
                    ? 'border-red-500/20'
                    : 'border-slate-200 dark:border-slate-700'
                } shadow-sm hover:shadow-lg ${
                  integration.status === 'error'
                    ? 'hover:shadow-red-500/5'
                    : 'hover:shadow-primary/5'
                } transition-all duration-300`}
              >
                <div className='flex justify-between items-start mb-4'>
                  <div className='size-12 rounded-lg bg-white p-1 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center'>
                    <img
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      className='w-full h-auto max-h-10 object-contain'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${getStatusStyles(
                      integration.status
                    )}`}
                  >
                    {integration.status === 'connected' && (
                      <span className='size-1.5 rounded-full bg-green-500 animate-pulse'></span>
                    )}
                    {integration.status === 'error' && (
                      <span className='material-symbols-outlined text-[14px]'>
                        error
                      </span>
                    )}
                    {integration.statusText}
                  </span>
                </div>

                <div className='mb-4'>
                  <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-1'>
                    {integration.name}
                  </h3>
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                    {integration.description}
                  </p>
                </div>

                <div className='grid grid-cols-2 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-6'>
                  <div
                    className={`flex items-center gap-1.5 ${
                      integration.status === 'error' ? 'text-red-500' : ''
                    }`}
                  >
                    <span className='material-symbols-outlined text-[16px]'>
                      sync
                    </span>
                    <span>{integration.lastSynced}</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className='material-symbols-outlined text-[16px]'>
                      dns
                    </span>
                    <span>{integration.environment}</span>
                  </div>
                  <div className='flex items-center gap-1.5 col-span-2 text-primary'>
                    <span className='material-symbols-outlined text-[16px]'>
                      security
                    </span>
                    <span>Encrypted Connection</span>
                  </div>
                </div>

                <div className='mt-auto flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-700'>
                  <button
                    onClick={() => {
                      console.log('Configuring integration:', integration.id);
                    }}
                    className='flex-1 h-9 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-opacity'
                  >
                    Configure
                  </button>
                  <button
                    onClick={() => {
                      console.log(
                        'Testing webhook for integration:',
                        integration.id
                      );
                    }}
                    className='flex h-9 items-center justify-center px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors'
                    title='Test Webhook'
                  >
                    <span className='material-symbols-outlined text-[20px]'>
                      webhook
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add New Integration Card */}
        <div
          onClick={() => {
            console.log('Add new integration clicked');
          }}
          className='group relative flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 cursor-pointer'
        >
          <div className='size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors'>
            <span className='material-symbols-outlined text-3xl'>add</span>
          </div>
          <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-1'>
            Add New Integration
          </h3>
          <p className='text-sm text-slate-500 dark:text-slate-400 text-center'>
            Connect with 100+ payment and fraud prevention providers
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
