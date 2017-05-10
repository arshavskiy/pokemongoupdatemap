 $(document).ready(function () {
     if (beaches) {
         for (i = 0; i < beaches.length; i++) {
             $('<h3>').html(beaches[i][0]).appendTo('#container');
         }
     }
 });