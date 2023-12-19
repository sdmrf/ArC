const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = `${corsProxy}https://pgrkam-uh5k.onrender.com/api/v1/jobs/`;

async function  loadJobs() {
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    console.log(resp);
                    return resp.data.data;
                })
        })
        .catch((err) => {
            console.error('Error with Jobs API', err);
        });
}

loadJobs();


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some Jobs nearby
        loadJobs()
            .then((Jobs) => {
                Jobs.forEach((Job) => {
                    const latitude = Job.latitude;
                    const longitude = Job.longitude;

                    // add place name
                    const placeText = document.createElement('a-link');
                    placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    placeText.setAttribute('title', Job.companyName);
                    placeText.setAttribute('scale', '15 15 15');

                    placeText.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(placeText);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
}