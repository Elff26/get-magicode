import Navigator from './src/navigator';
import { SocketContext, socket } from './src/utils/Socket/socket';

export default function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Navigator />
    </SocketContext.Provider>
  );
}