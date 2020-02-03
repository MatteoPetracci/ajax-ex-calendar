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
});

function zero(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}
