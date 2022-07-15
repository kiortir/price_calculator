from django.urls import path, re_path, include
from stone_pricelist.views import ImportEndpoint, MainView, Manufacturers, Manufacturer, ManufacturerViewset, MaterialViewset, Pricelist
from rest_framework import routers
app_name = 'stone_pricelist'


router = routers.DefaultRouter()
router.register(r'manufacturers', ManufacturerViewset)
router.register(r'materials', MaterialViewset)


urlpatterns = [

    path('api-auth/', include('rest_framework.urls')),
    path('import/', ImportEndpoint.as_view()),
    path('manufacturer', Manufacturer.as_view()),
    path('manufacturers', Manufacturers.as_view()),
    path('stones/', Pricelist.as_view()),
    path('api/', include(router.urls)),
    re_path('/*', MainView.as_view()),
]
