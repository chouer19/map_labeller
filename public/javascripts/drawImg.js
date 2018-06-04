
function test(){

}

function drawImg(){
    //document.getElementById('box').style.left = boxLeft + 'px';
    //document.getElementById('box').style.top = boxTop + 'px';
    zoom = 1;
    document.getElementById('zoom').value = zoom;
    var left = offsetLeft;
    var i=0;
    var j=0;
    var topp = offsetTop;
    if(left < 0){
        while(left < 0){
            left += 1024;
            i++;
        }
        i--;
        left = left - 1024;
    }
    if(topp < 0){
        while(topp < 0){
            topp += 1024;
            j++;
        }
        j--;
        topp = topp - 1024;
    }
    var convas = document.getElementById('box');
    var context = convas.getContext('2d');
    var img00 = new Image();
    img00.src = imgSrc[zoom - 1][i][j];
    var img01 = new Image();
    img01.src = imgSrc[zoom-1][i][j + 1];
    var img10 = new Image();
    img10.src = imgSrc[zoom-1][i + 1][j];
    var img11 = new Image();
    img11.src = imgSrc[zoom-1][i + 1][j + 1];
    
    img00.onload = function(){
        context.drawImage(img00,left, topp, 1024 , 1024);
    } 
    img01.onload = function(){
        context.drawImage(img01, left, topp+1024, 1024 ,1024);
    } 
    img10.onload = function(){
        context.drawImage(img10,left + 1024, topp, 1024 , 1024);
    } 
    img11.onload = function(){
        context.drawImage(img11, left + 1024, topp+1024, 1024 ,1024);
    } 
}
