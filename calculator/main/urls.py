from django.urls import path, re_path, include
from .views import (CalculationTemplateEditor, CalculationView,
                    SaveCalc, SaveTemplate, GetTemplate, CalculationResults, CheckPermissions, index, room, CalculationList,)

app_name = 'main'
urlpatterns = [
    path('api/', include('main.api_urls')),
    re_path('/*', CalculationList.as_view()),
    # path('template/new', CalculationTemplateEditor.as_view()),
    # path('template/<int:template_id>', CalculationTemplateEditor.as_view()),
    # path('template/save', SaveTemplate),
    # path('template/get', GetTemplate),
    # path('new', CalculationView.as_view()),
    # path('<int:calc_id>', CalculationView.as_view()),
    # path('save', SaveCalc),
    # path('permissions', CheckPermissions),
    #     path('test', index, name='index'),
    #     path('r/<str:room_name>/', room, name='room'),
    #     path('vite/', CalculationList.as_view())
]
