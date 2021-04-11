var cityName = "";


$("#search-btn").on("click", function() {
    console.log($("#search-input").val())
    var URL = "http://api.openweathermap.org/data/2.5/weather?q=" + $("#search-input").val() + "&appid=bd0834857d11c7c26292f5e1e8657635&units=imperial"
    fetch(URL)
    .then(response => {
     
        return response.json()
    }).then(function(realResponse) {
        console.log('resomsee', realResponse)

        let tempInfo = document.createElement('h4');
        tempInfo.innerHTML = realResponse.main.temp;

        let humidityInfo = document.createElement('h4');
        humidityInfo.innerHTML = realResponse.main.humidity;

        let windInfo = document.createElement('h4');
        windInfo.innerHTML = realResponse.wind.speed;

        $(".tempInfo").empty()
        $(".tempInfo").append(tempInfo,humidityInfo, windInfo)
    })
    .catch(error => {
        // handle the error
    });

})

// API KEY bd0834857d11c7c26292f5e1e8657635



