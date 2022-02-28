from django.urls import path
from .views import (get_estimation_page, get_estimation)

app_name = 'main'

urlpatterns = [
    path('getpage/', get_estimation_page),
    path('estimation/', get_estimation)
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
