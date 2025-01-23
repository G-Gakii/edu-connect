from education_app.models import Question,Answer
from rest_framework import serializers



        
        
        
        
class AnswerSerializer(serializers.ModelSerializer):
    name=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=Answer
        # fields="__all__"
        exclude=['question']
        
class QuestionSerializer(serializers.ModelSerializer):
    answer=AnswerSerializer(many=True,read_only=True)
    student_name = serializers.StringRelatedField(source='student_name.username', read_only=True)
    class Meta:
        model=Question
        fields=['id', "category",
        "Question",
        "student_name",
        "created_at",
        "answer"
        ]
        read_only_fields=['student_name']