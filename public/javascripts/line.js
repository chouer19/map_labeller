function addSegToMap(){
    if(segment.Paths.length > 1){
        var seg = jQuery.extend(true, {}, segment);
        map.Segments.push(seg);
        pointer++;
        segment.ReInit(pointer);
        path.ReInit('refLine');
    }
}
function addArrowToMap(){
    if(arrow.Points.length > 2){
        var ar = jQuery.extend(true, {}, arrow);
        map.Arrows.push(ar);
        for( var i= arrow.Points.length; i>0; i--){
            arrow.Points.pop();
        }
    }
}
function updateCurrentSeg(){//1
    segment.ReInit(pointer);
    var temp = jQuery.extend(true, {}, path);
    segment.Paths.push(temp);
    var len = temp.Points.length;
    laneNum = parseInt(document.getElementById('laneNum').value);
    laneWidth = parseFloat(document.getElementById('laneWidth').value); 
    if(len > 1){//6
        for(var i=0;i< laneNum; i++){//4
            var pathLane = new TrunkPath('lane');
            var x = temp.Points[0].X * 2 - path.Points[1].X;
            var y = temp.Points[0].Y * 2 - path.Points[1].Y;
            var ppp = generatePoint(x,y,temp.Points[1].X,temp.Points[1].Y,laneWidth * (i + 1));
            ppp.X += temp.Points[0].X;
            ppp.Y += temp.Points[0].Y;
            pathLane.Points.push(ppp);
            for (var j=1; j< len - 1; j++){//5
                var pp = generatePoint(temp.Points[j-1].X,temp.Points[j-1].Y,temp.Points[j + 1].X,temp.Points[j + 1].Y,laneWidth * (i + 1));
                pp.X += temp.Points[j].X;
                pp.Y += temp.Points[j].Y;
                pathLane.Points.push(pp);
            }//5p
            x= temp.Points[len - 1].X * 2 - path.Points[len - 2].X;
            y = temp.Points[len - 1].Y * 2 - path.Points[len - 2].Y;
            var pppp = generatePoint(temp.Points[len - 2].X,temp.Points[len - 2].Y,x,y,laneWidth * (i + 1));
            pppp.X += temp.Points[len - 1].X;
            pppp.Y += temp.Points[len - 1].Y;
            pathLane.Points.push(pppp);
            segment.Paths.push(pathLane);
        }//4
    }//6
}//1
function addNewLine(){//6
    if(segment.Paths.length > 0){
        segment.ReInit(pointer);
    }
    if(path.Points.length > 2){
        var p = jQuery.extend(true, {}, path);
        segment.Paths.push(p);
        addNewLane();
        var seg = jQuery.extend(true, {}, segment);
        map.Segments.push(seg);
        pointer++;
        segment.ReInit(pointer);
    }
}//6

function addNewLane(){//0
    var temp = jQuery.extend(true, {}, path);
    var len = temp.Points.length;
    laneNum = parseInt(document.getElementById('laneNum').value);
    laneWidth = parseFloat(document.getElementById('laneWidth').value);
    if(len > 1){//6
        var x = temp.Points[len - 1].X * 2 - path.Points[len - 2].X;
        var y = temp.Points[len - 1].Y * 2 - path.Points[len - 2].Y;
        var p = new TrunkPoint(x,y,-1,-1);
        temp.Points.push(p);
        for(var i=0;i< laneNum; i++){//4
            var pathLane = new TrunkPath('lane');
            var lenl = temp.Points.length;
            for (var j=1; j< lenl; j++){//5
                var pp = generatePoint(temp.Points[j-1].X,temp.Points[j-1].Y,temp.Points[j].X,temp.Points[j].Y,laneWidth * (i + 1) * 32);
                pathLane.Points.push(pp);
            }//5p
            segment.Paths.push(pathLane);
        }//4
    }//6
    path.ReInit('refLine');
}//0

