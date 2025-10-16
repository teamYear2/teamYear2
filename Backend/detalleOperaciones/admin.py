from django.contrib import admin
from .models import DetalleOperaciones


@admin.register(DetalleOperaciones)
class DetalleOperacionesAdmin(admin.ModelAdmin):
    """
    Configuración del panel de administración para DetalleOperaciones
    """
    list_display = ('idOperaciones', 'producto',
                    'tipo_operacion', 'cantidad', 'inventario', 'fecha')
    list_filter = ('tipo_operacion', 'fecha', 'producto')
    search_fields = ('producto__nombre', 'producto__codigo',
                     'inventario__idInventario')
    ordering = ('-fecha',)  # Más recientes primero

    # Campos de solo lectura
    readonly_fields = ('idOperaciones', 'fecha')

    # Configuración del formulario
    fieldsets = (
        ('Información de la Operación', {
            'fields': ('idOperaciones', 'tipo_operacion', 'cantidad', 'fecha')
        }),
        ('Referencias', {
            'fields': ('producto', 'inventario')
        }),
    )

    def has_delete_permission(self, request, obj=None):
        """Permite eliminar operaciones"""
        return True

    # Mostrar conteo de operaciones
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['title'] = 'Gestión de Operaciones de Inventario'
        return super().changelist_view(request, extra_context=extra_context)
