from django.urls import include, path
from . import views
import stonepricelist.quartz_urls

urlpatterns = [
    path('quartz/', include('stonepricelist.quartz_urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('acryl/collectioninfo/', views.AcrylicCollectionView.as_view()),
    path('acryl/stones/', views.AcrylicStonesView.as_view()),
    path('acryl/', views.AcrylPricelist.as_view()),
    path('acryl/default/', views.DefaultAcrylPricelist.as_view()),
    path('acryl/work/', views.AcrylicWorkView.as_view()),
    path('find/', views.FindStone.as_view()),
    path('prox/', views.crossdomainData.as_view()),
    path('currency/', views.CurrencyCSV.as_view()),
]
