from instagrapi import Client
import os, json

username = os.getenv("IG_USERNAME")
password = os.getenv("IG_PASSWORD")
target = os.getenv("IG_TARGET")
message = os.getenv("IG_MESSAGE")

cl = Client()
if os.path.exists("session.json"):
    try:
        cl.load_settings("session.json")
        cl.login(username, password)
    except Exception as e:
        print("Session load failed:", e)
        cl.login(username, password)
else:
    cl.login(username, password)

user_id = cl.user_id_from_username(target)
cl.direct_send(message, [user_id])
print("Message sent ✅")
