export class WeatherWarnings {
    constructor() {
        UpdateWarnings();

        setInterval(async () => {
            const time = new Date();
            const minute = time.getMinutes();
            const second = time.getSeconds();

            const repeatTimes = (60 / 10);

            for (i = 0; i < repeatTimes; i++) {
                if (minute == (i * 10) && second == 0) {
                    await UpdateWarnings();
                }
            }
        }, 1000);


        async function UpdateWarnings() {
            const data = await fetch('https://data.buienradar.nl/1.0/announcements/apps');
            const json = await data.json();

            const warningContainer = document.querySelector('.warning-container');
            const warningTitle = document.querySelector('#warning-title');
            const warningDescription = document.querySelector('#warning-description');
            const warningImage = document.querySelector('#warning-overview');

            if (json['warnings']['color'] == 'GREEN'){
                warningContainer.classList.add('hidden');
            }

            warningTitle.innerText = json['warnings']['title'];
            warningDescription.innerText = json['warnings']['summary'];
            warningImage.setAttribute('src', json['warnings']['daySummaries']['day1']['image']);

            warningContainer.classList.add(json['warnings']['color']);
        }
    }
}
