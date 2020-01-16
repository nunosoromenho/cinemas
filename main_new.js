/*
 * Add character to military time
 * Type: Util
 */

var getTimeWithChar = function (time, char) {
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
  var elements = xmlDoc.getElementsByTagName('sessao');
  var postersEl = document.querySelector('.posters');
  // var hourChar = ':';
  var postersArray = new Array();

  postersEl.innerHTML += 'Teste 8 ';

  Array.prototype.forEach.call(elements, function(el, i){
    var id = getNodeValue(el, 'idfilme');
  //   var screen = getNodeValue(el, 'idsalafilme');
  //   var format = (getNodeValue(el, 'formato')) ? getNodeValue(el, 'formato') : '2d';
  //   var type = getNodeValue(el, 'genero');
  //   var target = getNodeValue(el, 'classeetaria');
  //   var rawTitle = getNodeValue(el, 'titulo');
    var title = getNodeValue(el, 'titulo').split('(')[0].trim();
    var titleFormat = getNodeValue(el, 'titulo').split('(')[1];
    var lang = '';

    if (titleFormat) {
      titleFormat = titleFormat.toLowerCase();
      if (titleFormat.indexOf('dob') >= 0) {
        lang = 'dob';
      } else if (titleFormat.indexOf('leg') >= 0) {
        lang = 'leg';
      }
    }

  //   var startTime = getTimeWithChar(getNodeValue(el, 'horainicio'), hourChar);
  //   var endTime = getTimeWithChar(getNodeValue(el, 'horafim'), hourChar);

    var foundSession = postersArray.find(function (e) {
      return e.title == title && e.lang == lang;
    });

    if (foundSession) {
  //     var indexOfSession = postersArray.indexOf(foundSession);
  //     if (postersArray[indexOfSession]['sessions'][screen]) {
  //       postersArray[indexOfSession]['sessions'][screen].push(
  //         {
  //           format: format,
  //           startTime: startTime,
  //           endTime: endTime
  //         }
  //       );
  //     } else {
  //       postersArray[indexOfSession]['sessions'][screen] = [
  //         {
  //           format: format,
  //           startTime: startTime,
  //           endTime: endTime
  //         }
  //       ];
  //     }

    } else {

      var obj = {};

      obj['id'] = id;
  //     obj['title'] = title;
  //     obj['lang'] = lang;
  //     obj['type'] = type;
  //     obj['target'] = target;
  //     obj['sessions'] = {};
  //     obj['sessions'][screen] = [
  //       {
  //         format: format,
  //         startTime: startTime,
  //         endTime: endTime
  //       }
  //     ];

  //     postersArray.push(obj);

  //     console.log(postersArray);

    }
      postersArray.push(obj.id);
  });

  postersEl.innerHTML += postersArray;
  postersEl.innerHTML += ' Teste 8';
};

/*
 * Get XML info
 */

var request = new XMLHttpRequest();
var path = './data/bload2.xml';

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
