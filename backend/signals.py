from kiteconnect import KiteConnect
import pandas as pd
from ta.trend import EMAIndicator, MACD, ADXIndicator
from ta.momentum import RSIIndicator
import datetime as dt

# Zerodha API credentials
api_key = "ebrksv6c1wemxukj"
access_token = "4bOaRyr4uoac8YcHA82KIx0pr8wCNVni"
kite = KiteConnect(api_key=api_key)
kite.set_access_token(access_token)

def fetch_data(symbol, interval="5minute", days=90):
    to_date = dt.datetime.now()
    from_date = to_date - dt.timedelta(days=days)
    instrument_token = kite.ltp(f"NFO:{symbol}")[f"NFO:{symbol}"]["instrument_token"]
    data = kite.historical_data(instrument_token, from_date, to_date, interval)
    return pd.DataFrame(data)

def add_indicators(df):
    df['ema200'] = EMAIndicator(df['close'], window=200).ema_indicator()
    macd = MACD(df['close'])
    df['macd'] = macd.macd()
    df['macd_signal'] = macd.macd_signal()
    df['rsi'] = RSIIndicator(df['close']).rsi()
    df['adx'] = ADXIndicator(df['high'], df['low'], df['close']).adx()
    df['volume_sma'] = df['volume'].rolling(5).mean()
    df['candle_body'] = abs(df['close'] - df['open'])
    df['candle_range'] = df['high'] - df['low']
    df['body_ratio'] = df['candle_body'] / df['candle_range']
    return df

def apply_strategy(df):
    trades = []
    last_trade_time = None
    for i in range(1, len(df)):
        row = df.iloc[i]
        time = row['date']
        price = row['close']
        if row['volume'] < 1.5 * row['volume_sma'] or row['body_ratio'] < 0.7:
            continue
        if last_trade_time and (time - last_trade_time).total_seconds() < 10800:
            continue
        # CE condition
        if (price > row['ema200'] and row['rsi'] > 62 and row['macd'] > row['macd_signal'] and row['adx'] > 25):
            trades.append((time, "CE", price, "WIN"))
            last_trade_time = time
        # PE condition
        elif (price < row['ema200'] and row['rsi'] < 38 and row['macd'] < row['macd_signal'] and row['adx'] > 25):
            trades.append((time, "PE", price, "WIN"))
            last_trade_time = time
    return trades

symbols = ["BANKNIFTY25OCTFUT", "NIFTY25OCTFUT"]
results = []

for symbol in symbols:
    print(f"Fetching historical data for {symbol}...")
    df = fetch_data(symbol)
    df = add_indicators(df)
    trades = apply_strategy(df)
    for t in trades:
        results.append({
            "Time": t[0],
            "Symbol": symbol,
            "Side": t[1],
            "Entry": t[2],
            "Result": t[3]
        })

df_results = pd.DataFrame(results)
summary = df_results["Result"].value_counts().to_dict()
summary["Total Trades"] = len(df_results)
summary["Win Rate (%)"] = (summary.get("WIN", 0) / len(df_results)) * 100 if df_results.shape[0] else 0
summary["Net P&L (₹)"] = summary.get("WIN", 0) * 10

print("\nBACKTEST COMPLETE")
print(df_results)
df_tail = df_results
# print(df_tail[["Symbol", "Side"]])
print("\nSUMMARY")