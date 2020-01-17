/*
 * Add character to military time
 * Type: Util
 */

var getTimeWithChar = function (time, char = ':') {
  var hour = time.slice(0, 2);
  var min = time.slice(2);
  return [hour, char, min].join('');
}


/*
 * Parse XML info
 * Type: Util
 */

var parseXML = function (data) {
  if (window.DOMParser) {
    parser = new DOMParser();
    return parser.parseFromString(data, "text/xml");
  }
  else {
    // Internet Explorer
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    return xmlDoc.loadXML(data);
  }
};


/*
 * Get Node Value
 * Type: Util
 */

var getNodeValue = function (parent, tag) {
  var searchElems = parent.getElementsByTagName(tag);
  var getElem = searchElems[0];
  var getChildNodes = (getElem) ? getElem.childNodes[0] : '';
  var nodeValue = (getChildNodes) ? getChildNodes.nodeValue : '';
  return nodeValue;
}


/*
 * Get Sessions
 */

var getSessions = function(data) {
  var xmlDoc = parseXML(data);
  var posters = xmlDoc.getElementsByTagName('poster');
  var postersEl = document.querySelector('.posters');
  // var hourChar = ':';
  var postersArray = new Array();
  var tolerance = '900'; // 15 minutes

  Array.prototype.forEach.call(posters, function(poster){

    var sessionsHTML = '';
    var screens = poster.getElementsByTagName('sala');
    var nrOfScreens = poster.getElementsByTagName('sala').length;

    var posterID = getNodeValue(poster, 'idfilme');
    var posterTitle = getNodeValue(poster, 'titulo');
    var posterFormat = getNodeValue(poster, 'formato');
    var posterType = getNodeValue(poster, 'genero');
    var posterTarget = getNodeValue(poster, 'classeetaria');

    Array.prototype.forEach.call(screens, function(screen){
      var schedulesHTML = '';
      var lockNext = false;
      var sessions = screen.getElementsByTagName('sessao');

      var screenName = getNodeValue(screen, 'nome');

      Array.prototype.forEach.call(sessions, function(session){
        var currentDate = new Date();

        var sessionStartTime = getTimeWithChar(getNodeValue(session, 'horainicio'));
        var sessionEndTime = getTimeWithChar(getNodeValue(session, 'horafim'));

        var startTime = new Date(moment(sessionStartTime, "HH:mm").format());
        var endTime = new Date(moment(sessionEndTime).add(tolerance, 'seconds'));

        var isActive = '';

        if (lockNext) {
          isActive = '';
        } else {
          if (currentDate > startTime && currentDate < endTime) {
            isActive = ' -active';
            lockNext = true;
          } else if (currentDate < startTime) {
            isActive = ' -active';
            lockNext = true;
          } else {
            isActive = '';
          }
        }

        schedulesHTML += '<li class="slots-session' + isActive +'"> <div class="slots-session__start">' + sessionStartTime + '</div><div class="slots-session__end">' + sessionEndTime + '</div></li>';
      });

      sessionsHTML += '<div class="session-row"> <div class="session-room">' + posterFormat + '<span>Sala ' + screenName + '</span></div><ul class="session-slots">' + schedulesHTML + '</ul> <div class="session-detail"> <div class="session-detail__type">' + posterType + '</div><div class="session-detail__target">' + posterTarget + '</div></div></div>';
    });

    postersArray += '<section class="poster container container--fixed" data-sessions="' + nrOfScreens + '"><div class="poster__image" style="background-image: url(http://10.133.37.3/backoffice/rest/img?movieId=' + posterID + ');"></div><div class="poster__sessions"> <div class="sessions-wrapper double-sessions"> ' + sessionsHTML + '</div></div></section>';

    console.log(postersArray);

  //   var sessionId = getNodeValue(el, 'idfilme');
  // //   var screen = getNodeValue(el, 'idsalafilme');
  // //   var format = (getNodeValue(el, 'formato')) ? getNodeValue(el, 'formato') : '2d';
  // //   var type = getNodeValue(el, 'genero');
  // //   var target = getNodeValue(el, 'classeetaria');
  // //   var rawTitle = getNodeValue(el, 'titulo');
  //   var sessionTitle = getNodeValue(el, 'titulo').split('(')[0].trim();
  //   var sessionTitleFormat = getNodeValue(el, 'titulo').split('(')[1];
  //   var sessionLang = '';

  //   if (sessionTitleFormat) {
  //     sessionTitleFormat = sessionTitleFormat.toLowerCase();
  //     if (sessionTitleFormat.indexOf('dob') >= 0) {
  //       sessionLang = 'dob';
  //     } else if (sessionTitleFormat.indexOf('leg') >= 0) {
  //       sessionLang = 'leg';
  //     }
  //   }

  // //   var startTime = getTimeWithChar(getNodeValue(el, 'horainicio'), hourChar);
  // //   var endTime = getTimeWithChar(getNodeValue(el, 'horafim'), hourChar);

  //   var foundSession = postersArray.filter(function (el) {
  //     console.log(el);
  //     return (el) ? el['title'] === sessionTitle && el['lang'] === sessionLang : false;
  //   })[0];

  //   if (foundSession) {
  // //     var indexOfSession = postersArray.indexOf(foundSession);
  // //     if (postersArray[indexOfSession]['sessions'][screen]) {
  // //       postersArray[indexOfSession]['sessions'][screen].push(
  // //         {
  // //           format: format,
  // //           startTime: startTime,
  // //           endTime: endTime
  // //         }
  // //       );
  // //     } else {
  // //       postersArray[indexOfSession]['sessions'][screen] = [
  // //         {
  // //           format: format,
  // //           startTime: startTime,
  // //           endTime: endTime
  // //         }
  // //       ];
  // //     }

  //   } else {

  //     var obj = {};

  //     obj['i'] = i;
  //     obj['id'] = sessionId;
  //     obj['title'] = sessionTitle;
  //     obj['lang'] = sessionLang;
  // //     obj['type'] = type;
  // //     obj['target'] = target;
  // //     obj['sessions'] = {};
  // //     obj['sessions'][screen] = [
  // //       {
  // //         format: format,
  // //         startTime: startTime,
  // //         endTime: endTime
  // //       }
  // //     ];

  // //     postersArray.push(obj);

  // //     console.log(postersArray);

  //   }
  //     postersArray.push(obj);
  });

  postersEl.innerHTML = postersArray;
};

/*
 * Get XML info
 */

var request = new XMLHttpRequest();
var path = './data/bload3.xml';

request.overrideMimeType('text/plain;charset=iso-8859-1');

request.open('GET', path, true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var resp = this.response;

    getSessions(resp);

  } else {
    // We reached our target server, but it returned an error
    console.log('error');
  }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log('connection error');
};

request.send();
