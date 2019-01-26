import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './style.less';
import {PERIODS} from "../../../constants";

class Toolbar extends Component {
  static propTypes = {
    selectedPeriod: PropTypes.oneOf([PERIODS.TODAY, PERIODS.LAST_3_DAYS, PERIODS.LAST_HOUR, PERIODS.YESTERDAY]),
    onNavigate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedPeriod: PERIODS.TODAY
  };

  render() {
    const { selectedPeriod, onNavigate } = this.props;

    return (
      <div className={styles.Toolbar}>
        <div
          className={cn({ [styles.Toolbar__item]: true, [styles.Toolbar__item_selected]: selectedPeriod === PERIODS.LAST_HOUR })}
          onClick={() => onNavigate(PERIODS.LAST_HOUR)}
        >
          Last hour
        </div>
        <div
          className={cn({ [styles.Toolbar__item]: true, [styles.Toolbar__item_selected]: selectedPeriod === PERIODS.TODAY })}
          onClick={() => onNavigate(PERIODS.TODAY)}
        >
          Today
        </div>
        <div
          className={cn({ [styles.Toolbar__item]: true, [styles.Toolbar__item_selected]: selectedPeriod === PERIODS.YESTERDAY })}
          onClick={() => onNavigate(PERIODS.YESTERDAY)}
        >
          Yesterday
        </div>
        <div
          className={cn({ [styles.Toolbar__item]: true, [styles.Toolbar__item_selected]: selectedPeriod === PERIODS.LAST_3_DAYS })}
          onClick={() => onNavigate(PERIODS.LAST_3_DAYS)}
        >
          Last 3 days
        </div>
      </div>
    );
  }
}

export default withRouter(Toolbar);
