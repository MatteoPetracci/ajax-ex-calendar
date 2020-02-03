$(document).ready(function() {
  var month = moment("2018-01");
  // console.log(month);
  var days = month.daysInMonth();
  // console.log(days);
  for (var i = 0; i < days; i++) {
   num = (i + 1);
   var numZ = zero(num)
   // console.log(numZ);
   var date = moment("2018-01" + "-" + numZ);
   // console.log(date);
   var fullDate = date.format("YYYY-MM-DD");
   console.log(fullDate);
   var dayMonth = date.format("DD MMMM");
   // console.log(dayMonth);
   var source = $("#entry-template").html();
   var template = Handlebars.compile(source);
   var context = {
     'dayMonth': dayMonth,
     'dayDate': fullDate
   };
   var html = template(context);
   $("#calendar").append(html);
  }
  var url = 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0';
  $.ajax(
    {
       'url': url,
       'method': 'GET',
       'success': function(data, state) {
         console.log(data);
         var arrayDate = data.response;
         console.log(arrayDate);
        for (var i = 0; i < arrayDate.length; i++) {
          console.log(arrayDate[i]);
          var holidays = arrayDate[i].date;
          var arrayName = arrayDate[i].name;
          console.log(arrayName);
          console.log(holidays);
          $('li').each(function() {
            var element = $(this);
            console.log(this);
            var attr = element.attr('data')
            console.log(attr);
            if (attr == holidays) {
              element.addClass('red');
              element.children('.holiday').append(arrayName);
            }
          });
        }
       },
       'error': function(request, state, error) {
         console.log('errore' + error);
       }
    }
  )
});

function zero(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}
