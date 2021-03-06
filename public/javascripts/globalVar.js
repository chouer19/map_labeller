var Pwidth = 1;
var map = new TrunkMap('Nan');
var pointer = 0;
var segment = new TrunkSegment(pointer);
var path = new TrunkPath('refLine');
var arrow = new TrunkPath('arrow');
var point = new TrunkPoint(-1,-1,-1,-1);
var currentSegment = -1;
var preSegment = -1;
var nextSegment = -1;
var currentPath = -1;
var currentPoint = -1;
var laneNum = 1;
var laneWidth = 2.5;
var zoom = 1;
var imgWidth = 1024;
var imgHeight = 1024;
var isCtrl = false;
var isShift = false;
var isAlt = false;
var isAddPoint = true;
var currentIndexSeg = -1;
var currentIndexPath = -1;
var movePoint = true;
var imgSrc = new Array();
var boxWidth = 8192;
var boxHeight = 8192;
var boxLeft = 0;
var boxTop = 0;
var lastLeft = 0;
var lastTop = 0;
var imgName;
var offsetLeft = 0;
var offsetTop = 0;
var currentX;
var currentY;

var editType = 'path';

var UTMx = new Array(4);
var UTMy = new Array(4);
var offsetUTMX = 0;
var offsetUTMY = 0;
