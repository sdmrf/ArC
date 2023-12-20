const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const endpoint = `https://pgrkam-uh5k.onrender.com/api/v1/jobs/`;

async function loadJobs() {
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

            // Sending data

            if (!AFRAME.components.clicker) {
                AFRAME.registerComponent('clicker', {
                    init: function () {
                        this.el.addEventListener('click', e => {
                            window.ReactNativeWebView.postMessage(job);
                        });
                    }
                });
            }

            console.log(latitude, longitude);

            // Create the main <a-plane> element
            const planeA = document.createElement('a-plane');
            planeA.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            planeA.setAttribute('look-at', '[gps-new-camera]');
            planeA.setAttribute('scale', '100 50 50');
            planeA.setAttribute('color', '#ffffff');
            planeA.setAttribute('clicker', '');

            // Create child elements within the main <a-plane>
            const image = document.createElement('a-image');
            image.setAttribute('src', job.companyLogo);
            image.setAttribute('scale', '0.15 0.25 1');
            image.setAttribute('position', '-0.35 0.25 0');
            planeA.appendChild(image);

            const text1 = document.createElement('a-text');
            text1.setAttribute('value', job.jobTitle);
            text1.setAttribute('color', '#150B3D');
            text1.setAttribute('position', '-0.2 0.3 0');
            text1.setAttribute('width', '1.25');
            planeA.appendChild(text1);

            const text2 = document.createElement('a-text');
            text2.setAttribute('value', job.companyName);
            text2.setAttribute('color', '#524B6B');
            text2.setAttribute('position', '-0.2 0.2 0');
            text2.setAttribute('width', '1.25');
            planeA.appendChild(text2);

            const text3 = document.createElement('a-text');
            text3.setAttribute('value', `'Rs. ${job.minSalary} - ${job.maxSalary} LPA'`);
            text3.setAttribute('color', '#150B3D');
            text3.setAttribute('position', '-0.45 -0.05 0');
            text3.setAttribute('width', '1.35');
            planeA.appendChild(text3);

            // Additional planes and their child elements
            const financePlane = createInfoPlane(job.specialization, '-0.3 -0.3 0', '0.25 0.15 1', '#CBC9D4', '4.25');
            const fullTimePlane = createInfoPlane(job.jobType, '0 -0.3 0', '0.25 0.15 1', '#CBC9D4', '4.25');
            const applyPlane = createInfoPlane('Apply', '0.3 -0.3 0', '0.25 0.15 1', '#FF6B2C', '4.25');

            // Append additional planes to the main <a-plane>
            planeA.appendChild(financePlane);
            planeA.appendChild(fullTimePlane);
            planeA.appendChild(applyPlane);

            // Append the main <a-plane> to the scene
            scene.appendChild(planeA);
        });
    });
};

function createInfoPlane(value, position, scale, color, textWidth) {
    const infoPlane = document.createElement('a-plane');
    infoPlane.setAttribute('color', color);
    infoPlane.setAttribute('position', position);
    infoPlane.setAttribute('scale', scale);
    infoPlane.setAttribute('opacity', '0.2');
    infoPlane.setAttribute('material', 'shader: standard; transparent: true; roughness: 0.17; metalness: 0.6');
    infoPlane.setAttribute('rounded', 'true');

    const text = document.createElement('a-text');
    text.setAttribute('value', value);
    text.setAttribute('color', '#000');
    text.setAttribute('position', `-0.35 0 0`);
    text.setAttribute('z-offset', '0.1');
    text.setAttribute('width', textWidth);

    infoPlane.appendChild(text);

    return infoPlane;
}
