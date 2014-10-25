import requests
import time
from pymongo import MongoClient

def download_l2():
	print 'downloading l2 from bitfinex'
	client = MongoClient()
	db = client.coinvision
	coll = db.bitfinex_l2

	r = requests.get('https://api.bitfinex.com/v1/book/btcusd', params={'group': 0})

	r_json = r.json()
	r_json['timestamp'] = time.time()

	print 'successfully downloaded order book at time %s' % r_json['timestamp']

	coll.insert(r_json)

	print 'finished downloading l2 from bitfinex'

	return True

download_l2()