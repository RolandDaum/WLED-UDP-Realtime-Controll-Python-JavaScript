function test(dgram) {
  const dgram = require('dgram');

  // WLED-IP-Adresse
  const WLED_IP = "wled.local";
  // WLED-UDP-Port
  const WLED_PORT = 21324;

  // Erstelle einen UDP-Socket
  const sock = dgram.createSocket('udp4');

  // Protokoll auswählen
  const protocol = 1;
  // Timeout auf 255 setzen, um im UDP-Datenmodus zu bleiben
  const timeout = 255;

  // Farben für ungerade und gerade LEDs
  const odd_color = [255, 0, 0];
  const even_color = [0, 255, 0];

  // Anzahl der LEDs
  const num_leds = 100;

  // Farbdaten für alle LEDs erstellen
  const colors = new Array(num_leds).fill(0).map((_, i) => i % 2 === 1 ? odd_color : even_color);

  // Farbdaten in das WARLS-Protokoll konvertieren
  let data = Buffer.alloc(1 + 1 + num_leds * 4);
  data.writeUInt8(protocol, 0);
  data.writeUInt8(timeout, 1);
  for (let i = 0; i < num_leds; i++) {
      data.writeUInt8(i, 2 + i * 4);
      data.writeUInt8(colors[i][0], 2 + i * 4 + 1);
      data.writeUInt8(colors[i][1], 2 + i * 4 + 2);
      data.writeUInt8(colors[i][2], 2 + i * 4 + 3);
  }

  // Daten an WLED senden
  sock.send(data, 0, data.length, WLED_PORT, WLED_IP, (err) => {
      if (err) {
          console.error(err);
      } else {
          console.log("Data sent successfully.");
      }
      sock.close();
  });

}