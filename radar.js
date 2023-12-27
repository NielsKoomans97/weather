export class RadarAnimator {
    Element = '';
    RadarType = '';

    constructor(element, radarType) {
        this.Element = element;
        this.RadarType = radarType;

        console.log(this.RadarType);

        const img = element.querySelector('img');
        const timeHeading = element.querySelector('.time-heading');
        const time = element.querySelector('.time');

        let images = [];
        let timestamps = [];
        let index = 0;

        UpdateRadar();

        setInterval(async () => {
            const date = new Date();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            if ((minute == 12 || minute == 32 || minute == 32 || minute == 42 || minute == 52 || minute == 2) && second == 0) {
                setTimeout(async () => {
                    await UpdateRadar();
                }, 20000);
            }

            index++;

            if (index == images.length) {
                index = 0;
            }

            img.setAttribute('src', images[index]);
            timeHeading.innerText = `${time.getAttribute('data-tag')}`;
            time.innerText = `${timestamps[index]} `;

        }, 200);

        async function UpdateRadar() {
            const data = await fetch(`${radarType}.json`);
            const json = await data.json();

            images = [];
            timestamps = [];

            json.forEach(time => {
                const timeStamp = time['Key'];
                const url = time['Value'];

                images.push(url);

                const timeStampParsed = new Date(Date.parse(timeStamp));
                const hour = timeStampParsed.getHours() + 1;
                const minute = timeStampParsed.getMinutes();

                timestamps.push(`${FixInt(hour)}:${FixInt(minute)}`)
            });
        }

        function FixInt(int) {
            if (int < 10) {
                return `0${int}`;
            }

            return int;
        }
    }
}
