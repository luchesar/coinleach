import requests
from pymongo import MongoClient

def download_l2():
	client = MongoClient()
	db = client.coinvision
	coll = db.bitfinex_l2

	r = requests.get('https://api.bitfinex.com/v1/book/btcusd', params={'group': 0})

	coll.insert(r.json())

	return True