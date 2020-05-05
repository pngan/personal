import os
import time
import geoplot
import server

newpid = os.fork()
if newpid == 0:
    server.run_webserver()
else:
    while True:
        geoplot.generate_geoplot()
        time.sleep(60*60*6)

