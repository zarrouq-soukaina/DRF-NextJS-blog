from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from . import models
from .models import Category, Blog
from .serializers import CategorySerializer, BlogSerializer

class BlogListView(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class Blog(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class CategoryItemView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        return models.Blog.objects.filter(
            category__in=Category.objects.get(slug=self.kwargs["slug"]).get_descendants(include_self=True)
        )


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(level=1)
    serializer_class = CategorySerializer
class CategoriesListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
