from django.contrib.auth.models import User
from django.db import models


class ServicePricelist(models.Model):
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, default=1, related_name='created_pricelists', verbose_name='создатель')
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)

    variables = models.JSONField()

    class Meta:
        ordering = ['-created_at']


class DefaultPricelist(models.Model):
    pricelist = models.ForeignKey(
        ServicePricelist, on_delete=models.PROTECT, related_name='default_status', null=True, blank=True)

    def save(self):
        count = DefaultPricelist.objects.all().count()
        save_permission = DefaultPricelist.has_add_permission(self)
        if save_permission or count == 0:
            super(DefaultPricelist, self).save()

    def has_add_permission(self):
        return DefaultPricelist.objects.filter(id=self.id).exists()

    def __bool__(self):
        return True


class ServiceModule(models.Model):
    pricelist = models.ForeignKey(
        ServicePricelist, on_delete=models.CASCADE, related_name='modules', verbose_name='прайс-листы')

    name = models.CharField(max_length=50)
    options = models.JSONField()


class ServiceModuleField(models.Model):

    # class FieldTypes(models.TextChoices):
    #     INPUT_STRING = 'INP', 'Ввод'
    #     NUMBER = 'NUM', 'Число'
    #     CHOICES = 'CHO', 'Селектор'
    #     RADIO = 'RAD', 'Радио'
    #     BOOLEAN = 'BOO', 'Переключатель'

    # type = models.CharField(
    #     max_length=3,
    #     choices=FieldTypes,
    #     default=FieldTypes.NUMBER
    # )

    module = models.ForeignKey(
        ServiceModule, on_delete=models.CASCADE, related_name='fields')
    options = models.JSONField()


class Estimation(models.Model):
    created_by = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name='estimations', verbose_name='создатель')
    created_at = models.DateTimeField(auto_now_add=True)

    title = models.TextField(null=True, blank=True)
    amo_lead_id = models.CharField(max_length=10, null=True, blank=True)
    pricelist = models.ForeignKey(ServicePricelist, on_delete=models.PROTECT)

    iteration_group = models.PositiveSmallIntegerField(default=0)
    iteration_version = models.PositiveSmallIntegerField(default=1)

    state = models.JSONField()

    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ['amo_lead_id',
                           'iteration_group', 'iteration_version']
