// src/mocks/handlers.ts
import {
  rest,
  RestRequest,
  ResponseComposition,
  DefaultBodyType,
  RestContext,
} from 'msw';

interface Merchant {
  id: string;
  name: string;
  initials: string;
  region: string;
  riskScore: number;
  volume: string;
  chargebackRatio: string;
  status: 'high' | 'medium' | 'low';
}

export const handlers = [
  rest.get(
    '/api/analytics',
    (
      _req: RestRequest,
      res: ResponseComposition<DefaultBodyType>,
      ctx: RestContext
    ) => {
      return res(
        ctx.json({
          totalVolume: 1250000,
          fraudRate: 1.2,
          preventedLosses: 25000,
          topMerchants: [
            {
              id: '1',
              name: 'Test Merchant',
              initials: 'TM',
              region: 'na',
              riskScore: 85,
              volume: '$50,000',
              chargebackRatio: '2.5',
              status: 'high' as const,
            },
          ],
          fraudTrends: [],
          fraudByMethod: [
            { name: 'Credit Card', amount: 5000, percentage: 60 },
            { name: 'Bank Transfer', amount: 2500, percentage: 30 },
            { name: 'Crypto', amount: 500, percentage: 10 },
          ],
        })
      );
    }
  ),
  rest.get(
    '/api/merchants',
    (
      req: RestRequest,
      res: ResponseComposition<DefaultBodyType>,
      ctx: RestContext
    ) => {
      const page = Number(req.url.searchParams.get('page')) || 1;
      const pageSize = Number(req.url.searchParams.get('pageSize')) || 10;

      return res(
        ctx.json({
          items: [
            {
              id: '1',
              name: 'Test Merchant',
              initials: 'TM',
              region: 'na',
              riskScore: 85,
              volume: '$50,000',
              chargebackRatio: '2.5',
              status: 'high' as const,
            },
          ],
          pagination: {
            page,
            pageSize,
            totalItems: 1,
            totalPages: 1,
          },
        })
      );
    }
  ),
];
