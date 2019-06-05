from api.news_api import newsapi

api = newsapi()

q = 'Alphabet Inc'
results = api.top_new(q)

print((results['totalResults']))

results = api.everything(q)

print((results['totalResults']))
print(results)
