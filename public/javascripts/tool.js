
function updateNum(){
    laneNum = parseInt(document.getElementById('laneNum').value);
}
function updateWidth(){
    laneWidth = parseFloat(document.getElementById('laneWidth').value);
}
function updateZoom(){
    laneWidth = parseInt(document.getElementById('zoom').value);
}
function Init(){
    document.getElementById('newNum').disabled = true;
    document.getElementById('newWidth').disabled = true;
    document.getElementById('addLane').disabled = true;
    document.getElementById('newLane').disabled = false;
}
function newLane(){
    document.getElementById('newNum').disabled = false;
    document.getElementById('newWidth').disabled = false;
    document.getElementById('addLane').disabled = false;
    document.getElementById('newLane').disabled = true;
}
