export interface CtxOptions {
  lineWidth: number;
  lineColor: string;
  erase: boolean;
}

export interface Move {
  path: [number, number][];
  options: CtxOptions;
  eraser: boolean;
  timestamp: number;
}

export interface ServerToClientEvents {
  room: (room: Room, usersMovesToParse: string, usersToParse: string) => void;
  created: (roomId: string) => void;
  user_draw: (move: Move, userId: string) => void;
  mouse_moved: (x: number, y: number, userId: string) => void;
  room_exists: (exists: boolean) => void;
  joined: (room: string, failed?: boolean) => void;
  your_move: (move: Move) => void;
  user_undo(userId: string): void;
  new_user: (userId: string, username: string) => void;
  user_disconnected: (userId: string) => void;
  new_msg: (userId: string, msg: string) => void;
}

export interface ClientToServerEvents {
  draw: (move: Move) => void;
  mouse_move: (x: number, y: number) => void;
  check_room: (roomId: string) => void;
  undo: () => void;
  create_room: (username: string) => void;
  join_room: (room: string, username: string) => void;
  joined_room: () => void;
  leave_room: () => void;
  send_msg: (msg: string) => void;
}

export interface RoomData {
  name: string;
  userId: string;
  roomId: string;
  host: boolean;
  presenter: boolean;
}

export type Room = {
  usersMoves: Map<string, Move[]>;
  drawed: Move[];
  users: Map<string, string>;
};

export interface User {
  name: string;
  color: string;
}

export interface ClientRoom {
  id: string;
  usersMoves: Map<string, Move[]>;
  movesWithoutUser: Move[];
  myMoves: Move[];
  users: Map<string, User>;
}

export interface Message {
  userId: string;
  username: string;
  color: string;
  msg: string;
  id: number;
}
