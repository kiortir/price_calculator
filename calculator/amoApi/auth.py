from datetime import datetime

import requests
from calculator.settings import AMO_CLIENT_ID, AMO_CLIENT_SECRET
from requests.structures import CaseInsensitiveDict

from .models import Tokens

AUTH_URL = "https://unirock.amocrm.ru/oauth2/access_token"
AUTH_HEADERS = CaseInsensitiveDict()
AUTH_HEADERS["Content-Type"] = "application/json"


def setTokens(tokens: dict):
    token_entry = Tokens.objects.get_or_create(id=1)
    token_entry.__dict__.update(tokens)
    token_entry.save()


def setTokensByAuth(authorization_code: str):
    request_data = '{"client_id":"%s","client_secret":"%s","grant_type":"authorization_code","code": "%s","redirect_uri":"https://unirock.ru/"}' % (
        AMO_CLIENT_ID, AMO_CLIENT_SECRET, authorization_code)
    tokens = requests.post(AUTH_URL, headers=AUTH_HEADERS,
                           data=request_data, timeout=5)
    setTokens(tokens.json())


def updateTokens():
    refresh_token = Tokens.objects.get(id=1).refresh_token
    request_data = '{"client_id":"%s","client_secret":"%s","grant_type":"refresh_token","refresh_token": "%s","redirect_uri":"https://unirock.ru/"}' % (
        AMO_CLIENT_ID, AMO_CLIENT_SECRET, refresh_token)
    tokens = requests.post(AUTH_URL, headers=AUTH_HEADERS,
                           data=request_data, timeout=5)
    setTokens(tokens.json())


def check_tokens():
    tokens = datetime.datetime.fromtimestamp(Tokens.objects.get(id=1))
    return tokens.expiration_time > datetime.now()