//reflect for tool of add and ok
function addLine(){
    if(currentIndexSeg > -1 && currentIndexSeg < map.Segments.length && map.Segments[currentIndexSeg].Paths[0].Type === 'refLine'){
        var temp = jQuery.extend(true, {} , map.Segments[currentIndexSeg].Paths[0]);
        var len = temp.Points.length;
        var rank = parseInt(document.getElementById('newNum').value);
        var width = parseFloat(document.getElementById('newWidth').value);
        var realWidth = rank * width;
        var len = temp.Points.length;
        if(len > 1){//6
            var pathLane = new TrunkPath('lane');
            var x = temp.Points[0].X * 2 - temp.Points[1].X;
            var y = temp.Points[0].Y * 2 - temp.Points[1].Y;
            var ppp = generatePoint(x,y,temp.Points[1].X,temp.Points[1].Y,realWidth);
            ppp.X += temp.Points[0].X;
            ppp.Y += temp.Points[0].Y;
            pathLane.Points.push(ppp);
            for (var j=1; j< len - 1; j++){//5
                var pp = generatePoint(temp.Points[j-1].X,temp.Points[j-1].Y,temp.Points[j + 1].X,temp.Points[j + 1].Y,realWidth);
                pp.X += temp.Points[j].X;
                pp.Y += temp.Points[j].Y;
                pathLane.Points.push(pp);
            }//5p
            x= temp.Points[len - 1].X * 2 - temp.Points[len - 2].X;
            y = temp.Points[len - 1].Y * 2 - temp.Points[len - 2].Y;
            var pppp = generatePoint(temp.Points[len - 2].X,temp.Points[len - 2].Y,x,y,realWidth);
            pppp.X += temp.Points[len - 1].X;
            pppp.Y += temp.Points[len - 1].Y;
            pathLane.Points.push(pppp);
            map.Segments[currentIndexSeg].Paths.push(pathLane);
        }//6
    }
}

function moveLine(type){
    if(editType === 'path' && currentIndexSeg > -1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length){
        var len = map.Segments[currentIndexSeg].Paths[currentIndexPath].Points.length;
        for(var i=0; i< len; i ++){
            if(type === 'left')
                {map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[i].SetX(map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[i].X - 0.1);}
            if(type === 'right')
                {map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[i].SetX(map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[i].X + 0.1);}
            if(type === 'up')
                {map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[i].SetY(map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[i].Y + 0.1);}
            if(type === 'down')
                {map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[i].SetY(map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[i].Y - 0.1);}
        }
    }
    if(editType === 'arrow' && currentIndexSeg > -1 && currentIndexSeg < map.Arrows.length){
        var len = map.Arrows[currentIndexSeg].Points.length;
        for(var i=0; i< len; i ++){
            if(type === 'left')
                {map.Arrows[currentIndexSeg].Points[i].SetX(map.Arrows[currentIndexSeg].Points[i].X - 0.1);}
            if(type === 'right')
                {map.Arrows[currentIndexSeg].Points[i].SetX(map.Arrows[currentIndexSeg].Points[i].X + 0.1);}
            if(type === 'up')
                {map.Arrows[currentIndexSeg].Points[i].SetY(map.Arrows[currentIndexSeg].Points[i].Y + 0.1);}
            if(type === 'down')
                {map.Arrows[currentIndexSeg].Points[i].SetY(map.Arrows[currentIndexSeg].Points[i].Y - 0.1);}
        }
    }
}

function removeOneLine(){
    if(currentIndexSeg > -1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length){
        map.Segments[currentIndexSeg].Paths.splice(currentIndexPath,1);
        currentIndexPath = 0;
    }
}

function removeOneSegment(){
    if(currentIndexSeg > -1 && currentIndexSeg < map.Segments.length){
        console.log('before is : ',map.Segments.length);
        map.Segments.splice(currentIndexSeg,1);
        console.log('after is : ',map.Segments.length);
        currentIndexSeg = -1;
        currentIndexPath = -1;
    }
}

function updateID(){
    if(currentIndexSeg > -1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length){
        map.Segments[currentIndexSeg].ID = document.getElementById('segID').value;
        currentSegment = document.getElementById('segID').value;
        map.Segments[currentIndexSeg].preID = document.getElementById('preID').value;
        preSegment = document.getElementById('preID').value;
        map.Segments[currentIndexSeg].nextID = document.getElementById('nextID').value;
        nextSegment = document.getElementById('nextID').value;
        for(var i =0; i< map.Segments.length; i++){
            if(map.Segments[i].ID === preSegment){map.Segments[i].nextID = currentSegment;}
            if(map.Segments[i].ID === nextSegment){map.Segments[i].preID = currentSegment;}
        }
        pointer = Math.max(pointer,parseInt(currentSegment));
        //pointer++;
        segment.ReInit(pointer);
    }
}

function updateArrowID(){
    if(currentIndexSeg > -1 && currentIndexSeg < map.Arrows.length){
        map.Arrows[currentIndexSeg].ID = parseInt(document.getElementById('segID').value);
        currentSegment = parseInt(document.getElementById('segID').value);
        console.log('ok');
    }
}
