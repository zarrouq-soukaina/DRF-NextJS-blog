from django.contrib import admin

# Register your models here.
from mptt.admin import MPTTModelAdmin

from .models import (
    Category,
    Blog,
    BlogImage,
)

admin.site.register(Category, MPTTModelAdmin)
class BlogImageInline(admin.TabularInline):
    model = BlogImage

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    inlines = [
        BlogImageInline,
    ]