import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Number from './index';

storiesOf('Components|Elements/Number', module).add(
  'default',
  withInfo()(() => <Number>29387</Number>),
);
