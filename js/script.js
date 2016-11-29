$(document).ready(function(){
//Start
var MALUser = "rafaeldejongh";
//FullPage
$('#fullpage').fullpage({
	navigation:true,
	navigationPosition:'right',
	slidesNavigation:true,
	slidesNavPosition:'bottom',
	autoScrolling:true,
	fitToSection:true,
	fitToSectionDelay:1000,
	scrollBar:true,
	easing:'easeInOutCubic',
	easingcss3:'ease-in-out',
	loopBottom:true,
	loopTop:false,
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
//Database Parse
var request = new XMLHttpRequest();
request.open("GET","myanimelist.xml",true);
//request.open("GET","https://crossorigin.me/https://myanimelist.net/malappinfo.php?u=" + MALUser + "&status=all&type=anime",true);
request.onload = function(){
	if(request.status>=200 && request.status<400){
	var x2js = new X2JS();
	var jsonObj = x2js.xml_str2json(request.responseText);
	var database = JSON.parse(JSON.stringify(jsonObj));
	var countEpisode,cOVA,cTV,cMovie,cSpecial,cONA,cMusic,one,two,tree,four,five,six,seven,eight,nine,ten;
	countEpisode=cOVA=cTV=cMovie=cSpecial=cONA=cMusic=one=two=tree=four=five=six=seven=eight=nine=ten=0;
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
	duration:6000,
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
//Request Check End
}
};
request.send();
//End
});