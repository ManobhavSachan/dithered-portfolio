'use client';

import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  createContext,
  useContext,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

type MotionDivProps = Omit<ComponentPropsWithoutRef<typeof motion.div>, 'children'>;

type DockProps = MotionDivProps & {
  children: ReactNode;
  magnification?: number;
  distance?: number;
};

type DockIconProps = {
  className?: string;
  children?: ReactNode;
};

type DockContextValue = {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
};

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

const DockContext = createContext<DockContextValue | null>(null);

function joinClass(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export const Dock = ({
  className,
  children,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  ...props
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={joinClass(
          'mx-auto flex h-full w-max items-end justify-center overflow-visible rounded-full border',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

export const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);

  if (!context) {
    throw new Error('DockIcon must be used within a Dock component');
  }

  const { mouseX, magnification, distance } = context;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const containerSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [BASE_SIZE, magnification, BASE_SIZE]
    ),
    SPRING
  );

  const iconSize = useSpring(
    useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE]
    ),
    SPRING
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={joinClass(
        'relative flex aspect-square shrink-0 items-center justify-center rounded-full',
        className
      )}
    >
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
