from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from api.views import UserProfileApiView,DoctorListView,AppointmentCreateView,AppointmentListView, LogoutView, SignupView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='api_signup'),
    path('login/',obtain_auth_token,name='api-login'),
    path('logout/', LogoutView.as_view(), name='api_logout'),
    path('profile/',UserProfileApiView.as_view(),name='user_profile'),
    path('doctors/',DoctorListView.as_view(),name='doctor_list'),
    path('appointments/',AppointmentListView.as_view(),name='appointments_list'),
    path('appointments/create/',AppointmentCreateView.as_view(),name='appointments_create')
]