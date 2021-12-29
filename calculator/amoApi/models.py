from django.db import models


class Token(models.Model):

    token_type = models.CharField(max_length=40)
    expires_in = models.IntegerField()
    access_token = models.TextField(null=True, blank=True)
    refresh_token = models.TextField(null=True, blank=True)


class Lead(models.Model):
    lead_id = models.IntegerField(unique=True, verbose_name='id лида')
    material = models.CharField(
        max_length=50, null=True, blank=True, verbose_name='материал')
    specialist = models.CharField(
        max_length=50, null=True, blank=True, verbose_name='мастер')
    contract_number = models.CharField(
        max_length=10, null=True, blank=True, verbose_name='номер договора')
    contract_start_date = models.IntegerField(null=True, default=0,
                                              verbose_name='дата начала')
    contract_duration = models.IntegerField(null=True, default=0,
                                            verbose_name='срок по договору')
    work_duration = models.IntegerField(null=True, default=0,
                                        verbose_name='срок изготовления')
    work_start_date = models.IntegerField(null=True, default=0,
                                          verbose_name='дата передачи в работу')

    status_id = models.IntegerField(
        null=True, default=0, verbose_name='id воронки')
    # must_be_ready = models.IntegerField(null=True,)

    class Meta:
        ordering = ['contract_start_date']

    def __repr__(self):
        return self.contract_number

    def __str__(self):
        return self.contract_number


class CustomFields(models.Model):
    field_id = models.IntegerField()
    field_name = models.CharField(default='0', max_length=50)
    field_type = models.CharField(default='str', max_length=20)

    def __repr__(self):
        return self.field_name

    def __str__(self):
        return self.field_name
