from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Doctor(models.Model):
    name=models.CharField(max_length=100)
    speciality=models.CharField(max_length=100)
    department=models.CharField(max_length=100)

    def __str__(self):
        return f"Dr. {self.name} - {self.speciality}"
    
class Appointment(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    patient_name=models.CharField(max_length=100)
    age=models.PositiveIntegerField()
    appointment_date=models.DateField()
    doctor=models.ForeignKey(Doctor, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Appointment for {self.patient_name} with {self.doctor} on {self.appointment_date}"