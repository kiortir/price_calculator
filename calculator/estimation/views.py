from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Estimation, ServicePricelist, ServiceModule, DefaultPricelist
from .serializers import EstimationSerializer, PriceListSerializer, ServiceModuleSerializer


class NewEstimation(TemplateView):
    template_name = 'main/index.html'

    def get(self, request):
        context = {}
        # fork_from = request.GET.get('from')
        # if fork_from:
        #     original_estimation: Estimation = Estimation.objects.get(
        #         pk=fork_from)
        #     context['state'] = original_estimation.state
        #     context['pricelist'] = original_estimation.pricelist
        #     context['created_for'] = original_estimation.created_for
        #     context['iteration_group'] = original_estimation.iteration_group

        # else:
        #     context['pricelist'] = ServicePricelist.objects.latest()
        #     context['state'] = {}

        return render(request, template_name=self.template_name, context=context)


class EstimationView(TemplateView):
    template_name = 'estimation/index.html'

    def get(self, request, parameters):
        context = {}
        estimation_id = parameters.get('estimation_id')
        try:
            # estimation: Estimation = Estimation.objects.get(pk=estimation_id)
            # context['state'] = estimation.state
            # context['pricelist'] = estimation.pricelist
            # context['amo_lead_id'] = estimation.amo_lead_id
            # context['iteration_group'] = estimation.iteration_group
            # context['estimation_id'] = estimation.id
            return render(request, template_name=self.template_name, context=context)
        except Estimation.DoesNotExist:
            # redirect
            return redirect('/new')


class PricelistListView(TemplateView):
    template_name = 'estimation/edit_pricelist.html'

    def get(self, request):
        return render(request, template_name=self.template_name)


class PricelistAPIView(APIView):
    def get(self, request):
        pricelist_id = request.GET.get('id')
        try:
            default_id_entry = DefaultPricelist.objects.first()
            default_id = default_id_entry.pricelist.id
        except (DefaultPricelist.DoesNotExist, AttributeError):
            default_id = None
        if pricelist_id:
            try:
                pricelist = ServicePricelist.objects.get(pk=pricelist_id)
            except ServicePricelist.DoesNotExist:
                return Response(status=404)
            data = PriceListSerializer(pricelist).data
        else:
            data = PriceListSerializer(
                ServicePricelist.objects.all(), many=True).data
        return Response({
            'default': default_id,
            'data': data
        })

    def patch(self, request):
        new_default_id = request.data.get('id')
        try:
            pricelist = ServicePricelist.objects.get(pk=new_default_id)
        except ServicePricelist.DoesNotExist:
            return Response(status=404)
        default_pricelist: DefaultPricelist = DefaultPricelist.objects.first()
        default_pricelist.pricelist = pricelist
        default_pricelist.save()
        return Response(status=200)


class PricelistModulesAPIView(APIView):

    def get(self, request):
        modules = ServiceModule.objects.all()
        data = ServiceModuleSerializer(modules, many=True).data
        return Response(data)


class EstimationAPI(APIView):

    def get(self, request):
        estimation_id = request.GET.get('estimation_id')
        try:
            estimation = Estimation.objects.get(pk=estimation_id)
            serialized_estimation = EstimationSerializer(estimation)
            return Response(serialized_estimation.data)
        except Estimation.DoesNotExist:
            return Response(status=404)

    def post(self, request):
        state = request.data.get('state')
        pricelist_id = request.data.get('pricelist_id')
        title = request.data.get('title')
        amo_lead_id = request.data.get('amo_lead_id')
        iteration_group = request.data.get('iteration_group', 0)
        iteration_version = 1
        related_estimations = Estimation.objects.filter(
            amo_lead_id=amo_lead_id)

        if iteration_group:
            group = related_estimations.filter(
                iteration_group=iteration_group)
            iteration_version = group.latest(
                'iteration_version').iteration_version + 1
        else:
            try:
                iteration_group = related_estimations.latest(
                    'iteration_group').iteration_group + 1
            except Estimation.DoesNotExist:
                pass

        new_estimation: Estimation = Estimation.objects.create(
            amo_lead_id=amo_lead_id,
            title=title,
            iteration_group=iteration_group,
            iteration_version=iteration_version,
            state=state,
            pricelist=ServicePricelist.objects.get(pk=pricelist_id),
            created_by=request.user
        )
        return Response(
            {
                'id': new_estimation.id,
                'iteration_version': new_estimation.iteration_version,
                'iteration_group': new_estimation.iteration_group,
            },
            status=201
        )

    def patch(self, request):
        estimation_id = request.data.get('estimation_id')
        is_active = request.data.get('is_active', False)

        try:
            estimation: Estimation = Estimation.objects.get(pk=estimation_id)
            estimation.is_active = is_active
            estimation.save()
            return Response(status=200)
        except Estimation.DoesNotExist:
            return Response(status=404)
