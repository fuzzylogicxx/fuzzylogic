<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<?php
	$is_blog_article = (strpos($_SERVER['REQUEST_URI'], 'posts') !== false); 
	if ($is_blog_article) {
		perch_blog_post_meta(perch_get('s'));
		perch_blog_post_webmention_endpoint(perch_get('s'));
	} else { ?>
	<title><?php echo $page['title']; ?> | Fuzzy Logic</title>
	<meta name="description" content="">
	<?php } ?>

	<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.php" />
	
	<meta name="robots" content="noindex">

	<link rel="manifest" href="site.webmanifest">
	<link rel="apple-touch-icon" href="icon.png">
	<!-- Place favicon.ico in the root directory -->

	<?php //perch_get_css(); ?>
	<link rel="stylesheet" href="/css/normalize.css">
	<link rel="stylesheet" href="/css/main.css">

	<!-- <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&amp;subset=latin-ext" rel="stylesheet">  -->
	<!-- “Source Serif, Open Sans, Lato, Clear Sans, Merriweather, Fira, Overpass and Alegreya” -->
	<!-- <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet"> -->
	<!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet"> -->
	<!-- <link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700,700i" rel="stylesheet"> -->
<!-- 	<link href="https://fonts.googleapis.com/css?family=Alegreya:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet"> -->


	<style>
		/*
		Thin (normally 100)
		Extra Light  (normally 200)
		Light (normally 300)
		Book  (?)
		Regular (normally 400)
		Core (?)
		Medium  (normally 500)
		SemiBold (normally 600)
		Bold (normally 700)
		ExtraBold (normally 800)
		Heavy (normally 900)




		@font-face {
			font-family: 'FSEmeric';
			src: url('/fonts/fsemericwebextralight/FSEmericWeb-ExtraLight.eot'); /* IE9 */
			src: url('/fonts/fsemericwebextralight/FSEmericWeb-ExtraLight.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ 
			url('/fonts/fsemericwebextralight/FSEmericWeb-ExtraLight.woff') format('woff'); /* Modern Browsers */
			font-weight: 200;
			font-style: normal;
		}
		@font-face {
			font-family: 'FSEmeric';
			src: url('/fonts/fsemericwebextralightitalic/FSEmericWeb-ExtraLightItalic.eot'); /* IE9 */
			src: url('/fonts/fsemericwebextralightitalic/FSEmericWeb-ExtraLightItalic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ 
			url('/fonts/fsemericwebextralightitalic/FSEmericWeb-ExtraLightItalic.woff') format('woff'); /* Modern Browsers */
			font-weight: 200;
			font-style: italic;
		}
		
		@font-face {
			font-family: 'FSEmeric';
			src: url('/fonts/fsemericwebbook/FSEmericWeb-Book.eot'); /* IE9 */
			src: url('/fonts/fsemericwebbook/FSEmericWeb-Book.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ 
			url('/fonts/fsemericwebbook/FSEmericWeb-Book.woff') format('woff'); /* Modern Browsers */
			font-weight: 350;
			font-style: normal;
		}
		@font-face {
			font-family: 'FSEmeric';
			src: url('/fonts/fsemericwebbookitalic/FSEmericWeb-BookItalic.eot'); /* IE9 */
			src: url('/fonts/fsemericwebbookitalic/FSEmericWeb-BookItalic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ 
			url('/fonts/fsemericwebbookitalic/FSEmericWeb-BookItalic.woff') format('woff'); /* Modern Browsers */
			font-weight: 350;
			font-style: italic;
		}

		@font-face {
			font-family: 'FSEmeric';
			src: url('/fonts/fsemericwebregular/FSEmericWeb-Regular.eot'); /* IE9 */
			src: url('/fonts/fsemericwebregular/FSEmericWeb-Regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ 
			url('/fonts/fsemericwebregular/FSEmericWeb-Regular.woff') format('woff'); /* Modern Browsers */
			font-weight: 400; /* i.e. normal */
			font-style: normal;
		}
		@font-face {
			font-family: 'FSEmeric';
			src: url('/fonts/fsemericwebitalic/FSEmericWeb-Italic.eot'); /* IE9 */
			src: url('/fonts/fsemericwebitalic/FSEmericWeb-Italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ 
			url('/fonts/fsemericwebitalic/FSEmericWeb-Italic.woff') format('woff'); /* Modern Browsers */
			font-weight: 400; /* i.e. normal */
			font-style: italic;
		}

		@font-face {
			font-family: 'FSEmeric';
			src: url('/fonts/fsemericwebbold/FSEmericWeb-Bold.eot'); /* IE9 */
			src: url('/fonts/fsemericwebbold/FSEmericWeb-Bold.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ 
			url('/fonts/fsemericwebbold/FSEmericWeb-Bold.woff') format('woff'); /* Modern Browsers */
			font-weight: 700; /* i.e. normal */
			font-style: normal;
		}
		@font-face {
			font-family: 'FSEmeric';
			src: url('/fonts/fsemericwebbolditalic/FSEmericWeb-BoldItalic.eot'); /* IE9 */
			src: url('/fonts/fsemericwebbolditalic/FSEmericWeb-BoldItalic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ 
			url('/fonts/fsemericwebbolditalic/FSEmericWeb-BoldItalic.woff') format('woff'); /* Modern Browsers */
			font-weight: 700; /* i.e. normal */
			font-style: italic;
		}


		body {
			font-family: 'FSEmeric', sans-serif; /* 'Fira Sans', *//* 'Open Sans',*/ /*  'Lato',  */ /* 'Source Sans Pro', */
			margin: 0;
			padding: 0;
			line-height: 1.5;
			font-size: 17px;
			color: rgb(51,51,51);
			/*font-weight: 300;*/
			/*color: #fff;*/
			/*background-color: rgb(38, 38, 38);*/
			/*background-color: #1e8b8e;*/
			/*color: #fff;*/
			text-rendering: optimizeLegibility;
			-webkit-font-smoothing: antialiased;
		}
		body {
		    font-feature-settings: "liga" 1;
		    font-feature-settings: "onum" 1;
		    -webkit-font-smoothing: antialiased;
		}
		@supports (font-variant-ligatures: common-ligatures) {
		    body {
		        font-feature-settings: normal;
		        font-variant-ligatures: common-ligatures;
		    }
		}
		@supports (font-variant-numeric: oldstyle-nums) {
		    body {
		        font-feature-settings: normal;
		        font-variant-numeric: oldstyle-nums;
		    }
		}
		a {
			  color: #35857d;
			  text-decoration-skip-ink: none;
			/*color: #fff;
			text-decoration: none;*/
			/*border-bottom: 1px solid #fff;*/

			/*color: green;*/ /*rgb(158, 216, 210);*/ /* color: rgb(185, 225, 220); */
			/*color: rgb(255,255,255);*/
		}
		a:hover {

		}
		header, .container {
			margin: 0 20px;
			max-width: 38em;
		}
		@media only screen and (min-width: 38em)  { 
			header,  .container {
				margin-left: auto;
				margin-right: auto;
			}
		}
		abbr, code.markup.element, code.markup.attribute {
    		text-decoration: none;
    		font-family: inherit;
    		font-variant: all-small-caps;
		}
		.hfeed, 
		.hfeed li {
			list-style: none;
			padding-left: 0;
			margin-left: 0;
		}
		.intro {
			font-weight: 200;
			font-size: 22px;
			line-height: 1.37;
		}
		img {
			max-width: 100%;
		}
	</style>

</head>
