from rest_framework.decorators import api_view
from rest_framework.response import Response
from user_app.api.serializer import RegisterSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from user_app import models

@api_view(['POST'])
def RegisterUser(request):
    
    if request.method == "POST":
        serializer=RegisterSerializer(data=request.data)
        data={
            
        }
        if serializer.is_valid():
            account=serializer.save()
            data['response']="Registration successful"
            data["username"]=account.username
            data["email"]=account.email
            token=Token.objects.get(user=account).key
            data['token']=token
            return Response(data)
        else:
           return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    
    
@api_view(['POST'])
def logout(request):
    if request.method == 'POST':
        try:
            request.auth.delete()
            return Response({"message":"logout successful"}, status=status.HTTP_200_OK)
        except AttributeError:
            return Response({"error":"Token not found"})
        
    
    


