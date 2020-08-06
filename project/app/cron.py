import time

import requests

from app.models import CurrentNumber
import datetime


def get_current_number_players():
    # f = open("~/yolo/test.txt", "a+")
    # f.write(datetime.datetime.now())
    # f.close()

    for _ in range(2):
        req = requests.get(
            "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1245570"
        )
        if req.status_code == 200:
            response = req.json()
            r = CurrentNumber(playerCount=response["response"]["player_count"])
            r.save()
            time.sleep(20)
