import io from "socket.io-client";
import PATH from "./path";

const socket = io(PATH);

export default socket;
