from django.contrib import admin
from app.models import CurrentNumber, News


# Register your models here.
@admin.register(CurrentNumber)
class CurrentNumberAdmin(admin.ModelAdmin):
    pass


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    pass
