import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.less';
import Icon from "../../elements/icon";
import Number from "../../elements/number";

class ErrorStat extends Component {
  static propTypes = {
    data: PropTypes.shape().isRequired,
  };

  render() {
    const { data } = this.props;

    const errorsCount = {
      500: data.code.find(item => item.code === 500) ? data.code.find(item => item.code === 500).count : 0,
      501: data.code.find(item => item.code === 501) ? data.code.find(item => item.code === 501).count : 0,
      502: data.code.find(item => item.code === 502) ? data.code.find(item => item.code === 502).count : 0,
      other: data.code.filter(item => ![500, 501, 502].includes(item.code)).reduce((curr, next) => (curr + next.count), 0)
    };

    const totalErrorsCount = data.code.reduce((curr, next) => (curr + next.count), 0);

    const codeErrorPercentage = {
      500: (errorsCount['500'] * 100) / totalErrorsCount,
      501: (errorsCount['501'] * 100) / totalErrorsCount,
      502: (errorsCount['502'] * 100) / totalErrorsCount,
      other: (errorsCount['other'] * 100) / totalErrorsCount,
    };

    return (
      <div className={styles.ErrorStat}>
        <div className={cn(styles.ErrorStat__common, styles.CommonStat)}>
          <div className={cn(styles.CommonStatItem, styles.CommonStat__item)}>
            <div className={styles.CommonStatItem__icon}>
              {data.type.error.total < 5
                ?
                  <Icon name="greenCircle" />
                :
                  <Icon name="redCircle" />
              }
            </div>
            <div className={styles.CommonStatContent}>
              <div className={styles.CommonStatContent__title}>
                Errors:&nbsp;<Number precision={2} postfix={'%'}>{data.type.error.total}</Number>
              </div>
              <div className={styles.CommonStatContent__subtitle}>
                Average:&nbsp;<Number precision={2} postfix={'%'}>{data.type.error.average}</Number>
              </div>
            </div>
          </div>

          <div className={cn(styles.CommonStatItem, styles.CommonStat__item)}>
            <div className={styles.CommonStatItem__icon}>
              {data.type.zeroes.total < 5
                ?
                <Icon name="greenCircle" />
                :
                <Icon name="redCircle" />
              }
            </div>
            <div className={styles.CommonStatContent}>
              <div className={styles.CommonStatContent__title}>
                Zeroes:&nbsp;<Number precision={2} postfix={'%'}>{data.type.zeroes.total}</Number>
              </div>
              <div className={styles.CommonStatContent__subtitle}>
                Average:&nbsp;<Number precision={2} postfix={'%'}>{data.type.zeroes.average}</Number>
              </div>
            </div>
          </div>

          <div className={cn(styles.CommonStatItem, styles.CommonStat__item)}>
            <div className={styles.CommonStatItem__icon}>
              {data.type.timeout.total < 5
                ?
                <Icon name="greenCircle" />
                :
                <Icon name="redCircle" />
              }
            </div>
            <div className={styles.CommonStatContent}>
              <div className={styles.CommonStatContent__title}>
                Timeouts:&nbsp;<Number precision={2} postfix={'%'}>{data.type.timeout.total}</Number>
              </div>
              <div className={styles.CommonStatContent__subtitle}>
                Average:&nbsp;<Number precision={2} postfix={'%'}>{data.type.timeout.average}</Number>
              </div>
            </div>
          </div>
        </div>

        <div className={cn(styles.ErrorStat__line, styles.LineStat)}>
          <div className={styles.LineStat__item} style={{ backgroundColor: '#FFCC00', width: `${codeErrorPercentage['500']}%` }} />
          <div className={styles.LineStat__item} style={{ backgroundColor: '#5856D5', width: `${codeErrorPercentage['501']}%`}} />
          <div className={styles.LineStat__item} style={{ backgroundColor: '#2196F3', width: `${codeErrorPercentage['502']}%` }} />
          <div className={styles.LineStat__item} style={{ backgroundColor: '#A0B0B9', width: `${codeErrorPercentage['other']}%` }} />
        </div>

        <div className={cn(styles.ErrorStat__count, styles.CountStat)}>
          <div className={cn(styles.CountStatItem, styles.CountStat__item)}>
            <Icon name="yellowSquare" /> Error 500: {errorsCount['500']}
          </div>
          <div className={cn(styles.CountStatItem, styles.CountStat__item)}>
            <Icon name="purpleSquare" /> Error 501: {errorsCount['501']}
          </div>
          <div className={cn(styles.CountStatItem, styles.CountStat__item)}>
            <Icon name="blueSquare" /> Error 502: {errorsCount['502']}
          </div>
          <div className={cn(styles.CountStatItem, styles.CountStat__item)}>
            <Icon name="graySquare" /> Other: {errorsCount['other']}
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorStat;
