from .models import CustomFields, Lead


class AmoDeserializer:

    @staticmethod
    def query(lead_response: dict) -> Lead:

        custom_fields_entries = CustomFields.objects.all()
        custom_fields_dict = {field.field_id: {'name': field.field_name, 'type': field.field_type} for field in
                              custom_fields_entries}

        custom_fields = lead_response.get('custom_fields_values', [])

        lead_dict = {'lead_id': lead_response.get('id', 0)}

        for field in custom_fields:
            field_id = field.get('field_id', 0)
            field_info = custom_fields_dict.get(field_id, None)
            if field_info:
                field_name = field_info.get('field_name', '')
                field_value = field.get('value', None)
                lead_dict[field_name] = field_value

        lead = Lead.objects.create(**lead_dict)
        return lead

    @staticmethod
    def webhook(lead_webhook: dict):

        custom_fields_entries = CustomFields.objects.all()
        custom_fields_dict = {field.field_id: {'name': field.field_name, 'type': field.field_type} for field in
                              custom_fields_entries}

        lead_info: dict = lead_webhook.get('leads', {})
        if not lead_info:
            raise Exception('Invalid hook!')

        hook_type = list(lead_info.keys())[0]

        lead_fields: dict = lead_info[hook_type][0]

        status_id = lead_fields.get('status_id', 0)

        lead_dict = {'lead_id': lead_fields.get('id', 0)}

        custom_fields = lead_fields.get('custom_fields', [])

        for field in custom_fields:
            field_id = field.get('field_id', 0)
            field_info = custom_fields_dict.get(field_id, None)
            if field_info:
                field_name = field_info.get('field_name', '')
                field_value = field.get('value', None)
                if field_value:
                    field_value = field_value[0]
                    if isinstance(field_value, dict):
                        field_value = field_value.get('value', None)
                lead_dict[field_name] = field_value

        lead = Lead.objects.create(**lead_dict)

        return {
            'hook_type': hook_type,
            'status_id': status_id,
            'hook_data': lead
        }
