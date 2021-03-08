// entrypoint for the application
import 'raf/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { registerServiceWorker } from './utils/registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { createApolloClient } from './utils/apollo/createApolloClient';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { resolvers } from './resolvers/resolvers';
import { loader } from 'graphql.macro';
import { defaults } from './defaults/defaults';
import App from './App';
import './index.css';
import blueGrey from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/blue';
import 'typeface-oswald';
import 'typeface-anton';
import GilroyRegular from './fonts/Gilroy-Regular.WOFF';
import GilroyBold from './fonts/Gilroy-Bold.WOFF';
import GilroyLight from './fonts/Gilroy-Light.WOFF';

const apolloClient = createApolloClient({
  typeDefs: loader('./types/schema.graphql'),
  resolvers,
  defaults
});

const gilroy = [
  {
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 300,
    src: `url(${GilroyLight}) format('woff')`
  },
  {
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `url(${GilroyRegular}) format('woff')`
  },
  {
    fontFamily: 'Gilroy',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 700,
    src: `url(${GilroyBold}) format('woff')`
  }
];

const theme = responsiveFontSizes(
  createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': gilroy
        }
      },
      MuiButton: {
        // root: {
        //   fontWeight: 700
        // }
      },
      MuiTypography: {
        button: {
          fontWeight: 700
        },
        h1: {
          fontWeight: 700
        },
        h2: {
          fontWeight: 700
        },
        h3: {
          fontWeight: 700
        },
        h4: {
          fontWeight: 700
        },
        h5: {
          fontWeight: 700
        },
        h6: {
          fontWeight: 700
        }
      }
    },
    typography: {
      fontFamily: 'Gilroy'
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 960,
        xl: 1280
      }
    },
    drawer: {
      width: 320
    },
    mainMenu: {
      width: 220
    },
    filterSheet: {
      big: 280,
      small: 240
    },
    palette: {
      primary: blueGrey,
      secondary: orange
      // primary: {
      //   main: '#E33E7F'
      // },
      // secondary: {
      //   main: '#FFFFFF'
      // },
      // button: {
      //   white: '#FFFFFF'
      // }
    }
  })
);

render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
