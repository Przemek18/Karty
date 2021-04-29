var cardss=["ciri.png","geralt.png","jaskier.png","jaskier.png","iorweth.png","triss.png","geralt.png","yen.png","ciri.png","triss.png","yen.png","iorweth.png"];
var cards=[];
var oneVisible=false;
var turnCounter=0;
var visible_nr;
var lock=false;
var pairsLeft=6;
//alert(cards[4]);
//console.log(cards);
for(let i=0; i<=11; i++)
{
	los=Math.floor(Math.random()*cardss.length);
	cards[i]=cardss[los];
	cardss.splice(los,1);
	var cardd=$("<div></div>",{"class":"card",id:"c"+i});
	$('.board').append(cardd);
	$('#c'+i).on('click',function(){revealCard(i);});
}
$('.board').append($("<div></div>",{"class":"score"}));
$('.score').html('Turn counter: 0');
function revealCard(nr)
{
	var opacityValue=$('#c'+nr).css('opacity');
	//alert('Opacity: '+opacityValue);
	
	if (opacityValue!=0&&lock==false)
	{
		lock=true;
		//alert(nr);
		var obraz="url(img/"+cards[nr]+")";
		$('#c'+nr).css('background-image',obraz);
		$('#c'+nr).addClass('cardA');
		$('#c'+nr).removeClass('card');

		if(oneVisible==false)
		{
			//first card
			$('#c'+nr).off();
			oneVisible=true;
			visible_nr=nr;
			lock=false;
		}
		else
		{
			//second card
			if(cards[visible_nr]==cards[nr])
			{
				//alert("para");
				setTimeout(function(){hide2Cards(nr,visible_nr)},750);
			}
			else
			{
				//alert("pudło");
				setTimeout(function(){restore2Cards(nr,visible_nr)},1000);
			}
			turnCounter++;
			$('.score').html('Turn counter: '+turnCounter);
			oneVisible=false;
		}
	}
}

function hide2Cards(nr1,nr2)
{
	$('#c'+nr1).css('opacity','0');
	$('#c'+nr2).css('opacity','0');
	pairsLeft--;
	if(pairsLeft==0)
	{
		$('.board').html('<h1>You win!<br>Done in '+turnCounter+' turns<br><a id="ret"></a></h1>');
		$('#ret').html('Again?');
		$('#ret').on("click",function(){location.reload();});
	}
	lock=false;
}

function restore2Cards(nr1,nr2)
{
	$('#c'+nr1).css('background-image','url(img/karta.png)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardA');
	
	$('#c'+nr2).css('background-image','url(img/karta.png)');
	$('#c'+nr2).addClass('card');
	$('#c'+nr2).removeClass('cardA');
	$('#c'+nr2).on('click',function(){revealCard(nr2);});
	
	lock=false;
}