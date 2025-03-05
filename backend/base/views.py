from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Product, User, Order, OrderItem, ShippingAddress
from .serializers import (ProductSerializer, MyTokenObtainPairSerializer, UserSerializer,
                          UserSerializerWithToken, OrderSerializer)

from datetime import datetime

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

@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name="sample name",
        price=0,
        brand="sample brand",
        countInStock=0,
        category="sample category",
        description=""
    )    
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    
    product.name = data["name"]
    product.price = data["price"]
    product.brand = data["brand"]
    product.countInStock = data["countInStock"]
    product.category = data["category"]
    product.description = data["description"]
    
    product.save()
    
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

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = User.objects.get(id=pk)


    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    user.is_staff = data["isAdmin"]

    user.save()
    
    serializer = UserSerializer(user, many=False)
    

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminUser])
def getUsers(request):
    users = User.objects.all()

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    users = User.objects.get(id=pk)

    serializer = UserSerializer(users, many=False)

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

        shippingAddress = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"],
        )

        # (3) Create order items adn set order to orderItem relation ship
        
        for i in orderItems:
            product = Product.objects.get(_id=i["product"])
            
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i["qty"],
                price=i["price"],
                image=product.image.url
            )
            
            # (4) Update product stock
            
            product.countInStock -= item.qty
            product.save()
            
    serailizer = OrderSerializer(order, many=False)

    return Response(serailizer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user;
    try:
        order = Order.objects.get(_id=pk)
        
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({"detail": "Not authorized to view this order"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"detail": "Order does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    
    order.isPaid = True
    order.paidAt = datetime.now()
    
    order.save()
    return Response("Order was paid")

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User was deleted.")

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Product was deleted.")

@api_view(["POST"])
def uploadProductImage(request):
    data = request.data
    
    product_id = data["product_id"]
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get("image")
    product.save()
    return Response("Image was saved successfuly", status=status.HTTP_200_OK)