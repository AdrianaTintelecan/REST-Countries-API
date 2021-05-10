class Country {
    constructor() {
        this.apiEndpoint = "https://restcountries.eu/rest/v2/all";
    }
    list(listItems) {

        $.ajax({
            url: this.apiEndpoint,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {
            if (response && response.length > 0) {
                listItems(response);
            }

        });
    }

    
}


$(document).ready(function () {
    let country = new Country();

    function listItems(items) {
      var $center = $('.center');

      $.each(items, function (index, item) {
        $center.append(createItem(item));
      })

    }

    
    function createItem(item) {

      var $prop_card = $('<div class="property-card"></div>');

      var $prop_image = $('<div class="property-image"><div class="property-image-content"><img class="flag" src="' + item.flag + '" alt=""></div></div>');


      var $prop_description = $('<div class="property-description"></div>');
      var $h5 = $('<h5>' + item.name + '</h5>');
      var $myCapital = $('<p>Capital: ' + item.capital + '</p>');
      var $myRegion = $('<p>Region: ' + item.region + '</p>');
      var $MyPopulation = $('<p>Population: ' + item.population + '</p>');

      $prop_description.append($h5);
      $prop_description.append($myCapital);
      $prop_description.append($myRegion);
      $prop_description.append($MyPopulation);

      $prop_card.append($prop_image);
      $prop_card.append($prop_description);



      return $prop_card;
    }
    country.list(listItems);


    $(document).ready(function () {
      $(".search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".property-card ").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


    var $btns = $('.button').click(function () {

      var data = $(this).attr("data-attr");
      $(".property-card").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(data) > -1)
      });
    });


  });



