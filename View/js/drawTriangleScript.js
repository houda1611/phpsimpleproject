const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 580;
canvas.width = 1100;

var pointN = 0;
var point1X = 0;
var point1Y = 0;
var point2X = 0;
var point2Y = 0;
var point3X = 0;
var point3Y = 0;

function drawContent(type){

    canvas.addEventListener("click",function (event){
        if ( pointN === 0 || pointN<3)
        {
            let x = event.offsetX;
            let y = event.offsetY;

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(x,y,5,0,Math.PI*2);
            ctx.fill();
            ctx.stroke();
            pointN++;
            if (pointN === 1){
                point1X = x;
                point1Y = y;
            }
            else if (pointN === 2){
                point2X = x;
                point2Y = y;
                ctx.moveTo(point1X,point1Y);
                ctx.lineTo(point2X,point2Y);
                ctx.stroke();
            }
            else {
                point3X = x;
                point3Y = y;
                ctx.moveTo(point2X,point2Y);
                ctx.lineTo(point3X,point3Y);
                ctx.stroke();
                ctx.moveTo(point3X,point3Y);
                ctx.lineTo(point1X,point1Y);
                ctx.stroke();
                $.ajax({
                    url:'../../../Controller/is'+type+'.php?type='+type+'&point1x='+point1X+'&point1y='+point1Y+'&point2x='+point2X+'&point2y='+point2Y+'&point3x='+point3X+'&point3y='+point3Y+'&point4x=0'+'&range=95',
                    success:function(data){
                        console.log(data);
                        if (data == 1){
                            var audio = new Audio("../../sources/success-sound-effect.mp3");
                            audio.play();
                        }
                        else if(data == 0){
                            var audio1 = new Audio("../../sources/wrong.mp3");
                            audio1.play();
                        }
                    },
                    error:function(er){
                        console.log(er);
                    }
                })
            }

        }

    });
}

$('#try_again').click(function (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pointN = 0;
});