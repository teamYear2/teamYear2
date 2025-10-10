from django.contrib import admin
from usuarios.models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ['dni', 'nombre', 'apellido', 'email', 'telefono', 'idInventario']
    list_filter = ['idInventario']
    search_fields = ['dni', 'nombre', 'apellido', 'email']
    list_editable = ['telefono']
    
    fieldsets = (
        ('Información Personal', {
            'fields': ('dni', 'nombre', 'apellido', 'email', 'telefono')
        }),
        ('Información del Sistema', {
            'fields': ('idInventario', 'contrasena', 'referido')
        }),
    )
    
    def get_full_name(self, obj):
        return f"{obj.nombre} {obj.apellido}"
    get_full_name.short_description = 'Nombre Completo'
