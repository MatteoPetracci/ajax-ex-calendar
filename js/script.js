$(document).ready(function() {
  var url = 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0';
  // Chiammata gennaio
$.ajax(
  {
    'url': url,
    'method': 'GET',
    'success': function(data) {
      console.log(data);
      // inserisco in una variabile i giorni del mese
      var january = moment(2018).format("MMMM");
      console.log(january);
      var date = moment(2018).daysInMonth();
      console.log(date);
      for (var i = 1; i < date + 1; i++) {
        console.log(i);
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var context = {
          'month': january,
          'day': i
        };
        var html = template(context);
        $('#calendar').append(html);
      }
    },
    'error': function(request, state, error) {
      console.log('error' + error);
    }
  }
);








});
