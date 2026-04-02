import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Types
interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'live' | 'test';
  created: string;
  status: 'active' | 'inactive';
}

interface Webhook {
  id: string;
  url: string;
  events: string[];
  isActive: boolean;
}

interface AdminUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

// Sub-tabs configuration
const subTabs = [
  {
    id: 'organization',
    title: 'Organization',
    icon: 'business',
    items: [
      { id: 'general', title: 'General Settings', icon: 'settings' },
      { id: 'team', title: 'Team Management', icon: 'group', badge: 12 },
    ],
  },
  {
    id: 'platform',
    title: 'Platform',
    icon: 'dns',
    items: [
      { id: 'developer', title: 'Developer Settings', icon: 'code' },
      { id: 'integrations', title: 'API & Integrations', icon: 'api' },
      { id: 'notifications', title: 'Notifications', icon: 'notifications' },
      { id: 'billing', title: 'Billing & Usage', icon: 'credit_card' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: 'security',
    items: [
      { id: 'authentication', title: 'Authentication', icon: 'lock' },
      { id: 'audit', title: 'Audit Logs', icon: 'visibility' },
      { id: 'security-rules', title: 'Security Rules', icon: 'security' },
    ],
  },
];

const SettingsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('platform');
  const [activeSubTab, setActiveSubTab] = useState('developer');

  // State for API Keys
  const [apiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Live Secret Key',
      key: 'sk_live_••••••••••••••••4x9k',
      type: 'live',
      created: 'Oct 24, 2023',
      status: 'active',
    },
    {
      id: '2',
      name: 'Test Secret Key',
      key: 'sk_test_••••••••••••••••8j2p',
      type: 'test',
      created: 'Nov 01, 2023',
      status: 'active',
    },
  ]);

  // State for Webhooks
  const [webhooks] = useState<Webhook[]>([
    {
      id: '1',
      url: 'https://api.acmecorp.com/webhooks/payshield',
      events: [
        'payment.fraud_detected',
        'payment.processed',
        'charge.refunded',
      ],
      isActive: true,
    },
    {
      id: '2',
      url: 'https://staging-api.acmecorp.com/webhooks/payshield',
      events: ['*'],
      isActive: false,
    },
  ]);

  // State for Admin Users
  const [adminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'Sarah Jenkins',
      role: 'CTO',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxJbCmWCmq24Hseodo1xOSjdNhl7GM18ithYiAUqvGUKAxS7an7R3Vms5P-F5IbbuCkSjAsyV6KtUsOtnK_Fl_JIF_Umv8lv1aFDpY_dCpAa7qznEBaJZkuV8W7YU_6vshzX6MTThFMJljLoFJzEAftcMJukxo4NHCbwJdhpR75_0Be80RhqhcZ7fu9a2CbF2_ZULtldzsepMcYSlPsnJARBhA6m8z6b7W3pbyr2CEWlta-bHbsCgPXoPvhipSlVOHBzY9LLzL29u_',
    },
    {
      id: '2',
      name: 'Mike Ross',
      role: 'Lead Engineer',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC52TO79xfQCEInJw0gqwzEWQz5OrVt90c_gRpPn1V-mVLloe5SHuDdJsmsPsUjc_BCyO7cwPrmxa6_gUiQpNKN5UJAxbbc1M-UI5mSD1VJ1eNiUUAyE_BrjRlAdc_--OZJEHlz9y12G-6kCOgQMjfaFGPzLRjXHNWNAiWJTTf-3jsQD_0Est4qd_TR4iH1jJB0NjV1joHoV3sySDeCs8U4JylteXCBSs4U5dPJ2-sv4n_IFdc_3EuSRIZY4YM1tHOY1eNMyM3GbcnI',
    },
  ]);

  // State for Risk Threshold
  const [fraudScore, setFraudScore] = useState(85);
  const [autoDeclineRules, setAutoDeclineRules] = useState({
    highVelocityIp: true,
    anonymousProxy: true,
    missingBillingZip: false,
  });

  // Handle auto-decline rule toggle
  const handleRuleToggle = (rule: keyof typeof autoDeclineRules) => {
    setAutoDeclineRules((prev) => ({
      ...prev,
      [rule]: !prev[rule],
    }));
  };

  // Get current active tab based on URL
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      const tabId = pathParts[1];
      setActiveTab(tabId);
      if (pathParts.length > 2) {
        setActiveSubTab(pathParts[2]);
      }
    }
  }, [location.pathname]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Navigate to the first sub-tab of the selected tab
    const tab = subTabs.find((t) => t.id === tabId);
    if (tab && tab.items.length > 0) {
      navigate(`/settings/${tabId}/${tab.items[0].id}`);
    } else {
      navigate(`/settings/${tabId}`);
    }
  };

  const handleSubTabChange = (tabId: string, subTabId: string) => {
    setActiveTab(tabId);
    setActiveSubTab(subTabId);
    navigate(`/settings/${tabId}/${subTabId}`);
  };

  const activeTabData = subTabs.find((tab) => tab.id === activeTab);

  return (
    <div className='flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden scrollbar-hide'>
      <div className='border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>
              Settings
            </h1>
          </div>

          {/* Main Tabs */}
          <div className='flex space-x-8'>
            {subTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                <div className='flex items-center'>
                  <span className='material-symbols-outlined mr-2 text-lg'>
                    {tab.icon}
                  </span>
                  {tab.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      {activeTabData && (
        <div className='bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex space-x-6'>
              {activeTabData.items.map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => handleSubTabChange(activeTab, subTab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeSubTab === subTab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  <span className='material-symbols-outlined mr-2 text-lg'>
                    {subTab.icon}
                  </span>
                  {subTab.title}
                  {subTab.badge && (
                    <span className='ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full'>
                      {subTab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full scrollbar-hide'>
        {/* Breadcrumbs & Header */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2 text-sm font-medium text-slate-500'>
            <a className='hover:text-primary transition-colors' href='#'>
              Settings
            </a>
            <span className='material-symbols-outlined text-[16px]'>
              chevron_right
            </span>
            <span className='text-slate-900 dark:text-white'>
              Developer API
            </span>
          </div>
          <div className='flex flex-wrap justify-between items-end gap-4'>
            <div>
              <h2 className='text-3xl font-black tracking-tight text-slate-900 dark:text-white'>
                Developer Settings
              </h2>
              <p className='text-slate-500 dark:text-slate-400 mt-2 max-w-2xl text-base'>
                Manage your API keys, configure webhooks, and adjust risk engine
                thresholds for your integration.
              </p>
            </div>
            <button className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1f3639] border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#2a4549] transition-colors shadow-sm'>
              <span className='material-symbols-outlined text-[18px]'>
                visibility
              </span>
              View Audit Logs
            </button>
          </div>
        </div>

        {/* API Keys Section */}
        <section className='flex flex-col gap-5 mt-10'>
          <div className='flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700'>
            <div className='flex items-center gap-2'>
              <span className='material-symbols-outlined text-primary'>
                key
              </span>
              <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
                API Keys
              </h3>
            </div>
            <button className='text-primary text-sm font-bold hover:underline'>
              Read Documentation
            </button>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className={`bg-white dark:bg-slate-800 rounded-xl border ${
                  apiKey.type === 'live'
                    ? 'border-slate-200 dark:border-slate-700'
                    : 'border-slate-200/80 dark:border-slate-700/50'
                } p-6 shadow-sm relative overflow-hidden`}
              >
                <div className='absolute top-0 right-0 p-4'>
                  {apiKey.type === 'live' ? (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'>
                      Active
                    </span>
                  ) : (
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'>
                      Test Mode
                    </span>
                  )}
                </div>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300'>
                    <span className='material-symbols-outlined'>
                      {apiKey.type === 'live' ? 'rocket_launch' : 'science'}
                    </span>
                  </div>
                  <div>
                    <h4 className='font-bold text-slate-900 dark:text-white'>
                      {apiKey.name}
                    </h4>
                    <p className='text-xs text-slate-500 font-mono'>
                      Created on {apiKey.created}
                    </p>
                  </div>
                </div>
                <div className='bg-slate-50 dark:bg-slate-900 rounded-lg p-3 flex items-center justify-between border border-slate-200 dark:border-slate-700 mb-4'>
                  <code className='text-sm font-mono text-slate-600 dark:text-slate-300'>
                    {apiKey.key}
                  </code>
                  <button
                    className='text-slate-400 hover:text-primary transition-colors p-1'
                    title='Copy Key'
                  >
                    <span className='material-symbols-outlined text-[18px]'>
                      content_copy
                    </span>
                  </button>
                </div>
                <div className='flex items-center gap-3 pt-2'>
                  <button className='text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors'>
                    Roll Key
                  </button>
                  {apiKey.type === 'live' && (
                    <button className='text-sm font-bold text-red-500 hover:text-red-600 transition-colors ml-auto'>
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Webhooks Section */}
        <section className='flex flex-col gap-5 mt-5'>
          <div className='flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700'>
            <div className='flex items-center gap-2'>
              <span className='material-symbols-outlined text-primary'>
                webhook
              </span>
              <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
                Webhook Endpoints
              </h3>
            </div>
            <button className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'>
              <span className='material-symbols-outlined text-[18px]'>add</span>
              Add Endpoint
            </button>
          </div>
          <div className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700'>
                <tr>
                  <th className='px-6 py-3 font-semibold text-slate-500 dark:text-slate-400'>
                    Endpoint URL
                  </th>
                  <th className='px-6 py-3 font-semibold text-slate-500 dark:text-slate-400'>
                    Events
                  </th>
                  <th className='px-6 py-3 font-semibold text-slate-500 dark:text-slate-400'>
                    Status
                  </th>
                  <th className='px-6 py-3 font-semibold text-slate-500 dark:text-slate-400 text-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
                {webhooks.map((webhook) => (
                  <tr
                    key={webhook.id}
                    className='group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors'
                  >
                    <td className='px-6 py-4 font-mono text-slate-700 dark:text-slate-300'>
                      {webhook.url}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-2'>
                        {webhook.events[0] === '*' ? (
                          <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'>
                            *
                          </span>
                        ) : (
                          <>
                            <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
                              {webhook.events[0]}
                            </span>
                            {webhook.events.length > 1 && (
                              <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'>
                                +{webhook.events.length - 1} more
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          className='sr-only peer'
                          checked={webhook.isActive}
                          onChange={() => {}}
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button className='text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'>
                        <span className='material-symbols-outlined text-[20px]'>
                          more_horiz
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Risk & Business Rules Section */}
        <section className='flex flex-col gap-5 mt-5'>
          <div className='flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700'>
            <div className='flex items-center gap-2'>
              <span className='material-symbols-outlined text-primary'>
                tune
              </span>
              <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
                Risk Thresholds
              </h3>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Slider Card */}
            <div className='md:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h4 className='font-bold text-slate-900 dark:text-white text-base'>
                    Fraud Score Sensitivity
                  </h4>
                  <p className='text-sm text-slate-500 mt-1'>
                    Transactions with a score above this value will be
                    automatically blocked.
                  </p>
                </div>
                <div className='bg-primary/10 text-primary px-3 py-1 rounded-lg font-mono font-bold text-lg'>
                  {fraudScore}
                </div>
              </div>
              <div className='relative w-full h-12 flex items-center mb-4'>
                <div className='w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative'>
                  <div
                    className='absolute left-0 top-0 bottom-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full opacity-80'
                    style={{ width: `${fraudScore}%` }}
                  ></div>
                </div>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={fraudScore}
                  onChange={(e) => setFraudScore(parseInt(e.target.value))}
                  className='absolute w-full h-full opacity-0 cursor-pointer z-10'
                />
                <div
                  className='absolute w-6 h-6 bg-white dark:bg-slate-800 border-4 border-primary rounded-full shadow-lg pointer-events-none'
                  style={{
                    left: `${fraudScore}%`,
                    transform: 'translateX(-50%)',
                  }}
                ></div>
              </div>
              <div className='flex justify-between text-xs font-medium text-slate-400 uppercase tracking-wider'>
                <span>Accept All</span>
                <span>Strict</span>
              </div>
            </div>

            {/* Quick Toggles */}
            <div className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col justify-between'>
              <h4 className='font-bold text-slate-900 dark:text-white text-base mb-4'>
                Auto-Decline Rules
              </h4>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-700 dark:text-slate-300'>
                    High Velocity IP
                  </span>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      className='sr-only peer'
                      checked={autoDeclineRules.highVelocityIp}
                      onChange={() => handleRuleToggle('highVelocityIp')}
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-700 dark:text-slate-300'>
                    Anonymous Proxy
                  </span>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      className='sr-only peer'
                      checked={autoDeclineRules.anonymousProxy}
                      onChange={() => handleRuleToggle('anonymousProxy')}
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-slate-700 dark:text-slate-300'>
                    Missing Billing Zip
                  </span>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      className='sr-only peer'
                      checked={autoDeclineRules.missingBillingZip}
                      onChange={() => handleRuleToggle('missingBillingZip')}
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Preview (Brief) */}
        <section className='flex flex-col gap-5 mt-5'>
          <div className='flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700'>
            <div className='flex items-center gap-2'>
              <span className='material-symbols-outlined text-primary'>
                admin_panel_settings
              </span>
              <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
                Authorized Admins
              </h3>
            </div>
            <a
              className='text-primary text-sm font-bold hover:underline'
              href='#'
            >
              Manage Team
            </a>
          </div>
          <div className='flex gap-4 overflow-x-auto pb-2'>
            {adminUsers.map((user) => (
              <div
                key={user.id}
                className='flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 min-w-[240px]'
              >
                <div
                  className='w-10 h-10 rounded-full bg-cover bg-center'
                  style={{ backgroundImage: `url(${user.avatar})` }}
                  aria-label={`Avatar of ${user.name}`}
                ></div>
                <div>
                  <p className='text-sm font-bold text-slate-900 dark:text-white'>
                    {user.name}
                  </p>
                  <p className='text-xs text-slate-500'>{user.role}</p>
                </div>
              </div>
            ))}
            <button className='flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary text-slate-500 hover:text-primary transition-colors min-w-[150px] justify-center text-sm font-bold'>
              <span className='material-symbols-outlined'>add</span>
              Add User
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className='mt-8 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/10 p-6'>
          <h3 className='text-lg font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2'>
            <span className='material-symbols-outlined'>warning</span>
            Danger Zone
          </h3>
          <p className='text-sm text-slate-600 dark:text-slate-400 mb-6'>
            Irreversible actions that affect your entire workspace. Please
            proceed with caution.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-lg border border-red-100 dark:border-red-900/30'>
            <div>
              <h4 className='font-bold text-slate-900 dark:text-white text-sm'>
                Reset API Keys
              </h4>
              <p className='text-xs text-slate-500'>
                Revoke all active API keys immediately.
              </p>
            </div>
            <button className='px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg text-sm font-bold transition-colors'>
              Reset Keys
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
