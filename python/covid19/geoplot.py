import requests
from io import StringIO
import csv

data = []

# Read confirmed case counts

confirmed_responses = requests.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
f = StringIO(confirmed_responses.content.decode('utf-8'))
reader = csv.reader(f, delimiter=',')
for row in reader:
    country_name = row[1]
    values =  row[4:] 
    try:
        country_item = next( filter( lambda  x: x['country_name'] == country_name, data))
        country_item['cases'] = values
    except StopIteration:
        data.append({ 'country_name': country_name, 'cases': values})

# Read death counts

deaths_responses = requests.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
f = StringIO(deaths_responses.content.decode('utf-8'))
reader = csv.reader(f, delimiter=',')
for row in reader:
    country_name = row[1]
    values =  row[4:] 
    try:
        country_item = next( filter( lambda  x: x['country_name'] == country_name, data))
        country_item['deaths'] = values
    except StopIteration:
        data.append({ 'country_name': country_name, 'deaths': values})


for country in data:
    print(country)