/* 
Unsupported Browsers
====================
Only the following browsers may be used with Maybank2u:
1. Google Chrome (latest versions)
2. Apple Safari (latest versions)
3. Mozilla Firefox (latest versions)
4. Microsoft Edge (with Chromium)

Visitors using any other browsers do so at their own risk, including IE 11.
*/

(function() {

    var labelH1 = "Oh no! You are not using the latest browser.";
    var labelH3 = "To continue using <b>Maybank2u</b>, please update your browser to the latest version for a more secure banking experience.";
    var labelBtnClose = "&times; Close";

    var imgBg = "./iwov-resources/images/personal/landingblur.png";

    var ua;

    var browserChrome = {
        'name': "Google Chrome",
        'url': "https://www.google.com/chrome/",
        'img': "./iwov-resources/images/personal/logo_chrome.png"
    };

    var browserSafari = {
        'name': "Apple Safari",
        'url': "https://www.apple.com/safari/",
        'img': "./iwov-resources/images/personal/logo_safari.png"
    };

    var browserFirefox = {
        'name': "Mozilla Firefox",
        'url': "https://www.mozilla.org/en-US/firefox/new/",
        'img': "./iwov-resources/images/personal/logo_firefox.png"
    };

    var browserEdge = {
        'name': "Microsoft Edge",
        'url': "https://www.microsoft.com/windows/microsoft-edge",
        'img': "./iwov-resources/images/personal/logo_edge.png"
    };

    var curtain;

    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    function setCookie(name, value, days) {
        /*
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        */
        document.cookie = name + "=" + value
    }

    function isOldIe() {
        ua = window.navigator.userAgent;

        /* no Opera */
        if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1 || ua.indexOf("OPiOS") > -1) {
            console.log(ua);
            return true;
        }

        /* no Windows Phone */
        if (ua.indexOf("Windows Phone") > -1) {
            console.log(ua);
            return true;
        }

        /* no Nokia browser */
        if (ua.indexOf("NokiaBrowser") > -1) {
            console.log(ua);
            return true;
        }

        /* no BlackBerry */
        if (ua.indexOf("PlayBook") > -1) {
            console.log(ua);
            return true;
        }

        /* Interrogate IE */
        if (ua.indexOf("Trident") > -1) {
            if (ua.indexOf("MSIE") > -1) {
                /* no IE 10 and below */
                console.log(ua);
                return true;
            } else {
                /* allow IE 11 */
                return false;
            }
        }

        /* no browsers other than the big 4 */
        if (
            ua.indexOf("Edge") == -1 &&
            ua.indexOf("Chrome") == -1 &&
            ua.indexOf("Firefox") == -1 &&
            ua.indexOf("Safari") == -1 &&
            ua.indexOf("iPhone") == -1 &&
            ua.indexOf("Instagram") == -1 &&
            ua.indexOf("FBAN") == -1 &&
            ua.indexOf("FBAV") == -1
        ) {
            console.log(ua);
            return true;
        }

        /*
        if (ua.indexOf ("Edge") > -1) {
          var patt_ver = /Edge\/(\d+)/;
          var match = patt_ver.exec (ua);
          if (match && match[1] && parseInt (match[1]) < 15) {
            console.log (ua);
            console.log (match[1]);
            return true;
          }
          else {
            return false;
          }
        }

        if (ua.indexOf ("Chrome") > -1) {
          var patt_ver = /Chrome\/(\d+)/;
          var match = patt_ver.exec (ua);
          if (match && match[1] && parseInt (match[1]) < 60) {
            console.log (ua);
            console.log (match[1]);
            return true;
          }
          else {
            return false;
          }
        }

        if (ua.indexOf ("Firefox") > -1) {
          var patt_ver = /Firefox\/(\d+)/;
          var match = patt_ver.exec (ua);
          if (match && match[1] && parseInt (match[1]) < 27) {
            console.log (ua);
            console.log (match[1]);
            return true;
          }
          else {
            return false;
          }
        }
        */

        /* Safari 6 and above only */
        if (ua.indexOf("Safari") > -1 || ua.indexOf("AppleWebKit") > -1) {
            var patt_ver = /AppleWebKit\/(\d+)/;
            var match = patt_ver.exec(ua);
            if (match && match[1] && parseInt(match[1]) < 534) {
                console.log(ua);
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    function createDomWrapper() {
        var curtain = document.createElement('div');
        curtain.id = "oldiecurtain";
        curtain.style.position = "fixed";
        curtain.style.width = "100%";
        curtain.style.height = "100%";
        curtain.style.zIndex = "99999";
        curtain.style.backgroundColor = "#fff";
        curtain.style.top = "0";
        curtain.style.left = "0";
        curtain.style.display = "none";

        return curtain;
    }

    function createDomBlurImg() {
        var blurImg = document.createElement('div');
        blurImg.style.position = "relative";
        blurImg.style.height = "67%";
        blurImg.style.minHeight = "400px";
        blurImg.style.backgroundSize = "cover";
        blurImg.style.backgroundRepeat = "no-repeat";
        blurImg.style.backgroundPosition = "50% 0";
        blurImg.style.backgroundImage = "url('" + imgBg + "')";
        return blurImg;
    }

    function createDomImgA(label, href, src) {
        var domA = document.createElement('a');
        domA.href = href;
        domA.target = "_blank";
        domA.title = label;
        var imgChrome = document.createElement('img');
        imgChrome.src = src;
        imgChrome.style.width = "64px";
        imgChrome.style.height = "64px";
        imgChrome.style.margin = "15px 10px";
        imgChrome.alt = label;
        domA.appendChild(imgChrome);

        return domA;
    }

    function createDomBtnDismiss(label) {
        var btnDismiss = document.createElement('button');
        btnDismiss.style.backgroundColor = "#FFC83D";
        btnDismiss.style.color = "#171717";
        btnDismiss.style.fontWeight = "bold";
        btnDismiss.style.position = "absolute";
        btnDismiss.style.borderRadius = "25px";
        btnDismiss.style.padding = "8px 15px";
        btnDismiss.style.top = "-17px";
        btnDismiss.style.right = "50%";
        btnDismiss.innerHTML = label;
        btnDismiss.onclick = onDismissClick;

        return btnDismiss;
    }

    function createDomMessage() {
        var msg = document.createElement('div');
        msg.style.position = "absolute";
        msg.style.backgroundColor = "#fff";
        msg.style.width = "100%";
        msg.style.bottom = "0";
        msg.style.left = "0";
        msg.style.minHeight = "34%";
        msg.style.padding = "30px";
        msg.style.borderTop = "solid 4px #FFC83D";

        var wrapperBtnDismiss = document.createElement('div');
        wrapperBtnDismiss.style.fontSize = "15px";
        wrapperBtnDismiss.style.position = "absolute";
        wrapperBtnDismiss.style.width = "50%";
        wrapperBtnDismiss.style.height = "0";
        wrapperBtnDismiss.style.top = "0";
        wrapperBtnDismiss.style.left = "50%";

        var btnDismiss = createDomBtnDismiss(labelBtnClose);
        wrapperBtnDismiss.appendChild(btnDismiss);

        msg.appendChild(wrapperBtnDismiss);

        var notes = document.createElement('div');
        notes.style.textAlign = "center";
        notes.style.margin = "0 auto";
        notes.style.maxWidth = "420px";

        var h1 = document.createElement('h1');
        h1.style.fontSize = "20px";
        h1.style.margin = "20px 0";
        h1.style.color = "#036282";
        h1.innerHTML = labelH1;
        notes.appendChild(h1);

        var h3 = document.createElement('h3');
        h3.style.fontSize = "15px";
        h3.style.margin = "20px 0";
        h3.style.color = "#171717";
        h3.style.lineHeight = "1.5";
        h3.innerHTML = labelH3;
        notes.appendChild(h3);

        var aChrome = createDomImgA(browserChrome.name, browserChrome.url, browserChrome.img);
        notes.appendChild(aChrome);
        var aSafari = createDomImgA(browserSafari.name, browserSafari.url, browserSafari.img);
        notes.appendChild(aSafari);
        var aFirefox = createDomImgA(browserFirefox.name, browserFirefox.url, browserFirefox.img);
        notes.appendChild(aFirefox);
        var aEdge = createDomImgA(browserEdge.name, browserEdge.url, browserEdge.img);
        notes.appendChild(aEdge);

        msg.appendChild(notes);

        var uastr = document.createElement('div');
        uastr.style.opacity = "0.2";
        uastr.style.color = "#000000";
        uastr.style.fontSize = "11px";
        uastr.style.textAlign = "center";
        uastr.innerHTML = ua;
        msg.appendChild(uastr);

        return msg;
    }

    function setupDomCurtain() {
        curtain = createDomWrapper();

        var blurImg = createDomBlurImg();
        curtain.appendChild(blurImg);

        var msg = createDomMessage();
        curtain.appendChild(msg);

        document.body.appendChild(curtain);
    }

    function onDismissClick(e) {
        curtain.parentNode.removeChild(curtain);
        setCookie("oldIeCurtainDismissed", "1");
    }

    function showCurtain() {
        curtain.style.display = "";
    }

    function checkIfOldIe() {
        if (isOldIe()) {
            setupDomCurtain();
            showCurtain();
        }
    }

    function isFirstTime() {
        if (getCookie("oldIeCurtainDismissed") == null) {
            return true;
        }
    }

    if (isFirstTime()) {
        checkIfOldIe();
    }

})();