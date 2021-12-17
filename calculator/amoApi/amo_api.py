import requests
from requests.structures import CaseInsensitiveDict
from .models import Lead
# FILTER_STRING = '?filter[tags_logic]=or&filter[pipe][946942][]=18032857&filter[pipe][946942][]=18032860&filter[pipe][946942][]=18032863&filter[pipe][946942][]=18033010&filter[pipe][946942][]=18062053'

QUERY_URL = 'https://unirock.amocrm.ru/api/v4/leads?limit=250&?filter[tags_logic]=or&filter[pipe][946942][]=18032857&filter[pipe][946942][]=18032860&filter[pipe][946942][]=18032863&filter[pipe][946942][]=18033010&filter[pipe][946942][]=18062053'
IMPORTANT_STATUS = ['18032857', '18062053',
                    '18032860', '18032863', '39719170', '18033010']


def getLeads(a_token: str, page=1):
    url = f"{QUERY_URL}&page={page}"

    headers = CaseInsensitiveDict()
    headers["Authorization"] = "Bearer %s" % a_token

    response = requests.get(url, headers=headers, timeout=5)

    if response.status_code == 204:  # выход из рекурсии
        return []

    leads = response.json().get('_embedded', {}).get('leads', [])
    if len(leads < 250):
        return leads
    next_page = getLeads(a_token, page + 1)

    if not next_page:
        return leads
    else:
        return leads + next_page


def handle_webhook(webhook_data: dict):
    hook_type = webhook_data.get('hook_type', None)
    status_id = webhook_data.get('status_code', 0)
    hook_data = webhook_data.get('hook_data', None)

    try:
        lead = Lead.objects.get(lead_id=hook_data.lead_id)
    except Lead.DoesNotExist:
        lead = None
        hook_data.delete()

    if lead:
        if hook_type == 'delete' or status_id not in IMPORTANT_STATUS:
            lead.delete()
            hook_data.delete()
        else:
            hook_data.save()
    elif hook_type != 'delete' and status_id in IMPORTANT_STATUS:
        hook_data.save()
