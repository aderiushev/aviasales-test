import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './style.less';

export default class Icon extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
    name: PropTypes.string,
    style: PropTypes.shape(),
  };

  static defaultProps = {
    onClick: () => {},
    isActive: false,
    name: '',
    style: {},
  };

  state = {
    isHovered: false,
  };

  onMouseOver = () => {
    this.setState({
      isHovered: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      isHovered: false,
    });
  };

  onClick = (e) => {
    const { onClick } = this.props;

    e.preventDefault();
    onClick();
  };

  onFocus = () => {};

  render() {
    const { name, style, isActive } = this.props;
    const { isHovered } = this.state;
    const iconClickedClass = cn({
      '-active': isHovered || isActive,
    });

    return (
      <i
        role="button"
        tabIndex={0}
        style={style}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
        onFocus={this.onFocus}
        className={cn(styles.Icon, styles.Icon_margin)}
      >
        <div
          className={cn(
            styles[`Icon_${name}`],
            styles[iconClickedClass],
            styles.Icon_size,
          )}
        />
      </i>
    );
  }
}
