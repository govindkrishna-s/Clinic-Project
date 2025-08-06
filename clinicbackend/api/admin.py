from django.contrib import admin
from api.models import Doctor,Appointment
# Register your models here.

admin.site.site_header = "Clinic Admin Panel"
admin.site.site_title = "Clinic Admin"
admin.site.index_title = "Manage Appointments and Doctors"

admin.site.register(Doctor)
admin.site.register(Appointment)


