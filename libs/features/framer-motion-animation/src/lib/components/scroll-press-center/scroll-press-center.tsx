import { motion, useAnimation } from 'framer-motion';
import React, { MouseEvent, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './scroll-press-center.module.css';

export interface ScrollPressCenterProps {
  children: ReactElement[];
}

export function ScrollPressCenter(props: ScrollPressCenterProps) {
  const { children } = props;

  const isDragging = useRef(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const innerRef = useRef<HTMLDivElement | null>(null);
  const [innerWidth, setInnerWidth] = useState<number>(0);

  const childrenRefs = useRef<(HTMLElement | null)[]>(Array(children.length));

  const controls = useAnimation()

  useEffect(() => {
    setInnerWidth(innerRef.current?.scrollWidth ?? 0);
  }, [children]);

  const onSelected = useCallback((index: number) => {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      if (isDragging.current) {
        return;
      }
      const wrapWidth = (ref.current?.clientWidth ?? 0);
      const innerScrollWidth = (innerRef.current?.scrollWidth ?? 0);
      const itemOffsetLeft = (childrenRefs.current[index]?.offsetLeft ?? 0)
      const offsetCenter = (wrapWidth - (childrenRefs.current[index]?.clientWidth ?? 0)) / 2;
      const x = -itemOffsetLeft + offsetCenter;
      const leftBound = itemOffsetLeft - offsetCenter < 0;
      const rightBound = itemOffsetLeft + offsetCenter > innerScrollWidth;

      console.log(x, offsetCenter, itemOffsetLeft, innerRef.current?.scrollWidth)
      console.log(leftBound, rightBound)
      if (leftBound) {
        controls.start({
          x: 0,
          transition: { duration: 1 }
        });
        return;
      }
      if (rightBound) {
        controls.start({
          x: -(innerScrollWidth - wrapWidth),
          transition: { duration: 1 }
        });
        return;
      }
      controls.start({
        x: x,
        transition: { duration: 1 }
      })
    };
    return onClick
  }, [controls]);

  /*
  - https://codesandbox.io/s/framer-motion-2-scrollable-drag-constraints-lsonq?file=/src/styles.css:117-282
  - https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  */

  // FIXME https://github.com/framer/motion/issues/185
  // FIXME https://github.com/framer/motion/issues/314
  return (
    <div ref={ref} className={styles['wrap']}>
      <motion.div
        ref={innerRef}
        animate={controls}
        style={{
          width: innerWidth,
        }}
        className={styles['inner']}
        drag={innerWidth > 0 ? 'x' : false}
        dragConstraints={ref}
        onDragStart={() => {
          isDragging.current = true;
        }}
        onDragEnd={() => {
          setTimeout(() => {
            isDragging.current = false;
          }, 150);
        }}
      >
        {React.Children.map(children, (element, idx) => {
          return React.cloneElement(element, { ref: (el: HTMLElement | null) =>(childrenRefs.current[idx] = el), onClick: (e: MouseEvent) => {
            element.props.onClick?.(e);
            onSelected(idx)(e);
          } });
        })}
      </motion.div>
    </div>
  );
}

export default ScrollPressCenter;
