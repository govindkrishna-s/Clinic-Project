from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import (
    SignupView, 
    UserProfileApiView, 
    DoctorListView, 
    DoctorDetailView,
    AppointmentListView,
    AppointmentCreateView,
    AppointmentDeleteView,
    LogoutView
)

urlpatterns = [
    path('users/signup', SignupView.as_view(), name='user_signup'),
    path('logout/',LogoutView.as_view(),name='user_logout'),
    path('users/me', UserProfileApiView.as_view(), name='user_profile'),
    path('doctors', DoctorListView.as_view(), name='doctor_list'),
    path('doctors/<int:pk>/', DoctorDetailView.as_view(), name='doctor_detail'),
    path('appointments', AppointmentListView.as_view(), name='appointments_list'),
    path('appointments/create/', AppointmentCreateView.as_view(), name='appointments_create'),
    path('appointments/<int:pk>/delete/', AppointmentDeleteView.as_view(), name='appointment_delete'),

]