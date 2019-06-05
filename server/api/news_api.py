from newsapi import NewsApiClient

# Init

class newsapi():
    def __init__(self):
        self.newsapi = NewsApiClient(api_key='338421baf518471b8efe205e078c5d29')
    
    def top_new(self,q=None,sources='bbc-news,the-verge',category='business',language='en',country='us'):
        top_headlines = self.newsapi.get_top_headlines(q=q,
                                        
                                          category=category,
                                          language=language,
                                          country=country)
        return top_headlines

    def everything(self,q=None,sources='bbc-news,the-verge',domains='bbc.co.uk,techcrunch.com',from_param='2019-05-03',to='2019-04-02',language='en',sort_by='relevancy',page=2):
        all_articles = self.newsapi.get_everything(q=q,
                                    #  sources=sources,
                                    #  domains=domains,
                                     # from_param=from_param,
                                     # to=to,
                                      language=language,
                                      #sort_by=sort_by,
                                      page=page)
        return all_articles

    def source(self):
        sources = self.newsapi.get_sources()

        return sources
'''
api = newsapi()

q = 'Alphabet Inc'
results = api.top_new(q)

print((results['totalResults']))

results = api.everything(q)

print((results['totalResults']))
print(results)
'''