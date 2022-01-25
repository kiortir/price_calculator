from django.urls import path
from .views import (CalculationTemplateEditor, CalculationView, NewCalc,
                    SaveCalc, SaveTemplate)

app_name = 'main'
urlpatterns = [
    path('template/new', CalculationTemplateEditor.as_view()),
    path('template/<int:template_id>', CalculationTemplateEditor.as_view()),
    path('template/save', SaveTemplate),
    path('new', NewCalc.as_view()),
    path('<int:calc_id>', CalculationView.as_view()),
    path('save', SaveCalc),
]
