from django.contrib import admin
from .models import CustomFields, Lead, Token


# Register your models here.
admin.site.register(CustomFields)
admin.site.register(Lead)
admin.site.register(Token)
