import plotly.express as px
df = px.data.gapminder()
print(df)
fig = px.scatter_geo(df, locations="iso_alpha", color="continent",
                     hover_name="country", size="pop",
                     animation_frame="year",
                     projection="natural earth")
fig.write_html('geodemo.html', auto_open=True)