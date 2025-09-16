from kiteconnect import KiteConnect

API_KEY = "ebrksv6c1wemxukj"

kite = KiteConnect(api_key=API_KEY)
print("Login URL:", kite.login_url())
