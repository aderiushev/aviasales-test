import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Toolbar from './../../components/blocks/toolbar'
import ErrorStat from './../../components/blocks/error-stat';
import WebStat from './../../components/blocks/web-stat';
import { actions as dashboardActions } from '../../store/dashboard';
import { PERIODS } from "../../constants";

import styles from './style.less';

const enhance = connect(
  (state, ownProps) => ({
    dashboard: state.dashboard,
    period: ownProps.match.params.period,
  }),

  dispatch => ({
    dashboardActions: bindActionCreators(dashboardActions, dispatch),
  }),
);

class Dashboard extends Component {
  static propTypes = {
    period: PropTypes.oneOf([PERIODS.TODAY, PERIODS.LAST_3_DAYS, PERIODS.LAST_HOUR, PERIODS.YESTERDAY]),
  };

  static defaultProps = {
    period: PERIODS.TODAY,
  };

  async componentWillMount() {
    const { dashboardActions } = this.props;

    await dashboardActions.fetchDashboard();
  }

  render() {
    const { dashboard, period, history } = this.props;

    if (dashboard.fetching || dashboard.fetching === null) {
      return 'Loading...';
    }

    const periodErrors = dashboard.data.errors[period];
    const periodStats = dashboard.data.stats[period];

    return (
      <div className={styles.DashboardWrapper}>
        <div className={styles.Dashboard}>
          <div className={styles.Title}>Main Metrics</div>

          <div className={styles.Dashboard__toolbar}>
            <Toolbar
              selectedPeriod={period}
              onNavigate={period => history.push(`/dashboard/${period}`)}
            />
          </div>

          <div className={styles.Dashboard__errors}>
            <ErrorStat data={periodErrors} />
          </div>

          <div className={styles.Dashboard__web}>
            <WebStat data={periodStats} />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(enhance(Dashboard));
