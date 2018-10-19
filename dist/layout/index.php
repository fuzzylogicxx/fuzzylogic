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
	html, body {
		margin: 0;
		padding: 0;
	}
	body {
		/*line-height: 1.2em;*/
		font-family: Helvetica;
		line-height: 1.4;
	}

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
body {
  display: grid;
  /*grid-gap: 1.4rem;*/
  grid-template-areas: 
    "header"
    "content"
    "sidebar"
    "footer";
}
[role=banner] {
  grid-area: header;
  background: red;
}
#dummy-logo {
	color: #fff;
}
main {
  grid-area: content;
}
aside {
  grid-area: sidebar;
}
[role=contentinfo] {
  grid-area: footer;
}

@media (min-width: 50em) {

	body {
		grid-template-columns: auto 38rem 9.5rem auto;
		grid-template-areas: 
		  "header header  header  header"
		  ". 	  content sidebar ."
		  "footer footer  footer  footer";
	}
	nav {
		display: flex;
		justify-content: space-between;
	}
	nav ul {
		display: flex;
		justify-content: space-between;
	}

	[role=banner] {
	  	display: inherit;
		grid-template-columns: 1fr 1fr 38rem 9.5rem 1fr 1fr;
	}

	[role=navigation] {
		grid-column: 2 / 6;
	}

	[role=contentinfo] {
	  	display: inherit;
		grid-template-columns: 1fr 1fr 38rem 9.5rem 1fr 1fr;
	}

	small {
		grid-column: 2 / 6;
	}


}
	
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
			<li><a href="/labs/">Labs</a></li>
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
			<h1>Surface Noise</h1>
		</header>
		<p>It’s taken a few years, but me and Tom are excited to be releasing a new record on our label, The Nuclear Family.</p>

		<p>Check out the audio previews.</p>

		<p>Titled Surface Noise, our third release will be available on both 12″ vinyl and digital, hitting all good record stores in early November ‘18.</p>

		<p>You can pre-order it now from our Bandcamp page.</p>

		<p>Here's how the press release describes it:</p>

		<p>Artist: The Nuclear Family vs Other Lands<br />
		Title: Surface Noise<br>
		Label: The Nuclear Family<br>
		A: The Nuclear Family - Surface Noise<br>
		B: Other Lands - See Thru Time
		</p>

		<p>Did you miss us? The Nuclear Family - Tom Churchill and Laurence Hughes - are back after a three-year hiatus, and this time we’ve roped in one of our good buddies, Other Lands, to help us deliver a double-header of deep delights for discerning DJs and dancers, cut nice and loud over a full side each.</p>

		<p>Surface Noise, on side A, is the first of the Family’s recent studio jams to see the light of day, with its classic 808 drums and analogue bass underpinning warm pads, twinkling melodies and some subtle vocoder flourishes.</p>

		<p>On the flipside, we’re honoured to present a killer track from Other Lands - aka Edinburgh’s veteran DJ/producer Gavin Sutherland, fresh from the success of his recent Pattern Transform 12” for Firecracker and all manner of other exciting studio and live projects. See Thru Time is a masterclass for the heads, with mellifluous chord progressions and a timeless groove.</p>

		<p>TNF 003 will be available on vinyl via Rubadub in November, along with a digital version via Bandcamp.</p>

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
