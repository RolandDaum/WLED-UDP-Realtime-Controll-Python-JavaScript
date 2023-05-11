import requests

response = requests.get('http://wled.local/json')
if response.status_code == 200:
    data = response.json()
    print(data)
    # num_leds = data['info']
    # print(num_leds)
else:
    print("Failed to retrieve data from WLED.")