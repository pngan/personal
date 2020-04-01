import requests
from io import StringIO
import csv
import pandas as pd
import sys
import plotly.express as px
import math

df = pd.DataFrame(columns=('country', 'state', 'lat', 'long', 'day', 'cases', 'deaths', 'recovered', 'logcases'))

if 1 == 2:
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
            state['lat'] = float(row[2])
            state['long'] = float(row[3])

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

    idx = 0
    for country_name in data:
        print(country_name)
        country = data[country_name]
        for state_name in country:
            print(f'  ** {state_name}')
            state = country[state_name]
            confirmed_cases = state.get('confirmed_cases', {})
            deaths = state.get('deaths', {})
            recovered = state.get('recovered', {})
            for date in confirmed_cases:
                cases = float(confirmed_cases[date])
                if (cases != 0):
                    cases = math.log(cases)
                df_row = [country_name, state_name, float(state['lat']), float(state['long']), 
                            date, float(confirmed_cases[date]), float(deaths.get(date, 0)), float(recovered.get(date, 0)), cases]
                df.loc[idx] = df_row
                idx = idx + 1
                
    df.to_pickle('geodata.pkl')
    print(df)

else:

    df = pd.read_pickle('geodata.pkl')
    print(df)




#fig = px.scatter_geo(df, lat="lat", lon="long", size="cases", animation_frame="day", projection="natural earth")
fig = px.scatter_geo(df, lat="lat", lon="long",
                     hover_name="country", 
                     hover_data=["state", "cases", "deaths", "recovered", "day"],
                     size="logcases",
                     animation_frame="day",
                     projection="natural earth"
                     )

fig.write_html('geoplot.html', auto_open=True)

# f = open("dict.json","w")
# f.write( str(data) )
# f.close()