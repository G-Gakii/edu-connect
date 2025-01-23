from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from user_app.api.views import RegisterUser,logout



urlpatterns = [
    path('login/',obtain_auth_token,name='login'),
    path('register/',RegisterUser,name="register"),
    path('logout/',logout,name="logout")
    
]
