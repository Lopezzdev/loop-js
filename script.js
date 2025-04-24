let audios=[
    new Audio("./audios/C.mp3"), //0
    new Audio("./audios/Cs.mp3"), //1
    new Audio("./audios/D.mp3"), //2
    new Audio("./audios/Ds.mp3"), //3
    new Audio("./audios/E.mp3"), //4
    new Audio("./audios/F.mp3"), //5
    new Audio("./audios/Fs.mp3"), //6
    new Audio("./audios/G.mp3"), //7
    new Audio("./audios/Gs.mp3"), //8
    new Audio("./audios/A.mp3"), //9
    new Audio("./audios/As.mp3"), //10
    new Audio("./audios/B.mp3"), //11
    new Audio("./audios/C2.mp3"), //12
    new Audio("./audios/Cs2.mp3"), //13
    new Audio("./audios/D2.mp3"), //14
    new Audio("./audios/Ds2.mp3"), //15
    new Audio("./audios/E2.mp3"), //16
    new Audio("./audios/F2.mp3"), //17
    new Audio("./audios/Fs2.mp3"), //18
    new Audio("./audios/G2.mp3"), //19
    new Audio("./audios/Gs2.mp3"), //20
    new Audio("./audios/A2.mp3"), //21
    new Audio("./audios/As2.mp3"), //22
    new Audio("./audios/B2.mp3"), //23
    new Audio("./audios/bombo.mp3"), //24
    new Audio("./audios/palma.mp3"), //25
    new Audio("./audios/hihat.mp3"), //26
    new Audio("./audios/aro.mp3") //27
]

//Declaracion de variables
let matrizX,matrizY;
let matrizNotas=[];matrizNotas2=[],matrizBotones=[],nota=0;
let pistasCanal1=[],pistasCanal2=[],selecCanal=false;

let inicio=false;
let i,j;
let bemol;
let BPM=120;
let intBPM=125,mostrarSlide=false,mostrarVolumen=false;
let volBajo,volSint,volBombo,volPalma,volHihat,volAro;

//Ajuste del volumen de los audios
audios[27].volume=0.5;

const canvas = document.getElementById("matriz");
const ctx = canvas.getContext("2d");

document.getElementById("tiempo").style.cssText=`left:-1px;`;

//recorrer la matriz de notas1 para vaciarla
for(i=0;i<28;i++){
    matrizNotas[i] = [];
    for(j=0;j<32;j++){
        matrizNotas[i][j]=false;
    }
}
//recorrer la matriz de notas2 para vaciarla
for(i=0;i<28;i++){
    matrizNotas2[i] = [];
    for(j=0;j<32;j++){
        matrizNotas2[i][j]=false;
    }
}
//recorrer la matriz de botones para vaciarla
for(i=0;i<6;i++){
    matrizBotones[i] = [];
    for(j=0;j<3;j++){
        matrizBotones[i][j]=false;
    }
}

dibujarCanvas();
dibujarNotas2();
crearEventos();

intervalo = setInterval(() => {if(inicio)reproducirNotas();},intBPM);

//Escribir notas en la matriz
canvas.addEventListener("click", function(event) {

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    matrizX=parseInt(mouseX/25);

    if(mouseY<360) matrizY=parseInt(mouseY/15);
    else matrizY=parseInt(mouseY/20+6);

    if(matrizY<12){
        if(selecCanal)matrizNotas2[matrizY][matrizX]=!matrizNotas2[matrizY][matrizX];
        else matrizNotas[matrizY][matrizX]=!matrizNotas[matrizY][matrizX];
    }
    if(matrizY<24&&matrizY>=12){
        if(selecCanal)matrizNotas2[matrizY][matrizX]=!matrizNotas2[matrizY][matrizX];
        else matrizNotas[matrizY][matrizX]=!matrizNotas[matrizY][matrizX];
    }
    if(matrizY>=24){
        if(selecCanal)matrizNotas2[matrizY][matrizX]=!matrizNotas2[matrizY][matrizX];
        else matrizNotas[matrizY][matrizX]=!matrizNotas[matrizY][matrizX];
    }

    dibujarNotas2();

});

