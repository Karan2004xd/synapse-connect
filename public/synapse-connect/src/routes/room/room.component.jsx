import { useRef } from 'react';
import './room.styles.css'
import VideoConnection from '../../components/video-connection/video-connection.component';

const Room = () => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  const handleJoinMeeting = () => {
  };

  return (
    <div>
      <VideoConnection 
        localVideoRef={localVideo} 
        remoteVideoRef={remoteVideo} 
        autoPlay playsInline controls={true}
      />
      <div>
        <button type='button' onClick={handleJoinMeeting}>Join Meeting</button>
      </div>
    </div>
  );
};

export default Room;
