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

import dataProvider from '@pankod/refine-simple-rest';
import routerProvider from '@pankod/refine-react-router-v6';
import { MuiInferencer } from '@pankod/refine-inferencer/mui';

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
              list: MuiInferencer,
              create: MuiInferencer,
              show: MuiInferencer,
              edit: MuiInferencer,
            },
          ]}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
