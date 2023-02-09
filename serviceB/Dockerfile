# syntax=docker/dockerfile:1

FROM python:3.6
WORKDIR /app
EXPOSE 5000
COPY requirements.txt requirements.txt
#RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "./app.py"]