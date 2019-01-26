/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import  {formatNumber } from '../../../utils/format';

import styles from './style.less';

export default class CustomNumber extends Component {
  static propTypes = {
    classes: PropTypes.shape(),
    postfix: PropTypes.string,
    precision: PropTypes.number,
  };

  static defaultProps = {
    classes: {
      root: null,
    },
    postfix: '',
    precision: 2,
    size: 16
  };

  render() {
    const { children, classes, postfix, precision, size } = this.props;

    const value = formatNumber(children, precision);

    return (
      <div className={cn(styles.Number, classes.root)} style={{ fontSize: `${size}px`}}>
        {Number.isNaN(value) ? '–' : `${value}${postfix}`}
      </div>
    );
  }
}
