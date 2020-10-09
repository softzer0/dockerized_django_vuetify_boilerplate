# pull official base image
FROM python:3.8.6-slim-buster

# set work directory
WORKDIR /home/root/web_app_tracker/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .