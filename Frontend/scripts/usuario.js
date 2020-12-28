const ip = 'http://backendservice/'


function verLog(){
    if(Number(sessionStorage.getItem("logueado")==1)) window.location.href = "Principal.html";
}

function login(){
    let user = document.getElementById("inputUser").value
    let pass = document.getElementById("inputPassword").value
    $.ajax({
        type : "POST",
        url : ip+"login",
        crossDomain : true,
        contentType: 'application/json',
        data: JSON.stringify({
            "user": user+"",
            "password":pass+""
        }),
        success : function(data){
            if(data.length > 0) {
                sessionStorage.setItem("userlog", user)
                sessionStorage.setItem("passlog", pass)
                sessionStorage.setItem("logueado", 1)
                window.location.href = "Principal.html";
            }
            else(alert('Usuario o password incorrectos'))
        },
        error : function(errorThrown,err,textStatus){
            alert(textStatus)
            console.log(textStatus)
            console.log(err)
            console.log(errorThrown)
        },
      });
}



function registro(){
    let user = document.getElementById("inputUser").value
    let pass = document.getElementById("inputPassword").value
    let rpass = document.getElementById("inputRpassword").value
    let name = document.getElementById("inputName").value
    $.ajax({
        type : "POST",
        url : ip+"addUser",
        crossDomain : true,
        contentType: 'application/json',
        data: JSON.stringify({
            "user": user+"",
            "nombre":name,
            "rpassword":rpass,
            "password":pass+""
        }),
        success : function(data){
            if(data.message == 0) alert('Usuario ya existente')
            else{
                alert('Usuario creado')
                window.location.href = "Login.html";
            }
        },
        error : function(errorThrown,err,textStatus){
            alert(textStatus)
            console.log(textStatus)
            console.log(err)
            console.log(errorThrown)
        },
      });
}