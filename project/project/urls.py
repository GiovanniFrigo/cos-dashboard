"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app.views import (
    RegistryList,
    RegistryLatest,
    RegistryToday,
    NewsLatest,
    create_registry,
    max_player_count_ever,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("registry/", RegistryList.as_view()),
    path("registry/latest/", RegistryLatest.as_view()),
    path("registry/today/", RegistryToday.as_view()),
    path("registry/maxEver/", max_player_count_ever),
    path("news/latest/", NewsLatest.as_view()),
    # path("e0566b3ccc1c6eec6dace94cc3f9b776/", create_registry),
]
