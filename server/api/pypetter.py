import asyncio
from pyppeteer import launch

'''
()=>Array.from(document.querySelectorAll('div#search-results ul.search-row li ')).filter(li=> li.querySelectorAll('span')[3].innerText === "Company").map(li=>{"name":li.querySelectorAll('span')[0].innerText,"id":})

https://www.sec.gov/Archives/edgar/data/1305748/000101376208002443/form10q.htm

http://www.rankandfiled.com/data/filer/1305748/filings

http://www.rankandfiled.com/data/company/MXF/filings

'''
class pyppet():
    
    def __init__(self):
        self.loop = None
    
    async def search_results(self,suggestion="alpha"):
        browser = await launch()
        page = await browser.newPage()
        await page.goto('http://www.rankandfiled.com/#/')
        await page.type('input#ember945',suggestion)
        await page.screenshot({'path': 'suggestion.png'})
        element = await page.querySelector('div#search-results ul.search-row')
        companies = await element.JJeval('li','(lists)=>lists.filter(list=>list.querySelectorAll("span")[3].innerText==="Company").map(li=>({"name":li.querySelectorAll("span")[0].innerText,"id":li.querySelectorAll("span")[2].innerText}))')
        
        #print('companies' , companies)

        await page.close()
        await browser.close()

        return companies
    

    async def get_quarterly_report(self,ID=""):
        browser = await launch()
        page = await browser.newPage()
        ID = int(ID.split('#')[0]) if ID.split('#')[0].isdigit() else ID
        URL =(
            "http://www.rankandfiled.com/#/public/{}/table".format(ID),
            "http://www.rankandfiled.com/#/filers/{}/table".format(ID)
            )[type(ID) is int]
        await page.goto(URL)       




    def get_suggestions(self,suggestion="alpha"):
        self.loop = asyncio.get_event_loop()
        result = self.loop.run_until_complete(self.search_results(suggestion))
        self.loop.close()
        return result



async def main():
    browser = await launch()
    page = await browser.newPage()
    await page.goto('http://www.rankandfiled.com/#/')
    #await page.focus('input#ember945')
    await page.type('input#ember945','micro ' )
    await page.screenshot({'path': 'example.png'})
    element = await page.querySelector('div#search-results ul.search-row')

    companies = await element.JJeval('li','(lists)=>lists.filter(list=>list.querySelectorAll("span")[3].innerText==="Company").map(li=>({"name":li.querySelectorAll("span")[0].innerText,"id":li.querySelectorAll("span")[2].innerText}))')

    print('companies ',companies)

    #await page.screenshot({'path': 'example1.png'})
    await page.close()
    await browser.close()


#pyp = pyppet()
#results = pyp.get_suggestions('AABB')

#print(results)
#asyncio.get_event_loop().run_until_complete(main())