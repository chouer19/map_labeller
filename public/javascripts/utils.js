

function generatePoint(x1,y1,x2,y2,d){//1
    var dist = Math.sqrt(Math.pow((x2-x1) , 2) + Math.pow((y2 - y1),2));
    var ex = (x2 - x1)/dist;
    var ey = (y2 -y1)/dist;
    var offsetX = 1 * ey * d;
    var offsetY =  -1 * ex * d;
    var p = new TrunkPoint(offsetX ,offsetY, -1 ,-1);
    return p;
}//1
