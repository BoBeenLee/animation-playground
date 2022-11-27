import Flicking from '@egjs/react-flicking';
import styles from './scroll-press-center.module.css';
import '@egjs/react-flicking/dist/flicking.css';
import { useCallback, useRef } from 'react';

interface Item {
  id: string;
  value: string;
}

export interface ScrollPressCenterProps {
  items: Item[];
}

export function ScrollPressCenter(props: ScrollPressCenterProps) {
  const { items } = props;
  const flickingRef = useRef<Flicking>(null);
  const isMove = useRef(false);

  const onSelected = useCallback((index: number) => {
    return async () => {
      if (isMove.current) {
        return;
      }
      isMove.current = true;
      await flickingRef.current?.moveTo(index).catch(() => void 0);
      isMove.current = false;
    };
  }, []);

  return (
    <Flicking ref={flickingRef} preventClickOnDrag={false} align="center">
      {items.map((item, i) => (
        <div key={item.id} className={styles['item']} onClick={onSelected(i)}>
          {item.value}{' '}
        </div>
      ))}
    </Flicking>
  );
}

export default ScrollPressCenter;
