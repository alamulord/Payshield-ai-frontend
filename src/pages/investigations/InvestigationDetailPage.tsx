import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../hooks/useApi';
import payshieldApi from '../../services/api/payshieldApi';

// Types
type TimelineEvent = {
  id: string;
  time?: string;
  title?: string;
  description?: string;
  type?: 'high' | 'medium' | 'low' | string;
  timestamp?: string;
  action?: string;
  user?: string;
  details?: string;
};

type FraudSignal = {
  id: string;
  title: string;
  description: string;
  risk: 'high' | 'medium' | 'low';
  timestamp: string;
};

type Transaction = {
  id: string;
  amount: number;
  currency: string;
  merchant: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
};

type Note = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
};

const InvestigationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [decision, setDecision] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch real data
  const { data: invData, loading, refetch } = useInvestigation(id || '');

  // Map API data to component structure, using fallbacks for things not yet in the backend schema
  const caseData = {
    id: invData?.case_id || id || '8291-XJ',
    title: invData?.title || 'High Velocity Transfer - User 49201',
    status: invData?.status || 'open',
    riskScore: invData?.severity === 'high' ? 88 : invData?.severity === 'medium' ? 65 : 30,
    user: {
      id: 'user-49201',
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, US',
      accountCreated: '2022-03-15',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    transactions: [
      {
        id: 'txn-001',
        amount: 1250,
        currency: 'USD',
        merchant: 'TechStore Pro',
        timestamp: '2023-11-15T14:32:10Z',
        status: 'completed',
      },
      {
        id: 'txn-002',
        amount: 3499,
        currency: 'USD',
        merchant: 'ElectroWorld',
        timestamp: '2023-11-15T14:35:22Z',
        status: 'pending',
      },
    ] as Transaction[],
    timeline: (invData?.timeline || []) as TimelineEvent[],
    fraudSignals: [
      {
        id: 'signal-1',
        title: 'Velocity Exceeded',
        description: 'Transaction amount 3x higher than usual',
        risk: 'high',
        timestamp: '2023-11-15T14:35:22Z',
      },
      {
        id: 'signal-2',
        title: 'New IP Address',
        description: 'First time from this location',
        risk: 'medium',
        timestamp: '2023-11-15T14:20:15Z',
      },
    ] as FraudSignal[],
    notes: (invData?.notes ? [{
      id: 'note-1',
      author: 'System Analyst',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: invData.notes,
      timestamp: invData.updated_at,
    }] : []) as Note[],
  };

  const handleSubmitDecision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !invData?.id) return;
    try {
      setIsSubmitting(true);
      await payshieldApi.submitVerdict(invData.id, { verdict: decision, notes: note });
      await refetch();
      // Optional: navigate back or show success message
      navigate(-1);
    } catch (err) {
      console.error('Failed to submit verdict', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden'>
      {/* Header */}
      <div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Case #{caseData.id}
            </h1>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {caseData.title}
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                caseData.riskScore > 70
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  : caseData.riskScore > 40
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              }`}
            >
              Risk: {caseData.riskScore}/100
            </span>
            <button
              onClick={() => navigate(-1)}
              className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
            >
              Back to Cases
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-hidden'>
        <div className='h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-y-auto'>
          {/* Left Column */}
          <div className='space-y-6 lg:col-span-2'>
            {/* User Card */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-start space-x-4'>
                  <img
                    src={caseData.user.avatar}
                    alt={caseData.user.name}
                    className='w-16 h-16 rounded-full border-2 border-primary-500'
                  />
                  <div className='flex-1'>
                    <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                      {caseData.user.name}
                    </h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      {caseData.user.email} • {caseData.user.phone}
                    </p>
                    <div className='mt-2 flex flex-wrap gap-2'>
                      <span className='px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded'>
                        {caseData.user.location}
                      </span>
                      <span className='px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded'>
                        Member since{' '}
                        {new Date(
                          caseData.user.accountCreated
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Timeline */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Case Timeline
                </h3>
                <div className='space-y-6'>
                  {caseData.timeline.map((event, index) => (
                    <div
                      key={event.id || index}
                      className='relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0'
                    >
                      <div className='absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center'>
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      </div>
                      <div className='flex items-start'>
                        <div className='text-sm font-medium text-gray-500 dark:text-gray-400 w-16'>
                          {event.time || (event.timestamp ? new Date(event.timestamp as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
                        </div>
                        <div className='ml-4'>
                          <h4 className='text-sm font-semibold text-gray-900 dark:text-white'>
                            {event.title || (event as any).action}
                          </h4>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {event.description || (event as any).details}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Linked Transactions */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Linked Transactions
                  </h3>
                  <button className='text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'>
                    View All
                  </button>
                </div>
                <div className='space-y-4'>
                  {caseData.transactions.map((txn) => (
                    <div
                      key={txn.id}
                      className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg'
                    >
                      <div>
                        <p className='text-sm font-medium text-gray-900 dark:text-white'>
                          {txn.merchant}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          {new Date(txn.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: txn.currency,
                          }).format(txn.amount)}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            txn.status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : txn.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {txn.status.charAt(0).toUpperCase() +
                            txn.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-6'>
            {/* Fraud Signals */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Fraud Signals
                </h3>
                <div className='space-y-4'>
                  {caseData.fraudSignals.map((signal) => (
                    <div
                      key={signal.id}
                      className='p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30'
                    >
                      <div className='flex items-start'>
                        <div className='flex-shrink-0'>
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              signal.risk === 'high'
                                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                : signal.risk === 'medium'
                                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            }`}
                          >
                            <span className='material-symbols-outlined text-lg'>
                              {signal.risk === 'high'
                                ? 'warning'
                                : signal.risk === 'medium'
                                ? 'info'
                                : 'check_circle'}
                            </span>
                          </div>
                        </div>
                        <div className='ml-3'>
                          <h4 className='text-sm font-medium text-gray-900 dark:text-white'>
                            {signal.title}
                          </h4>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {signal.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='p-4'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                  Location
                </h3>
                <div className='bg-gray-100 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center'>
                  <span className='text-gray-400 dark:text-gray-500'>
                    Map visualization here
                  </span>
                </div>
                <div className='mt-3 text-sm text-gray-500 dark:text-gray-400'>
                  <p>IP: 192.168.1.1 • New York, US</p>
                  <p>Device: iPhone 13 • iOS 16.2</p>
                </div>
              </div>
            </div>

            {/* Submit Decision */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Submit Decision
                </h3>
                <form onSubmit={handleSubmitDecision} className='space-y-4'>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Decision
                    </label>
                    <div className='space-y-2'>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          name='decision'
                          value='safe'
                          checked={decision === 'safe'}
                          onChange={(e) => setDecision(e.target.value)}
                          className='h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600'
                        />
                        <span className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                          Safe - Approve transaction
                        </span>
                      </label>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          name='decision'
                          value='fraud'
                          checked={decision === 'fraud'}
                          onChange={(e) => setDecision(e.target.value)}
                          className='h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600'
                        />
                        <span className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                          Confirm Fraud - Block and flag
                        </span>
                      </label>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          name='decision'
                          value='info'
                          checked={decision === 'info'}
                          onChange={(e) => setDecision(e.target.value)}
                          className='h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 dark:border-gray-600'
                        />
                        <span className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                          Request More Information
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='notes'
                      className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                    >
                      Notes
                    </label>
                    <textarea
                      id='notes'
                      rows={3}
                      className='shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      placeholder='Add any additional notes...'
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                  <div className='flex justify-end'>
                    <button
                      type='submit'
                      className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={!decision || isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Decision'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Analyst Notes */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Analyst Notes
                </h3>
                <div className='space-y-4'>
                  {caseData.notes.map((note) => (
                    <div key={note.id} className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                        <img
                          src={note.avatar}
                          alt={note.author}
                          className='h-8 w-8 rounded-full'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 dark:text-white'>
                          {note.author}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          {new Date(note.timestamp).toLocaleString()}
                        </p>
                        <p className='text-sm text-gray-700 dark:text-gray-300 mt-1'>
                          {note.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className='mt-4'>
                    <div className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://randomuser.me/api/portraits/men/32.jpg'
                          alt='User avatar'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='relative rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm overflow-hidden'>
                          <label htmlFor='new-note' className='sr-only'>
                            Add a note
                          </label>
                          <textarea
                            rows={2}
                            name='new-note'
                            id='new-note'
                            className='block w-full py-3 px-4 resize-none border-0 focus:ring-0 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                            placeholder='Add a note...'
                          />
                          <div className='py-2 px-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end'>
                            <button
                              type='button'
                              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationDetailPage;
