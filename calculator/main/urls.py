from django.urls import path
from django.views.generic import TemplateView

from .views import CalculationView

app_name = 'main'
urlpatterns = [
    path("test",
         TemplateView.as_view(template_name="main\index.html"),
         name="app",
         ),
    path('<int:calc_id>', CalculationView.as_view())
]
# urlpatterns += staticfiles_urlpatterns
