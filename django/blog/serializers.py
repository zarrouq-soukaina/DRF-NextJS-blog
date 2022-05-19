from rest_framework import serializers

from .models import Category, Blog, BlogImage


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImage
        fields = ["image", "alt_text"]


class BlogSerializer(serializers.ModelSerializer):
    blog_image = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ["id", "category", "title", "content", "slug", "blog_image", "intro", "created_at"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "slug"]