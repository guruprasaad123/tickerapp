# Ticker App

## Instructions

### React Environment

1. Clone this repo
2. Run `npm install`
3. Run `npm start`, **localhost:8080** will open up in your default browser

**If you prefer to install things yourself you can follow the instructions below**

1. Run `npm init` and type your answers to the questions or you can run `npm init -y` to say yes to every question - you will get default settings
2. Install the following dependencies:

   ```
   npm i react react-dom -S
   ```
3. Install the following dev dependencies:

   ```
   npm i babel-core babel-loader babel-preset-env babel-preset-react css-loader html-webpack-plugin style-loader webpack webpack-cli webpack-dev-server axios antd -D
   ```
4. Update your scripts to the following:

   ```
   "start": "webpack-dev-server --mode development --open",
   "build": "webpack --mode production"
   ```
5. Create **.babelrc** file with the following configurations:

   ```
   {
   "presets": ["env", "react"]
   }
   ```
6. Create **webpack.config.js** file with the following configurations:
7. Create **src** folder with **index.js** and **index.html** file.
8. **index.js** should have:
9. Create **.gitignore** file and input **/node_modules/** and **/static**.

### Python Environment

#### Installation:

1. Install all the dependencies in the requirements.txt by issueing this command.

   ```python
   pip install -r requirements.txt
   ```

#### Run the App:

1. Run the `app.py`  by using this command. (set `debug=True` for Developement , `debug=False` for Production) in (settings.py)[https://github.com/guruprasaad123/tickerapp/blob/master/server/settings.py]

   ```python
   python manage.py runserver
   ```

## Working

## To make it Run :

you'll need to run 2 terminals at the same time to

1. To create `index.js` bundler file which is essential for running the Web App.

   ```
   npm run build
   ```

   

2. To run the `Django server` , to serve the files , responses.

   ```
   python manage.py runserver
   ```

# Behind the scenes

## Screen -1

- We'll using `antd` design in our application ,

- Starting with `formLayout.tsx` which gather the *companyName* and *TIckerName* from the user.

- which is sent via `post` request via axios to the app.py api

- where the api fetches the relevant news using `newsapi` , `util_requests.py` handles the fetching of *Quarterly Reports* and they are all send back to the front-end as json response.

- After the successful completion of the `post` request , UI is switched to `Dashboard.tsx`

## Screen -2

- With tabmodes , one for the `newsapi` and another for the `Quarterly reports`

- which is switchable anyway

- Onclicking the listItem on the *Quarterly reports* , modal will be shown with a `iframe` pointing the original page ( htttp://sev.gov.data ,  which seems to be not working because the security reasons ) 
