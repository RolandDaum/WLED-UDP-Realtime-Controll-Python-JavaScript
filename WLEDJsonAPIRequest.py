import requests

response = requests.get('http://<WLED_IP>/json')
if response.status_code == 200:
    data = response.json()
    print(data)
    # num_leds = data['leds']
    # print(f"Total number of LEDs connected: {num_leds}")
else:
    print("Failed to retrieve data from WLED.")