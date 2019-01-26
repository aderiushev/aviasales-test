/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.less';
import {formatNumber} from "../../../utils/format";

export default class Link extends Component {
  static propTypes = {
    classes: PropTypes.shape(),
  };

  static defaultProps = {
    classes: {
      root: null,
    },
  };

  render() {
    const { children, classes, ...restProps } = this.props;

    return (
      <a className={cn(styles.Link, classes.root)} {...restProps}>
        {children}
      </a>
    );
  }
}
