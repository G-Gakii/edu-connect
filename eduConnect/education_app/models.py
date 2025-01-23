from django.db import models
from django.contrib.auth.models import User

Subjects=[
    ('MATH',"MATHEMATICS"),
    ("SCIENCE",'Science'),
    ("HUMANITIES","Humanities"),
    ("LANGUAGES",'languages'),
    ("ART",'art'),
    ('TECH', 'Technology'),
]

# Create your models here.

class Question(models.Model):
   
    student_name=models.ForeignKey(User,on_delete=models.CASCADE)
    category=models.CharField(max_length=10,choices=Subjects)
    Question=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.student_name


class Answer(models.Model):
    name=models.ForeignKey(User,on_delete=models.CASCADE)
    answer=models.TextField()
    question=models.ForeignKey(Question,on_delete=models.CASCADE,related_name="answer")
    thumbs_up=models.PositiveIntegerField(default=0)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    