function dibujarCanvas(){

    // Establecer el color de la línea
    ctx.strokeStyle = "rgb(143, 143, 143)";
    ctx.lineWidth = 0.5;



    for (i = 0; i < 800; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i , 0);  // Ajuste de medio píxel
        ctx.lineTo(i , 440);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgb(255, 255, 255)";
    for (i = 0; i < 800; i += 100) {
        ctx.beginPath();
        ctx.moveTo(i , 0);  // Ajuste de medio píxel
        ctx.lineTo(i , 440);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgb(143, 143, 143)";
    for(i=0;i<360;i+=15){
        ctx.beginPath();
        ctx.moveTo(0 , i);  // Ajuste de medio píxel
        ctx.lineTo(800 ,i);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgb(255, 150, 12)";

    for(i=360;i<440;i+=20){
        ctx.beginPath();
        ctx.moveTo(0 , i);  // Ajuste de medio píxel
        ctx.lineTo(800 ,i);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(0 , 180);  // Ajuste de medio píxel
    ctx.lineTo(800 ,180);
    ctx.stroke();
}

function reproducirNotas(){

    for(i=0;i<28;i++){
        if(matrizNotas[i][nota]&&pistasCanal1[i]||matrizNotas2[i][nota]&&pistasCanal2[i]){
            audios[i].currentTime=0
            audios[i].play();
        }
    }

    nota++;

    if(nota>=32)nota=0;

    document.getElementById("tiempo").style.cssText=`left:${nota*25}px;`;

}

function dibujarNotas2(){

    //Selector de canal en 1
    if(!selecCanal){

        //Primer canal
        for(i=0;i<24;i++){

            bemol=(i==1||i==3||i==6||i==8||i==10||i==13||i==15||i==18||i==20||i==22);
    
            for(j=0;j<32;j++){
    
                if(matrizNotas[i][j]){
                    ctx.fillStyle = "rgba(120, 60, 0)";
                    ctx.fillRect(1+(j*25), (i*15), 24, 14);
                }
                else{
                    if(!bemol)ctx.fillStyle = "black";
                    else ctx.fillStyle ="rgb(14, 14, 14)";
                    ctx.fillRect(1+(j*25), (i*15), 24, 14);
                }
    
            }    
        }

        for(i=24;i<28;i++){
            for(j=0;j<32;j++){
    
                if(matrizNotas[i][j])ctx.fillStyle = "rgba(120, 60, 0)";
                else ctx.fillStyle = "black";
                ctx.fillRect(1+(j*25), (i*20)-120, 24, 19);
    
            }
        }

        //Segundo canal
        for(i=0;i<24;i++){
    
            for(j=0;j<32;j++){
    
                if(matrizNotas2[i][j]){
                    ctx.fillStyle = "rgba(100, 0, 0)";
                    ctx.fillRect(1+(j*25), i*15, 10, 5);
                }
    
            }    
        }
        for(i=24;i<28;i++){
            for(j=0;j<32;j++){
    
                if(matrizNotas2[i][j]){
                    ctx.fillStyle = "rgba(100, 0, 0)";
                    ctx.fillRect(1+j*25 , i*20-120 , 10, 5);
                }
    
            }
        }

    //Selector de canal en 2
    }else{

        //Segundo canal
        for(i=0;i<24;i++){

            bemol=(i==1||i==3||i==6||i==8||i==10||i==13||i==15||i==18||i==20||i==22);
    
            for(j=0;j<32;j++){
    
                if(matrizNotas2[i][j]){
                    ctx.fillStyle = "rgba(100, 0, 0)";
                    ctx.fillRect(1+(j*25), (i*15), 24, 14);
                }
                else{
                    if(!bemol)ctx.fillStyle = "black";
                    else ctx.fillStyle ="rgb(14, 14, 14)";
                    ctx.fillRect(1+(j*25), (i*15), 24, 14);
                }
    
            }    
        }

        for(i=24;i<28;i++){
            for(j=0;j<32;j++){
    
                if(matrizNotas2[i][j])ctx.fillStyle = "rgba(100, 0, 0)";
                else ctx.fillStyle = "black";
                ctx.fillRect(1+(j*25), (i*20)-120, 24, 19);
    
            }
        }

        //Primer canal
        for(i=0;i<24;i++){
    
            for(j=0;j<32;j++){
    
                if(matrizNotas[i][j]){
                    ctx.fillStyle = "rgba(120, 60, 0)";
                    ctx.fillRect(1+(j*25), i*15, 10, 5);
                }
    
            }    
        }
        for(i=24;i<28;i++){
            for(j=0;j<32;j++){
    
                if(matrizNotas[i][j]){
                    ctx.fillStyle = "rgba(120, 60, 0)";
                    ctx.fillRect(1+j*25 , i*20-120 , 10, 5);
                }
    
            }
        }
    }


}

function eventoBoton(x,y,id){

    // console.log(x);

    //Escritura en la matriz de botones
    if(y==3){
        matrizBotones[x][1]=!matrizBotones[x][1];
    }else{
        matrizBotones[x][y]=!matrizBotones[x][y];
    }
  
    //Gestion de animaciones de botones
    if(y==3||y==1){

        if(matrizBotones[x][1]){
            document.getElementById(`grabar${x}2`).style.cssText="animation-name: animacion;";
            document.getElementById(`grabar${x}1`).style.cssText="animation-name: none;";
        }else{
            document.getElementById(`grabar${x}1`).style.cssText="animation-name: animacion;";
            document.getElementById(`grabar${x}2`).style.cssText="animation-name: none;";
        }

    }else{

        if(matrizBotones[x][y]) document.getElementById(`${id}`).style.cssText="animation-name: animacion;";
        else document.getElementById(`${id}`).style.cssText="animation-name: none;";

    }

    for(i=0;i<12;i++){
        pistasCanal1[i]=matrizBotones[0][0];
    }
    for(i=12;i<24;i++){
        pistasCanal1[i]=matrizBotones[1][0];
    }
    pistasCanal1[24]=matrizBotones[2][0];
    pistasCanal1[25]=matrizBotones[3][0];
    pistasCanal1[26]=matrizBotones[4][0];
    pistasCanal1[27]=matrizBotones[5][0];

    for(i=0;i<12;i++){
        pistasCanal2[i]=matrizBotones[0][2];
    }
    for(i=12;i<24;i++){
        pistasCanal2[i]=matrizBotones[1][2];
    }
    pistasCanal2[24]=matrizBotones[2][2];
    pistasCanal2[25]=matrizBotones[3][2];
    pistasCanal2[26]=matrizBotones[4][2];
    pistasCanal2[27]=matrizBotones[5][2];

    // console.table(matrizBotones);

    // console.table(pistasCanal1);
    // console.table(pistasCanal2);

}

function iniciar(){
    inicio=!inicio;
    if(inicio){
        document.getElementById("play").style.cssText="animation-name: animacion;";
    }else{
        document.getElementById("play").style.cssText="animation-name: none;";
        document.getElementById("tiempo").style.cssText=`left:-1px;`;
        nota=0;
    }
}

function crearEventos(){
    //Lectura de eventos de botones

    document.getElementById('play01').addEventListener('click', () => {eventoBoton(0,0,"play01");});
    document.getElementById('play11').addEventListener('click', () => {eventoBoton(1,0,"play11");});
    document.getElementById('play21').addEventListener('click', () => {eventoBoton(2,0,"play21");});
    document.getElementById('play31').addEventListener('click', () => {eventoBoton(3,0,"play31");});
    document.getElementById('play41').addEventListener('click', () => {eventoBoton(4,0,"play41");});
    document.getElementById('play51').addEventListener('click', () => {eventoBoton(5,0,"play51");});

    document.getElementById('play02').addEventListener('click', () => {eventoBoton(0,2,"play02");});
    document.getElementById('play12').addEventListener('click', () => {eventoBoton(1,2,"play12");});
    document.getElementById('play22').addEventListener('click', () => {eventoBoton(2,2,"play22");});
    document.getElementById('play32').addEventListener('click', () => {eventoBoton(3,2,"play32");});
    document.getElementById('play42').addEventListener('click', () => {eventoBoton(4,2,"play42");});
    document.getElementById('play52').addEventListener('click', () => {eventoBoton(5,2,"play52");});

    //Pulsar boton inicio de reproduccion
    document.getElementById('play').addEventListener('click', () => {iniciar();});
    document.getElementById('bpm').addEventListener('mousedown', () => {cambiarBPM();});

    //Cambio de canal
    document.getElementById('cambioCanal').addEventListener('click', () => {
        selecCanal=!selecCanal;
        dibujarNotas2();
        if(selecCanal)document.getElementById('cambioCanal').style.cssText="background-color: rgba(255, 0, 0, 0.596);transition: background-color 0.5s;";
        else document.getElementById('cambioCanal').style.cssText="background-color:background-color: rgba(255, 123, 0, 0.74);transition: background-color 0.5s;";
    });

    //Borrar
    document.getElementById('borrar').addEventListener('click', () => {

        document.getElementById('imgBorrar').style.cssText="animation-name:none;";
        document.getElementById('imgBorrar').offsetWidth;
        document.getElementById('imgBorrar').style.cssText="animation-name:animacion2;";

        //recorrer la matriz de notas1 para vaciarla
        for(i=0;i<28;i++){
            matrizNotas[i] = [];
            for(j=0;j<32;j++){
                matrizNotas[i][j]=false;
            }
        }
        //recorrer la matriz de notas2 para vaciarla
        for(i=0;i<28;i++){
            matrizNotas2[i] = [];
            for(j=0;j<32;j++){
                matrizNotas2[i][j]=false;
            }
        }

        dibujarNotas2();

    });

    //Volumenes
    document.getElementById('volumenes').addEventListener('click', () => {

        mostrarVolumen=!mostrarVolumen;

        if(!mostrarVolumen){
            document.getElementById('divVolumenes').style.cssText="left:800px;transition: left 1s;";
            document.getElementById("volumenes").style.cssText="animation-name: none;";
        }
        else {
            document.getElementById('divVolumenes').style.cssText="left:890px;transition: left 1s;";
            document.getElementById("volumenes").style.cssText="animation-name: animacion;";
        }

    });

    //Lectura de teclas

    document.addEventListener('keydown', (event) => {
        if (event.key === '1') {eventoBoton(0,0,"play01");}
        if (event.key === '2') {eventoBoton(1,0,"play11");}
        if (event.key === '3') {eventoBoton(2,0,"play21");}
        if (event.key === '4') {eventoBoton(3,0,"play31");}
        if (event.key === '5') {eventoBoton(4,0,"play41");}
        if (event.key === '6') {eventoBoton(5,0,"play51");}

        if (event.key === 'q') {eventoBoton(0,2,"play02");}
        if (event.key === 'w') {eventoBoton(1,2,"play12");}
        if (event.key === 'e') {eventoBoton(2,2,"play22");}
        if (event.key === 'r') {eventoBoton(3,2,"play32");}
        if (event.key === 't') {eventoBoton(4,2,"play42");}
        if (event.key === 'y') {eventoBoton(5,2,"play52");}

        if (event.key === " ") {iniciar();}
    });
}

function cambiarBPM(){
    mostrarSlide=!mostrarSlide;
    if(mostrarSlide){
        document.getElementById("slideBPM").style.cssText="top:-3px;transition: top 0.5s;"
        document.getElementById("bpm").style.cssText="top:-27px;transition: top 0.5s;"
    }else{
        document.getElementById("slideBPM").style.cssText="top:20px;transition: top 0.3s;"
        document.getElementById("bpm").style.cssText="top:1px;transition: top 0.3s;"
    }
}

//Eventos de sliders
document.getElementById("slideBPM").addEventListener("input", function () {

    BPM=document.getElementById("slideBPM").value;
    document.getElementById("bpm").innerHTML=`${BPM} BPM`;

    intBPM=15000/BPM;
    console.log(intBPM);

    clearInterval(intervalo);
    intervalo = setInterval(() => {
        if (inicio) reproducirNotas();
    }, intBPM);
});

document.getElementById("volBajo").addEventListener("input", function () {

    volBajo=document.getElementById("volBajo").value/100;

    for(i=0;i<12;i++){
        audios[i].volume=volBajo;
    }

});
document.getElementById("volSint").addEventListener("input", function () {

    volSint=document.getElementById("volSint").value/100;

    for(i=12;i<124;i++){
        audios[i].volume=volSint;
    }

});
document.getElementById("volBombo").addEventListener("input", function () {

    volBombo=document.getElementById("volBombo").value/100;

    audios[24].volume=volBombo;

});
document.getElementById("volPalma").addEventListener("input", function () {

    volPalma=document.getElementById("volPalma").value/100;

    audios[25].volume=volPalma;

});
document.getElementById("volHihat").addEventListener("input", function () {

    volHihat=document.getElementById("volHihat").value/100;

    audios[26].volume=volHihat;

});
document.getElementById("volAro").addEventListener("input", function () {

    volAro=document.getElementById("volAro").value/100;

    audios[27].volume=volAro;

});