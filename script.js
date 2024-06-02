document.getElementById('sendLocationButton').addEventListener('click', () => {
    console.log('Button clicked');
    if (navigator.geolocation) {
        console.log('Geolocation is supported');
        navigator.geolocation.getCurrentPosition(sendLocation, handleError);
        console.log('Requesting location...');
    } else {
        console.error('Geolocation is not supported by your browser.');
        alert('Geolocation is not supported by your browser.');
    }
});

function sendLocation(position) {
    console.log("sendLocation is being called");
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log('Coordinates received:', latitude, longitude);

    fetch('http://localhost:3000/l', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Site is down');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send location.');
    });
}

function handleError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            alert("An unknown error occurred.");
            break;
    }
}
