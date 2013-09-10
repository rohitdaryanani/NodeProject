$(function(){
     $('#searchInput' && '#searchInput1'  && '#searchInput2' && '#searchInput3').keyup(function(){
          if ($(this).val() == '') { 
                         $('.enableOnInput').prop('disabled', true);
          } else {
               //If there is text in the input, then enable the button
               $('.enableOnInput').prop('disabled', false);
          }
     });
});