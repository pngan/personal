import requests
from io import StringIO
import csv
import pandas as pd
import sys
import plotly.express as px
import math
import time

def generate_geoplot():
    df = pd.DataFrame(columns=('country', 'state', 'lat', 'long', 'day', 'cases', 'deaths', 'recovered', 'logcases', 'mortality_rate'))
    if 1 == 1:
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
                state['lat'] = float(row[2]) if row[2] else 0.0
                state['long'] = float(row[3]) if row[3] else 0.0

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
                    if cases > 0.0:
                        cases = math.log(cases+1, 1.5)
                    else:
                        cases = 0.0
                    confirmed_df = float(confirmed_cases[date])
                    deaths_df = float(deaths.get(date, 0))
                    if confirmed_cases[date] == '0':
                        mortality_df = 0
                    else:
                        mortality_df = deaths_df/confirmed_df*100
                    df_row = [country_name, state_name, float(state['lat']), float(state['long']), 
                                date, confirmed_df, deaths_df, float(recovered.get(date, 0)), cases, mortality_df]
                    df.loc[idx] = df_row
                    idx = idx + 1
                    
        df.to_pickle('geodata.pkl')
        print(df)

    else:

        df = pd.read_pickle('geodata.pkl')
        print(df)

    fig = px.scatter_geo(df, lat="lat", lon="long",
                        hover_name="country", 
                        hover_data=["state", "cases", "deaths", "recovered", "day", "mortality_rate"],
                        size="logcases",
                        animation_frame="day",
                        projection="natural earth"
                        
                        #  
                        # color='mortality_rate',
                        # color_continuous_scale=px.colors.diverging.RdBu[::-1]
                        #  range_color=[0, 15]
                        )

    fig.write_html('geoplot.html')

