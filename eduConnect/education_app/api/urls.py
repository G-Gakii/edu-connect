from django.urls import path
from education_app.api.views import QuestionList,QuestionDetail,AnswerDetail,AnswerCreate,ThumbUp

urlpatterns = [
    path("quiz/",QuestionList.as_view(),name="question"),
    path("quiz/<int:pk>",QuestionDetail.as_view(),name="questionDetails"),
    
     path("quiz/<int:pk>/answer-create/",AnswerCreate.as_view(),name="answers"),
    path("answer/<int:pk>",AnswerDetail.as_view(),name="answerdetails"),
    path("answer/<int:pk>/thumb-up/",ThumbUp.as_view(),name="thumbUp")
]
