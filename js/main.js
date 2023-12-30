import { Observations } from "./observations.js";
import { RadarAnimator } from "./radar.js";
import { WeatherWarnings } from "./warnings.js";

if (HasElement('wind-speed')) {
    var obs = new Observations();
    await obs.GetWeatherAsync();
}

if (HasElement('satellite-item')) {
    new RadarAnimator(document.querySelector('#satellite-item'), "SatMapCombined15m");
}

if (HasElement('temperature')) {
    new RadarAnimator(document.querySelector('#temperature'), "WeatherMapActualTemperature10mNL");
    new RadarAnimator(document.querySelector('#wind'), 'WeatherMapWind10mNL');
    new RadarAnimator(document.querySelector('#neerslag-24u'),'WeatherMapRain24Hours10mNL');

    const chartContainer = document.querySelector('.temp-container');
    const radarItems = chartContainer.querySelectorAll('.radar-item');

    let index = 0;
    setInterval(() => {
        radarItems.forEach(item => {
            item.classList.add('hidden');
        });

        radarItems[index].classList.remove('hidden');

        if (index == 2){
            index = 0;
        }
        else{
            index++;
        }

    }, 15000);
}

if (HasElement('warning-overview')){
    new WeatherWarnings();

    setInterval(() => {
        const time = document.querySelector('#time');
        const now = new Date();

        time.innerText = `${FixTimeInt(now.getHours())}:${FixTimeInt(now.getMinutes())}:${FixTimeInt(now.getSeconds())}`
    }, 1000);
}

setInterval(() => {
    const time = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    if ((time == 2 || time == 12 || time == 22 || time == 32 || time == 42 || time == 52) && seconds == 0) {
        const knmiRadar = document.querySelector('#knmi-radar');
        knmiRadar.src = `https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/neerslagradar/WWWRADARLGT_loop.gif?t=${new Date().getTime()}`;
    }
}, 1000);

function HasElement(element) {
    const el = document.getElementById(element);

    return el != null;
}

function FixTimeInt(timeInt){
    if (timeInt < 10){
        return `0${timeInt}`;
    }

    return timeInt;
}
