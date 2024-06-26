import { socket } from "../../../../utils/socket";
import UserMouse from "./UserMouse";
import { useRoom } from "../../../../recoil/room";

const MouseRenderer = () => {
  const { users } = useRoom();
  return (
    <>
      {[...users.keys()].map((userId) => {
        if (userId === socket.id) return null;
        return <UserMouse userId={userId} key={userId} />;
      })}
    </>
  );
};

export default MouseRenderer;
