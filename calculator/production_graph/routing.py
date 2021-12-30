from django.conf.urls import url
from production_graph.consumers import GraphConsumer

websocket_urlpatterns = [
    url('ws/update/', GraphConsumer.as_asgi()),
]
