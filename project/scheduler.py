import time

import requests
import schedule
from django.http import HttpRequest

# from app.views_normal import create_registry


def job():
    # fake_request = HttpRequest()
    # create_registry(fake_request)
    try:
        requests.get("http://46.101.192.180:8003/e0566b3ccc1c6eec6dace94cc3f9b776/")
    except requests.exceptions.RequestException as e:
        print(e)


schedule.every(10).seconds.do(job)


print("Start schedule")
while True:
    schedule.run_pending()
    time.sleep(1)
