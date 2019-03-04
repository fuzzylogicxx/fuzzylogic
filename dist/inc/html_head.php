<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<?php
	$is_homepage = ($_SERVER['REQUEST_URI'] === "/");
	$is_blog_article = (
		(
			(strpos($_SERVER['REQUEST_URI'], 'thoughts') !== false) ||
			(strpos($_SERVER['REQUEST_URI'], 'sounds') !== false) ||
			(strpos($_SERVER['REQUEST_URI'], 'bytes') !== false) ||
			(strpos($_SERVER['REQUEST_URI'], 'links') !== false)
		)
		&&
		(
			($_SERVER['REQUEST_URI'] !== "/thoughts/") &&
			($_SERVER['REQUEST_URI'] !== "/sounds/") &&
			($_SERVER['REQUEST_URI'] !== "/bytes/") &&
			($_SERVER['REQUEST_URI'] !== "/links/")
		)
	);
	if ($is_blog_article) {
		perch_blog_post_meta(perch_get('s'));
		perch_blog_post_webmention_endpoint(perch_get('s'));
	} else { ?>
	<title><?php echo $page['title']; ?> | Fuzzy Logic</title>
	<meta name="description" content="">
	<?php } ?>

	<link rel="authorization_endpoint" href="https://indieauth.com/auth">
	<link rel="token_endpoint" href="https://tokens.indieauth.com/token">

	<link rel="alternate" type="application/rss+xml" title="RSS" href="/blog/rss.php" />
	<?php if ($is_homepage || $is_blog_article) { // to do: add sounds, and...? ?>
<meta name="robots" content="index,follow" />
	<?php } else { ?>
<meta name="robots" content="noindex">
	<?php } ?>

	<link rel="manifest" href="site.webmanifest">
	<!-- <link rel="apple-touch-icon" href="icon.png"> -->

	<link rel="stylesheet" href="/css/screen_v12.css">

  <script>
    /*! grunt-grunticon Stylesheet Loader - v2.1.6 | https://github.com/filamentgroup/grunticon | (c) 2015 Scott Jehl, Filament Group, Inc. | MIT license. */

  !function(){function e(e,t){function n(){!o&&t&&(o=!0,t.call(e))}var o;e.addEventListener&&e.addEventListener("load",n),e.attachEvent&&e.attachEvent("onload",n),"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(n)}!function(e){"use strict";var t=function(t,n,o){function r(e){if(c.body)return e();setTimeout(function(){r(e)})}function a(){d.addEventListener&&d.removeEventListener("load",a),d.media=o||"all"}var i,c=e.document,d=c.createElement("link");if(n)i=n;else{var l=(c.body||c.getElementsByTagName("head")[0]).childNodes;i=l[l.length-1]}var s=c.styleSheets;d.rel="stylesheet",d.href=t,d.media="only x",r(function(){i.parentNode.insertBefore(d,n?i:i.nextSibling)});var u=function(e){for(var t=d.href,n=s.length;n--;)if(s[n].href===t)return e();setTimeout(function(){u(e)})};return d.addEventListener&&d.addEventListener("load",a),d.onloadcssdefined=u,u(a),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),function(t){var n=function(o,r){"use strict";if(o&&3===o.length){var a=t.navigator,i=t.document,c=t.Image,d=!(!i.createElementNS||!i.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!i.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||t.opera&&-1===a.userAgent.indexOf("Chrome")||-1!==a.userAgent.indexOf("Series40")),l=new c;l.onerror=function(){n.method="png",n.href=o[2],loadCSS(o[2])},l.onload=function(){var t=1===l.width&&1===l.height,a=o[t&&d?0:t?1:2];n.method=t&&d?"svg":t?"datapng":"png",n.href=a,e(loadCSS(a),r)},l.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",i.documentElement.className+=" grunticon"}};n.loadCSS=loadCSS,n.onloadCSS=e,t.grunticon=n}(this),function(e,t){"use strict";var n,o=t.document,r=function(e){if(o.attachEvent?"complete"===o.readyState:"loading"!==o.readyState)e();else{var t=!1;o.addEventListener("readystatechange",function(){t||(t=!0,e())},!1)}},a=function(e){return t.document.querySelector('link[href$="'+e+'"]')},i=function(e,t){if(n&&!t)return n;n={};var o,r,a,i,c,d;if(!(o=e.sheet))return n;r=o.cssRules?o.cssRules:o.rules;for(var l=0;l<r.length;l++)a=r[l].cssText,i="grunticon:"+r[l].selectorText,(c=a.split(");")[0].match(/US\-ASCII\,([^"']+)/))&&c[1]&&(d=decodeURIComponent(c[1]),n[i]=d);return n},c=function(e,t){var n,r,a,i,c;t?n=e:(t=e,n=o),i="data-grunticon-embed";for(var d in t){c=d.slice("grunticon:".length);try{r=n.querySelectorAll(c)}catch(e){continue}a=[];for(var l=0;l<r.length;l++)null!==r[l].getAttribute(i)&&a.push(r[l]);if(a.length)for(l=0;l<a.length;l++)a[l].innerHTML=t[d],a[l].style.backgroundImage="none",a[l].removeAttribute(i)}return a},d=function(t,n){"svg"===e.method&&r(function(){var o=i(a(e.href));"function"==typeof n?(c(t,o),n()):c(o),"function"==typeof t&&t()})};e.embedIcons=c,e.getCSS=a,e.getIcons=i,e.ready=r,e.svgLoadedCallback=d,e.embedSVG=d}(grunticon,this)}();

    grunticon(["/svg/icons.data.svg.css", "/svg/icons.data.png.css", "/svg/icons.fallback.css"], grunticon.svgLoadedCallback);
  </script>
  <noscript><link href="/svg/icons.fallback.css" rel="stylesheet"></noscript>

	<!-- third-generation iPad with high-resolution Retina display: -->
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/img/favicon144.png">
	<!-- iPhone with high-resolution Retina display: -->
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/img/favicon114.png">
	<!-- first- and second-generation iPad: -->
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/img/favicon72.png">
	<!-- non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
	<link rel="apple-touch-icon-precomposed" href="/img/favicon57.png">
	<!-- basic favicon -->
	<link rel="shortcut icon" href="/img/favicon32.png">


</head>
