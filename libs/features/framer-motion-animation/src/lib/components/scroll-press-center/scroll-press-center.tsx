import { motion } from 'framer-motion';
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
  
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [innerWidth, setInnerWidth] = useState<number>(0)

  const childrenRefs = useRef<(HTMLDivElement | null)[]>(Array(items.length));

  useEffect(() => {
    setInnerWidth(innerRef.current?.scrollWidth ?? 0)
  }, [items])

  // scroll width, element width, 
  const onSelected = useCallback((index: number) => {
    return (e: any) => {
      e.preventDefault()
      console.log(index, childrenRefs.current[index]?.offsetLeft, innerRef.current?.clientLeft);
      // ref.current?.scrollTo(childrenRefs.current[index]?.offsetLeft ?? 0, 0)
      // childrenRefs.current[index]?.scrollIntoView({
      //   behavior: "smooth",
      //   block: "center",
      //   inline: "center"
      // })
    };
  }, []);

  // FIXME https://github.com/framer/motion/issues/185
  // FIXME https://github.com/framer/motion/issues/314
  return (
    <motion.div ref={ref} className={styles['wrap']}>
      <motion.div
        ref={innerRef}
        style={{
          width: innerWidth,
        }}
        className={styles['inner']}
        drag={(innerWidth > 0) ? 'x' : false}
        dragConstraints={ref}
      //   onDrag={(event, pan) => {
      //     (pan as any).preventDefault() // have this prevent the animation
      //     console.log(ref.current?.scrollLeft, pan)
      //     if(ref.current) {
      //       ref.current.scrollLeft += -pan.offset.x // something like that
      //     }
      //  }}
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
