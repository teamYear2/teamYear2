from django.urls import path, include
from rest_framework.routers import DefaultRouter
from detalleOperaciones.views import DetalleOperacionesViewSet

router = DefaultRouter()
router.register(r'detalle-operaciones', DetalleOperacionesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
