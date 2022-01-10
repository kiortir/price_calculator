from django.db import models


class SpecialistsCount(models.Model):
    alias = models.CharField(max_length=50, default='qz_specialists')
    count = models.SmallIntegerField(default=5)
