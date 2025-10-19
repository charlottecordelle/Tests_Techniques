from rest_framework import generics
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Endpoint pour créer un nouvel utilisateur
class RegisterViewApi(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Endpoint pour calculer la résistance thermique
class ResistanceView(APIView):
    permission_classes = [IsAuthenticated] # Il faut s'authentifier

    def post(self, request):
        layers = request.data.get('layers', [])
        if not layers:
            return Response({"error": "Aucune couche fournie"}, status=status.HTTP_400_BAD_REQUEST)
        
        details = []
        r_total = 0
        # Calcul de la résistance thermique pour chaque couche
        for layer in layers:
            try:
                thickness = float(layer['thickness'])
                lam = float(layer['lambda'])
                # Vérifie que lambda n'est pas nul
                if lam == 0:
                    return Response({"error": f"Lambda ne peut pas être 0 pour {layer['material']}"}, status=status.HTTP_400_BAD_REQUEST)
                r = round(thickness / lam, 3)
                details.append({"material": layer['material'], "r": r})
                r_total += r
            except KeyError:
                return Response({"error": "Chaque couche doit avoir material, thickness et lambda"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"r_total": round(r_total, 3), "details": details})
    
# Endpoint pour calculer une surface (public)
class SurfaceView(APIView):
    def post(self, request):
        width = request.data.get('width')
        height = request.data.get('height')
        # Vérifie qu'on envoie bien width et height
        if width is None or height is None:
            return Response({"error": "width et height sont requis"}, status=status.HTTP_400_BAD_REQUEST)
        # Calcul de la surface
        try:
            surface = float(width) * float(height)
            return Response({"surface": surface})
        except ValueError:
            return Response({"error": "width et height doivent être des nombres"}, status=status.HTTP_400_BAD_REQUEST)