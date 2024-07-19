import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  [key: string]: any; // To allow any other props
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
