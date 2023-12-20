const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = `https://pgrkam-uh5k.onrender.com/api/v1/jobs/`;

async function  loadJobs() {
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    console.log(resp);
                    return resp;
                })
        })
        .catch((err) => {
            console.error('Error with Jobs API', err);
        });
}


window.onload = () => {
    const scene = document.querySelector('a-scene');
    loadJobs().then((jobs) => {
        jobs.data.forEach((job) => {
            const latitude = job.latitude;
            const longitude = job.longitude;

            // add place name
            const placeText = document.createElement('a-link');
            placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            placeText.setAttribute('title', job.companyName);
            placeText.setAttribute('scale', '15 15 15');
            
            placeText.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            scene.appendChild(placeText);
        });
    })
}