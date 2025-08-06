from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from api.serializers import UserCreateSerializer, UserSerializer, DoctorSerializer, AppointmentSerializer
from api.models import Doctor, Appointment
from django.contrib.auth.models import User
# Create your views here.

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

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
    
class LogoutView(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)