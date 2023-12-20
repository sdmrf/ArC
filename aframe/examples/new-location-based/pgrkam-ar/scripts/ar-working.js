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

            console.log(latitude, longitude);

            const planeA = document.createElement('a-plane');
            // First
            planeA.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            planeA.setAttribute('look-at', '[gps-new-camera]');
            planeA.setAttribute('scale', '100 50 50');
            planeA.setAttribute('color', '#ffffff');

            scene.appendChild(planeA);

        });
    })
}