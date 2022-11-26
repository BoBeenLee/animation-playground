import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import styles from './scroll-sample.module.css';

interface Item {
  id: string;
  value: string;
}

export interface ScrollSampleProps {
  items: Item[];
}

export default function ScrollSample(props: ScrollSampleProps) {
  const { items = [] } = props;
  const ref = useRef(null);

  return (
    <div className={styles['container']} ref={ref}>
      <motion.div
        className={styles['scroller']}
        drag="x"
        dragConstraints={ref}
        onMeasureDragConstraints={console.log}
      >
        {items.map((item, i) => (
          <motion.div key={item.id} className={styles['item']}>
            {item.value}{' '}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
