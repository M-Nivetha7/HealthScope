import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .ml_predictor import predict_disease
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token

@csrf_exempt
def predict_view(request):
    # Allow CORS preflight
    if request.method == "OPTIONS":
        response = JsonResponse({}, status=200)
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        response["Access-Control-Allow-Credentials"] = "true"
        return response

    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    symptoms = data.get("symptoms", [])
    if not isinstance(symptoms, list) or not symptoms:
        return JsonResponse(
            {"error": "symptoms must be a non-empty list"}, status=400
        )

    results = predict_disease(symptoms)

    response = JsonResponse(
        {
            "input": {"symptoms": symptoms},
            "predictions": results,
            "disclaimer": "This is not a medical diagnosis. Please consult a doctor.",
        }
    )
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response["Access-Control-Allow-Credentials"] = "true"
    return response


# ----- SIMPLE AUTH VIEWS (optional, can keep as-is or comment out) -----

@csrf_exempt
def signup_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    data = json.loads(request.body.decode("utf-8"))
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username or not password:
        return JsonResponse({"error": "Username and password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already taken"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return JsonResponse(
        {"message": "Signup successful", "username": user.username}, status=201
    )


@csrf_exempt
def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    data = json.loads(request.body.decode("utf-8"))
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({"error": "Invalid credentials"}, status=400)

    login(request, user)
    token = get_token(request)
    resp = JsonResponse({"message": "Login successful", "username": user.username})
    resp["X-CSRFToken"] = token
    resp["Access-Control-Allow-Origin"] = "http://localhost:3000"
    resp["Access-Control-Allow-Credentials"] = "true"
    return resp


@csrf_exempt
def logout_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    logout(request)
    return JsonResponse({"message": "Logged out"})


def current_user_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"authenticated": False})
    return JsonResponse({"authenticated": True, "username": request.user.username})
