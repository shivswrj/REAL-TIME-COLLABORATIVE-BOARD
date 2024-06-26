import { useRef } from "react";
import { useBoardPosition } from "../../hooks/useBoardPosition";
import { useInterval, useMouse } from "react-use";
import { socket } from "../../../../utils/socket";
import { motion } from "framer-motion";
import { getPos } from "../../../../utils/getPos";

const MousePosition = () => {
  const prevPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const { x, y } = useBoardPosition();

  const ref = useRef<HTMLDivElement>(null);

  const { docX, docY } = useMouse(ref);

  useInterval(() => {
    if (prevPosition.current.x !== docX || prevPosition.current.y !== docY) {
      socket.emit("mouse_move", getPos(docX, x), getPos(docY, y));
      prevPosition.current = { x: docX, y: docY };
    }
  }, 25);

  return (
    <motion.div
      ref={ref}
      className="position-absolute top-0 start-0 text-sm-center user-select-none "
      animate={{ x: docX + 15, y: docY + 15 }}
      transition={{ duration: 0.05, ease: "linear" }}
    >
      <p className="text-muted">
        {getPos(docX, x).toFixed(0)} | {getPos(docY, y).toFixed(0)}
      </p>
    </motion.div>
  );
};

export default MousePosition;
