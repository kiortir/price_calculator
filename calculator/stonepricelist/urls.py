from django.urls import include, path
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'acryldefault', views.DefaultAcrylPricelist)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('acryl/collectioninfo/', views.AcrylicCollectionView.as_view()),
    path('acryl/stones/', views.AcrylicStonesView.as_view()),
    path('acryl/', views.AcrylPricelist.as_view()),
    path('acryl/default/', views.DefaultAcrylPricelist.as_view()),
    path('acryl/work/', views.AcrylicWorkView.as_view()),
    path('find/', views.FindStone.as_view()),
    path('prox/', views.crossdomainData.as_view()),
    path('currency/', views.CurrencyCSV.as_view()),
]
