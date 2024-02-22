import React, { useState, useEffect } from 'react';
import './App.css';
import mqtt from 'mqtt';

const mqttBrokerUrl = 'mqtt://your-broker-url';
const mqttChannel = 'your-channel';

function App() {
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const client = mqtt.connect(mqttBrokerUrl);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe(mqttChannel);
    });

    client.on('message', (topic, message) => {
      console.log('Received message:', message.toString());
      setLatestMessage(message.toString());
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="app">
      <div className="panel">
        <h1 className="header">Rpodid App</h1>
        <div className="message-container">
          {latestMessage && (
            <div className="message">
              <div className="left">{latestMessage}</div>
              <div className="right">{new Date().toLocaleString()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;