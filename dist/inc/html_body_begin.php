<?php 
// $is_services_section = (strpos($_SERVER['REQUEST_URI'], 'services') !== false); 
// $is_services_index = $_SERVER['REQUEST_URI'] === "/services/"; 

$body_tag_start = "<body";
$body_tag_end = "<body";
$body_classes = [];
$body_id = "";

// if ($is_services_section) {
// 	$body_classes[] = "section-services";
// } elseif ($is_portfolio_section) {
// 	$body_classes[] = "section-portfolio";
// } elseif ($is_journal_section) {
// 	$body_classes[] = "section-journal";
// }

// if ($is_services_index) {
// 	$body_id = "page-services-index";
// } elseif ($is_portfolio_index) {
// 	$body_id = "page-portfolio-index";
// } elseif ($is_journal_index) {
// 	$body_id = "page-journal-index";
// }

echo "<body";
if (!empty($body_classes)) {
	echo " class=\"" . implode(" ", $body_classes) . "\"";
}
if (!empty($body_id)) {
	echo " id=\"" . $body_id . "\"";
}
echo ">\n";
?>
<!--[if lte IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
<![endif]-->
