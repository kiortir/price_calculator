from datetime import datetime

import requests
from django.conf import settings
from requests.structures import CaseInsensitiveDict

from .models import Token

AUTH_URL = "https://unirock.amocrm.ru/oauth2/access_token/"
AUTH_HEADERS = CaseInsensitiveDict()
AUTH_HEADERS["Content-Type"] = "application/json"


def setTokens(tokens: dict):
    token_entry = Token.objects.get(id=1)
    for field, value in tokens.items():
        setattr(token_entry, field, value)
    print(token_entry)
    token_entry.save()


def setTokensByAuth(authorization_code: str):
    request_data = '{"client_id":"%s","client_secret":"%s","grant_type":"authorization_code","code": "%s","redirect_uri":"https://dev.unirock.ru/"}' % (
        settings.AMO_CLIENT_ID, settings.AMO_CLIENT_SECRET, authorization_code)
    tokens = requests.post(AUTH_URL, headers=AUTH_HEADERS,
                           data=request_data, timeout=5)
    setTokens(tokens.json())


def updateTokens():
    refresh_token = Token.objects.get(id=1).refresh_token
    request_data = '{"client_id":"%s","client_secret":"%s","grant_type":"refresh_token","refresh_token": "%s","redirect_uri":"https://dev.unirock.ru/"}' % (
        settings.AMO_CLIENT_ID, settings.AMO_CLIENT_SECRET, refresh_token)
    tokens = requests.post(AUTH_URL, headers=AUTH_HEADERS,
                           data=request_data, timeout=5)
    setTokens(tokens.json())


def check_tokens():
    tokens = datetime.datetime.fromtimestamp(Token.objects.get(id=1))
    return tokens.expiration_time > datetime.now()


if __name__ == '__main__':
    pass
