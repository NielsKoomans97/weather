export class WeatherWarnings {
    constructor() {
        UpdateWarnings();

        const warningTitle = document.querySelector('#warning-title');
        const warningDescription = document.querySelector('#warning-description');
        const warningContainer = document.querySelector('.warning-container');
        const warningFrom = document.querySelector('#warning-from');
        const warningTo = document.querySelector('#warning-to');

        var alertItems = [];
        var index = 0;

        function FixTimeInt(timeInt){
            if (timeInt < 10){
                return `0${timeInt}`;
            }

            return timeInt;
        }

        setInterval(async () => {
            const time = new Date();
            const minute = time.getMinutes();
            const second = time.getSeconds();

            const repeatUpdateTimes = (60 / 10);

            for (let i = 0; i < repeatUpdateTimes; i++) {
                if (minute == i && second == 0) {
                    await UpdateWarnings();
                }
            }
        }, 1000);

        setInterval(() => {
            if (index == alertItems.length) {
                index = 0;
            }
            else {
                index++;
            }

            const item = alertItems[index];
            warningTitle.innerText = item.Location['name'];
            warningDescription.innerText = item.Alert['text'];

            var dateFrom = new Date(Date.parse(item.Alert['starttime']));
            var dateTo = new Date(Date.parse(item.Alert['endtime']));

            warningFrom.innerText = `van ${FixTimeInt(dateFrom.getDate())}-${FixTimeInt(dateFrom.getMonth() + 1)} ${FixTimeInt(dateFrom.getHours())}:${FixTimeInt(dateFrom.getMinutes())}`;
            warningTo.innerText = `tot ${FixTimeInt(dateTo.getDate())}-${FixTimeInt(dateTo.getMonth() + 1)} ${FixTimeInt(dateTo.getHours())}:${FixTimeInt(dateTo.getMinutes())}`;

            if (item.Alert['color'] == 'GREEN') {
                warningContainer.classList.add('hidden');
            }
            else {
                warningContainer.classList.add(item.Alert['color']);
            }
        }, 5000);

        function GetReadableTimeString(date){
            return `${date.getDay()}-${date.getMonths()}-${date.getYear()}`;
        }

        async function UpdateWarnings() {
            alertItems = [];

            const data = await fetch('https://data.buienradar.nl/1.0/announcements/apps');
            const json = await data.json();

            const warningImage = document.querySelector('#warning-overview');

            const locations = json['warnings']['locations'];
            locations.forEach(location => {
                var alerts = location['alerts'];

                alerts.forEach(alert => {
                    alertItems.push(new Alert(location, alert));
                });
            });

            warningImage.setAttribute('src', json['warnings']['daySummaries']['day1']['image']);
        }
    }
}

class Alert {
    constructor(location, alert) {
        this.Alert = alert;
        this.Location = location;
    }
}
