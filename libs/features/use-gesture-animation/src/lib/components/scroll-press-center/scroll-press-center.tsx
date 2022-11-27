import { useSpring, animated } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './scroll-press-center.module.css';

interface Item {
  id: string;
  value: string;
}

export interface ScrollPressCenterProps {
  items: Item[];
}

export function ScrollPressCenter(props: ScrollPressCenterProps) {
  const { items } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  const innerRef = useRef<HTMLDivElement | null>(0);

  const childrenRefs = useRef<(HTMLDivElement | null)[]>(Array(items.length));

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));


  const offsetRef = useRef(0)

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [x, y], direction: [dx] }) => {
        const leftBound = offsetRef.current + -x <= 0;
        const rightBound = offsetRef.current + -x > (innerRef.current?.scrollWidth ?? 0);
        console.log("onDrag", offsetRef.current, x, leftBound, rightBound, innerRef.current?.scrollWidth)

        if(leftBound) {
          offsetRef.current = 0;
          api.start({ x: offsetRef.current });
          return;
        }
        if(rightBound) {
          offsetRef.current = (innerRef.current?.scrollWidth ?? 0);
          api.start({ x: offsetRef.current });
          return;
        }
        offsetRef.current += x
        api.start({ x: offsetRef.current });
      },
      onWheel: ({ event, movement: [x, y], direction: [dx] }) => {
        const leftBound = -offsetRef.current + x <= 0;
        const rightBound = -offsetRef.current + x > (innerRef.current?.scrollWidth ?? 0)
        console.log("onWheel", offsetRef.current, x, leftBound, rightBound, innerRef.current?.scrollWidth)

        if(leftBound) {
          offsetRef.current = 0;
          api.start({ x: offsetRef.current });
          return;
        }
        if(rightBound) {
          offsetRef.current = (innerRef.current?.scrollWidth ?? 0);
          api.start({ x: offsetRef.current });
          return;
        }
        offsetRef.current += -x
        api.start({ x: offsetRef.current });
      },
    },
    {
      drag: {
        axis: 'x',
      },
      wheel: {
        axis: 'x',
      },
    }
  );

  // const wheelOffset = useRef(0)
  // const dragOffset = useRef(0)

  // useGesture(
  //   {
  //     onDrag: ({ event, offset: [x], direction: [dx] }) => {
  //       event.preventDefault()
  //       if (dx) {
  //         dragOffset.current = -x
  //         runSprings(wheelOffset.current + -x, -dx)
  //       }
  //     },
  //     onWheel: ({ event, offset: [, y], direction: [, dy] }) => {
  //       event.preventDefault()
  //       if (dy) {
  //         wheelOffset.current = y
  //         runSprings(dragOffset.current + y, dy)
  //       }
  //     },
  //   },
  //   { ref, wheel: { eventOptions: { passive: false } } }
  // )

  // scroll width, element width,
  const onSelected = useCallback((index: number) => {
    return (e: any) => {
      e.preventDefault();
      console.log(index, childrenRefs.current[index]?.offsetLeft);
    };
  }, []);

  // FIXME https://codesandbox.io/s/github/pmndrs/use-gesture/tree/main/demo/src/sandboxes/infinite-slideshow?file=/src/Slider.jsx:1271-1279
  return (
    <div ref={ref} className={styles['wrap']}>
      <animated.div
        {...bind()}
        ref={innerRef}
        style={{ x, y, touchAction: 'none' }}
        className={styles['inner']}
      >
        {items.map((item, i) => (
          <div
            ref={(el) => {
              childrenRefs.current[i] = el;
            }}
            key={item.id}
            className={styles['item']}
            onClick={onSelected(i)}
          >
            {item.value}{' '}
          </div>
        ))}
      </animated.div>
    </div>
  );
}

export default ScrollPressCenter;
