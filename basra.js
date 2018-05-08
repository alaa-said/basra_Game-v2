$(function() {


  // receive data from splash page 

var myData = localStorage['objectToPass'];
localStorage.removeItem( 'objectToPass' ); // Clear the localStorage
console.log(myData);
var playerImg=$("#playerImg");
myData=myData.split(",");

if(myData[0]!=" ")
{
  playerImg.attr("src",myData[0]);
}
console.log(myData[0]);
console.log(myData[1]);

var arr=[
        "1_of_clubs.png","1_of_diamonds.png","1_of_hearts.png","1_of_spades.png",
        "2_of_clubs.png","2_of_diamonds.png","2_of_hearts.png","2_of_spades.png",
        "3_of_clubs.png","3_of_diamonds.png","3_of_hearts.png","3_of_spades.png",
        "4_of_clubs.png","4_of_diamonds.png","4_of_hearts.png","4_of_spades.png",
        "5_of_clubs.png","5_of_diamonds.png","5_of_hearts.png","5_of_spades.png",
        "6_of_clubs.png","6_of_diamonds.png","6_of_hearts.png","6_of_spades.png",
        "7_of_clubs.png","7_of_diamonds.png","7_of_hearts.png","7_of_spades.png",
        "8_of_clubs.png","8_of_diamonds.png","8_of_hearts.png","8_of_spades.png",
        "9_of_clubs.png","9_of_diamonds.png","9_of_hearts.png","9_of_spades.png",
        "10_of_clubs.png","10_of_diamonds.png","10_of_hearts.png","10_of_spades.png",
        "jack_of_clubs.png","jack_of_diamonds.png","jack_of_hearts.png","jack_of_spades.png",
        "king_of_clubs.png","king_of_diamonds.png","king_of_hearts.png","king_of_spades.png",
        "queen_of_clubs.png","queen_of_diamonds.png","queen_of_hearts.png","queen_of_spades.png"];

///////////// random array /////////

var cards=[];
for(var i=51 ; i>=0 ; i--)
{

  var index=Math.round(Math.random()*i) ;
  cards.push(arr[index]) ;
  arr.splice(index,1);

}


//////////deck_button//////////////

$("img").css("display","none")
$("#playerImg").css("display","inline-block");
$("#comImg").css("display","inline-block");
var round_num=1
var count=0;
var table=$("#table");
var player_name=$("#player1-div #player1IM");
player_name.html(myData[1]);

$("#result").css("display","none");
$("#deck_button").css("display","inline-block");

$("#deck_button").on("click",function(){
      $("img").css("display","inline-block")
      $("#comp-card img").css("display","none");
      $("#round-num").html(round_num);
      $("#woh-play").html(myData[1]);

       var img=$("#table img");
       if(count==0)
       {
               for(var i=0; i<4;i++)  
              {
                   var img=$("<img>");
                   ///////prevent jack to put in th desk//////
                   var disk_split=cards[i].split("_")[0];
                   while (disk_split=="jack")
                  {
                    var ay=img.attr("src",cards.pop())
                    console.log(cards.pop());
                    cards.splice(i,0,ay);
                  }
                  
                  if (disk_split!="jack")
                  {
                    img.attr("src",cards[i]); 
                  } 
                  
                   table.append(img);   
               }
          count+=4;
       }

  var img1=$("#plater1-card img");
  var img2=$("#comp-card img");
  
  for(var k=0; k<cards.length;k++)  
    {
      img1.eq(k).attr("src",cards[count+k]);  
    }
  count+=4;

  for(var j=0; j<cards.length;j++)  
    {
         img2.eq(j).attr("src",cards[count+j]);
    }
  count+=4;
    round_num++;
    if(round_num==8)
    {

      $("#deck_button").off('click');
      $("img").css("display","none");
      $("#result").css("display","block");
      if(score1>score2)
      {
        $("h1").html("congrat you win ^_^ ")
      }
      else if(score1==score2)
      {
        $("h1").html(" No One Win ")
      }

      else
      {
        $("h1").html("sorry you lost :( ");
      }

    }
});

/////////////////player round 
var score1=0;
var score2=0;
var k=0;


$("#plater1-card img").on("click",function(){
  
     if($("#woh-play").html()== myData[1])
     {
        // debugger;
        $(this).css("display","none")
        var flag=false;
        var playr1_split=$(this).attr("src").split("_")[0]; ///take the number         
        var pars_1=parseInt(playr1_split);     // parsint

        if((playr1_split=="jack"||$(this).attr("src")=="7_of_diamonds.png") && $("#table img").length>0)  // jack || elkomy
         {
           score1 = score1 + $("#table img").length;
           $("#table img").remove();
           $("#score1").html(score1);
           flag=true;
         }  
       else
          {
            for(var i=0 ; i<$("#table img").length ; i++ )
             {   debugger;
                var table_split=$("#table img").eq(i).attr("src").split("_")[0]; //take the number from table 
                var pars_table=parseInt(table_split);        
                for(var j=(i+1); j<$("#table img").length ; j++ )
                 {   
                     for (var l = (i+2) ; l < $("#table img").length ; l++) 
                      {
                        if(pars_1==(pars_table+parseInt($("#table img").eq(j).attr("src").split("_")[0])+parseInt($("#table img").eq(l).attr("src").split("_")[0])))
                         {
                           score1=match_3cards(score1,i,j,l);
                           flag=true;
                           $("#score1").html(score1);
                           i=-1;
                           j=-1;
                         }
                      }
                     if(pars_1==(pars_table+parseInt($("#table img").eq(j).attr("src").split("_")[0])))
                      {
                        score1=match_2cards(score1,i,j)
                        $("#score1").html(score1);
                        flag=true;
                        i=-1;
                      }   
                  }  
                if(playr1_split==table_split)
                 {
                   score1=match_one_card(score1,i);
                   flag=true;
                   $("#score1").html(score1);
                   i=-1;
                 }  
            }
          }
        score1= find_flag(flag,score1,$(this).attr("src"))
        $("#score1").html(score1);
        $("#woh-play").html(" computer "); 
     } 

// /////////////////computer round 


  if($("#woh-play").html()==" computer ")
    {  
       debugger;
       setTimeout(function(){
        if(k==4){ k=0 ; } // to start from first card again
      var flagg=false;

            $("#comp-card img").eq(k).css("display","none");
            $("#comp-position img").eq(k).css("display","none");
            
            var comp_split=$("#comp-card img").eq(k).attr("src").split("_")[0] // number of card
            var pars_2=parseInt(comp_split); 
            if((comp_split=="jack"||$("#comp-card img").eq(k).attr("src")=="7_of_diamonds.png")&& $("#table img").length>0)
                   {
                    score2 = score2 + $("#table img").length  ;
                    $("#table img").remove();
                    $("#score2").html(score2);
                    flagg=true;
                   }
            else
            {
              for(var i=0 ; i<$("#table img").length ; i++ )
                {
                   var table_split=$("#table img").eq(i).attr("src").split("_")[0]; //take the number from table 
                   var pars_table=parseInt(table_split);        
                   for(var j=(i+1); j<$("#table img").length ; j++ )
                     { 
                        for (var l = (i+2) ; l < $("#table img").length ; l++) 
                          {
                             if(pars_2==(pars_table+parseInt($("#table img").eq(j).attr("src").split("_")[0])+parseInt($("#table img").eq(l).attr("src").split("_")[0])))
                              {
                                 score2=match_3cards(score2,i,j,l);
                                 flagg=true;
                                 $("#score2").html(score2);
                                 i=-1;
                                 j=-1;
                              }
                          }
                         if(pars_2==(pars_table+parseInt($("#table img").eq(j).attr("src").split("_")[0])))
                          {
                            score2=match_2cards(score2,i,j)
                            flagg=true;
                            $("#score2").html(score2);
                            i=-1;
                          }   
                     } 
                    if(comp_split==table_split)
                     {
                        score2=match_one_card(score2,i)
                        flagg=true;
                        $("#score2").html(score2);
                        i=-1;
                     } 
                 }
            }   
            
      score2= find_flag(flagg,score2,$("#comp-card img").eq(k).attr("src"))
      $("#score2").html(score2);             
      $("#woh-play").html(myData[1]);      
      k++;     
  },500)
      
}
    
 });           

function append_img(source){
        var img=$("<img>");
        img.attr("src",source);
        table.append(img);
}

function find_flag(flag,score,index){
  if(flag==true)
    {
      score+=1;
    }
  if(flag==false)
  {
        score+=0; 
        append_img(index);                 
  }
  return score;
}




function match_one_card(score,i){
  
    $("#table img").eq(i).remove();
    
   
    if($("#table img").length==0)
      {
        $("#result").css("display","block");
         $("h1").html(" BASRA ")
         score=score+10;
         setTimeout(function(){
          $("#result").css("display","none");
        },700);
         
       }
     else
     {
       score=score+1;
     }
  return score;

}

function match_2cards(score,i,j){
    $("#table img").eq(i).remove();
    $("#table img").eq(j-1).remove();
    if($("#table img").length==0)
     {
        $("#result").css("display","block");
        $("h1").html(" BASRA ")
        score=score+11;
        setTimeout(function(){
        $("#result").css("display","none");
        },700);
     }
    else
     {
       score=score+2;
     }
  return score;
  }

  function match_3cards(score,i,j,l){
   $("#table img").eq(i).remove();
   $("#table img").eq(j-1).remove();
   $("#table img").eq(l-2).remove();
   if($("#table img").length==0)
    {
      $("#result").css("display","block");
      $("h1").html(" BASRA ")
      score=score+12;
      setTimeout(function(){
      $("#result").css("display","none");
      },700);
    }
   else
    {
      score=score+3;
    }
  return score;
}

                                   
});















