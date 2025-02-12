from django.urls import path
from . import views


urlpatterns = [
    path("user/login", views.MyTokenObtainPairView.as_view(), name="login"),
    path("users", views.getUsers, name="users"),
    path("users/profile", views.getUserProfile, name="user-profile"),
    path("users/profile/update", views.updateUserProfile, name="user-profile-update"),
    path("users/register", views.registerUser, name="register"),
    
    
    path("products/", views.getProducts, name="products"),
    path("products/<str:pk>", views.getProduct, name="product"),
    
    
    path("orders/add", views.addOrderItems, name="orders-add"),
    path("orders/<str:pk>", views.getOrderById, name="user-order"),
    path("orders/<str:pk>/pay", views.updateOrderToPaid, name="pay"),
    
    
    
    

]