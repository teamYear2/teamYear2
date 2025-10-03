from django.urls import path, include
from rest_framework.routers import DefaultRouter
from inventarios.views import InventarioViewSet, contenido_inventario

router = DefaultRouter()
router.register(r'inventarios', InventarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('inventarios/<int:idInventario>/contenido/', contenido_inventario),
]
