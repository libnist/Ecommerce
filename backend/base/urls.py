from django.urls import path
from . import views


urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("user/login", views.MyTokenObtainPairView.as_view(), name="login"),
    path("users", views.getUsers, name="users"),
    path("users/profile", views.getUserProfile, name="user-profile"),
    
    path("products/", views.getProducts, name="products"),
    path("products/<str:pk>", views.getProduct, name="product"),
    
    

]