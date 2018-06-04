function TrunkPoint(x,y,lat,lon){//1
    var _this = this;
    _this.ID = -1;
    _this.X = -1;
    _this.Y = -1;
    _this.Lat = -1;
    _this.Lon = -1;
    var init = function(){//2
        _this.X = x;
        _this.Y = y;
        _this.Lat = lat;
        _this.Lon = lon;
    };//2
    init();

    _this.SetX = function(xx){
        _this.X = xx;
    }
    _this.SetY = function(yy){
        _this.Y = yy;
    }
    _this.SetXY = function(xx,yy){//19
        _this.X = xx;
        _this.Y = yy;
    };//19

    _this.XY2LatLon = function(){//5


    };//5

    _this.LatLon2XY = function(){//6

    };//6
}//1

function TrunkPath(type){//3
    var _this = this;
    _this.ID = -1;
    _this.Type = 'refLine';
    _this.Points = new Array();
    var init = function(){//4
        _this.Type = type;
    };//4
    init();
    _this.ReInit = function(ty){
        _this.ID = -1;
        _this.Type = ty;
        for( var i= _this.Points.length; i>0; i--){
            _this.Points.pop();
        }
    }
    _this.SetType = function(ty){//17
        _this.Type = ty;
    };//17
    _this.XY2LatLon = function(){//7

    };//7
    _this.LatLon2XY = function(){//8

    };//9
}//3

function TrunkSegment(id){//11
    var _this = this;
    _this.ID = -1;
    _this.preID = -1;
    _this.nextID = -1;
    _this.Paths = new Array();
    var init = function(){//10
        _this.ID = id.toString();
    };//10
    
    _this.SetID = function(id){//16
        _this.ID = id.toString();
    };//16

    _this.SetPreID = function(id){//12
        _this.preID = id.toString();
    };//12

    _this.SetNextID = function(id){//13
        _this.nextID = id.toString();
    };//13

    _this.ReInit = function(idd){
        _this.ID = idd.toString();
        _this.preID = -1;
        _this.nextID = -1;
        for( var i= _this.Paths.length; i>0; i--){
            _this.Paths.pop();
        }
    }
   
    init();

}//11

function TrunkMap(task){//14
    var _this = this;
    _this.Segments = new Array();
    _this.Arrows = new Array();
    _this.Signs = new Array();
    _this.Task = 'Nan';
    var init = function(){//15
        _this.Task = task;
    };//15
    _this.ReInit = function(idd){
        _this.Task = idd;
        for( var i= _this.Segments.length; i>0; i--){
            _this.Segments.pop();
        }
    }
    init();
}//14
