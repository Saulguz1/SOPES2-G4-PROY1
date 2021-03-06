from flask import Flask, request, jsonify, Response
from flask_api import status
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import json_util
from pymongo import MongoClient


app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False

# cambiar la ip de la EC2 o localhost cuando se corra
#app.config['MONGO_URI'] = "mongodb://proyectoso2:proyectoso2passusac@mongodb:27017/proy1?authSource=admin"
app.config['MONGO_URI'] = "mongodb://proyectoso2:proyectoso2passusac@34.71.30.237:27017/proy1?authSource=admin"

mongo = PyMongo(app)

@app.route("/")
def prueba():
    response = jsonify({"message": "Hola Este es el Servidor del Proyecto Sopes2!"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# rutas del proyecto

# ruta /addUser  post, recibe json en el body {nombre: ,user: ,password:  ,rpassword: } 
# retorna json {message: 1} si se registro bien o {message: 0} si no coinciden las conrasenas 


@app.route("/addUser", methods=["POST"])
def agregarusuario(): 
    nombre = request.json['nombre']
    user = request.json['user'] 
    password = request.json['password']
    rpassword = request.json['rpassword']
    idN = ""
    if(password != rpassword):
        response = jsonify({"message":0})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    #insert mongo
    if( nombre and user and password):
        idN = mongo.db.usuario.insert(
            {'id_user': user,'nombre':nombre, 'user':user,'password':password, "juegos":[]}
        )
    else:
        response = jsonify({"message":0})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    response = jsonify({"message":1})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


#ruta /login  post, recibe json en el body {user: ,password: }
# retorna un json con toda la informacion { id_user: ,nombre: , user: , password: , juegos: []}
# y el array de juegos del usuario

@app.route("/login",  methods=["POST"])
def login():
    password = request.json['password']
    user = request.json['user'] 
    login = mongo.db.usuario.find({ 'user': user , 'password': password } )
    response = json_util.dumps(login)
    print(response)
    response = Response(response, mimetype='application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ruta /todosjuegos , GET, no recibe nada
# retorna un json con todos los juegos de la tabla de juegos (la de la tienda)

@app.route("/todosjuegos",  methods=["GET"])
def juegos():
    juegos = mongo.db.juego.find({})
    response = json_util.dumps(juegos)
    response = Response(response, mimetype='application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ruta /addjuegousuario , POST, recibe en el body json {user: , juego: }
# el user es el usuario donde se ira a ingresar el juego y el juego es el nombre que se toma como id del juego
# lo inserta en el array de juegos del usuario
# si no estoy mal retorna el array con los nuevos valores pero hay que ver xdxd

@app.route("/addjuegousuario",  methods=["POST"])
def agregarbiblioteca():
    id_user = request.json['user']
    id_juego = request.json['juego']
    myquery = { "id_user": id_user }
    newvalues = { "$push": {"juegos": id_juego} }
    addjuego = mongo.db.usuario.update_one(myquery, newvalues)
    response = jsonify({"message":0})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# ruta /descarga , POST, recibe en el body json {nombre: }  ....  (el nombre del juego a donde se insertara)
# solamente agrega una "," al array que tienen los jeugos de descargar entonces para contarlas solo seria
# array.lenght y ya .., esta solo invocala a la hora de hacer click en descargar 

@app.route("/descarga",  methods=["POST"])
def subirdescarga():
    nombre = request.json['nombre']
    myquery = { "nombre": nombre }
    newvalues = { "$push": {"descargas": "new"} }
    adddescarga = mongo.db.juego.update_one(myquery, newvalues)
    response = jsonify({"message":0})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ruta /addjuegocatalogo ,POST, recibe en el body  {nombre: ,categoria: , precio: , imagen: }
# la imagen es la url de una imagen de internet 
# esta ruta la utilizaremos solo con postman para ingresar datos a la base de datos
# no va implementada al proyecto solo es para llenar la tabla.

@app.route("/addjuegocatalogo", methods=["POST"])
def agregarnuevojuego(): 
    nombre = request.json["nombre"]
    categoria = request.json["categoria"] 
    precio = request.json["precio"]
    imagen = request.json["imagen"]
    idN = ""

    #insert mongo
    if( nombre and categoria and precio and imagen):
        idN = mongo.db.juego.insert(
            {'nombre': nombre,'categoria':categoria, 'precio':precio,'imagen':imagen, "descargas":[]}
        )
    else:
        response = jsonify({"message":0})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    response = jsonify({"message":1})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

