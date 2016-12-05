<?php
// Originally Created by FoxInFlames - https://github.com/FoxInFlame/matomari
// Modified by Rafael De Jongh
/* Headers
-------------------------------*/
header("access-control-allow-origin: *");
header("Content-Type: application/json");
require("SimpleHtmlDOM.php");
/* Retrieving Values
-------------------------------*/
$parts = isset($_GET['username']) ? explode('/',$_GET['username']) : array();
$html = file_get_html("https://myanimelist.net/profile/" . $parts[0]);
if(!$html){
	echo "{";
		echo "\"error\": \"Username was not found or MAL is offline.\"";
	echo "}";
}
/* Setting Values
-------------------------------*/
$username = $parts[0];
$mal_link = "https://myanimelist.net/profile/" . $username;
$html_rightside = $html->find("div#contentWrapper div.container-right",0);
$html_leftside = $html->find("div#contentWrapper div.container-left",0);
/* Favorite Retriever
-------------------------------*/
$fav_arr = [];
$favs = $html_rightside->find("div.user-favorites", 0)->children();
foreach($favs as $value) {
	if($value->find("h5", 0)->innertext == "Anime"){
		$favourites_anime = $value->find("ul.anime",0);
		if(!empty($favourites_anime)) {
			foreach($favourites_anime->find("li") as $value){
				//Anime ID
				array_push($fav_arr, array(
					"fav_id" => trim(explode("/",$value->find("div", 1)->find("a", 0)->href)[4]),
					"fav_name" => trim(explode("/",$value->find("div", 1)->find("a", 0)->href)[5]),
					"fav_image" => explode('?',"https://myanimelist.cdn-dena.com/images/anime/" . trim(explode("/", $value->find("div",0)->find("a",0)->style)[7]) . "/" . trim(explode("/", $value->find("div",0)->find("a",0)->style)[8]))[0]
				));
			}
		}
	} 
}
/* Setting Empty
-------------------------------*/
if(!isset($type)){$type = "null";}
/* JSON Output
-------------------------------*/
echo json_encode($fav_arr);
?>