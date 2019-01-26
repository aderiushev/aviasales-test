import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Icon from './index';

storiesOf('Components|Elements/Icon', module)
  .addDecorator(story => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 50,
        backgroundColor: '#113e72',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {story()}
    </div>
  ))
  .add('search', () => <Icon onClick={action('onClick')} name="search" />)
  .add('desktop', () => <Icon onClick={action('onClick')} name="desktop" />)
  .add('messages', () => <Icon onClick={action('onClick')} name="messages" />)
  .add('user', () => <Icon onClick={action('onClick')} name="user" />)
  .add('maximize', () => <Icon onClick={action('onClick')} name="maximize" />)
  .add('minimize', () => <Icon onClick={action('onClick')} name="minimize" />)
  .add('minimize-light', () => (
    <Icon onClick={action('onClick')} name="minimize-light" />
  ))
  .add('delete', () => <Icon onClick={action('onClick')} name="delete" />)
  .add('arrows', () => (
    <div>
      <IoIosArrowBack size={20} color="#8a919a" />
      <IoIosArrowForward size={20} color="#8a919a" />
    </div>
  ));
