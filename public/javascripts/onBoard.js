paper.install(window)
window.onload=function(){//0
    Init();
    paper.setup('box');
    var url = 'images/img4view/test.jpg';
    var rasterBoard00 = new Raster(url);
    var rasterBoard01 = new Raster(url);
    var rasterBoard10 = new Raster(url);
    var rasterBoard11 = new Raster(url);
    var pathLength = 0;
    var pathBoard = new Path();
    var tool = new Tool();
    pathBoard.strokeColor = 'red';
    pathBoard.strokeWidth = 5* Pwidth;
    var groupBoard = new Group();
    var groupSegBoard = new Group();
    var circleBoard = new Path.Circle({
        center: new Point(5,5),
        radius:11
    });
    circleBoard.fillColor = {
        gradient:{
            stops:['yellow','red','black'],
            radial:true
        },
        origin:circleBoard.position,
        destination:circleBoard.bounds.rightCenter
    }
    circleBoard.fillColor.highlight = new Point(0,0);
    tool.onMouseDown = function(event) {
        currentX = event.point.x;
        currentY = event.point.y;
        if(isAddPoint && isCtrl){
            pathLength = path.Points.push (new TrunkPoint( (event.point.x - offsetLeft) / (32 /  Math.pow(2,zoom-1)) + UTMx[zoom - 1], -(event.point.y - offsetTop) / (32 /  Math.pow(2, zoom - 1)) + UTMy[zoom - 1] , -1 ,-1) );
            freshBoard();
            movePoint = true;
            currentPoint = -1;
        }
        if(isAddPoint && isShift){
            arrow.Points.push (new TrunkPoint( (event.point.x - offsetLeft) / (32 /  Math.pow(2,zoom-1)) + UTMx[zoom - 1], -(event.point.y - offsetTop) / (32 /  Math.pow(2, zoom - 1)) + UTMy[zoom - 1] , -1 ,-1) );
            freshBoard();
            movePoint = true;
            currentPoint = -1;
        }
    }
    tool.onMouseUp = function(event){
        document.getElementById('box').style.cursor = 'crosshair';
    }
    tool.onMouseDrag = function(event){
        if(!isCtrl && !isShift && !isAlt){
            document.getElementById('box').style.cursor = 'pointer';
            offsetLeft += event.delta.x;
            offsetTop += event.delta.y;
            if (imgSrc.length === 4 && imgSrc[zoom-1].length > 0 && offsetLeft + 1024 * imgSrc[zoom-1][0].length < 900){
                offsetLeft -= event.delta.x;
                //offsetLeft = 900 - 2014 * imgSrc[0].length;
            }
            if (imgSrc.length === 4 && offsetTop + 1024 * imgSrc[zoom-1].length < 620){
                offsetTop -= event.delta.y;
                //offsetTop = 620 - 1024 * imgSrc.length;
            }
            if (offsetLeft > 0){offsetLeft = 0;}
            if(offsetTop > 0){offsetTop = 0;}
            offsetUTMX = (500-offsetLeft) / 32 * Math.pow(2,zoom - 1) + UTMx[zoom - 1];
            offsetUTMY = (-360+offsetTop) / 32 * Math.pow(2,zoom - 1) + UTMy[zoom - 1];
            freshBoard();
        }
    }
    tool.onKeyUp = function(event){
        if(event.key === 'control'){
            editType = 'path';
            isCtrl = false;
        }
        if(event.key === 'shift'){
            editType = 'arrow';
            isShift = false;
        }
        if(event.key === 'alt'){
            editType = 'sign';
            isAlt = false;
        }
    }
    tool.onKeyDown = function(event) {
        if(event.key === 'control'){
            editType = 'path';
            isCtrl = true;
        }
        if(event.key === 'shift'){
            editType = 'arrow';
            isShift = true;
        }
        if(event.key === 'alt'){
            editType = 'sign';
            isAlt = true;
        }
        if(event.key === 'left'){
            offsetLeft += 100;
            if (offsetLeft > 0){offsetLeft = 0;}
            freshBoard();
        }
        if(event.key === 'right'){
            offsetLeft -= 100;
            if (imgSrc.length === 4 && imgSrc[zoom-1].length > 0 && offsetLeft + 1024 * imgSrc[zoom-1][0].length < 900){
                offsetLeft += 100;
            }
            freshBoard();
        }
        if(event.key === 'up'){
            offsetTop += 100;
            if(offsetTop > 0){offsetTop = 0;}
            freshBoard();
        }
        if(event.key === 'down'){
            offsetTop -= 100;
            if (imgSrc.length === 4 && offsetTop + 1024 * imgSrc[zoom-1].length < 620){
                offsetTop += 100;
            }
            freshBoard();
        }
        if(event.key === 'delete'){
                if(currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && map.Segments[currentIndexSeg].Paths[currentIndexPath].Type === 'refLine'){removeOneSegment();}
                if(currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && map.Segments[currentIndexSeg].Paths[currentIndexPath].Type === 'lane'){removeOneLine();}
                freshBoard();
        }
        //// add lanes for refLine
        if(event.key === 'enter' ){
            movePoint = false;
            addSegToMap();
            addArrowToMap();
            freshBoard();
        }
        //// backup the closest point of path
        if(event.key === 'q'){//Delete end point//0
            if(path.Points.length > 0 || arrow.Points.length > 0){//2
                if(editType === 'path'){//3
                    path.Points.pop();
                }//3
                if(editType === 'arrow'){//3-
                    arrow.Points.pop();
                }//3-
                freshBoard();
            }//2
        }//0
        /// move left(any point, any path)
        if(event.key === 'a'){//left
            if(currentPoint > -1){//1.1
                if(editType === 'path' && currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && currentPoint > -1 && currentPoint < map.Segments[currentIndexSeg].Paths[currentIndexPath].Points.length){//1.2
                     map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[currentPoint].SetX( map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[currentPoint].X - 0.1);
                 }//1.2
                if(editType === 'arrow' && currentIndexSeg >-1 && currentIndexSeg < map.Arrows.length && currentPoint > -1 && currentPoint < map.Arrows[currentIndexSeg].Points.length){//1.2
                     map.Arrows[currentIndexSeg].Points[currentPoint].SetX( map.Arrows[currentIndexSeg].Points[currentPoint].X - 0.1);
                 }//1.2
            }//1.1
            else if(movePoint){
                if(editType === 'path' && path.Points.length > 0){path.Points[path.Points.length - 1].SetX(path.Points[path.Points.length - 1].X - 0.1);}
                if(editType === 'arrow' && arrow.Points.length > 0){arrow.Points[arrow.Points.length - 1].SetX(arrow.Points[arrow.Points.length - 1].X - 0.1);}
            }
            else{moveLine('left');}
            freshBoard();
        }
        /// move right(any point, any path)
        if(event.key == 'd'){//right
            if(currentPoint > -1){//1.1
                if(editType === 'path' && currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && currentPoint > -1 && currentPoint < map.Segments[currentIndexSeg].Paths[currentIndexPath].Points.length){//1.2
                     map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[currentPoint].SetX( map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[currentPoint].X + 0.1);
                 }//1.2
                if(editType === 'arrow' && currentIndexSeg >-1 && currentIndexSeg < map.Arrows.length && currentPoint > -1 && currentPoint < map.Arrows[currentIndexSeg].Points.length){//1.2
                     map.Arrows[currentIndexSeg].Points[currentPoint].SetX( map.Arrows[currentIndexSeg].Points[currentPoint].X + 0.1);
                 }//1.2
            }//1.1
            else if(movePoint){
                if(editType === 'path' && path.Points.length > 0){path.Points[path.Points.length - 1].SetX(path.Points[path.Points.length - 1].X + 0.1);}
                if(editType === 'arrow' && arrow.Points.length > 0){arrow.Points[arrow.Points.length - 1].SetX(arrow.Points[arrow.Points.length - 1].X + 0.1);}
            }
            else{moveLine('right');}
            freshBoard();
        }
        /// move up(any point, any path)
        if(event.key == 'w'){//up
            if(currentPoint > -1){//1.1
                if(editType === 'path' && currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && currentPoint > -1 && currentPoint < map.Segments[currentIndexSeg].Paths[currentIndexPath].Points.length){//1.2
                     map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[currentPoint].SetY( map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[currentPoint].Y + 0.1);
                 }//1.2
                if(editType === 'arrow' && currentIndexSeg >-1 && currentIndexSeg < map.Arrows.length && currentPoint > -1 && currentPoint < map.Arrows[currentIndexSeg].Points.length){//1.2
                     map.Arrows[currentIndexSeg].Points[currentPoint].SetY( map.Arrows[currentIndexSeg].Points[currentPoint].Y + 0.1);
                 }//1.2
            }//1.1
            else if(movePoint){
                if(editType === 'path' && path.Points.length > 0){path.Points[path.Points.length - 1].SetY(path.Points[path.Points.length - 1].Y + 0.1);}
                if(editType === 'arrow' && arrow.Points.length > 0){arrow.Points[arrow.Points.length - 1].SetY(arrow.Points[arrow.Points.length - 1].Y + 0.1);}
            }
            else{moveLine('up');}
            freshBoard();
        }
        /// move down(any point, any path)
        if(event.key === 's'){//down
            if(currentPoint > -1){//1.1
                if(editType === 'path' && currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && currentPoint > -1 && currentPoint < map.Segments[currentIndexSeg].Paths[currentIndexPath].Points.length){//1.2
                     map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[currentPoint].SetY( map.Segments[currentIndexSeg].Paths[currentIndexPath].Points[currentPoint].Y - 0.1);
                 }//1.2
                if(editType === 'arrow' && currentIndexSeg >-1 && currentIndexSeg < map.Arrows.length && currentPoint > -1 && currentPoint < map.Arrows[currentIndexSeg].Points.length){//1.2
                     map.Arrows[currentIndexSeg].Points[currentPoint].SetY( map.Arrows[currentIndexSeg].Points[currentPoint].Y - 0.1);
                 }//1.2
            }//1.1
            else if(movePoint){
                if(editType === 'path' && path.Points.length > 0){path.Points[path.Points.length - 1].SetY(path.Points[path.Points.length - 1].Y - 0.1);}
                if(editType === 'arrow' && arrow.Points.length > 0){arrow.Points[arrow.Points.length - 1].SetY(arrow.Points[arrow.Points.length - 1].Y - 0.1);}
            }
            else{moveLine('down');}
            freshBoard();
        }
        if(event.key === 'space'){
            currentPoint ++;
            if(editType === 'path' && currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && currentPoint >= map.Segments[currentIndexSeg].Paths[currentIndexPath].Points.length){ currentPoint=0;}
            if(editType === 'arrow' && currentIndexSeg >-1 && currentIndexSeg < map.Arrows.length && currentPoint >= map.Arrows[currentIndexSeg].Points.length){ currentPoint=0;}
            freshBoard();
        }
        if(event.key === 'b'){
            if( editType === 'path' && currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && (currentPoint === -1 || currentPoint === 0 )){currentPoint = map.Segments[currentIndexSeg].Paths[currentIndexPath].Points.length - 1 ;}
            else if( editType === 'arrow' && currentIndexSeg >-1 && currentIndexSeg < map.Arrows.length &&  (currentPoint === -1 || currentPoint === 0 )){currentPoint = map.Arrows[currentIndexSeg].Points.length - 1 ;}
            else if(currentPoint > 0){currentPoint --;}
            if(editType === 'path' && currentIndexSeg >-1 && currentIndexSeg < map.Segments.length && currentIndexPath > -1 && currentIndexPath < map.Segments[currentIndexSeg].Paths.length && currentPoint >= map.Segments[currentIndexSeg].Paths[currentIndexPath].Points.length){ currentPoint=0;}
            if(editType === 'arrow' && currentIndexSeg >-1 && currentIndexSeg < map.Arrows.length && currentIndexPath > -1 && currentPoint >= map.Arrows[currentIndexSeg].Points.length){ currentPoint=0;}
            freshBoard();
        }
    }
    function freshBoard(){//1
        updateCurrentSeg();
        loadImg();
        loadPathOnMap();
        loadSegOnBoard();
        loadArrowOnMap();
        loadArrowOnBoard();
    }//1
    function loadArrowOnBoard(){
        pathBoard.remove();
        pathBoard = new Path();
        pathBoard.strokeColor = 'orange';
        pathBoard.strokeColor = 'purple';
        pathBoard.strokeColor = 'pink';
        pathBoard.strokeWidth = 5 * Pwidth;
        for(var i=0; i<arrow.Points.length ;i++){
            pathBoard.add(new Point( (arrow.Points[i].X - UTMx[zoom - 1]) * 32 / Math.pow(2, zoom-1) + offsetLeft , -(arrow.Points[i].Y - UTMy[zoom-1]) *32 / Math.pow(2, zoom - 1) + offsetTop));
            pathBoard.closed = true;
        }
    }
    function loadImg(){
        var left = offsetLeft;
        var i=0;
        var j=0;
        var topp = offsetTop;
        // j cows
        if(left < 0){ 
            while(left < 0){ 
                left += 1024;
                j++;
            }   
            j--;
            left = left - 1024;
        }   
        // i rows
        if(topp < 0){ 
            while(topp < 0){ 
                topp += 1024;
                i++;
            }   
            i--;
            topp = topp - 1024;
        }   
        var convas = document.getElementById('box');
        var context = convas.getContext('2d');
        if(imgSrc.length === 4 && i >= 0 && i < imgSrc[zoom-1].length && j < imgSrc[zoom-1][i].length && i>=0 && j>=0){
            rasterBoard00.source = imgSrc[zoom-1][i][j];
            rasterBoard00.position = new Point(left + 512,topp + 512);
            rasterBoard00.size = new Size(1024,1024);
        }
        else{
            rasterBoard00.source = url;
            rasterBoard00.position = new Point(left + 512,topp + 512);
            rasterBoard00.size = new Size(1024,1024);
        }

        if(imgSrc.length === 4 && i >= 0 && i < imgSrc[zoom-1].length && j+1 < imgSrc[zoom-1][i].length && i>=0 && j+1 >=0){
            rasterBoard01.source = imgSrc[zoom-1][i][j + 1]; 
            rasterBoard01.position = new Point(left + 1024 + 512,topp + 512);
            rasterBoard01.size = new Size(1024,1024);
        }
        else{
            rasterBoard01.source = url; 
            rasterBoard01.position = new Point(left + 1024 + 512,topp  + 512);
            rasterBoard01.size = new Size(1024,1024);
        }

        if(imgSrc.length === 4 && i+1 >= 0 && i+1 < imgSrc[zoom-1].length && j < imgSrc[zoom-1][i+1].length && i+1>=0 && j >=0){
            rasterBoard10.source = imgSrc[zoom-1][i + 1][j];
            rasterBoard10.position = new Point(left  + 512,topp +1024 + 512);
            rasterBoard10.size = new Size(1024,1024);
        }
        else{
            rasterBoard10.source = url;
            rasterBoard10.position = new Point(left + 512,topp + 1024 + 512);
            rasterBoard10.size = new Size(1024,1024);
        }

        if(imgSrc.length === 4 && i+1 >= 0 && i+1 < imgSrc[zoom - 1].length && j+1 < imgSrc[zoom - 1][i+1].length && i+1>=0 && j+1 >=0){
            rasterBoard11.source = imgSrc[zoom-1][i + 1][j + 1]; 
            rasterBoard11.position = new Point(left + 1024 + 512,topp + 1024 + 512);
            rasterBoard11.size = new Size(1024,1024);
        }
        else{
            rasterBoard11.source = url; 
            rasterBoard11.position = new Point(left + 1024 + 512,topp + 1024 + 512);
            rasterBoard11.size = new Size(1024,1024);
        }
    }
    function loadArrowOnMap(){//11
        var lenArrow = map.Arrows.length;
        for(var i=0; i< lenArrow; i++){//11.1
            var len = map.Arrows[i].Points.length;
            pathBoard.remove();
            pathBoard.closed = false;
            pathBoard = new Path();
            pathBoard.strokeColor = 'red';
            pathBoard.strokeWidth = 5 * Pwidth;
                pathBoard.data = {
                    indexSeg:i,
                    indexPath:-1,
                    segID:map.Arrows[i].ID,
                    Type:map.Arrows[i].Type
                };
                if(editType === 'arrow' && map.Arrows[i].ID === currentSegment){pathBoard.strokeColor = 'yellow';}
                if(editType === 'arrow' && i === currentIndexSeg){pathBoard.strokeColor = 'white';}
            for(var j=0; j< len ;j++){//11.2
                if(editType === 'arrow' && i === currentIndexSeg && j ===  currentPoint){//11.3
                    updateCirclePosition( (map.Arrows[i].Points[j].X - UTMx[zoom-1]) * 32 / Math.pow(2, zoom - 1) + offsetLeft, -(map.Arrows[i].Points[j].Y - UTMy[zoom - 1]) * 32/ Math.pow(2, zoom - 1) +offsetTop);
                }//11.3
                pathBoard.add(new Point( (map.Arrows[i].Points[j].X - UTMx[zoom - 1]) * 32 / Math.pow(2, zoom-1) + offsetLeft , -(map.Arrows[i].Points[j].Y - UTMy[zoom-1]) *32 / Math.pow(2, zoom - 1) + offsetTop));
                pathBoard.closed = true;
            }//11.2
            var pBoard = pathBoard.clone();
                pBoard.onMouseEnter = function(event){
                    isAddPoint = false;
                    document.getElementById('box').style.cursor = 'pointer';
                    items = groupBoard.getItems({
                        class:Path,
                        segments:function(segments){
                            return Object.is(segments, event.target.segments);
                        }
                    });
                    document.getElementById('segID').value = items[0].data.segID;
                    items[0].selected = true;
                    items[0].strokeWidth = 7* Pwidth;
                }
                pBoard.onMouseLeave = function(event){
                    isAddPoint = true;
                    items[0].selected = false;
                    items[0].strokeWidth = 2* Pwidth;
                    if(items[0].data.Type === 'refLine'){
                        items[0].strokeWidth = 5* Pwidth;
                    }
                    document.getElementById('box').style.cursor = 'crosshair';
                }
                pBoard.onClick = function(event){
                    editType = 'arrow';
                    currentPoint = -1;
                    movePoint = false;
                    currentIndexSeg = items[0].data.indexSeg;
                    currentSegment = items[0].data.segID;
                    freshBoard();
                }
            groupBoard.addChild(pBoard);
        }//11.1
    }//11
    function loadPathOnMap(){//7
        var lenOfMap = map.Segments.length;
        groupBoard.removeChildren();
        updateCirclePosition(5,5);
        for(var i=0;i<lenOfMap; i++){//3
            var lenOfSeg = map.Segments[i].Paths.length;
            for(var j = 0; j< lenOfSeg; j++){//4
                var lenOfPath = map.Segments[i].Paths[j].Points.length;
                pathBoard.remove();
                pathBoard.closed = false;
                pathBoard = new Path();
                pathBoard.strokeColor = 'red';
                pathBoard.strokeWidth = 5 * Pwidth;
                pathBoard.data = {
                    indexSeg:i,
                    indexPath:j,
                    segID:map.Segments[i].ID,
                    preID:map.Segments[i].preID,
                    nextID:map.Segments[i].nextID,
                    Type:map.Segments[i].Paths[j].Type
                };
                if(map.Segments[i].Paths[j].Type !== 'refLine'){pathBoard.strokeWidth = 2 * Pwidth;pathBoard.name = 'refLine.0';}
                if(map.Segments[i].ID === preSegment.toString()){pathBoard.strokeColor = 'green';}
                if(map.Segments[i].ID === nextSegment.toString()){pathBoard.strokeColor = 'blue';}
                if(map.Segments[i].ID === currentSegment.toString()){pathBoard.strokeColor = 'yellow';}
                if(i === currentIndexSeg && j === currentIndexPath){pathBoard.strokeColor = 'white';}
                for(var k=0; k< lenOfPath; k++){//5
                    pathBoard.add(new Point( (map.Segments[i].Paths[j].Points[k].X - UTMx[zoom - 1]) * 32 / Math.pow(2, zoom-1) + offsetLeft , -(map.Segments[i].Paths[j].Points[k].Y - UTMy[zoom-1]) *32 / Math.pow(2, zoom - 1) + offsetTop));
                    if(editType === 'path' && i === currentIndexSeg && j === currentIndexPath && k === currentPoint){
                        updateCirclePosition( (map.Segments[i].Paths[j].Points[k].X - UTMx[zoom-1]) * 32 / Math.pow(2, zoom - 1) + offsetLeft, -(map.Segments[i].Paths[j].Points[k].Y - UTMy[zoom - 1]) * 32/ Math.pow(2, zoom - 1) +offsetTop);
                    }
                }//5
                var pBoard = pathBoard.clone();
                var items;
                pBoard.onMouseEnter = function(event){
                    isAddPoint = false;
                    document.getElementById('box').style.cursor = 'pointer';
                    items = groupBoard.getItems({
                        class:Path,
                        segments:function(segments){
                            return Object.is(segments, event.target.segments);
                        }
                    });
                    document.getElementById('segID').value = items[0].data.segID;
                    document.getElementById('preID').value = items[0].data.preID;
                    document.getElementById('nextID').value = items[0].data.nextID;
                    items[0].selected = true;
                    items[0].strokeWidth = 7* Pwidth;
                }
                pBoard.onMouseLeave = function(event){
                    isAddPoint = true;
                    items[0].selected = false;
                    items[0].strokeWidth = 2* Pwidth;
                    if(items[0].data.Type === 'refLine'){
                        items[0].strokeWidth = 5* Pwidth;
                    }
                    document.getElementById('box').style.cursor = 'crosshair';
                }
                pBoard.onClick = function(event){
                    editType = 'path';
                    currentPoint = -1;
                    movePoint = false;
                    currentIndexSeg = items[0].data.indexSeg;
                    currentIndexPath = items[0].data.indexPath; 
                    currentSegment = items[0].data.segID;
                    preSegment = items[0].data.preID;
                    nextSegment = items[0].data.nextID;
                    freshBoard();
                }
                groupBoard.addChild(pBoard);
            }//4
        }//3
    }//7
    function loadSegOnBoard(){//10
        for(var j=0; j< segment.Paths.length ; j++){//6
            pathBoard.remove();
            pathBoard.closed = false;
            pathBoard = new Path();
            pathBoard.strokeColor = 'orange';
            pathBoard.strokeColor = 'purple';
            pathBoard.strokeWidth = 5 * Pwidth;
            if(segment.Paths[j].Type !== 'refLine'){pathBoard.strokeWidth = 2 * Pwidth;pathBoard.name = 'refLine.0';}
            var lenlen = segment.Paths[j].Points.length;
            for(var k=0; k< lenlen; k++){//5
                pathBoard.add(new Point( (segment.Paths[j].Points[k].X - UTMx[zoom - 1]) * 32 / Math.pow(2, zoom-1) + offsetLeft , -(segment.Paths[j].Points[k].Y - UTMy[zoom-1]) * 32 / Math.pow(2, zoom - 1) + offsetTop));
            }//5
            var pBoard = pathBoard.clone();
            groupBoard.addChild(pBoard);
        }//6
    }//10
    function loadPathOnBoard(){//8
        pathBoard.remove();
        pathBoard.closed = false;
        pathBoard = new Path();
        pathBoard.strokeColor = 'red';
        pathBoard.strokeWidth = 5* Pwidth;
        pathLength = path.Points.length; 
        for(var i=0; i< pathLength; i++){//2
            pathBoard.add(new Point(path.Points[i].X + offsetLeft, path.Points[i].Y + offsetTop));
        }///2
    }//8
    //// serving for moving a given point postion
    function updateCirclePosition(xx,yy){
        circleBoard.position.x = xx;
        circleBoard.position.y = yy;
        circleBoard.fillColor.highlight = new Point(xx,yy);
    }
    //// update the ID attribute of Seg
    function commitID(){
        document.getElementById('commit').blur();
        currentPoint = -1;
        if(editType === 'path'){//2
             updateID();
        }//2
        if(editType === 'arrow'){
             updateArrowID();
        }
        freshBoard();
    }
    //// add line to One given Segment
    function addLane(){
        document.getElementById('addLane').blur();
        Init();
        addLine();
        freshBoard();
    }

    function chageWidth(){
        alert('changewidth');
        laneWidth = parseFloat(document.getElementById('laneWidth').value);
        freshBoard();
    }

    function chageNum(){
        laneNum = parseInt(document.getElementById('laneNum').value);
        freshBoard();
    }
    //commit new Id and preID and nextID
    document.getElementById('commit').onclick = commitID;
    //add new line
    document.getElementById('addLane').onclick = addLane;

    var sel = document.getElementById("laneNum");
    if(sel&&sel.addEventListener){
        sel.addEventListener('change',function(e){
            var ev = e||window.event;
            var target = ev.target||ev.srcElement;
            freshBoard();
            document.getElementById('laneNum').blur();
        },false)
    }

    var se = document.getElementById("laneWidth");
    if(se&&se.addEventListener){
        se.addEventListener('change',function(e){
            var ev = e||window.event;
            var target = ev.target||ev.srcElement;
            freshBoard();
            document.getElementById('laneWidth').blur();
        },false)
    }

    var s = document.getElementById("zoom");
    if(s&&s.addEventListener){
        s.addEventListener('change',function(e){
            var ev = e||window.event;
            var target = ev.target||ev.srcElement;
            zoom = parseInt(document.getElementById('zoom').value);
            if(imgSrc.length > 0){
                offsetLeft = (-offsetUTMX + UTMx[zoom - 1]) * 32 / Math.pow(2,zoom - 1) + 500;
                offsetTop = (offsetUTMY - UTMy[zoom - 1]) * 32 / Math.pow(2,zoom - 1) + 360;
                freshBoard();
            }
            document.getElementById('zoom').blur();
        },false)
    }

    var load = document.getElementById('load');
    if(load && load.addEventListener){
        load.addEventListener('change',function(e){
            var ev = e || window.event;
            loadData(ev); 
            freshBoard();
        },false)
    }

    var myitem = document.getElementById("box");
    if (myitem.addEventListener)
    {
        // IE9, Chrome, Safari, Opera
        myitem.addEventListener("mousewheel", MouseWheelHandler, false);
        // Firefox
        myitem.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }
    // IE 6/7/8
    else
    {
        myitem.attachEvent("onmousewheel", MouseWheelHandler);
    }

    function MouseWheelHandler(e)
    {
        if(imgSrc.length > 0){
            var e = window.event || e; // old IE support
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            if(delta < 0 && zoom < 4){zoom++;document.getElementById('zoom').value = zoom;}
            if(delta > 0 && zoom > 1){zoom--;document.getElementById('zoom').value = zoom;}
            offsetLeft = (-offsetUTMX + UTMx[zoom - 1]) * 32 / Math.pow(2,zoom - 1) + 500;
            offsetTop = (offsetUTMY - UTMy[zoom - 1]) * 32 / Math.pow(2,zoom - 1) + 360;
            freshBoard();
        }
    }
}//0
