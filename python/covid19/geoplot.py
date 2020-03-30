import requests
from io import StringIO
import csv

data = {}


def read_data(data, url, statistic) :
    confirmed_responses = requests.get(url)
    f = StringIO(confirmed_responses.content.decode('utf-8'))
    reader = csv.reader(f, delimiter=',')
    header = next(reader)
    dates = header[4:]
    for row in reader:
        country_name = row[1] or 'None'
        country = data.get(country_name)
        if (country == None):
            data[country_name] = {}
            country = data.get(country_name)

        state_name = row[0] or 'None'
        state = country.get(state_name)
        if (state == None):
            country[state_name] = {}
            state = country.get(state_name)

        datum = state.get(statistic)
        if (datum == None):
            state[statistic] = {}
            datum = state.get(statistic)
        values = row[4:]
        value_iter = iter(values)
        for day in dates:
            datum[day] = next(value_iter)

read_data(data,
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv',
    'confirmed_cases')


read_data(data,
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv',
    'deaths')

read_data(data,
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv',
    'recovered')

f = open("dict.json","w")
f.write( str(data) )
f.close()