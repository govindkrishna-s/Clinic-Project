from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from api.serializers import UserSerializer, DoctorSerializer, AppointmentSerializer
from api.models import Doctor, Appointment
# Create your views here.

class UserProfileApiView(views.APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class DoctorListView(generics.ListAPIView):
    queryset=Doctor.objects.all()
    serializer_class=DoctorSerializer

class AppointmentCreateView(generics.CreateAPIView):
    serializer_class=AppointmentSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class AppointmentListView(generics.ListAPIView):
    serializer_class=AppointmentSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Appointment.objects.filter(patient=user).order_by('-appointment_date')