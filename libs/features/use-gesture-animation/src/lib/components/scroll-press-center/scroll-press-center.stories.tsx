import { Story, Meta } from '@storybook/react';
import { ScrollPressCenter, ScrollPressCenterProps } from './scroll-press-center';

export default {
  component: ScrollPressCenter,
  title: 'UseGesture / ScrollPressCenter',
  argTypes: {},
} as Meta;

const items = Array(100).fill('').map((_, index) => {
  return {
    id: `${index}`, 
    value: `item${index}`, 
  }
})

const Template: Story<ScrollPressCenterProps> = (args) => <ScrollPressCenter {...args} items={items} />;

export const Primary = Template.bind({});
Primary.args = {};

