import { DHConnectProvider } from '@daohaus/connect';
import { HausThemeProvider } from '@daohaus/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from './Routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    },
  },
});

const UtilityCSS = styled.div`
  .mb-xxl {
    margin-bottom: 6rem;
  }
  .mb-xl {
    margin-bottom: 4rem;
  }
  .mb-lg {
    margin-bottom: 3rem;
  }
  .mb-md {
    margin-bottom: 2rem;
  }
  .mb-sm {
    margin-bottom: 1rem;
  }
  .mb-xs {
    margin-bottom: 0.5rem;
  }
  .bold {
    font-weight: 700;
  }
  .uppercase {
    text-transform: uppercase;
  }
  .tint-secondary {
    color: ${(props) => props.theme.secondary.step9};
  }
  .warning {
    color: ${(props) => props.theme.warning.step11};
  }
  .capitalize {
    text-transform: capitalize;
  }
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <HausThemeProvider>
          <DHConnectProvider>
            <UtilityCSS>
              <Routes />
            </UtilityCSS>
          </DHConnectProvider>
        </HausThemeProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
