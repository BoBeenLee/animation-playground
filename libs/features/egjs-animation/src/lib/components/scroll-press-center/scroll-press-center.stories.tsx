import { Story, Meta } from '@storybook/react';
import { ScrollPressCenter, ScrollPressCenterProps } from './scroll-press-center';

export default {
  component: ScrollPressCenter,
  title: 'egjs / ScrollPressCenter',
  argTypes: {},
} as Meta;

const Template: Story<ScrollPressCenterProps> = (args) => <ScrollPressCenter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
