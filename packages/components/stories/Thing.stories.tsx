import React from 'react';

import { withSmartKnobs } from 'storybook-addon-smart-knobs';
import { withKnobs } from '@storybook/addon-knobs';
import { Thing, Props } from '../src';

export default {
  title: 'Welcome',
  decorators: [withSmartKnobs, withKnobs],
  component: 'Thing',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<Props>) => <Thing {...props} />;
