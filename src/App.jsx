import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BaseLayout } from './components/BaseLayout';
import { Provider } from 'react-redux';
import store from './store/store';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';
import { Home } from './screens/Home';
import { TreePage } from './screens/Tree';
import { AdminList } from './screens/AdminList';
import { AdminForm } from './screens/AdminForm';
import { SolicitationForm } from './screens/SolicitationForm';
import { SolicitationList } from './screens/SolicitationList';
import { PhotoPage } from './screens/PhotoPage';

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppContainer>
          <Router>
            <BaseLayout>
              <Switch>
                <Route path="/list" component={AdminList} />
                <Route path="/tree" component={TreePage} />
                <Route path="/add" component={AdminForm} />
                <Route path="/solicitation-list" component={SolicitationList} />
                <Route path="/solicitation-form" component={SolicitationForm} />
                <Route path="/image-list" component={PhotoPage} />

                <Route path="/" component={Home} />
              </Switch>
            </BaseLayout>
          </Router>
        </AppContainer>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
