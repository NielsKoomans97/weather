export class Observations{
    constructor(){
        this.GetWeatherAsync();

        setInterval(async () => {
            const time = new Date().getMinutes();
            const seconds = new Date().getSeconds();

            console.log(time);

            if ((time == 12 || time == 22 || time == 32 || time == 42 || time == 52 || time == 2) && seconds == 0){
                await this.GetWeatherAsync();
            }

        }, 1000);
    }

    async GetWeatherAsync(){
        const data = await fetch("https://observations.buienradar.nl/1.0/actual/weatherstation/6340");
        const json = await data.json();

        const windSpeed = document.querySelector('#wind-speed');
        const windDirection = document.querySelector('#wind-direction');
        const humidity = document.querySelector('#humidity');
        const visibility = document.querySelector('#visibility');
        const windGusts = document.querySelector('#wind-gusts');
        const rainFall1Hour = document.querySelector('#rainFall1Hour');
        const rainFall24Hour = document.querySelector('#rainFall24Hour');
        const temperatureActual = document.querySelector('#temperature-actual');
        const temperatureFeel = document.querySelector('#temperature-feel');
        const temperatureGround = document.querySelector('#temperature-ground');
        const location = document.querySelector('#location');

        let windGustsKmU = parseInt(json['windgusts']) * (60 * 60) / 1000;

        temperatureActual.innerText = `${json['temperature']}°`;
        temperatureFeel.innerText = `${json['feeltemperature']}°`;
        temperatureGround.innerText = `${json['groundtemperature']}°`;

        windDirection.setAttribute('style', `transform: rotate(${json['winddirectiondegrees']}deg);`);
        windGusts.innerText = `${windGustsKmU} km/u`;
        windSpeed.innerText = `${json['windspeedBft']} Bft`;
        humidity.innerText = `${json['humidity']}%`;
        visibility.innerText = `${json['visibility']} m`;
        rainFall1Hour.innerText = `${json['rainFallLastHour']} mm`;
        rainFall24Hour.innerText = `${json['rainFallLast24Hour']} mm`;
        location.innerText = json['stationname'];

        const updateTime = document.querySelector('#update-time');
        console.log(updateTime);
        const date = new Date();
        const hour = FixInt(date.getHours());
        const minute = FixInt(date.getMinutes());

        updateTime.innerText = `om ${hour}:${minute}`;

        function FixInt(int){
            if (int < 10){
                return `0${int}`;
            }

            return int;
        }
    }
}
