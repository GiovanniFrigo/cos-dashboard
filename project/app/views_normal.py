from datetime import datetime

import requests
from django.http import HttpResponse

from app.models import CurrentNumber


def create_registry(request):
    req = requests.get(
        "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1181790"
    )

    if req.status_code == 200:
        response = req.json()
        new = CurrentNumber(
            playerCount=response["response"]["player_count"], createDate=datetime.now()
        )
        new.save()
        print("SUCCESS")
        html = "<html><body>Created</body></html>"
        return HttpResponse(html)

    print("FAIL")
    html = "<html><body>Failed</body></html>"
    return HttpResponse(html)
