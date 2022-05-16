import json

import requests
from requests.structures import CaseInsensitiveDict

from .amo_logger import get_logger

from .models import Lead

from .auth import token

# logger = get_logger(__name__)
# FILTER_STRING = '?filter[tags_logic]=or&filter[pipe][946942][]=18032857&filter[pipe][946942][]=18032860&filter[pipe][946942][]=18032863&filter[pipe][946942][]=18033010&filter[pipe][946942][]=18062053'

QUERY_URL = 'https://unirock.amocrm.ru/api/v4/leads?limit=250&?filter[tags_logic]=or&filter[pipe][946942][]=18032857&filter[pipe][946942][]=18032860&filter[pipe][946942][]=18032863&filter[pipe][946942][]=18033010&filter[pipe][946942][]=18062053'
IMPORTANT_STATUS = ['18032857', '18062053',
                    '18032860', '18032863', '18033010']

ROOT_URL = 'https://unirock.amocrm.ru'


def getLeads(a_token: str, page=1):
    url = f"{QUERY_URL}&page={page}"

    headers = CaseInsensitiveDict()
    headers["Authorization"] = "Bearer %s" % a_token

    response = requests.get(url, headers=headers, timeout=5)
    print(response.text)
    if response.status_code == 204:  # выход из рекурсии
        return []

    leads = response.json().get('_embedded', {}).get('leads', [])
    if len(leads) < 250:
        return leads
    next_page = getLeads(a_token, page + 1)

    if not next_page:
        return leads
    else:
        return leads + next_page


def handle_webhook(webhook_data: dict):
    hook_type: str = webhook_data.get('hook_type', None)
    status_id: int = webhook_data.get('status_id', 0)
    hook_data: dict = webhook_data.get('hook_data', None)
    try:
        lead: Lead = Lead.objects.get(lead_id=hook_data['lead_id'])
    except Lead.DoesNotExist:
        lead = None
    # logger.info(json.dumps(webhook_data))
    if lead:
        if hook_type == 'delete' or status_id not in IMPORTANT_STATUS:
            lead.delete()
        else:
            for field, value in hook_data.items():
                setattr(lead, field, value)
            lead.save()
    elif hook_type != 'delete' and status_id in IMPORTANT_STATUS:
        lead = Lead.objects.update_or_create(
            lead_id=hook_data['lead_id'], defaults=hook_data)


def handle_query_response(response):
    active_leads: list = []
    for lead in response:
        response_lead_id = lead.get('lead_id', 0)
        active_leads.append(response_lead_id)
        Lead.objects.update_or_create(
            lead_id=response_lead_id, defaults=lead)
    for lead in Lead.objects.all():
        if lead.lead_id not in active_leads:
            lead.delete()


def updateCustomFields():
    headers = CaseInsensitiveDict()
    headers["Authorization"] = "Bearer %s" % token()

    urls = [
        '/api/v4/leads/custom_fields',
        # '/api/v4/contacts/custom_fields',
        # '/api/v4/companies/custom_fields',
        # '/api/v4/customers/custom_fields',
        # '/api/v4/customers/segments/custom_fields',
    ]
    for path in urls:
        collector = []
        params = {
            'page': 1,
            'limit': 50
        }
        url = ROOT_URL + path
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            print(response.text)
            raise Exception
        data = response.json()
        collector.append(data)
        links = data.get('_links')
        next = links.get('next', {}).get('href', None)
        while next:
            response = requests.get(next, headers=headers)
            links = data.get('_links')
            next = links.get('next', {}).get('href', None)

            data = response.json()
            collector.append(data)

        return collector


def updateEvents():
    headers = CaseInsensitiveDict()
    headers["Authorization"] = "Bearer %s" % token()

    urls = [
        '/api/v4/events',
        # '/api/v4/contacts/custom_fields',
        # '/api/v4/companies/custom_fields',
        # '/api/v4/customers/custom_fields',
        # '/api/v4/customers/segments/custom_fields',
    ]
    for path in urls:
        collector = []
        params = {
            'page': 1,
            'limit': 50
        }
        url = ROOT_URL + path
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            print(response.text)
            raise Exception
        data = response.json()
        collector.append(data)
        links = data.get('_links')
        next = links.get('next', {}).get('href', None)
        counter = 1
        while next and counter < 13:
            response = requests.get(next, headers=headers)
            links = data.get('_links')
            next = links.get('next', {}).get('href', None)

            data = response.json()
            collector.append(data)
            counter += 1

        return collector
