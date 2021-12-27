from types import SimpleNamespace

from .models import CustomFields, Lead


def response(lead_response: dict) -> Lead:

    custom_fields_entries = CustomFields.objects.all()
    custom_fields_dict = {field.field_id: {'name': field.field_name, 'type': field.field_type} for field in
                          custom_fields_entries}

    custom_fields = lead_response.get('custom_fields_values', [])

    lead_dict = {'lead_id': lead_response.get('id', 0),
                 'status_id': lead_response.get('status_id', 0)}

    for field in custom_fields:
        field_id = field.get('field_id', 0)
        field_info = custom_fields_dict.get(field_id, None)
        if field_info:
            field_name = field_info.get('name', '')
            field_value = field.get('values', [])[0].get('value', None)
            lead_dict[field_name] = field_value

    return lead_dict


def webhook(lead_webhook):

    custom_fields_entries = CustomFields.objects.all()
    custom_fields_dict = {field.field_id: {'name': field.field_name, 'type': field.field_type} for field in
                          custom_fields_entries}

    lead_info = lead_webhook['leads']
    hook_type = list(lead_info.keys())[0]
    lead_fields = lead_info[hook_type][0]

    lead_dict = {'lead_id': lead_fields['id']}
    lead_dict['status_id'] = lead_fields['status_id']

    custom_fields = lead_fields['custom_fields']
    for field in custom_fields:
        field_id = field['id']
        field_info = custom_fields_dict.get(field_id, None)
        if field_info:
            field_name = field_info.get('name', '')
            field_value = field['values'][0]
            if isinstance(field_value, dict):
                field_value = field_value['value']

            lead_dict[field_name] = field_value
    print({
        'hook_type': hook_type,
        'status_id': lead_fields['status_id'],
        'hook_data': lead_dict
    })
    return {
        'hook_type': hook_type,
        'status_id': lead_fields['status_id'],
        'hook_data': lead_dict
    }
