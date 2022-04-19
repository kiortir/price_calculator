from django.urls import path, re_path, include
from .views import EstimationView, NewEstimation, EstimationAPI, PricelistListView, PricelistAPIView, PricelistModulesAPIView

app_name = 'main'
urlpatterns = [
    path('<int:estimation_id>', EstimationView.as_view()),
    path('new', NewEstimation.as_view()),
    path('api/', EstimationAPI.as_view()),
    path('api/pricelist/', PricelistAPIView.as_view()),
    path('api/pricelist/modules/', PricelistModulesAPIView.as_view()),
    re_path('pricelist/*', PricelistListView.as_view()),
]
