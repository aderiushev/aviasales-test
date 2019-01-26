import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Toolbar from './index';
import '../../../theme/global.less';

storiesOf('Components|Blocks/Toolbar', module)
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
        width: '100%',
      }}
    >
      {story()}
    </div>
  ))
  .add('default', withInfo()(() => <Toolbar />));
