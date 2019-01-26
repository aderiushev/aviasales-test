/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.less';
import {formatNumber} from "../../../utils/format";

export default class Badge extends Component {
  static propTypes = {
    classes: PropTypes.shape(),
    type: PropTypes.oneOf(['success', 'error']),
  };

  static defaultProps = {
    classes: {
      root: null,
    },
  };

  render() {
    const { children, type, classes } = this.props;

    return (
      <div className={cn(styles.Badge, styles[`Badge_${type}`], classes.root)}>
        {children}
      </div>
    );
  }
}
