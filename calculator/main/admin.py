from django.contrib import admin

from .models import PriceList, Calculation


# Register your models here.

class ProductTypeAdmin(admin.ModelAdmin):
    pass


class HideModel(admin.ModelAdmin):
    def get_model_perms(self, request):
        """
        Return empty perms dict thus hiding the model from admin index.
        """
        return {}


admin.site.register(PriceList)
admin.site.register(Calculation)
