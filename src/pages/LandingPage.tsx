// src/pages/LandingPage.tsx
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import '../styles/global.css';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('Risk Analysts');

  const tabContent = {
    'Risk Analysts': {
      title: 'Empowering Your Risk Team',
      description:
        'Reduce manual review time by 40% with explainable AI scores that tell you exactly why a transaction was flagged. No more black boxes.',
      features: [
        {
          icon: 'psychology',
          title: 'Explainable AI Scores',
          description:
            'Clear reasoning codes (e.g., "Device Mismatch", "Abnormal Velocity") for every score.',
        },
        {
          icon: 'rule',
          title: 'Automated Workflows',
          description:
            'Trigger automatic blocks, 3DS challenges, or manual reviews based on custom logic.',
        },
      ],
      cta: 'Learn about our Risk Engine',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    'Compliance Officers': {
      title: 'Compliance Without the Headache',
      description:
        'Automate regulatory adherence with built-in audit trails and one-click reporting. Stay ahead of GDPR, CCPA, and SOC2 requirements effortlessly.',
      features: [
        {
          icon: 'fact_check',
          title: 'Automated Reporting',
          description:
            'Generate comprehensive SARS and fraud reports for regulators instantly.',
        },
        {
          icon: 'history_edu',
          title: 'Full Audit Trails',
          description:
            'Immutable logs of every rule change, decision, and user access event.',
        },
      ],
      cta: 'View Compliance Tools',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    Administrators: {
      title: 'Enterprise-Grade Control',
      description:
        'Manage your entire fraud prevention infrastructure from one place. Configure API keys, manage team roles, and monitor model performance in real-time.',
      features: [
        {
          icon: 'admin_panel_settings',
          title: 'Role-Based Access',
          description:
            'Granular permissions (RBAC) to secure sensitive data and configurations.',
        },
        {
          icon: 'settings_input_component',
          title: 'Easy Integrations',
          description: 'Webhooks, API keys, and SDK management dashboard.',
        },
      ],
      cta: 'Explore Admin Console',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
  };

  const currentTab = tabContent[activeTab as keyof typeof tabContent];

  return (
    <>
      <Header />
      <div className='bg-background-light dark:bg-background-dark text-gray-900 dark:text-white antialiased overflow-x-hidden'>
        {/* Hero Section */}

        <section className='relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32'>
          <div className='px-4 md:px-40 flex flex-1 justify-center'>
            <div className='flex flex-col max-w-[1200px] flex-1'>
              <div className='@container'>
                <div className='flex flex-col gap-10 lg:flex-row items-center'>
                  <div className='flex flex-col gap-6 flex-1 text-center lg:text-left'>
                    <div className='flex flex-col gap-4'>
                      <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold w-fit mx-auto lg:mx-0'>
                        <span className='relative flex h-2 w-2'>
                          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
                          <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
                        </span>
                        New: Graph Network Analysis v2.0
                      </div>
                      <h1 className='text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-gray-900 dark:text-white'>
                        Stop Payment Fraud in
                        <span className='text-primary'> Real-Time</span> with
                        Enterprise AI
                      </h1>
                      <h2 className='text-gray-600 dark:text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0'>
                        PayShield AI protects your revenue and reputation with
                        millisecond threat detection, reducing false positives
                        and ensuring compliance effortlessly.
                      </h2>
                    </div>
                    <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
                      <Button
                        as={Link}
                        to='/demo'
                        variant='primary'
                        className='h-12 px-6 rounded-lg bg-primary dark:bg-surface-blue dark:text-gray-200 text-base font-bold dark:hover:text-blue-100 transition-all shadow-[0_0_20px_rgba(20,75,184,0.3)] hover:shadow-[0_0_25px_rgba(20,75,184,0.5)]'
                      >
                        Book a Demo
                      </Button>

                      <Button
                        as={Link}
                        to='/docs'
                        variant='outline'
                        className='h-12 px-6 rounded-lg bg-gray-200 dark:bg-surface-dark text-gray-900 dark:text-white border border-gray-300 dark:border-border-dark text-base font-bold hover:bg-gray-300 dark:hover:bg-border-dark transition-colors'
                      >
                        View Documentation
                      </Button>
                    </div>
                    <div className='pt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='material-symbols-outlined text-lg text-green-500'>
                        check_circle
                      </span>
                      <span>SOC2 Type II Certified</span>
                      <span className='mx-2'>•</span>
                      <span className='material-symbols-outlined text-lg text-green-500'>
                        check_circle
                      </span>
                      <span>99.99% Uptime SLA</span>
                    </div>
                  </div>

                  <div className='w-full lg:w-1/2 flex justify-center lg:justify-end relative'>
                    <div className='absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 z-0'></div>
                    <div
                      aria-label='Abstract 3D network visualization with glowing nodes in blue and teal connecting data points'
                      className='relative z-10 w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-border-dark bg-surface-dark group'
                      role='img'
                    >
                      <div
                        className='absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700'
                        data-alt='Abstract 3D network visualization with glowing nodes in blue and teal connecting data points'
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjdEgokT2ynCURpJ7wuwOlPz3q0VfWOQri8juxBF70WJQRqa3SJ32TgZwtWZOd9nuRvTh5eCxjh6VigprzHurE8iod1ggo50FFm1AQotqeo_z--awtK8vVYr4IvtjQuURF9dc-azMJG3OT4_wfG7YT8I-YsiLtQfs2hm7szgFwGV78uubJcDLMp4RjIK4dKhjenb2DWrDHAJ3WfbIQiBrUAKPcxaE3SpQttWpJ_uH9Kr7o_LvlaHt9f2E0pGpj9MNZPrWXTXMkDeps")',
                        }}
                      ></div>
                      <div className='absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent'></div>

                      <div className='absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-background-dark/90 backdrop-blur border border-border-dark shadow-lg'>
                        <div className='flex items-center justify-between mb-2'>
                          <span className='text-xs font-semibold text-gray-400 uppercase'>
                            Threat Detected
                          </span>
                          <span className='px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400'>
                            HIGH RISK
                          </span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='size-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500'>
                            <span className='material-symbols-outlined text-lg'>
                              warning
                            </span>
                          </div>
                          <div>
                            <p className='text-sm font-bold text-white'>
                              Suspicious IP Velocity
                            </p>
                            <p className='text-xs text-gray-400'>
                              Score: 98/100 • Blocked automatically
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}

        <section className='py-10 border-y border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-surface-dark/50'>
          <div className='px-4 md:px-40 flex flex-col items-center gap-6'>
            <p className='text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center'>
              Trusted by forward-thinking financial institutions
            </p>
            <div className='flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500'>
              <div className='text-xl font-bold font-display text-gray-800 dark:text-white flex items-center gap-2'>
                <span className='material-symbols-outlined'>
                  account_balance
                </span>
                BankCorp
              </div>
              <div className='text-xl font-bold font-display text-gray-800 dark:text-white flex items-center gap-2'>
                <span className='material-symbols-outlined'>payments</span>{' '}
                FlexPay
              </div>
              <div className='text-xl font-bold font-display text-gray-800 dark:text-white flex items-center gap-2'>
                <span className='material-symbols-outlined'>trending_up</span>
                InvestFlow
              </div>
              <div className='text-xl font-bold font-display text-gray-800 dark:text-white flex items-center gap-2'>
                <span className='material-symbols-outlined'>security</span>{' '}
                SecureNet
              </div>
              <div className='text-xl font-bold font-display text-gray-800 dark:text-white flex items-center gap-2'>
                <span className='material-symbols-outlined'>
                  currency_bitcoin
                </span>
                ChainSafe
              </div>
            </div>
          </div>
        </section>

        <section itemID='features' className='py-20 lg:py-32' id='features'>
          <div className='px-4 md:px-40 flex justify-center'>
            <div className='flex flex-col max-w-[960px] flex-1'>
              <div className='flex flex-col gap-16'>
                <div className='flex flex-col md:flex-row gap-8 justify-between items-start md:items-end'>
                  <div className='flex flex-col gap-4 max-w-2xl'>
                    <h2 className='text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white'>
                      The Fraud Landscape is Evolving
                    </h2>
                    <p className='text-gray-600 dark:text-gray-400 text-lg'>
                      Traditional rules-based systems can't keep up with
                      sophisticated cybercriminal networks. PayShield AI bridges
                      the gap with adaptive machine learning.
                    </p>
                  </div>
                  <Link
                    to='/register'
                    className='text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all'
                  >
                    View all features
                    <span className='material-symbols-outlined text-sm'>
                      arrow_forward
                    </span>
                  </Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <div className='group flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-colors'>
                    <div className='size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
                      <span className='material-symbols-outlined text-3xl'>
                        bolt
                      </span>
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                        Real-Time Detection
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                        Analyze transactions in under 100ms with &lt;1% latency
                        impact. Don't let security slow down your user
                        experience.
                      </p>
                    </div>
                  </div>

                  <div className='group flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-colors'>
                    <div className='size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
                      <span className='material-symbols-outlined text-3xl'>
                        fingerprint
                      </span>
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                        Behavioral Biometrics
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                        Detect bot attacks by analyzing typing patterns, mouse
                        movements, and device interactions unique to humans.
                      </p>
                    </div>
                  </div>

                  <div className='group flex flex-col gap-4 p-6 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 transition-colors'>
                    <div className='size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
                      <span className='material-symbols-outlined text-3xl'>
                        hub
                      </span>
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                        Graph Network Analysis
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                        Uncover hidden relationships between accounts to spot
                        organized crime rings and synthetic identities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          className='py-20 bg-gray-50 dark:bg-dark/30 border-y border-gray-200 dark:border-border-dark'
          id='roles'
        >
          <div className='px-4 md:px-40 flex justify-center'>
            <div className='flex flex-col max-w-[960px] flex-1'>
              <div className='mb-12'>
                <h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-8'>
                  Built for your entire team
                </h2>
                <div className='flex overflow-x-auto border-b border-gray-200 dark:border-border-dark gap-8 justify-center'>
                  {[
                    'Risk Analysts',
                    'Compliance Officers',
                    'Administrators',
                  ].map((role) => (
                    <button
                      key={role}
                      onClick={() => setActiveTab(role)}
                      className={`group flex flex-col items-center justify-center min-w-fit px-4 pb-4 border-b-[3px] transition-all ${
                        activeTab === role
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      <span className='text-sm font-bold tracking-wide'>
                        {role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className='flex flex-col lg:flex-row gap-12 items-center'>
                <div className='flex flex-col gap-6 flex-1'>
                  <h3 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white'>
                    {currentTab.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 text-base leading-relaxed'>
                    {currentTab.description}
                  </p>
                  <div className='flex flex-col gap-4 mt-4'>
                    {currentTab.features.map((feature, index) => (
                      <div
                        key={index}
                        className='flex gap-4 p-4 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark'
                      >
                        <span className='material-symbols-outlined text-primary text-2xl'>
                          {feature.icon}
                        </span>
                        <div>
                          <h4 className='font-bold text-gray-900 dark:text-white'>
                            {feature.title}
                          </h4>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='mt-4'>
                    <button className='flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all'>
                      {currentTab.cta}
                      <span className='material-symbols-outlined text-sm'>
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
                <div className='w-full lg:w-1/2 flex flex-col gap-4'>
                  <div className='relative rounded-xl overflow-hidden border border-gray-200 dark:border-border-dark shadow-2xl'>
                    <img
                      src={currentTab.image}
                      alt={activeTab}
                      className='w-full h-auto object-cover aspect-video'
                      onError={(e) => {
                        // Fallback image in case the main image fails to load
                        e.currentTarget.src =
                          'https://via.placeholder.com/800x450?text=Image+Not+Found';
                        e.currentTarget.alt = 'Fallback image';
                      }}
                    />
                    <div className='absolute bottom-0 left-0 right-0 bg-background-dark/90 backdrop-blur-sm p-4 border-t border-border-dark'>
                      <div className='flex justify-between items-center text-xs'>
                        <div className='text-gray-400'>
                          {activeTab === 'Risk Analysts' ? (
                            <>
                              Transaction ID:{' '}
                              <span className='text-white'>TX-9821-A</span>
                            </>
                          ) : activeTab === 'Compliance Officers' ? (
                            <div className='flex items-center gap-2'>
                              <span className='material-symbols-outlined text-green-500 text-sm'>
                                check_circle
                              </span>
                              Audit Log Exported
                            </div>
                          ) : (
                            <div className='text-gray-400'>System Status</div>
                          )}
                        </div>
                        {activeTab === 'Risk Analysts' ? (
                          <div className='flex gap-2'>
                            <button className='bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30'>
                              Reject
                            </button>
                            <button className='bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30'>
                              Approve
                            </button>
                          </div>
                        ) : activeTab === 'Administrators' ? (
                          <div className='flex items-center gap-2 text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20'>
                            <span className='relative flex h-2 w-2'>
                              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                              <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
                            </span>
                            All Systems Operational
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='py-20'>
          <div className='px-4 md:px-40 flex justify-center'>
            <div className='flex flex-col max-w-[960px] flex-1'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200 dark:divide-border-dark'>
                <div className='flex flex-col gap-2'>
                  <h4 className='text-4xl font-black text-primary'>$50B+</h4>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>
                    Processed Annually
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <h4 className='text-4xl font-black text-primary'>~40%</h4>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>
                    Drop in Manual Review
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <h4 className='text-4xl font-black text-primary'>
                    &lt;100ms
                  </h4>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>
                    API Response Time
                  </p>
                </div>
                <div className='flex flex-col gap-2'>
                  <h4 className='text-4xl font-black text-primary'>0%</h4>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>
                    Data Breaches
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='py-20 relative overflow-hidden'>
          <div className='absolute inset-0 bg-primary/10 dark:bg-primary/5'></div>
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent'></div>
          <div className='relative px-4 md:px-40 flex justify-center z-10'>
            <div className='flex flex-col max-w-[800px] flex-1 text-center gap-8'>
              <h2 className='text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight'>
                Ready to secure your payments?
              </h2>
              <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                Join hundreds of enterprises that trust PayShield AI to stop
                fraud without stopping legitimate customers.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <Button
                  as={Link}
                  to='/register'
                  className='h-12 min-w-[160px] px-6 rounded-lg dark:bg-primary dark:text-white dark:text-base font-bold hover:bg-blue-700 transition-all shadow-lg dark:hover:text-blue-100 hover:shadow-primary/50'
                >
                  Get Started
                </Button>
                <button className='h-12 min-w-[160px] px-6 rounded-lg bg-white dark:bg-background-dark text-gray-900 dark:text-white border border-gray-200 dark:border-border-dark text-base font-bold hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors'>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='bg-white dark:bg-background-dark border-t border-gray-200 dark:border-border-dark p-20'>
          <div className='px-4 md:px-40 flex justify-center'>
            <div className='flex flex-col max-w-[960px] flex-1 gap-12'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                <div className='col-span-2 md:col-span-1 flex flex-col gap-4'>
                  <div className='flex items-center gap-2 text-primary dark:text-white'>
                    <span className='material-symbols-outlined text-2xl text-primary'>
                      shield_lock
                    </span>
                    <span className='font-bold text-lg'>PayShield AI</span>
                  </div>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Enterprise-grade payment protection powered by next-gen
                    artificial intelligence.
                  </p>
                </div>
                {[
                  {
                    title: 'Platform',
                    links: [
                      'Fraud Detection',
                      'AML Compliance',
                      'Risk Scoring',
                      'Integrations',
                    ],
                  },
                  {
                    title: 'Company',
                    links: ['About Us', 'Careers', 'Press', 'Contact'],
                  },
                  {
                    title: 'Resources',
                    links: [
                      'Documentation',
                      'API Reference',
                      'Blog',
                      'Case Studies',
                    ],
                  },
                ].map((section) => (
                  <div key={section.title}>
                    <h4 className='font-bold text-gray-900 dark:text-white mb-2'>
                      {section.title}
                    </h4>
                    <ul className='space-y-2'>
                      {section.links.map((link) => (
                        <li key={link}>
                          <a
                            href='#'
                            className='text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors'
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
      <Footer />
    </>
  );
}
