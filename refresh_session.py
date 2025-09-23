from instagrapi import Client
import os, json

cl = Client()
username = os.getenv("IG_USERNAME")
password = os.getenv("IG_PASSWORD")

cl.login(username, password)
session = cl.get_settings()

with open("session.json", "w") as f:
    json.dump(session, f)
print("Session refreshed ✅")
