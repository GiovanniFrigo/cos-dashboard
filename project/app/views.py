import json
from datetime import date, datetime

import requests
from django.db.models import Max
from django.http import HttpResponse
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from app.models import CurrentNumber, News

today = date.today()


class RegistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentNumber
        fields = "__all__"


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = "__all__"


def max_player_count_ever(request):
    maxNumberEver = CurrentNumber.objects.all().aggregate(Max("playerCount"))
    return HttpResponse(json.dumps(maxNumberEver), content_type="application/json")


class RegistryList(generics.ListCreateAPIView):
    queryset = CurrentNumber.objects.all()
    serializer_class = RegistrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RegistryToday(generics.ListCreateAPIView):
    queryset = CurrentNumber.objects.filter(createDate__day=today.day)
    serializer_class = RegistrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RegistryLatest(generics.ListCreateAPIView):
    queryset = CurrentNumber.objects.all().order_by("-id")[:1]
    serializer_class = RegistrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class NewsLatest(generics.ListCreateAPIView):
    queryset = News.objects.all().order_by("-id")[:1]
    serializer_class = NewsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


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
