'use client';
import React, { useEffect, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const Counter: React.FunctionComponent<CounterProps> = ({ end, duration = 2000, suffix = '', className = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end <= 0) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      startTime ??= currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <div className={className}>
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default Counter;
