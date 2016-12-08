$(document).ready(function(){
//FullPage
$('#fullpage').fullpage({
	navigation:true,
	navigationPosition:'right',
	slidesNavigation:true,
	slidesNavPosition:'bottom',
	autoScrolling:true,
	fitToSection:true,
	fitToSectionDelay:1000,
	scrollBar:false,
	easing:'easeInOutCubic',
	easingcss3:'ease-in-out',
	loopBottom:true,
	loopTop:true,
	scrollOverflow:false,
	scrollOverflowOptions:null,
	touchSensitivity:15,
	normalScrollElementTouchThreshold:5,
	keyboardScrolling:true,
	animateAnchor:true,
	recordHistory:true,
	sectionSelector:'section',
	lazyLoading:false
});
//Start - Get MAL Name
$("main").hide();
$("#userfill form").submit(function(e){
e.preventDefault();
var MALUser = $("input#username").val();
$("#userfill").hide().next().show();
$("#user").html(MALUser.replace(/([A-Z])/g,' $1').trim()).attr("href","https://myanimelist.net/profile/" + MALUser); 
//Database Parse
var request = new XMLHttpRequest();
//https://myanimelist.net/malappinfo.php?u=rafaeldejongh&status=all&type=anime
//https://rafaeldejongh-sites.ga/MyAnimeList-User-Stats/malappinfo.php?u=rafaeldejongh
request.open("GET","https://rafaeldejongh-sites.ga/MyAnimeList-User-Stats/malappinfo.php?u=" + MALUser,true);
request.onload = function(){
	if(request.status>=200 && request.status<400){
	var x2js = new X2JS();
	var jsonObj = x2js.xml_str2json(request.responseText);
	var database = JSON.parse(JSON.stringify(jsonObj));
	var s20,s30,s40,s50,s60,s70,s80,s90,s00,s10,cYear,countEpisode,cOVA,cTV,cMovie,cSpecial,cONA,cMusic,one,two,tree,four,five,six,seven,eight,nine,ten;
	s20=s30=s40=s50=s60=s70=s80=s90=s00=s10=cYear=countEpisode=cOVA=cTV=cMovie=cSpecial=cONA=cMusic=one=two=tree=four=five=six=seven=eight=nine=ten=0;
//Database Anime Loop
for(i=0;i<database.myanimelist.anime.length;++i){
	countEpisode += parseInt(database.myanimelist.anime[i].my_watched_episodes);
	$("#episodes").text(countEpisode);
	if(database.myanimelist.anime[i].my_status == "2"){
		//Rating
		var Rating=database.myanimelist.anime[i].my_score;
		if(Rating=="1"){one++;}
		if(Rating=="2"){two++;}
		if(Rating=="3"){tree++;}
		if(Rating=="4"){four++;}
		if(Rating=="5"){five++;}
		if(Rating=="6"){six++;}
		if(Rating=="7"){seven++;}
		if(Rating=="8"){eight++;}
		if(Rating=="9"){nine++;}
		if(Rating=="10"){ten++;}
		//sType
		var sType=database.myanimelist.anime[i].series_type;
		if(sType=="1"){cTV++;}
		if(sType=="2"){cOVA++;}
		if(sType=="3"){cMovie++;}
		if(sType=="4"){cSpecial++;}
		if(sType=="5"){cONA++;}
		if(sType=="6"){cMusic++;}
	//Decades
	var Year=database.myanimelist.anime[i].series_start.slice(0,-6);
	var countY = Year.slice(0,-3).length;
	if(Year>="1920" && Year<="1930"){s20++;}
	if(Year>="1930" && Year<="1940"){s30++;}
	if(Year>="1940" && Year<="1950"){s40++;}
	if(Year>="1950" && Year<="1960"){s50++;}
	if(Year>="1960" && Year<="1970"){s60++;}
	if(Year>="1970" && Year<="1980"){s70++;}
	if(Year>="1980" && Year<="1990"){s80++;}
	if(Year>="1990" && Year<="2000"){s90++;}
	if(Year>="2000" && Year<="2010"){s00++;}
	if(Year>="2010" && Year<="2020"){s10++;}
	}
}
//Number Counter
$("#completed").each(function(){
	var $this = $(this);
	$({Counter:0}).animate({Counter:database.myanimelist.myinfo.user_completed},{
	duration:3000,
	easing:'easeOutQuart',
	step:function(){
		$this.text(Math.ceil(this.Counter));
	}
	});
});
$("#episodes").each(function(){
	var $this = $(this);
	$({Counter:0}).animate({Counter:countEpisode},{
	duration:5000,
	easing:'easeOutQuart',
	step:function(){
		$this.text(Math.ceil(this.Counter));
	}
	});
});
//ChartJS
var rChart = $("#ratingChart");
var ratingChart = new Chart(rChart,{
	type:'bar',
	data:{
		labels:["1/10","2/10","3/10","4/10","5/10","6/10","7/10","8/10","9/10","10/10"],
		datasets:[{
			label:'Series Rated',
			data:[one,two,tree,four,five,six,seven,eight,nine,ten],
			backgroundColor:[
			'rgba(255,0,0,.2)',
			'rgba(250,100,0,.2)',
			'rgba(250,250,25,.2)',
			'rgba(185,230,25,.2)',
			'rgba(50,170,15,.2)',
			'rgba(0,255,255,.2)',
			'rgba(25,95,255,.2)',
			'rgba(50,30,160,.2)',
			'rgba(50,10,70,.2)',
			'rgba(255,0,160,.2)'
			],
			borderColor: [
			'rgba(255,0,0,1)',
			'rgba(250,100,0,1)',
			'rgba(250,250,25,1)',
			'rgba(185,230,25,1)',
			'rgba(50,170,15,1)',
			'rgba(0,255,255,1)',
			'rgba(25,95,255,1)',
			'rgba(50,30,160,1)',
			'rgba(50,10,70,1)',
			'rgba(255,0,160,1)'
			],
			borderWidth:1
		}]
	},
	options:{
		legend:{display:false},
		title:{
		display:true,
		text:"Rated Series",
		fontSize:20,
		fontColor:"#eee",
		padding:25,
		fullWidth:true
		}
	}
});
var sChart = $("#seriesChart");
var seriesChart = new Chart(sChart,{
	type:'pie',
	data:{
		labels:["TV Series","OVA's","Movies","Specials","ONA's","Music"],
		datasets:[{
			label:'Series Type',
			data:[cTV,cOVA,cMovie,cSpecial,cONA,cMusic],
			backgroundColor:[
			'rgba(255,100,130,.2)',
			'rgba(50,170,15,.2)',
			'rgba(55,160,235,.2)',
			'rgba(75,200,200,.2)',
			'rgba(150,100,255,.2)',
			'rgba(255,160,65,.2)'
			],
			borderColor: [
			'rgba(255,100,130,1)',
			'rgba(50,170,15,1)',
			'rgba(55,160,235,1)',
			'rgba(75,190,190,1)',
			'rgba(150,100,255,1)',
			'rgba(255,160,65,1)'
			],
			borderWidth:1
		}]
	},
	options:{
		legend:{
		display:true,
		position:"top",
		fullWidth:true
		},
		title:{
		display:true,
		text:"Series Type Count",
		fontSize:20,
		fontColor:"#eee",
		padding:15,
		fullWidth:true
		}
	}
});
var lChart = $("#yearChart");
var lineChart = new Chart(lChart,{
	type:'line',
	data:{
		labels: ["1970s","1980s","1990s","2000s","2010s"],
		datasets:[{
			label:'# of Anime Completed per decades',
			data:[s70,s80,s90,s00,s10],
			borderWidth:1,
			backgroundColor:"rgba(75,192,192,.2)",
			borderColor:"rgba(75,192,192,1)",
			pointBorderColor:"rgba(75,192,192,1)",
			pointBackgroundColor:"#fff",
			pointBorderWidth:1,
			pointHoverRadius:5,
			pointHoverBackgroundColor:"rgba(75,192,192,1)",
			pointHoverBorderColor:"rgba(220,220,220,1)",
			pointHoverBorderWidth:2,
			pointHitRadius:10
		}]
	}
});
//Request Check End
}
};
request.send();
//Favorites
//http://rafaeldejongh-sites.ga/MyAnimeList-User-Stats/userFavInfo.php?username=rafaeldejongh
var requestFav = new XMLHttpRequest();
requestFav.open("GET","https://rafaeldejongh-sites.ga/MyAnimeList-User-Stats/userFavInfo.php?username=" + MALUser,true);
requestFav.onload = function(){
	if(requestFav.status>=200 && requestFav.status<400){
		var databaseFav = JSON.parse(requestFav.responseText);
		$("#favcount").html(databaseFav.length);
	if(databaseFav.length !== 0){
		for(i=0;i<databaseFav.length;++i){
			$("#topS").append('<a href="https://myanimelist.net/anime/'+ databaseFav[i].fav_id +'" target="_blank"><img src="'+ databaseFav[i].fav_image +'" alt="'+	databaseFav[i].fav_name +'"/><span>'+ databaseFav[i].fav_name.replace(/_/g,' ') +'</span></a>');
		}
	}else{
		$("#top").remove();
		$("#fp-nav").addClass("nofav");
	}
	}
};
requestFav.send();
//End of Form Submit
});
//End
});