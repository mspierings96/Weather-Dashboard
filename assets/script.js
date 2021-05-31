var cityName = "";
console.log('file loaded!!!')

$("#search-btn").on("click", function() {
    console.log($("#search-input").val())
    saveLocal($("#search-input").val())
    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + $("#search-input").val() + "&appid=bd0834857d11c7c26292f5e1e8657635&units=imperial"
    fetch(URL)
    .then(response => {
     
        return response.json()
    }).then(function(realResponse) {
        console.log('resomsee', realResponse)

        // let tempInfo = document.createElement('h4');
        // tempInfo.innerHTML = realResponse.main.temp;

        // let humidityInfo = document.createElement('h4');
        // humidityInfo.innerHTML = realResponse.main.humidity;

        // let windInfo = document.createElement('h4');
        // windInfo.innerHTML = realResponse.wind.speed;

        // let uvInfo = documnet.createElement('h4');
        // uvInfo.innerHTML = realResponse

       // $(".tempInfo").empty()
       console.log('About to change text on the page')
        $('#temp').text('Temp :' +  realResponse.main.temp)
        $('#wind').text('Wind :' + realResponse.wind.speed)
        $('#Humidity').text('Humidity :' + realResponse.main.humidity)
        $('#uv-Index').text('UV-Index :' + realResponse.main.uvIndex)
        fiveDay(realResponse.coord.lat, realResponse.coord.lon)

    })
    .catch(error => {
        // handle the error
    });

})

function saveLocal(searchTerm) {
    var pastSearches = []

    if(localStorage.getItem('recent-search')){
        pastSearches = JSON.parse(localStorage.getItem('recent-search'))
    }
    pastSearches.push(searchTerm);

    displayHistory(pastSearches)

    localStorage.setItem("recent-search",JSON.stringify(pastSearches));

}

function displayHistory(pastSearches) {
    
    $('#history').empty()
    for (let i = 0; i < pastSearches.length; i++) {
        var li = $('<li>').text(pastSearches[i])
        $('#history').append(li)
    }
}

if(localStorage.getItem('recent-search')){
    var pastSearches = JSON.parse(localStorage.getItem('recent-search'))
    displayHistory(pastSearches)
}





function fiveDay(lat, lon) {
   var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current, minutely, hourly, alerts&appid=bd0834857d11c7c26292f5e1e8657635&units=imperial`
   fetch(url)
   .then(response => {
    
       return response.json()
   }).then(function(realResponse) {
    console.log("5-day", realResponse);

    $('#uv-Index').text('UV-Index :' + realResponse.daily[0].uvi);
    $('.5-Day').empty()
    for (let i = 0; i < 5; i++) {
        var day = new Date(realResponse.daily[i].dt*1000);
        
        let iconurl = "https://openweathermap.org/img/w/" + realResponse.daily[i].weather[0].icon + ".png"


        var containerDiv = $('<div>')
        containerDiv.addClass('col-sm-2')

        let dateInfo =  document.createElement('p');
        dateInfo.innerHTML = day.toDateString();

        let imgSRC = document.createElement('img');
            imgSRC.setAttribute('src', iconurl);

        let tempInfo = document.createElement('p');
            tempInfo.innerHTML = "Temp : " + realResponse.daily[i].temp.day;

        let windInfo = document.createElement('p');
            windInfo.innerHTML = "Wind : " + realResponse.daily[i].wind_speed;

        let humidityInfo = document.createElement('p');
            humidityInfo.innerHTML = "Humidity : " + realResponse.daily[i].humidity;

            containerDiv.append(tempInfo, windInfo, humidityInfo, dateInfo, imgSRC)

        $('.5-Day').append(containerDiv)
        
    }



    uvIndex()

   })

}

function uvIndex () {
//  var url = 


}

// API KEY bd0834857d11c7c26292f5e1e8657635



