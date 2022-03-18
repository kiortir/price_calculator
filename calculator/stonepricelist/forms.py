
import django.forms as forms
from .models import AcrylicStone, EquivalentGroup, AcrylicManufacturer
from django.forms.widgets import TextInput
from django.contrib.admin.widgets import FilteredSelectMultiple


class AddEquivalentsForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(AddEquivalentsForm, self).__init__(*args, **kwargs)

        self.fields['explicit_equivalents'] = forms.ModelMultipleChoiceField(
            label="Аналоги",
            queryset=AcrylicStone.objects.select_related(
                "equivalents_group").exclude(id=self.instance.id),
            widget=FilteredSelectMultiple(
                verbose_name="акриловые текстуры", is_stacked=False),
            required=False
        )

        self.equivalent_group = self.instance.equivalents_group

        if self.equivalent_group is not None:
            self.fields["explicit_equivalents"].initial = (
                self.equivalent_group.stones.all()
            )

    explicit_equivalents = forms.ModelMultipleChoiceField(
        label="Аналоги",
        queryset=None,
        widget=FilteredSelectMultiple(
            verbose_name="акриловые текстуры", is_stacked=False),
        required=False
    )

    def save(self, commit=True):
        explicit_equivalents = self.cleaned_data.get(
            'explicit_equivalents', None)
        if len(explicit_equivalents) == 0:
            self.instance.equivalents_group = None
        else:
            groups = []
            for equivalent in explicit_equivalents:
                group = equivalent.equivalents_group
                if group is not None:
                    groups.append(group)

            if len(groups) > 1:
                union_group = EquivalentGroup.objects.create()
                EquivalentGroup.objects.filter(id__in=set(
                    map(lambda x: x.id, groups))).delete()
            elif len(groups) == 1:
                union_group = groups[0]
            else:
                union_group = EquivalentGroup.objects.create()
            explicit_equivalents.update(equivalents_group=union_group)
            self.instance.equivalents_group = union_group
        self.instance.save
        return super(AddEquivalentsForm, self).save(commit=commit)

    class Meta:
        model = AcrylicStone
        fields = ('__all__')


class AcrylicManufacturerForm(forms.ModelForm):
    class Meta:
        model = AcrylicManufacturer
        fields = '__all__'
        widgets = {
            'card_color': TextInput(attrs={'type': 'color'}), }


class QuartzConfigurationInlineForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        print([f.name for f in self.instance._meta.get_fields()])
        print(self.instance.stone)
        # self.fields['thickness'].queryset = self.instance.stone.all()#stone.manufacturer.thickness_configurations.all()
