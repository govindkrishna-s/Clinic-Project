from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Doctor,Appointment, User
from django.utils import timezone

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id', 'email']

    
class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Doctor
        fields=['id','name','speciality','department']
        read_only_fields=['id']

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)
    doctor_id=serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(), source='doctor', write_only=True
    )
    class Meta:
        model=Appointment
        fields=['id','patient_name','age','appointment_date','doctor','doctor_id']
        read_only_fields=['id', 'patient']

    def validate_appointment_date(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError('Appointment date cannot be in the past.')
        return value