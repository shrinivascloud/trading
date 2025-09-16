from kiteconnect import KiteConnect

API_KEY = "ebrksv6c1wemxukj"
API_SECRET = "94w1d14rnvglw5uqkibjsm69ehxm9jpc"
REQUEST_TOKEN = "cJSWw0roGLOS07lYvHoLlNRdGPn13iRN"

kite = KiteConnect(api_key=API_KEY)
data = kite.generate_session(REQUEST_TOKEN, api_secret=API_SECRET)
access_token = data["access_token"]

# Save token for reuse
with open("access_token.txt", "w") as f:
    f.write(access_token)

print("Access Token:", access_token)
