FROM python:3.8-slim-buster
ADD . /app

RUN pip install -r app/requirements.txt

WORKDIR /app


CMD ["python", "startup.py"]
# CMD ["python", "server.py", "-l", "0.0.0.0"]