var theRealscripturl ="http://marcpassenheim.net/AdServerTest/www/delivery/tjs.php";
    var theRandom = Math.floor(Math.random() * 1000000 + 1);
    var urlparam = {
        trackerid: '"?trackerid=3&amp;append=0&amp;r="+r+"',
        cb: theRandom
    };


   // console.log('urlzone',urlparam.zoneid)
    var thescriptURL = Object.keys(urlparam)
        .map((key) => key + "=" + urlparam[key])
        .join("&");
    //the adurl
    var ScriptconstruUrl = theRealscripturl + thescriptURL;



const Pixelscript = document.createElement("script");
script.id = "Pixelscript";
script.type = "text/javascript";
script.src = ScriptconstruUrl;
script.onload = (console.log('pixelsuccesfullyfired'));
script.onerror =(console.log('error in appending script to head'));
head.appendChild(Pixelscript);






    var p = (location.protocol=='https:'?'https://marcpassenheim.net/AdServerTest/www/delivery/tjs.php':'http://marcpassenheim.net/AdServerTest/www/delivery/tjs.php');


   
    document.write ("type='text/javascript' src='"+p);
    document.write ("?trackerid=3&amp;append=0&amp;r="+r+"'><" + "\/script>");
//]]>--></script><noscript><div id='m3_tracker_3' style='position: absolute; left: 0px; top: 0px; visibility: hidden;'><img src='http://marcpassenheim.net/AdServerTest/www/delivery/ti.php?trackerid=3&amp;cb=%%RANDOM_NUMBER%%' width='0' height='0' alt='' /></div></noscript>
