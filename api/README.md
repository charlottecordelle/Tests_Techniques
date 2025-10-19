# API Django

## Installation :
```bash
1. Cloner le dépôt :  
git clone <https://github.com/charlottecordelle/Tests_Techniques.git>
cd Tests_Techniques/api

2. Activer l'environnement virtuel :
- source env/bin/activate

3. Installer les dépendances :
- pip install -r requirements.txt

4. Appliquer les migrations :
- python manage.py migrate

5. Lancer le serveur :
- python manage.py runserver
```

## Endpoints API :
**Créer un utilisateur**
URL : http://127.0.0.1:8000/core/register/
Méthode : post
Payload (exemple): {
    "username": "caroline",
    "password": "ok1234"
}

**Se connecter (Login)**
URL : http://127.0.0.1:8000/core/login/
Méthode : post 
Payload (exemple): {
    "username": "caroline",
    "password": "ok1234"
}
Réponse : {
    "access": "<ACCESS_TOKEN>",
    "refresh": "<REFRESH_TOKEN>"
} (C'est l'access token qu'il faut rentrer dans le header de Resistance) 

**Calculer une surface**
URL : http://127.0.0.1:8000/core/surface/
Méthode : Post
Payload : { 
    "width": 5, 
    "height": 5
}

**Calculer la résistance thermique**
URL : http://127.0.0.1:8000/core/resistance/
Méthode : post
Authentification : Bearer Token (Utiliser le token access reçu dans la réponse du login)
Payload : {
  "layers": [
    { "material": "polystyrene", "thickness": 0.1, "lambda": 0.08 },
    { "material": "brique", "thickness": 0.2, "lambda": 0.123 }
  ]
}