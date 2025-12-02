from django.contrib import admin
from django.urls import path
from api.views import (
    predict_view,
    signup_view,
    login_view,
    logout_view,
    current_user_view,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/predict/", predict_view),
    path("api/signup/", signup_view),
    path("api/login/", login_view),
    path("api/logout/", logout_view),
    path("api/me/", current_user_view),
]
