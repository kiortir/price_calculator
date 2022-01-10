from django.contrib import admin

from .models import SpecialistsCount

# Register your models here.


class SpecialistsCountAdmin(admin.ModelAdmin):
    pass


admin.site.register(SpecialistsCount)
