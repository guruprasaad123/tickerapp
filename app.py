from flask import Flask, render_template, send_from_directory, request, redirect, jsonify, \
    url_for, flash
from api.pypetter import pyppet
from api.news_api import newsapi
from api.util_requests import get_filings , get_public_filings , get_suggestions
# from sqlalchemy import create_engine, asc, desc, \
#     func, distinct
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.serializer import loads, dumps

# from database_setup import Base, Things
import asyncio
import random
import string
import logging
import json
import httplib2
import requests
from functools import wraps

def async_action(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        return asyncio.run(f(*args, **kwargs))
    return wrapped

#loop = asyncio.get_event_loop()
app = Flask(__name__,)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
pyp = pyppet()
news_api =  newsapi()
# Connect to database and create database session
# engine = create_engine('sqlite:///flaskstarter.db')
# Base.metadata.bind = engine
# static_url_path="",static_folder='/static',template_folder="ant-ts/templates",
# DBSession = sessionmaker(bind=engine)
# session = DBSession()


# Display all things




@app.route('/api',methods=['POST'])
def api():
    if request.method == 'POST':
        obj = {}
        print(request.json)
        if request.is_json:
            json_val = request.json
            print('json',json_val)

            results =  get_suggestions(json_val['TickerName'])
            news = news_api.everything(json_val['CompanyName'])
            ID = results['tickerID']
            ID = int(ID.split('#')[0]) if ID.split('#')[0].isdigit() else ID
            filings= []
            if type(ID) is int:
                filings = get_filings(ID)
            else:
                filings = get_public_filings(ID)
            
            obj['results']=results
            obj['filings']=filings
            obj['news']=news
            print('results',results)
        return json.dumps(obj)


@app.route('/',methods=['GET','POST'])
def showMain():
    #things = ["thing1", "thing2", "cat-in-the-hat"]
    print('hello')
    
    #return redirect(url_for('static', filename='index.html'))
    #return app.send_static_file('index.html')
    return render_template('index.html')

if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.use_reloader=False
    app.run(host='0.0.0.0', port=4000)