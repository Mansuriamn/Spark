// 📁 components/WebRTCMeeting.js
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5000'; // your backend
const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // You can add TURN servers here for production
  ],
};

const WebRTCMeeting = ({ roomName, userName }) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        peerConnectionRef.current = new RTCPeerConnection(ICE_SERVERS);
        stream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        peerConnectionRef.current.ontrack = (event) => {
          setRemoteStream(event.streams[0]);
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        socketRef.current.emit('join-room', roomName);

        socketRef.current.on('user-joined', async () => {
          const offer = await peerConnectionRef.current.createOffer();
          await peerConnectionRef.current.setLocalDescription(offer);
          socketRef.current.emit('offer', { roomId: roomName, offer });
        });

        socketRef.current.on('offer', async (offer) => {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(answer);
          socketRef.current.emit('answer', { roomId: roomName, answer });
        });

        socketRef.current.on('answer', async (answer) => {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socketRef.current.on('ice-candidate', async (candidate) => {
          try {
            await peerConnectionRef.current.addIceCandidate(candidate);
          } catch (e) {
            console.error('Error adding received ICE candidate', e);
          }
        });

        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit('ice-candidate', {
              roomId: roomName,
              candidate: event.candidate,
            });
          }
        };
      })
      .catch(err => console.error('Failed to get media:', err));

    return () => {
      return () => {
  if (socketRef.current) socketRef.current.disconnect();
  if (peerConnectionRef.current) peerConnectionRef.current.close();
};
    };
  }, [roomName]);

  return (
    <div>
      <h2>Live Meeting Room: {roomName}</h2>
      <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '45%', marginRight: '10px' }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '45%' }} />
    </div>
  );
};

export default WebRTCMeeting;
