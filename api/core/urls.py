from django.urls import path
from .views import RegisterViewApi
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import ResistanceView, SurfaceView

urlpatterns = [
    path('register/', RegisterViewApi.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('resistance/', ResistanceView.as_view(), name='resistance'),
    path('surface/', SurfaceView.as_view(), name='surface'),
]
