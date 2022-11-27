import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  ScrollPressCenter: {
    color: 'pink',
  },
});

export interface ScrollPressCenterProps {}

export function ScrollPressCenter(props: ScrollPressCenterProps) {
  return <Text style={styles.ScrollPressCenter}>hello world</Text>;
}

export default ScrollPressCenter;
