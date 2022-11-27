import { Story, Meta } from '@storybook/react';
import { ScrollPressCenter, ScrollPressCenterProps } from './scroll-press-center';
import ScrollSample from "./scroll-sample";
import styles from './scroll-press-center.module.css';
import { action } from "@storybook/addon-actions";

export default {
  component: ScrollPressCenter,
  title: 'ScrollPressCenter',
  argTypes: {},
} as Meta;

const items = Array(100).fill('').map((_, index) => {
  return {
    id: `${index}`,
    value: `item${index}`,
  }
})



const Template: Story<ScrollPressCenterProps> = (args) => <ScrollPressCenter {...args}>
  {items.map((item, i) => (
    <div
      key={item.id}
      className={styles['item']}
      onClick={action("onClickItem")}
    >
      {item.value}{' '}
    </div>
  ))}
</ScrollPressCenter>;

export const Primary = Template.bind({});
Primary.args = {};


const Template2: Story = (args) => <ScrollSample {...args} items={items} />;

export const Sample = Template2.bind({});
Sample.args = {};