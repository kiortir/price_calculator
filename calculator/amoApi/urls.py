from django.urls import path, include
# from django.urls.conf import include
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from .views import AmoWebhookEndpoint, amo_get_leads, amo_update_tokens

app_name = 'amoApi'
urlpatterns = [
    path('hook', csrf_exempt(AmoWebhookEndpoint.as_view())),
    path('leads', amo_get_leads),
    path('tokens', amo_update_tokens)
]
