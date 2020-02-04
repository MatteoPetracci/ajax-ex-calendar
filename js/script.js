$(document).ready(function() {
  var month = 0;
  var year = 2018;
  var months = moment(
    {
      'year': year,
      'month': month
    }
  );
  pMonth(months);
  holiday(months);
  $('.right').click(function() {
    $('#calendar').empty()
    var dataMonth = $('h2').attr('month-data');
    var fullDate = moment(dataMonth).add(1, 'M');
    // console.log(fullDate);
    if (dataMonth == '2018-12') {
      alert('End');
    }
    pMonth(fullDate);
    holiday(fullDate);
  });
  $('.left').on('click', function() {
    $('#calendar').empty()
    var dataMonth = $('h2').attr('month-data');
    var fullDate = moment(dataMonth).subtract(1, 'M');
    console.log(fullDate);
    if (dataMonth == '2018-01') {
      alert('End');
    }
    pMonth(fullDate);
    holiday(fullDate);
  });
});

// **********FUNZIONI**************

function pMonth(month) {
  // Prendo il valore di h2 e lo sostituisco con mese per intero e anno per intero
  $('h2').text(month.format('MMMM YYYY'));
  // Aggiungo un attributo su h2 come primo argomento passo il nome dell'attributo e il secondo argomento il valore che deve avere il formato che restituisce l'anno e il mese
  $('h2').attr('month-data', month.format('YYYY-MM'));
  for (var i = 1; i < 31; i++) {
    // console.log(i);
    // Handlebars
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    var context = {
      'day': i,
      'month': month.format('MMMM'),
      'dayDate': month.format('YYYY-MM') + '-' + zero(i)
    };
    var html = template(context);
    $('#calendar').append(html);
  }
}


function zero(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}

function holiday(month) {
  var url = 'https://flynn.boolean.careers/exercises/api/holidays';
  $.ajax(
    {
      'url': url,
      'method': 'GET',
      'data': {
        year: month.year(),
        month: month.month()
      },
      'success': function(date, state) {
        // Stampo l'oggetto
        console.log(date);
        // Salvo in una variabile il valore di response che è un array di oggetti
        var holiday = date.response;
        // console.log(holiday);
        // Ciclo in questo array che contiente due oggetti
        for (var i = 0; i < holiday.length; i++) {
          // console.log(holiday[i]);
          // Prendo gli oggetti e li salvo in una variabile
          var dayHoliday = holiday[i];
          console.log(dayHoliday);
          // Prendo il valore di date dagli oggetti appena salvati
          var dateHoliday = dayHoliday.date;
          console.log(dateHoliday);
          // Ciclo su ogni li per confrontare se il valore di date (dateHoliday) è uguale all'attributo date che ho messo in <li>
          $('.entry').each(function(){
            var element = $(this).attr('data');
            console.log(element);
            if (element == dateHoliday) {
              $(this).addClass('red');
              var nameEvent = dayHoliday.name;
              $(this).children('.holiday').append(nameEvent)
            }
          });
        }
      },
      'error': function(request, state, error) {
        console.log('error', error);
      }
    }
  )
}
