from django.urls import path
import stonepricelist.quartz_views as views

app_name = 'stonepricelist'

urlpatterns = [
    path('', views.QuartzPricelist.as_view()),
    path('flush/', views.FlushCache.as_view()),
    path('stone/', views.QuartzStoneData.as_view()),
    path('stones/', views.QuartzData.as_view()),
    path('manufacturer/', views.ManufacturerData.as_view()),
    path('manufacturers/', views.ManufacturersBasic.as_view()),
]
