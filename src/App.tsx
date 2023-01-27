import React from 'react';

import { Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  Layout,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-mui';

//import dataProvider from '@pankod/refine-simple-rest';

import routerProvider from '@pankod/refine-react-router-v6';
import { MuiInferencer } from '@pankod/refine-inferencer/mui';
import { dataProvider } from 'rest-data-provider';
import { ProductList } from 'pages/products/ProductList';
import { ProductEdit } from 'pages/products/ProductEdit';
import { ProductShow } from 'pages/products/ProductShow';
import { ProductCreate } from 'pages/products/ProductCreate';

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          routerProvider={routerProvider}
          resources={[
            {
              name: 'products',
              list: ProductList,
              create: ProductCreate,
              show: ProductShow,
              edit: ProductEdit,
              canDelete: true,
            },
          ]}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
