import requests

def get_filings(ID):
    url = "http://www.rankandfiled.com/data/filer/{}/filings".format(ID)
    response = requests.get(url=url)
    filings = response.json()
    filtered = list(filter(lambda x : x.split('*')[1]=='Q',filings))
    return filtered


def get_suggestions(q):
    url="http://www.rankandfiled.com/data/search?q={}".format(q.lower())
    response = requests.get(url=url)
    results = response.json()['results']
    print(results)
    obj={}
    if type(results) is list  and len(results) > 0 :
        (company,ID)=results[0].split('*')
        company = company.split('|')
        print('company ',company[0],len(company) > 1) 
        company = company[1] if (len(company) > 1) else company[0]
        ID=ID.split('#')[1]
        obj['company']=company
        obj['tickerID']=ID
    
    return obj
        



def get_public_filings(ID):
    url = "http://www.rankandfiled.com/data/company/{}/filings".format(ID)
    response = requests.get(url=url)
    filings = response.json()['filings']
    filtered = list(filter(lambda x : x.split('*')[2]=='Q',filings))
    return filtered


#get_suggestions('AAOR')

#arr = get_public_filings('MXF')

#print(arr)