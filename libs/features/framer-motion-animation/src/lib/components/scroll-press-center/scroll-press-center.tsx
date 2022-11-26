import { motion, useScroll } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
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
  const innerRef = useRef<HTMLDivElement | null>(null);
  const childrenRefs = useRef<(HTMLDivElement | null)[]>(Array(items.length));
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  console.log(target);
  const { scrollX } = useScroll({ axis: "x", container: innerRef, target: targetRef, offset: ["center"] })

  console.log(scrollX)

  const onSelected = useCallback((index: number) => {
    return () => {
      console.log(index);
      childrenRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      })
      // setTarget(childrenRefs.current[index]);
      // targetRef.current = childrenRefs.current[index];
    };
  }, []);

  return (
    <motion.div ref={ref} className={styles['wrap']}>
      <motion.div
        ref={innerRef}
        style={{
          width: 6000, // items.length * width
        }}
        className={styles['inner']}
        drag={'x'}
        dragConstraints={ref}
      >
        {items.map((item, i) => (
          <motion.div
            ref={(el) => {
              childrenRefs.current[i] = el;
            }}
            key={item.id}
            className={styles['item']}
            onClick={onSelected(i)}
          >
            {item.value}{' '}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default ScrollPressCenter;
