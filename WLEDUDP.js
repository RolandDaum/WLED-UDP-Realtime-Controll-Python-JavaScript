// WLED-IP-Adresse
const WLED_IP = "192.168.0.2";
// WLED-UDP-Port
const WLED_PORT = 21324;

// Protokoll auswählen
const protocol = 1;
// Timeout nach 1 Sekunde
const timeout = 1;

// Farben für ungerade und gerade LEDs
const oddColor = [255, 0, 0];
const evenColor = [0, 255, 0];

// Anzahl der LEDs
const numLeds = 100;

// Farbdaten für alle LEDs erstellen
const colors = new Array(numLeds).fill().map((_, i) => i % 2 == 1 ? oddColor : evenColor);

// Farbdaten in das WARLS-Protokoll konvertieren
const data = new Uint8Array(2 + numLeds * 4);
data[0] = protocol;
data[1] = timeout;
for (let i = 0; i < numLeds; i++) {
  data[2 + i * 4] = i;
  data[3 + i * 4] = colors[i][0];
  data[4 + i * 4] = colors[i][1];
  data[5 + i * 4] = colors[i][2];
}

// Daten an WLED senden
const socket = new window.Socket();
socket.send(data.buffer, 0, data.length, WLED_IP, WLED_PORT);