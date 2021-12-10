from django.contrib import admin

import nested_admin


from stonepricelist.models import AcrylicCollection, AcrylicManufacturer, Colors, Currency, Texture, Thickness, AcrylicStone, AcrylicConfiguration, SurfaceType, SlabSize, ConfigurationDiscount, Material


class AcrylicConfigurationAdmin(nested_admin.NestedModelAdmin):
    model = AcrylicConfiguration
    list_display = ('__str__', 'thickness', 'price', 'material_discount')
    list_filter = ('collection__manufacturer',)
    # fields = ('price',)


# class AcrylicStoneAdmin(admin.ModelAdmin):
#     inlines = [AcrylicConfigurationInline]

class AcrylicConfigurationInline(nested_admin.NestedStackedInline):
    model = AcrylicConfiguration



class AcrylicCollectionAdmin(nested_admin.NestedModelAdmin):
    inlines = [AcrylicConfigurationInline]
    list_filter = ('manufacturer',)

class AcrylicCollectionInline(nested_admin.NestedStackedInline):
    model = AcrylicCollection
    inlines = [AcrylicConfigurationInline]

class AcrylicManufaturerAdmin(nested_admin.NestedModelAdmin):
    inlines = [AcrylicCollectionInline]


admin.site.register(AcrylicCollection, AcrylicCollectionAdmin)
admin.site.register(AcrylicManufacturer, AcrylicManufaturerAdmin)
admin.site.register(Colors)
admin.site.register(Currency)
admin.site.register(Thickness)
admin.site.register(Texture)
admin.site.register(Material)
admin.site.register(AcrylicStone)
admin.site.register(AcrylicConfiguration, AcrylicConfigurationAdmin)
admin.site.register(SurfaceType)
admin.site.register(SlabSize)
admin.site.register(ConfigurationDiscount)
