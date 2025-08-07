from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Doctor, Appointment

admin.site.site_header = "Clinic Admin Panel"
admin.site.site_title = "Clinic Admin"
admin.site.index_title = "Manage Appointments and Doctors"

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets
    add_fieldsets = UserAdmin.add_fieldsets
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(Doctor)
admin.site.register(Appointment)