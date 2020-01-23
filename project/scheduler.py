import time

import requests
import schedule


def job():
    try:
        requests.get("http://localhost:8000/e0566b3ccc1c6eec6dace94cc3f9b776/")
    except requests.exceptions.RequestException as e:
        print(e)


schedule.every(10).seconds.do(job)


print("Start schedule")
while True:
    schedule.run_pending()
    time.sleep(1)
