
from api.util_requests import get_filings , get_public_filings , get_suggestions

get_suggestions('AAOR')

arr = get_public_filings('MXF')

print(arr)