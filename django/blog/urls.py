from django.urls import path

from . import views

app_name = "store"

urlpatterns = [
    path("api/", views.BlogListView.as_view(), name="blog_home"),
    path("api/category/", views.CategoryListView.as_view(), name="categories"),
    path("api/categorieslist/", views.CategoriesListView.as_view(), name="categorieslist"),
    path("api/<slug:slug>/", views.Blog.as_view(), name="blog"),
    path("api/category/<slug:slug>/", views.CategoryItemView.as_view(), name="category_item"),
]