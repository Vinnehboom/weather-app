const weatherFetch = () => {
    let cityName = document.querySelector('#selected-city').value;
    let APIKey = '44472aec664e17345fab5a405dc0a1dc'
    let APICall = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIKey}`
    let outputTarget = document.querySelector('#card-target')
    let totalDays = document.querySelector('#amount-of-days').value;
    outputTarget.innerHTML = '';
    document.querySelector('#city-target').innerHTML = cityName;

    // card output

    for (let i = 0; i < totalDays; i++) {
        let iconTarget = 'icon-target-' +i;
        let tempTarget = 'temp-target-' +i;
        outputTarget.innerHTML +=
            `<div class="card col-sm col-md col-lg-2">
                <div class="card-body justify-content-center">
                     <div id="${iconTarget}"></div>
                    <div class="card-title"></div>
                    
                 
                    <div class="card-text">
                    <div id="${tempTarget}"></div>
                    </div>
                    
                </div>
            </div>`

    }
    //image fetch
    fetchImage(cityName);
    // main fetch
    fetch(APICall).then(res => res.json()).then(data => {
        let generalArray = data.list;
        let timeArray = [];
        dateArray = [];
        weatherData = [];
        let weatherIcons = [];

        let today = new Date;
        let thisDay = Date.g
        today = today.getUTCDate();
        let daysToCheckArray = [];
        daysToCheckArray.push(today);
        let counter = 1;
        while (counter < totalDays) {
            let x = new Date()
            x.setDate(new Date().getDate() + counter);
            x = x.getUTCDate();
            daysToCheckArray.push(x);
            counter++
        }

        generalArray.forEach(date => {
            let x = date.dt
            let thisDate = new Date(x * 1000);
            thisDate = thisDate.getUTCDate();
            dateArray.push(thisDate);
            timeArray.push(date.main);
            weatherData.push(date.weather);

        })
        weatherData.forEach(index => {
            index.forEach(icon => {
                weatherIcons.push(icon.icon);
            });
        })
        let tempArray = [];
        timeArray.forEach(block => {
            tempArray.push(block.temp);
        })
        let arrayLength = timeArray.length
        let dayUnit = arrayLength / totalDays;
        let dayArray = [];
        let iconArray = [];

        for (let i = 0; i < daysToCheckArray.length; i++) {
            let tempCollection = [];
            let iconCollection = [];
            for (let j = 0; j < dateArray.length; j++) {
                if (daysToCheckArray[i] === dateArray[j]) {
                    let tempToAdd = tempArray[j];
                    let iconToAdd = weatherIcons[j]
                    tempCollection.push(tempToAdd);
                    iconCollection.push(iconToAdd)
                }
            }
            dayArray.push(tempCollection);
            iconArray.push(iconCollection);

        }
        console.log(dayArray)
        console.log(iconArray);
        // apply to cards
        dayArray.forEach((array, index)  =>
        {
            let arrayAverage = averageArray(array);
            targetId = "#temp-target-" + index
            document.querySelector(targetId).innerHTML = arrayAverage;
        })

        iconArray.forEach((array, index) =>
        {
            let icon = getOccurrence(array);
            let iconTarget = 'icon-target-' + index;
            let iconURL = 'http://openweathermap.org/img/wn/' + icon +'@2x.png'
            imgElement = `<img class="mx-auto" src="${iconURL}" alt="icon">`
            console.log(imgElement);

            document.getElementById(iconTarget).innerHTML = imgElement;
        })


    })

}
const averageArray = (array) => {
    let length = array.length;
    let total = 0;
    array.forEach((value) => {
        total += value
    });
    return parseFloat(total/length).toFixed(1);

}

function getOccurrence(array) {
    let iconObject = new Map;
    let chosenIcon = "";
    array.forEach(icon => {
        if (!iconObject.has(icon)) {
            iconObject.set(icon, 0)

        }
        iconObject.set(icon, iconObject.get(icon) + 1)

    });

    iconObject.forEach((quantity, key) => {
        if (quantity > iconObject.get(chosenIcon) || !iconObject.has(chosenIcon)) {
            chosenIcon = key;
        }
    });

    return chosenIcon

}

const fetchImage = (cityName) =>
{
    let url = `https://api.unsplash.com/photos/random?query=${cityName},city&client_id=v-x7eI3uKQtcDVx1c0laRrKEIaFHquVwPM9uJzKcMM8`
    fetch(url).then((response) => response.json()).then((data) => {
        console.log(data);
        let linkArray = data.urls;
        console.log(linkArray);
        let imgURL = linkArray.regular;

        document.body.style.backgroundImage = `url('${imgURL}')`
    })

}


let form = document.querySelector('#my-form');
function handleForm(event) { event.preventDefault();
    weatherFetch();
}
form.addEventListener('submit', handleForm);

