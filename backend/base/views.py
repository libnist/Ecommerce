from rest_framework.decorators import api_view
from rest_framework.response import Response, Order, OrderItem, ShippingAddress
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Product, User
from .serializers import (ProductSerializer, MyTokenObtainPairSerializer, UserSerializer,
                          UserSerializerWithToken)

from .products import products

# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProduct(request, pk):

    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    serializer = UserSerializerWithToken(user, many=False)

    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]

    if data["password"] != "":
        user.set_password(data["password"])

    user.save()

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminUser])
def getUsers(request):
    users = User.objects.all()

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)


@api_view(["POST"])
def registerUser(request):
    data = request.data

    try:

        user = User.objects.create(
            first_name=data["name"],
            username=data["email"],
            email=data["email"],

        )

        user.set_password(data["password"])
        user.save()

        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)
    except:
        message = {"message": "User already exists."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response({"detail": "No Order Items."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create order
        
        order = Order.objects.create(
            user=user,
            paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"]
        )

        # (2) Create shipping address

        # (3) Create order items adn set order to orderItem relation ship
        
        # (4) Update product stock

    return Response("ORDER")
