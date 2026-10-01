import { useEffect, useRef, useState } from 'react';

const MouseClickAnimation = () => {
  const [clicks, setClicks] = useState([]);
  const nextId = useRef(0);
  const timers = useRef(new Map());

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) {
        return;
      }

      const id = nextId.current++;

      setClicks((currentClicks) => [
        ...currentClicks,
        { id, x: event.clientX, y: event.clientY },
      ]);

      const timer = window.setTimeout(() => {
        setClicks((currentClicks) =>
          currentClicks.filter((click) => click.id !== id)
        );
        timers.current.delete(id);
      }, 650);

      timers.current.set(id, timer);
    };

    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  return (
    <div className="mouse-click-layer" aria-hidden="true">
      {clicks.map(({ id, x, y }) => (
        <span
          className="mouse-click-effect"
          key={id}
          style={{ left: x, top: y }}
        >
          <span className="mouse-click-ring" />
          <span className="mouse-click-dot" />
          <span className="mouse-click-spark mouse-click-spark-one" />
          <span className="mouse-click-spark mouse-click-spark-two" />
          <span className="mouse-click-spark mouse-click-spark-three" />
          <span className="mouse-click-spark mouse-click-spark-four" />
        </span>
      ))}
    </div>
  );
};

export default MouseClickAnimation;
