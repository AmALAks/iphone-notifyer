const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('ws');
const wss = new Server({ server });
const WindowsToaster = require('node-notifier').WindowsToaster;

const local_ip = 192.168.0.112

const notifier = new WindowsToaster({
  withFallback: true,
  customPath: undefined
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/index.html');
});

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (msg) => notifier.notify({title: "IPhone", message: msg.toString("utf-8"), appID: "Notification", icon: __dirname}))
});

server.listen(8000, local_ip, () => {
});
