from .pypetter import pyppet
from .news_api import newsapi
from .util_requests import get_filings , get_public_filings , get_suggestions
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

news_api =  newsapi()

@csrf_exempt
@require_http_methods(["POST"])
def post(request):
    try:
        if request.method == 'POST':
            obj = {}
      
            if request.META['CONTENT_TYPE'] == 'application/json;charset=UTF-8' :
                #print(request.META)
                json_val = json.loads(request.body.decode("utf-8"))
                print('json',json_val)

                results =  get_suggestions(json_val['TickerName'])
                news = news_api.everything(json_val['CompanyName'])
                ID = results['tickerID']
                ID = int(ID.split('#')[0]) if ID.split('#')[0].isdigit() else ID
                filings= []
                if type(ID) is int:
                    print('ID',ID)
                    filings = get_filings(ID)
                else:
                    filings = get_public_filings(ID)
            
                obj['results']=results
                obj['filings']=filings
                obj['news']=news
                print('results',results)
                return JsonResponse(obj)

            else:
                print('NOT JSON REQUEST')
                return JsonResponse({'status':'false','message':"Error : JSON ONLY "}, status=402)
        else:
            print('NOT POST')
            return JsonResponse({'status':'false','message':"Error : POST ONLY "}, status=403)
    
    except:
        print('Error')
        return JsonResponse({'status':'false','message':"Error : Please enter Valid CompanyName,TickerName"}, status=500)



