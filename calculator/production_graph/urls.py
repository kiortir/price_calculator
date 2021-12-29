from django.urls import path

from .views import TableView

app_name = 'production_graph'
urlpatterns = [

    path('table', TableView.as_view()),

]
# urlpatterns += staticfiles_urlpatterns
