from django.urls import path

from .views import TableView, UpdateCount

app_name = 'production_graph'
urlpatterns = [

    path('table', TableView.as_view()),
    path('updatecount', UpdateCount.as_view())
]
# urlpatterns += staticfiles_urlpatterns
