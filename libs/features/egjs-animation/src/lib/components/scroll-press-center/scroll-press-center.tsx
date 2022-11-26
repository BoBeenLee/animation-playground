import Flicking from '@egjs/react-flicking';
import styles from './scroll-press-center.module.css';
import '@egjs/react-flicking/dist/flicking.css';
import { useCallback, useRef } from "react";

interface Item {
  id: string;
  value: string;
}

export interface ScrollPressCenterProps {
  items: Item[];
}

export function ScrollPressCenter(props: ScrollPressCenterProps) {
  const { items } = props
  const flickingRef = useRef<Flicking>(null)
  


  const onSelected = useCallback((index: number) => {
    return () => {
      console.log(index)
      flickingRef.current?.moveTo(index, 100).catch((e) => {
        // NOTHING
      })
    };
  }, []);

  return (
    <Flicking
      ref={flickingRef}
      align="center"
    >
       {items.map((item, i) => (
          <div
            key={item.id}
            className={styles['item']}
            onClick={onSelected(i)}
          >
            {item.value}{' '}
          </div>
        ))}
    </Flicking>
  );
}

export default ScrollPressCenter;
