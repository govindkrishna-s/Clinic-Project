from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, views, status

from rest_framework.permissions import IsAuthenticated
from api.serializers import UserRegistrationSerializer, UserSerializer, DoctorSerializer, AppointmentSerializer
from api.models import Doctor, Appointment
from django.contrib.auth.models import User
from api.permissions import IsOwner
# Create your views here.

class SignupView(views.APIView):
    def post(self, request):
        user_data = request.data.get('user', {})
        serializer = UserRegistrationSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileApiView(views.APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class DoctorListView(generics.ListAPIView):
    queryset=Doctor.objects.all()
    serializer_class=DoctorSerializer

class AppointmentCreateView(generics.CreateAPIView):
    serializer_class=AppointmentSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class AppointmentListView(generics.ListAPIView):
    serializer_class=AppointmentSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        return Appointment.objects.filter(patient=user).order_by('-appointment_date')
    
class AppointmentDeleteView(generics.DestroyAPIView):
    queryset = Appointment.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]
    
class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)