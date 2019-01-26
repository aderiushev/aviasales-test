import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Link from './index';

storiesOf('Components|Elements/Link', module).add(
  'default',
  withInfo()(() => <Link href="#">test link</Link>),
);
