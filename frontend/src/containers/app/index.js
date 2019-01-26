/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import connect from 'react-redux/es/connect/connect';
import routes from '../../routes';


class App extends Component {
  static propTypes = {
    history: PropTypes.shape(),
    loading: PropTypes.bool,
    user: PropTypes.shape(),
  };

  static defaultProps = {
    history: {},
    loading: false,
    user: null,
  };

  render() {
    const { loading  } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Switch>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
        <Route path="*" render={() => <Redirect to="/dashboard/today" />} />
      </Switch>
    );
  }
}

export default withRouter(connect(
  state => ({
    history: state.history,
    modal: state.modal,
  }),
  dispatch => ({

  }),
)(App));
