
import django.forms as forms
from .models import AcrylicStone, EquivalentGroup
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
