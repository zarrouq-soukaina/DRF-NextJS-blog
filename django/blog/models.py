from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey

class Category(MPTTModel):

    name = models.CharField(
        verbose_name=_("Category Name"),
        help_text=_("Required and unique"),
        max_length=255,
        unique=True,
    )
    slug = models.SlugField(verbose_name=_("Category safe URL"), max_length=255, unique=True)
    parent = TreeForeignKey("self", on_delete=models.CASCADE, null=True, blank=True, related_name="children")
    is_active = models.BooleanField(default=True)
    class MPTTMeta:
        order_insertion_by = ["name"]

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def get_absolute_url(self):
        return reverse("blog:category_list", args=[self.slug])

    def __str__(self):
        return self.name
class Blog(models.Model):
    
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    title = models.CharField(
        verbose_name=_("title"),
        help_text=_("Required"),
        max_length=255,
    )
    intro = models.TextField(verbose_name=_("intro"), help_text=_(" Required"), default="intro")
    content = models.TextField(verbose_name=_("content"), help_text=_(" Required"), blank=False)
    
    slug = models.SlugField(max_length=255)
    
    is_active = models.BooleanField(
        verbose_name=_("Blog visibility"),
        help_text=_("Change blog visibility"),
        default=True,
    )
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = _("Blog")
        verbose_name_plural = _("Blogs")

    def get_absolute_url(self):
        return reverse("blog:blog_detail", args=[self.slug])

    def __str__(self):
        return self.title

class BlogImage(models.Model):
   

    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="blog_image")
    image = models.ImageField(
        verbose_name=_("image"),
        help_text=_("Upload a blog image"),
        upload_to="images/",
        default="images/default.png",
    )
    alt_text = models.CharField(
        verbose_name=_("Alturnative text"),
        help_text=_("Please add alturnative text"),
        max_length=255,
        null=True,
        blank=True,
    )
    is_feature = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Blog Image")
        verbose_name_plural = _("Blog Images")
