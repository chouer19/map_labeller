function loadImg(e){//0
    var isGo = false;
    var theFiles = e.target.files;
    var relativePath = theFiles[0].webkitRelativePath;
    var folder = relativePath.split("/");
    imgName = folder[0];
    var input = new Array();
    for(var i = 0; i<theFiles.length; i++){
        if(theFiles[i].type === 'text/plain'){
            input.push(theFiles[i]);
            if(input.length === 4){break;}
            isGo = true;
        }
    }
    if(isGo){//4
        var reader = new FileReader();
        var lines;
        for(var i= imgSrc.length ; i>0; i--){
            imgSrc.pop();
        }
        function readFile(index){//3
            if(index >= 4){
                var list = imgSrc[0][0][0].split('/');
                for(var i = 0; i< 4 ; i++){
                    list = imgSrc[i][0][0].split('/');
                    UTMy[i] = parseFloat(list[list.length - 2]) * 32 * Math.pow(2,i);
                    UTMx[i] = parseFloat(list[list.length - 1].split('.')[0]) * 32 * Math.pow(2,i);
                }
                //UTMy[3] -= 256;
                offsetUTMX = UTMx[zoom] + 500 / 32 * Math.pow(2,zoom-1);
                offsetUTMY = UTMy[zoom] - 360 / 32 * Math.pow(2,zoom-1);
                drawImg();
                return ;
            }
            var file = input[index]
            reader.onload = function(){//5
                var src = new Array();
                var text = reader.result;
                lines = text.split('\n');
                for(var i=0; i< lines.length ; i++){//12
                    if(lines === ''){continue;}
                    var currentCows = lines[i].split(" ");
                    if (currentCows.length < 1){continue;}
                    for(var j=0; j< currentCows.length; j++){//13
                        currentCows[j] = "images/maps/"+imgName+"/"+currentCows[j];
                    }//13
                    src.push(currentCows);
                }//12
                imgSrc.push(src);
                imgSrc.sort(function(a,b){//11
                    return a.length < b.length;
                });//11
                readFile(index + 1);
            };//5
            reader.readAsText(file);
        }//3
        readFile(0);
    }//4
}//0
function loadData(e){
    //console.log(e.target.files[0]);
    var input = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(){//10
        var text = reader.result;
        //console.log(text);
        var lines = text.split('\n');
        map.ReInit(input.name);
        segment.ReInit(-1);
        var ID,nextID,preID,indexNum;
        for (var i=0; i< lines.length - 1; i++){//11
            var pathline = lines[i].split(' ');
            var aPath = new TrunkPath('lane');
            ID = parseInt(pathline[0]);
            pointer = Math.max(pointer,ID +1);
            preID = parseInt(pathline[1]);
            pointer = Math.max(pointer,preID+1);
            nextID = parseInt(pathline[2]);
            pointer = Math.max(pointer,nextID + 1);
            indexNum = parseInt(pathline[3]);
            console.log()
            if(indexNum === 0){//12
                map.Segments.push(new TrunkSegment(ID));
                map.Segments[map.Segments.length - 1].SetPreID(preID);
                map.Segments[map.Segments.length - 1].SetNextID(nextID);
                console.log(map);
                aPath.ReInit('refLine');
            }//12
            aPath.ID = indexNum;
            var pointList = pathline[4].split(',');
            for(var j=0; j< pointList.length - 1; j +=2){//13
                var aPoint = new TrunkPoint(parseFloat(pointList[j]), parseFloat(pointList[j+1]), -1, -1);
                aPath.Points.push(aPoint);
            }//13
            map.Segments[map.Segments.length - 1].Paths.push(aPath);
            //map.Segments[0].Paths.push(aPath);
        }//11
    }//10
    reader.readAsText(input);
}

function saveData(e){
    var text = '';
    for(var i=0;i<map.Segments.length; i++){
        for (var j = 0; j< map.Segments[i].Paths.length ; j++){
            var thisID = map.Segments[i].ID;
            var nextID = map.Segments[i].nextID;
            var preID = map.Segments[i].preID;
            var line = thisID + ' ' + preID + ' ' + nextID + ' ' + j + ' ';
            for( var k = 0; k< map.Segments[i].Paths[j].Points.length; k++){
                line = line + map.Segments[i].Paths[j].Points[k].X +','+map.Segments[i].Paths[j].Points[k].Y+',';
            }
            line = line + '\n';
            text = text + line;
        }
    }
    //console.log(text);
    var blob = new Blob([text],{type:'text/plain;charset=utf-8'});
    saveAs(blob,'map.txt');
}
