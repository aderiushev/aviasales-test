import React, { Component } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.less';
import Icon from "../../elements/icon";
import Number from "../../elements/number";
import Link from "../../elements/link";
import Badge from "../../elements/badge";

class WebStat extends Component {
  static propTypes = {
    data: PropTypes.shape().isRequired,
  };

  render() {
    const { data } = this.props;

    let searchDynamics = {
      isIncreased: null,
      percentage: null,
    };

    let clickDynamics = {
      isIncreased: null,
      percentage: null,
    };

    let bookingDynamics = {
      isIncreased: null,
      percentage: null,
    };

    if (data.searches_current > data.searches_previous) {
      searchDynamics = {
        isIncreased: true,
        percentage: ((data.searches_current - data.searches_previous) * 100) / data.searches_current,
      };
    } else if (data.searches_current < data.searches_previous) {
      searchDynamics = {
        isIncreased: false,
        percentage: ((data.searches_previous - data.searches_current) * 100) / data.searches_current,
      };
    }

    if (data.clicks_current > data.clicks_previous) {
      clickDynamics = {
        isIncreased: true,
        percentage: ((data.clicks_current - data.clicks_previous) * 100) / data.clicks_current,
      };
    } else if (data.clicks_current < data.clicks_previous) {
      clickDynamics = {
        isIncreased: false,
        percentage: ((data.clicks_previous - data.clicks_current) * 100) / data.clicks_current,
      };
    }

    if (data.bookings_current > data.bookings_previous) {
      bookingDynamics = {
        isIncreased: true,
        percentage: ((data.bookings_current - data.bookings_previous) * 100) / data.bookings_current,
      };
    } else if (data.bookings_current < data.bookings_previous) {
      bookingDynamics = {
        isIncreased: false,
        percentage: ((data.bookings_previous - data.bookings_current) * 100) / data.bookings_current,
      };
    }


    return (
      <div className={styles.WebStat}>
        <div className={cn(styles.WebStatItem, styles.WebStat__item)}>
          <div className={cn(styles.Icon, styles.WebStatItem__icon)}>
            <div className={styles.IconStatus}>
              <Icon name="statSearch" />
              <div className={styles.IconStatus__circle}>
                {searchDynamics.isIncreased === true && (
                  <Icon name="greenCircle" />
                )}

                {searchDynamics.isIncreased === false && (
                  <Icon name="redCircle" />
                )}
              </div>
            </div>

            {searchDynamics.isIncreased === true && (
              <Icon name="statArrow" style={{ transform: 'rotate(180deg)'}}/>
            )}
            {searchDynamics.isIncreased === false && (
              <Icon name="statArrow" />
            )}
          </div>
          <div className={cn(styles.Param, styles.WebStatItem__param)}>
            <div className={cn(styles.ParamTitle, styles.Param__line)}>
              <div>Searches</div>
              {searchDynamics.isIncreased === true && (
                <Badge type="success">+<Number postfix={'%'} precision={2} size={12}>{searchDynamics.percentage}</Number></Badge>
              )}
              {searchDynamics.isIncreased === false && (
                <Badge type="error">-<Number postfix={'%'} precision={2} size={12}>{searchDynamics.percentage}</Number></Badge>
              )}
            </div>

            <div className={cn(styles.ValueLine, styles.Param__line)}>
              <Number>{data.searches_current}</Number>
              <div className={styles.Date}>Yesterday</div>
            </div>

            <div className={cn(styles.ValueLine, styles.ValueLine_prev, styles.Param__line)}>
              <Number>{data.searches_previous}</Number>
              <div className={styles.Date}>Last friday</div>
            </div>

          </div>
          <div className={styles.Description}>
            <div className={styles.DescriptionTitle}>
              Mobile traffic:&nbsp;<Number postfix={'%'} precision={0}>{data.mobile_traffic}</Number>
            </div>
            <div className={styles.DescriptionTitle}>
              Web traffic:&nbsp;<Number postfix={'%'} precision={0}>{data.web_traffic}</Number>
            </div>
            {data.mobile_traffic === 100 && data.web_traffic === 100 && (
              <div className={styles.DescriptionMeta}>
                You get 100% traffic on mobile and desktop devices.
              </div>
            )}
            <div className={styles.DescriptionHelp}>
              Help: <Link href="#">Searches</Link>, <Link href="#">Pessimisation</Link>
            </div>
          </div>
        </div>

        <div className={cn(styles.WebStatItem, styles.WebStat__item)}>
          <div className={cn(styles.Icon, styles.WebStatItem__icon)}>
            <div className={styles.IconStatus}>
              <Icon name="statClick" />
              <div className={styles.IconStatus__circle}>
                {clickDynamics.isIncreased === true && (
                  <Icon name="greenCircle" />
                )}

                {clickDynamics.isIncreased === false && (
                  <Icon name="redCircle" />
                )}
              </div>
            </div>
            
            {clickDynamics.isIncreased === true && (
              <Icon name="statArrow" style={{ transform: 'rotate(180deg)'}}/>
            )}
            {clickDynamics.isIncreased === false && (
              <Icon name="statArrow" />
            )}
          </div>
          <div className={cn(styles.Param, styles.WebStatItem__param)}>
            <div className={cn(styles.ParamTitle, styles.Param__line)}>
              <div>Clicks</div>
              {clickDynamics.isIncreased === true && (
                <Badge type="success">+<Number postfix={'%'} precision={2} size={12}>{clickDynamics.percentage}</Number></Badge>
              )}
              {clickDynamics.isIncreased === false && (
                <Badge type="error">-<Number postfix={'%'} precision={2} size={12}>{clickDynamics.percentage}</Number></Badge>
              )}
            </div>

            <div className={cn(styles.ValueLine, styles.Param__line)}>
              <Number>{data.clicks_current}</Number>
              <div className={styles.Date}>Yesterday</div>
            </div>

            <div className={cn(styles.ValueLine, styles.ValueLine_prev, styles.Param__line)}>
              <Number>{data.clicks_previous}</Number>
              <div className={styles.Date}>Last friday</div>
            </div>

          </div>
          <div className={styles.Description}>
            <div className={cn({
              [styles.DescriptionTitle]: true,
              [styles.DescriptionTitle_success]: data.ctr > 2,
              [styles.DescriptionTitle_error]: data.ctr < 1
            })}>
              CTR:&nbsp;<Number postfix={'%'} precision={2}>{data.ctr}</Number>
            </div>
            <div className={styles.DescriptionMeta}>
              Conversion from searches  to clicks on all devices.
            </div>
            <div className={styles.DescriptionHelp}>
              Help: <Link href="#">CTR</Link>, <Link href="#">Clicks</Link>
            </div>
          </div>
        </div>

        <div className={cn(styles.WebStatItem, styles.WebStat__item)}>
          <div className={cn(styles.Icon, styles.WebStatItem__icon)}>
            <div className={styles.IconStatus}>
              <Icon name="statBooking" />
              <div className={styles.IconStatus__circle}>
                {bookingDynamics.isIncreased === true && (
                  <Icon name="greenCircle" />
                )}

                {bookingDynamics.isIncreased === false && (
                  <Icon name="redCircle" />
                )}
              </div>
            </div>

            {bookingDynamics.isIncreased === true && (
              <Icon name="statArrow" style={{ transform: 'rotate(180deg)'}}/>
            )}
            {bookingDynamics.isIncreased === false && (
              <Icon name="statArrow" />
            )}
          </div>
          <div className={cn(styles.Param, styles.WebStatItem__param)}>
            <div className={cn(styles.ParamTitle, styles.Param__line)}>
              <div>Bookings</div>
              {bookingDynamics.isIncreased === true && (
                <Badge type="success">+<Number postfix={'%'} precision={2} size={12}>{bookingDynamics.percentage}</Number></Badge>
              )}
              {bookingDynamics.isIncreased === false && (
                <Badge type="error">-<Number postfix={'%'} precision={2} size={12}>{bookingDynamics.percentage}</Number></Badge>
              )}
            </div>

            <div className={cn(styles.ValueLine, styles.Param__line)}>
              <Number>{data.bookings_current}</Number>
              <div className={styles.Date}>Yesterday</div>
            </div>

            <div className={cn(styles.ValueLine, styles.ValueLine_prev, styles.Param__line)}>
              <Number>{data.bookings_previous}</Number>
              <div className={styles.Date}>Last friday</div>
            </div>

          </div>
          <div className={styles.Description}>
            <div className={styles.DescriptionTitle}>
              STR:&nbsp;<Number postfix={'%'} precision={2}>{data.str}</Number>
            </div>

            <div className={styles.DescriptionTitle}>
              Avg. Check:&nbsp;<Number>{data.avg_price}</Number>
            </div>

            <div className={styles.DescriptionMeta}>
              Conversion from cliks  to bookings on all devices.
            </div>
            <div className={styles.DescriptionHelp}>
              Help: <Link href="#">STR</Link>, <Link href="#">Bookings</Link>, <Link href="#">Avg. Check</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default WebStat;
