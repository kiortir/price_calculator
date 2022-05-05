from django.urls import path, re_path, include
from .views import EstimationView, EstimationAPI, PricelistListView, PricelistAPIView, PricelistModulesAPIView,EstimationAPISearch

app_name = 'estimation'
urlpatterns = [
    path('api/', EstimationAPI.as_view()),
    path('api/search/', EstimationAPISearch.as_view()),
    
    path('api/pricelist/', PricelistAPIView.as_view()),
    path('api/pricelist/modules/', PricelistModulesAPIView.as_view()),
    path('pricelist/', PricelistListView.as_view()),
    re_path('pricelist/*', PricelistListView.as_view()),
    re_path('/*', EstimationView.as_view()),
]
