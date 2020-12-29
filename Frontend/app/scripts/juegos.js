const ip = 'http://34.69.242.195/'


function verLog(){
    if(Number(sessionStorage.getItem("logueado")==0)) window.location.href = "Login.html";
}


function listajuegos(){
    if(Number(sessionStorage.getItem("logueado")==0)) window.location.href = "Login.html";

    let user = sessionStorage.getItem("userlog");
    let pass = sessionStorage.getItem("passlog");
    $.ajax({
        type: "POST",
        url: ip+"login",
        crossDomain : true,
        contentType: 'application/json',
        data: JSON.stringify({
            "user": user+"",
            "password":pass+""
        }),
        success : function(data){
            BuscarJuegosUser(data[0].juegos)
        },
        error : function(errorThrown,err,textStatus){
            alert(textStatus)
            console.log(textStatus)
            console.log(err)
            console.log(errorThrown)
        },
    });
}

function CerrarSesion(){
    sessionStorage.clear("userlog");
    sessionStorage.clear("passlog");
    sessionStorage.setItem("logueado", 0)
    window.location.href = "Login.html";
}


function BuscarJuegosUser(juegosuser){
    $.ajax({
        type: "GET",
        url: ip+"todosjuegos",
        dataType: 'json',
        error : function(errorThrown,err,textStatus){
          console.log(textStatus)
          console.log(err)
          console.log(errorThrown)
        },
        success : function(data){
            LlenarTabla(data,juegosuser)
        }
    });
}

function LlenarTabla(datos,juegosuser){
    let tbody = document.getElementById('tbody')
    let html=""
    datos.forEach(element => {
        html+="<tr>\n"
        html+="<td align='center'>"+element.nombre+"</td>\n"
        html+="<td align='center'>"+element.categoria+"</td>\n"
        html+="<td align='center'>"+element.precio+"</td>\n"
        html+="<td align='center'>"+element.descargas.length+"</td>\n"
        html+="<td align='center'>\n"
        html+="<img src =\""+element.imagen+"\" width='130' height='150'> \n<p></p>\n"

        if (juegosuser.includes(element.nombre)){
            html+='<a class="navbar-brand" href="biblioteca.html">\n'
            html+="<button class='btn btn-primary btn-block'  type='submit' name="+element.nombre+" id="+element.nombre+" style='background-color: green;'> Tu Biblioteca</button>"
            html+="</a>\n"
        }
        else{
            html+="<button class='btn btn-primary btn-block'  type='submit' name='"+element.nombre+"' id='"+element.nombre+"' onclick='descargar(\""+element.nombre+"\")'>Descargar</button>"
        }
        html+="</td>\n</tr>\n"
    });
    tbody.innerHTML = html;
}


function descargar(juegoname){
    let user = sessionStorage.getItem("userlog");
    $.ajax({
        type: "POST",
        url: ip+"addjuegousuario",
        crossDomain : true,
        contentType: 'application/json',
        data: JSON.stringify({
            "user": user+"",
            "juego":juegoname+""
        }),
        success : function(){
            registrarDescarga(juegoname)
        },
        error : function(errorThrown,err,textStatus){
            alert(textStatus)
            console.log(textStatus)
            console.log(err)
            console.log(errorThrown)
        },
    });
}

function registrarDescarga(juegoname){
    $.ajax({
        type: "POST",
        url: ip+"descarga",
        crossDomain : true,
        contentType: 'application/json',
        data: JSON.stringify({
            "nombre":juegoname+""
        }),
        success : function(data){
            alert('Descarga Iniciada... ')
            location.reload();
        },
        error : function(errorThrown,err,textStatus){
            alert(textStatus)
            console.log(textStatus)
            console.log(err)
            console.log(errorThrown)
        },
    });
}


function LoadBiblioteca(){
    if(Number(sessionStorage.getItem("logueado")==0)) window.location.href = "Login.html";
    let user = sessionStorage.getItem("userlog");
    let pass = sessionStorage.getItem("passlog");
    $.ajax({
        type: "POST",
        url: ip+"login",
        crossDomain : true,
        contentType: 'application/json',
        data: JSON.stringify({
            "user": user+"",
            "password":pass+""
        }),
        success : function(data){
            LlenarJuegosUser(data[0].juegos)
        },
        error : function(errorThrown,err,textStatus){
            alert(textStatus)
            console.log(textStatus)
            console.log(err)
            console.log(errorThrown)
        },
    });    
}


function LlenarJuegosUser(juegosuser){
    $.ajax({
        type: "GET",
        url: ip+"todosjuegos",
        dataType: 'json',
        error : function(errorThrown,err,textStatus){
          console.log(textStatus)
          console.log(err)
          console.log(errorThrown)
        },
        success : function(data){
            LlenarBiblioteca(data,juegosuser)
        }
    });
}

function LlenarBiblioteca(datos,juegosuser){
    let div = document.getElementById("tbody")
    let cont = 0
    let html = '<tr>\n'
    datos.forEach(element => {
        if (juegosuser.includes(element.nombre)){       
            if(cont%3 == 0){
                html+='</tr>\n<tr>\n'
            }
            html+=celdaJuego(element.nombre,element.imagen)
            cont ++
        }
    });
    div.innerHTML = html
}

function celdaJuego(nombre,img){
    let text= '<td bgcolor="#338DFF"></td>\n'
    +'<td bgcolor="#338DFF" align="center">\n'
    +'<div align = "center"><b>' +nombre+'</b></div>\n'
    +"<br>\n"
    +' <img src="'+img+'"  width="130" height="150" class="center"> \n'
    +"<button class='btn btn-primary btn-block'  type='submit' name='submit' id='submit'>Descargado</button>\n"
    +'</td>\n'
    +'<td bgcolor="#338DFF"></td>\n'
    +'<td></td>\n'
    return text
}