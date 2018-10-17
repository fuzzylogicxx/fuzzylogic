<!doctype html>
<html lang="en-GB">
<head>

	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<title>Layout | Fuzzy Logic</title>
	<meta name="description" content="">
	
	<link rel="authorization_endpoint" href="https://indieauth.com/auth">
	<link rel="token_endpoint" href="https://tokens.indieauth.com/token">

	<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.php" />

	<meta name="robots" content="noindex">

	<link rel="manifest" href="site.webmanifest">
	<link rel="apple-touch-icon" href="icon.png">
	<!-- Place favicon.ico in the root directory -->

<style type="text/css">

	* {box-sizing: border-box;}

/*    .wrapper {
        max-width: 1024px;
        margin: 0 auto;
        font: 1.2em Helvetica, arial, sans-serif;
    }*/

/*    .wrapper > * {
        border: 2px solid #f08c00;
        background-color: #ffec99;
        border-radius: 5px;
        padding: 10px;
    }*/

    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

[role=banner] {
  grid-area: header;
}
article {
  grid-area: content;
}
aside {
  grid-area: sidebar;
}
[role=contentinfo] {
  grid-area: footer;
}
body {
  display: grid;
  grid-gap: 20px;
  grid-template-areas: 
    "header"
    "content"
    "sidebar"
    "footer";
}
@media (min-width: 500px) {
 body {
    grid-template-columns: 3fr 1fr;
    grid-template-areas: 
      "header  header"
      "content sidebar"
      "footer footer";
  }
  nav ul {
    display: flex;
    justify-content: space-between;
  }
}
/*@media (min-width: 700px) {
  .wrapper {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas: 
      "header header  header"
      "nav    content sidebar"
      "nav    content ad"
      "footer footer  footer"
   }
   nav ul {
     flex-direction: column;
   }
}*/

	
</style>

</head>
<body>
<!--[if lte IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
<![endif]-->

<!-- <header role="banner">
	<a id="logo" href="https://fuzzylogic.me/" title="Home">Fuzzy Logic</a>
</header> -->

<header role="banner">
	<nav role="navigation">
		<a id="dummy-logo" href="https://fuzzylogic.me/" title="Home">Fuzzy Logic</a>
		<ul id="global-nav">
			<li><a href="/">Link 1</a></li>
			<li><a href="/">Link 2</a></li>
			<li><a href="/">Link 3</a></li>
		</ul>
	</nav>
</header>

<main>

	<!-- <div class="intro">
	    <h1>Hello<span class="intro-last-full-stop">.</span></h1>
	    <p>I’m Laurence Hughes, a web developer at <a href="http://www.greenhilldigital.com/">Greenhill</a>, producer in <a href="http://nuclearfami.ly/">The Nuclear Family</a>, player of records and pinger of pongs. <a href="https://fuzzylogic.me/" rel="me">Fuzzy Logic</a> is my online home, where I test-drive web stuff and ramble about code, music and more.</p>
	</div> -->

	<article>
		<header>
			<h1>Article Heading</h1>
		</header>
		<p>Article body content</p>
	</article>

</main>

<aside role="complementary" id="sidebar">
    <h3>Archive</h3>
    <p>Lorem ipsum dolor sit amet</p>
    <h3>Elsewhere online</h3>
    <p>You’ll find me tweeting on <a rel="me" href="https://twitter.com/fuzzylogicx">Twitter</a>; posting photos on <a rel="me" href="https://www.instagram.com/fuzzylogicx/">Instagram</a>; on Soundcloud sharing <a rel="me" href="https://soundcloud.com/the_nuclear_family">music</a> and <a rel="me" href="https://soundcloud.com/fuzzylogicx">mixes</a>; collecting, buying and selling records on <a rel="me" href="https://www.discogs.com/user/laurence">Discogs</a>; and coding on <a rel="me" href="https://github.com/fuzzylogicxx">Github</a> and <a rel="me" href="https://codepen.io/fuzzylogicx/">CodePen</a>.</p>
</aside>

<footer role="contentinfo">
<small>Copyright &copy; 2018</small>
</footer>

<!-- <script src="/js/vendor/modernizr-3.6.0.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="/js/vendor/jquery-3.3.1.min.js"><\/script>')</script>
 -->
<script src="/js/plugins.js"></script>
<script src="/js/main.js"></script>

<!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
<!-- <script>
window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
ga('create', 'UA-XXXXX-Y', 'auto'); ga('send', 'pageview')
</script>
<script src="https://www.google-analytics.com/analytics.js" async defer></script>
 -->
</body>
</html>
