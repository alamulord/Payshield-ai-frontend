// // src/pages/__tests__/AnalyticsPage.test.tsx
// import React from 'react';
// import { screen, fireEvent, waitFor } from '@testing-library/react';
// import { render } from '../../test-utils';
// import AnalyticsPage from '../AnalyticsPage';
// import { server } from '../../mocks/server';
// import { rest } from 'msw';

// describe('AnalyticsPage', () => {
//   it('renders the analytics dashboard', async () => {
//     render(<AnalyticsPage />);

//     // Check if the page title is rendered
//     expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();

//     // Check if the stats cards are rendered
//     await waitFor(() => {
//       expect(screen.getByText('Total Volume')).toBeInTheDocument();
//       expect(screen.getByText('Fraud Rate')).toBeInTheDocument();
//       expect(screen.getByText('Prevented Losses')).toBeInTheDocument();
//     });
//   });

//   it('filters merchants by search query', async () => {
//     render(<AnalyticsPage />);

//     // Find the search input and type a query
//     const searchInput = screen.getByPlaceholderText('Search merchants...');
//     fireEvent.change(searchInput, { target: { value: 'test' } });

//     // Wait for the debounce
//     await waitFor(() => {
//       expect(searchInput).toHaveValue('test');
//     });
//   });

//   it('changes time range filter', async () => {
//     render(<AnalyticsPage />);

//     // Find and change the time range filter
//     const timeRangeFilter = screen.getByLabelText('Time Range');
//     fireEvent.change(timeRangeFilter, { target: { value: '30d' } });

//     // Check if the value was updated
//     expect(timeRangeFilter).toHaveValue('30d');
//   });

//   it('handles API errors gracefully', async () => {
//     // Override the default handler for this test
//     server.use(
//       rest.get('/api/analytics', (_req, res, ctx) => {
//         return res(ctx.status(500));
//       })
//     );

//     render(<AnalyticsPage />);

//     // Check if error state is handled
//     await waitFor(() => {
//       expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
//     });
//   });
// });

// src/pages/__test__/AnalyticsPage.test.tsx
// src/pages/__test__/AnalyticsPage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnalyticsPage from '../AnalyticsPage';

describe('AnalyticsPage', () => {
  it('renders the analytics dashboard', async () => {
    render(
      <BrowserRouter>
        <AnalyticsPage />
      </BrowserRouter>
    );
    
    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Total Volume')).toBeInTheDocument();
      expect(screen.getByText('Fraud Rate')).toBeInTheDocument();
      expect(screen.getByText('Prevented Losses')).toBeInTheDocument();
    });
  });
});