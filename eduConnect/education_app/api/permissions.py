from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    

    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True

        
        return obj.student_name == request.user
    
    
class IsRespondentOrReadOnly(permissions.BasePermission):
    

    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True

        
        return obj.name == request.user