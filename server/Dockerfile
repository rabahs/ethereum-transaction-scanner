FROM python:3.6-onbuild

WORKDIR /code
ADD . /code

RUN pip install -r requirements.txt --upgrade pip

CMD ["python", "ethtx-server.py"]