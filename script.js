const weatherFetch = () => {
    let cityName = document.querySelector('#selected-city').value;
    let APIKey = '44472aec664e17345fab5a405dc0a1dc'
    let APICall = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIKey}`
    let totalDays = 5;

    fetch(APICall).then(res => res.json()).then(data => {
        let weather = data.list;
        let timeArray = [];

        weather.forEach(timeblock => {
            timeArray.push(timeblock.main);
        })
        let tempArray = [];
        timeArray.forEach(block => {
            tempArray.push(block.temp);
        })
        let arrayLength =  timeArray.length
        let dayUnit = arrayLength/totalDays;
        let dayArray = [];
        for (let i = 0; i < totalDays; i++) {
            dayArray.push({});
        }
        console.log(dayArray);
        console.log(dayUnit);
        for (let i = 0; i < arrayLength ; i++) {
            if (i < dayUnit) {
                day1.push(tempArray[i]);
            } else if (i >= dayUnit && i < dayUnit*2) {
                day2.push(tempArray[i]);
            } else if (i >= dayUnit*2 && i < dayUnit*3) {
                day3.push(tempArray[i]);
            } else if (i >= dayUnit*3 && i < dayUnit*4) {
                day4.push(tempArray[i]);
            } else if (i >= dayUnit*4 && i <= dayUnit*5) {
                day5.push(tempArray[i]);
            }
        }
        console.log(averageArray(day1));
        console.log(averageArray(day2));
        console.log(day3);
        console.log(day4);
        console.log(day5);
    })

}

const averageArray = (array) => {
    let length = array.length;
    let total = 0;
    array.forEach(value => {
        total += value
    });
    return parseFloat(total/length).toFixed(1);

}

let form = document.querySelector('#my-form');
function handleForm(event) { event.preventDefault();
    weatherFetch();
}
form.addEventListener('submit', handleForm);

