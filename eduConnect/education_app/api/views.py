
from education_app.models import Question,Answer
from education_app.api.serializer import QuestionSerializer,AnswerSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from rest_framework import filters

from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from education_app.api.permissions import IsOwnerOrReadOnly,IsRespondentOrReadOnly
from education_app.api.pagination import PageSize


class QuestionList(generics.ListCreateAPIView):
    queryset = Question.objects.all().order_by('-created_at'
)
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['category','Question']
   
    ordering_fields = [' created_at']
    
    def perform_create(self, serializer):
        serializer.save(student_name=self.request.user)


class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsOwnerOrReadOnly]
    
    def perform_update(self, serializer):
       serializer.save(student_name=self.request.user)
       
    def perform_destroy(self, instance):
       instance.delete()
       return Response({"message":"Question deleted successfully"},status=status.HTTP_204_NO_CONTENT)
   
   
# class AnswerList(generics.ListAPIView):
    
#     serializer_class = AnswerSerializer
#     pagination_class = PageSize
    
    
#     def get_queryset(self):
#         pk=self.kwargs['pk']
#         return Answer.objects.filter(question=pk)
    
    
        
        
class AnswerCreate(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
      pk=self.kwargs["pk"]
      question=Question.objects.get(pk=pk)
      name=self.request.user
      answer_queryset=Answer.objects.filter(question=question,name=name)
      if answer_queryset.exists():
          raise ValidationError("You already answered the question.")
      
      serializer.save(question=question,name=name)
      
    


class AnswerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsRespondentOrReadOnly]
    
    def perform_update(self, serializer):
        
        serializer.save(name=self.request.user)
       
    def perform_destroy(self, instance):
       instance.delete()
       return Response({"message":"Question deleted successfully"},status=status.HTTP_204_NO_CONTENT)
   
   
   
class ThumbUp(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request,pk):
        try:
            answer=Answer.objects.get(pk=pk)
            answer. thumbs_up +=1
            answer.save()
            serializer=AnswerSerializer(answer)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Answer.DoesNotExist:
            return Response({"error":"Answer not found"})
            