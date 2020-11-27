# geoplot.py

Creates the file geoplot.html, which is static html page animating the number of confirmed Covid19 cases over time on a world map.

## Build
```
docker build -t pngan/covid19-server .
docker login 
docker push pngan/covid19-server
```
