import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Icons
import {
  FiArrowLeft,
  FiCopy,
  FiShare2,
  FiCheck,
  FiAlertCircle,
  FiMail,
} from 'react-icons/fi';
import { BsCreditCard } from 'react-icons/bs';
import { FaRegFlag, FaRegClock } from 'react-icons/fa';
import { BiBrain, BiTrendingUp, BiWorld, BiDevices } from 'react-icons/bi';
import { IoMdPricetag } from 'react-icons/io';
import { RiSecurePaymentLine } from 'react-icons/ri';
// import { AiOutlineGlobal, AiOutlineMobile } from 'react-icons/ai';

// Define types for our transaction data
type PaymentMethod = {
  type: string;
  last4?: string; // Make last4 optional since not all payment methods have it
};

type Transaction = {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
  riskScore: number;
  method: PaymentMethod;
  ipAddress: string;
  deviceId: string;
  customer: {
    name: string;
    email: string;
    status: string;
  };
  merchant: {
    name: string;
    category: string;
    location: string;
  };
  location: {
    lat: number;
    lng: number;
    country: string;
    city: string;
  };
  timeline: Array<{
    time: string;
    event: string;
  }>;
};

// Mock data for demonstration
const mockTransactions: Record<string, Transaction> = {
  'TRX-9982-AB': {
    id: 'TRX-9982-AB',
    date: 'Oct 24, 2023 14:32',
    amount: 4250.0,
    currency: 'USD',
    status: 'High Risk',
    riskScore: 88,
    method: { type: 'Mastercard', last4: '4242' },
    ipAddress: '192.158.1.38',
    deviceId: 'iPhone13,4_iOS16.2',
    customer: {
      name: 'John Doe',
      email: 'john.d@example.com',
      status: 'Verified',
    },
    merchant: {
      name: 'Apple Store #402',
      category: 'Electronics & Digital Goods',
      location: 'San Francisco, CA',
    },
    location: {
      lat: 37.7749,
      lng: -122.4194,
      country: 'United States',
      city: 'San Francisco',
    },
    timeline: [
      { time: '14:28:01', event: 'Successful Login' },
      { time: '14:30:15', event: 'Cart Updated (2 Items)' },
      { time: '14:32:01', event: 'Checkout Attempt (Flagged)' },
    ],
  },
  'TRX-9981-AC': {
    id: 'TRX-9981-AC',
    date: 'Oct 24, 2023 14:28',
    amount: 342.5,
    currency: 'USD',
    status: 'Medium Risk',
    riskScore: 45,
    method: { type: 'PayPal' },
    ipAddress: '192.158.1.39',
    deviceId: 'MacBookPro15,1_macOS13.2',
    customer: {
      name: 'Jane Smith',
      email: 'jane.s@example.com',
      status: 'Verified',
    },
    merchant: {
      name: 'Urban Styles',
      category: 'Fashion & Apparel',
      location: 'Toronto, Canada',
    },
    location: {
      lat: 43.6532,
      lng: -79.3832,
      country: 'Canada',
      city: 'Toronto',
    },
    timeline: [
      { time: '14:25:30', event: 'Session Started' },
      { time: '14:27:15', event: 'Browsing Products' },
      { time: '14:28:45', event: 'Checkout Completed' },
    ],
  },
};

const TransactionDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams<{ transactionId: string }>();
  const transaction = transactionId ? mockTransactions[transactionId] : null;

  if (!transaction) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>
            404 - Transaction Not Found
          </h1>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            The transaction you're looking for doesn't exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-background-light dark:bg-background-dark min-h-screen'>
      {/* Top Navigation / Breadcrumbs */}
      <div className='w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-darker'>
        <div className='px-6 py-4 max-w-[1600px] mx-auto'>
          <div className='flex items-center gap-2 text-sm'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors'
            >
              <FiArrowLeft className='text-lg' />
              Back to Transactions
            </button>
            <span className='text-slate-400 dark:text-slate-600'>/</span>
            <span className='text-slate-900 dark:text-white font-medium'>
              {transaction.id}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='px-6 py-8 max-w-[1600px] mx-auto w-full'>
        {/* Page Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <h1 className='text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>
                Transaction #{transaction.id}
              </h1>
              <span className='hidden sm:inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-bold text-red-500 ring-1 ring-inset ring-red-500/20 uppercase tracking-wider'>
                High Risk
              </span>
            </div>
            <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm'>
              <FaRegClock className='text-sm' />
              <span>Flagged 2 mins ago</span>
              <span className='text-slate-300 dark:text-slate-700'>•</span>
              <span>Suspicious Activity Detected</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button className='flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-semibold'>
              <FiCopy className='text-lg' />
              <span>Copy ID</span>
            </button>
            <button className='flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-semibold'>
              <FiShare2 className='text-lg' />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
          {/* Column 1: Transaction Info */}
          <div className='xl:col-span-4 flex flex-col gap-6'>
            {/* Main Details Card */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'>
              <div className='px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-white/5'>
                <h3 className='text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider'>
                  Transaction DNA
                </h3>
                <RiSecurePaymentLine className='text-slate-400' />
              </div>
              <div className='p-0'>
                {/* Amount Highlight */}
                <div className='flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-900/20'>
                  <div>
                    <p className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide'>
                      Total Amount
                    </p>
                    <p className='text-2xl font-bold text-slate-900 dark:text-white mt-1'>
                      $
                      {transaction.amount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      <span className='text-sm font-normal text-slate-500 dark:text-slate-400'>
                        {transaction.currency}
                      </span>
                    </p>
                  </div>
                  <div className='h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400'>
                    <IoMdPricetag className='text-xl' />
                  </div>
                </div>
                {/* Data Grid */}
                <div className='grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-700'>
                  <div className='grid grid-cols-2 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                    <div className='text-sm text-slate-500 dark:text-slate-400'>
                      Date & Time
                    </div>
                    <div className='text-sm font-medium text-slate-900 dark:text-white text-right'>
                      {transaction.date}
                    </div>
                  </div>
                  <div className='grid grid-cols-2 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                    <div className='text-sm text-slate-500 dark:text-slate-400'>
                      Method
                    </div>
                    <div className='text-sm font-medium text-slate-900 dark:text-white text-right flex items-center justify-end gap-2'>
                      <BsCreditCard className='text-blue-500' />
                      {transaction.method.type}
                      {transaction.method.type}
                      {transaction.method.last4
                        ? ` •••• ${transaction.method.last4}`
                        : ''}
                    </div>
                  </div>
                  <div className='grid grid-cols-2 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                    <div className='text-sm text-slate-500 dark:text-slate-400'>
                      IP Address
                    </div>
                    <div className='text-sm font-medium text-slate-900 dark:text-white text-right font-mono'>
                      {transaction.ipAddress}
                    </div>
                  </div>
                  <div className='grid grid-cols-2 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                    <div className='text-sm text-slate-500 dark:text-slate-400'>
                      Device ID
                    </div>
                    <div className='text-sm font-medium text-slate-900 dark:text-white text-right font-mono text-xs truncate pl-4'>
                      {transaction.deviceId}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Entity Cards */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-5 flex flex-col gap-4'>
              <h4 className='text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1'>
                Entities
              </h4>

              {/* Customer */}
              <div className='flex items-start gap-4 p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-700/50'>
                <div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm'>
                  JD
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-bold text-slate-900 dark:text-white truncate'>
                    {transaction.customer.name}
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400 truncate'>
                    {transaction.customer.email}
                  </p>
                  <div className='flex items-center gap-1 mt-1'>
                    <span className='w-2 h-2 rounded-full bg-green-500'></span>
                    <span className='text-[10px] uppercase text-slate-400 font-bold'>
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Merchant */}
              <div className='flex items-start gap-4 p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-700/50'>
                <div className='h-10 w-10 rounded-lg bg-white flex items-center justify-center p-1'>
                  <span className='text-2xl'>🍏</span>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-bold text-slate-900 dark:text-white truncate'>
                    {transaction.merchant.name}
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400 truncate'>
                    {transaction.merchant.category}
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
                    {transaction.merchant.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'>
              <div
                className='w-full h-48 bg-slate-800 relative bg-cover bg-center'
                style={{
                  backgroundImage:
                    'url(https://maps.googleapis.com/maps/api/staticmap?center=37.7749,-122.4194&zoom=13&size=600x300&maptype=roadmap&key=YOUR_API_KEY)',
                }}
              >
                <div className='absolute inset-0 bg-slate-900/40'></div>
                {/* Ping Animation */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <span className='relative flex h-4 w-4'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-slate-900'></span>
                  </span>
                </div>
                <div className='absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-mono'>
                  Lat: 37.7749 N | Long: 122.4194 W
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: AI Analysis */}
          <div className='xl:col-span-4 flex flex-col gap-6'>
            {/* Risk Score Card */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-6 relative'>
              <div className='absolute top-0 right-0 p-4'>
                <div className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20'>
                  <BiBrain className='text-sm' />
                  PayShield AI
                </div>
              </div>
              <h3 className='text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6'>
                Risk Assessment
              </h3>
              <div className='flex flex-col items-center justify-center mb-6'>
                {/* Gauge Meter */}
                <div className='relative w-48 h-24 overflow-hidden mb-2'>
                  <div className='absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-slate-200 dark:border-slate-700 box-border'></div>
                  <div
                    className='absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-red-500 border-b-transparent border-r-transparent border-l-transparent box-border'
                    style={{
                      transform: 'rotate(45deg)',
                      borderLeftColor: 'transparent',
                      borderBottomColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderTopColor: '#ef4444',
                      clipPath: 'polygon(50% 50%, 0 0, 100% 0)',
                    }}
                  ></div>
                  <svg
                    className='absolute top-0 left-0 w-full h-full'
                    preserveAspectRatio='none'
                    viewBox='0 0 200 100'
                  >
                    <path
                      className='text-slate-200 dark:text-slate-700'
                      d='M 20 100 A 80 80 0 0 1 180 100'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='20'
                    ></path>
                    <path
                      d='M 20 100 A 80 80 0 0 1 180 100'
                      fill='none'
                      stroke='#ef4444'
                      strokeDasharray='251.2'
                      strokeDashoffset='30'
                      strokeLinecap='round'
                      strokeWidth='20'
                    ></path>
                  </svg>
                </div>
                <div className='text-center -mt-6'>
                  <div className='text-5xl font-black text-slate-900 dark:text-white tracking-tight'>
                    88
                    <span className='text-2xl text-slate-400 font-normal'>
                      /100
                    </span>
                  </div>
                  <p className='text-red-500 font-bold text-sm uppercase tracking-widest mt-1'>
                    Critical Risk
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between text-xs font-medium'>
                    <span className='text-slate-500 dark:text-slate-400'>
                      Model Confidence
                    </span>
                    <span className='text-slate-900 dark:text-white'>
                      99.2%
                    </span>
                  </div>
                  <div className='w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5'>
                    <div
                      className='bg-blue-500 h-1.5 rounded-full'
                      style={{ width: '99.2%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contributing Factors */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-0 overflow-hidden'>
              <div className='px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-white/5'>
                <h3 className='text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider'>
                  Explainable AI Factors
                </h3>
              </div>
              <div className='p-4 flex flex-col gap-3'>
                {/* Factor 1 */}
                <div className='group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-help border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50'>
                  <div className='mt-1'>
                    <BiTrendingUp className='text-red-500 text-lg' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex justify-between items-center mb-1'>
                      <p className='text-sm font-bold text-slate-900 dark:text-white'>
                        Velocity Spike
                      </p>
                      <span className='text-xs font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded'>
                        +20 Risk
                      </span>
                    </div>
                    <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed'>
                      5th transaction attempt in 10 minutes from same device.
                      Exceeds user average of 2/day.
                    </p>
                  </div>
                </div>

                {/* Factor 2 */}
                <div className='group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-help border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50'>
                  <div className='mt-1'>
                    <BiWorld className='text-orange-500 text-lg' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex justify-between items-center mb-1'>
                      <p className='text-sm font-bold text-slate-900 dark:text-white'>
                        Geofencing Mismatch
                      </p>
                      <span className='text-xs font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded'>
                        +15 Risk
                      </span>
                    </div>
                    <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed'>
                      IP Address locates to Russia, but billing address is
                      United States (San Francisco).
                    </p>
                  </div>
                </div>

                {/* Factor 3 */}
                <div className='group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-help border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50'>
                  <div className='mt-1'>
                    <BiDevices className='text-blue-500 text-lg' />
                  </div>
                  <div className='flex-1'>
                    <div className='flex justify-between items-center mb-1'>
                      <p className='text-sm font-bold text-slate-900 dark:text-white'>
                        New Device
                      </p>
                      <span className='text-xs font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded'>
                        +5 Risk
                      </span>
                    </div>
                    <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed'>
                      First time this device fingerprint has been seen for this
                      account ID.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Timeline */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-5'>
              <h3 className='text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4'>
                Event Timeline
              </h3>
              <div className='relative pl-2'>
                {/* Vertical Line */}
                <div className='absolute top-2 left-[7px] h-[85%] w-[2px] bg-slate-200 dark:bg-slate-700'></div>
                <div className='flex flex-col gap-6'>
                  {/* Event 1 */}
                  <div className='relative flex gap-4 items-start pl-6'>
                    <div className='absolute left-0 top-1 h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 z-10'></div>
                    <div>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mb-0.5'>
                        14:28:01
                      </p>
                      <p className='text-sm font-medium text-slate-900 dark:text-white'>
                        Successful Login
                      </p>
                    </div>
                  </div>
                  {/* Event 2 */}
                  <div className='relative flex gap-4 items-start pl-6'>
                    <div className='absolute left-0 top-1 h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 z-10'></div>
                    <div>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mb-0.5'>
                        14:30:15
                      </p>
                      <p className='text-sm font-medium text-slate-900 dark:text-white'>
                        Cart Updated (2 Items)
                      </p>
                    </div>
                  </div>
                  {/* Event 3 */}
                  <div className='relative flex gap-4 items-start pl-6'>
                    <div className='absolute left-0 top-1 h-4 w-4 rounded-full bg-red-500/20 border-2 border-red-500 z-10'></div>
                    <div>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mb-0.5'>
                        14:32:01
                      </p>
                      <p className='text-sm font-bold text-red-500'>
                        Checkout Attempt (Flagged)
                      </p>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mt-1 italic'>
                        Triggered Rule #409: High Velocity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Actions */}
          <div className='xl:col-span-4 flex flex-col gap-6'>
            {/* Action Buttons */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-6'>
              <h3 className='text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4'>
                Analyst Decision
              </h3>
              <div className='flex flex-col gap-3'>
                <button className='w-full group relative flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white rounded-lg p-4 transition-all shadow-lg shadow-red-900/20'>
                  <FaRegFlag />
                  <span className='font-bold'>Confirm Fraud</span>
                  <span className='absolute right-4 text-xs opacity-60 font-normal hidden group-hover:block'>
                    Reject & Block
                  </span>
                </button>
                <div className='grid grid-cols-2 gap-3'>
                  <button className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 transition-colors font-semibold'>
                    <FiCheck className='text-lg' />
                    Approve
                  </button>
                  <button className='flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg p-3 transition-colors font-semibold'>
                    <FiAlertCircle className='text-lg' />
                    Escalate
                  </button>
                </div>
              </div>
            </div>

            {/* Notes Input */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col'>
              <div className='px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between'>
                <h3 className='text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider'>
                  Case Notes
                </h3>
                <span className='text-xs text-slate-500 dark:text-slate-400'>
                  Markdown supported
                </span>
              </div>
              <div className='p-4 flex-1 flex flex-col gap-4'>
                <textarea
                  className='w-full flex-1 min-h-[140px] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none'
                  placeholder="Add your investigation notes here... e.g. 'Customer confirmed transaction via phone call.'"
                ></textarea>
                <div className='flex justify-end'>
                  <button className='bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-bold transition-colors'>
                    Save Note
                  </button>
                </div>
              </div>
            </div>

            {/* History Log */}
            <div className='rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden'>
              <div className='px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-white/5'>
                <h3 className='text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider'>
                  Activity Log
                </h3>
              </div>
              <div className='max-h-[300px] overflow-y-auto no-scrollbar'>
                <div className='flex flex-col divide-y divide-slate-200 dark:divide-slate-700'>
                  {/* Log Item 1 */}
                  <div className='p-4 flex gap-3 text-sm'>
                    <div className='w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0'>
                      <span className='font-bold text-xs text-slate-600 dark:text-slate-300'>
                        JS
                      </span>
                    </div>
                    <div>
                      <p className='text-slate-900 dark:text-white font-medium'>
                        Jane Smith{' '}
                        <span className='text-slate-500 font-normal'>
                          viewed this transaction
                        </span>
                      </p>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mt-0.5'>
                        Just now
                      </p>
                    </div>
                  </div>

                  {/* Log Item 2 */}
                  <div className='p-4 flex gap-3 text-sm'>
                    <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0'>
                      <BiBrain className='text-purple-400 text-sm' />
                    </div>
                    <div>
                      <p className='text-slate-900 dark:text-white font-medium'>
                        System{' '}
                        <span className='text-slate-500 font-normal'>
                          flagged as High Risk
                        </span>
                      </p>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mt-0.5'>
                        2 mins ago
                      </p>
                    </div>
                  </div>

                  {/* Log Item 3 */}
                  <div className='p-4 flex gap-3 text-sm'>
                    <div className='w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0'>
                      <FiMail className='text-slate-500 text-sm' />
                    </div>
                    <div>
                      <p className='text-slate-900 dark:text-white font-medium'>
                        System{' '}
                        <span className='text-slate-500 font-normal'>
                          sent verification email
                        </span>
                      </p>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mt-0.5'>
                        5 mins ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionDetailPage;
