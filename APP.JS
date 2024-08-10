document.addEventListener('DOMContentLoaded', function () {
    const bedNumberInput = document.getElementById('bedNumber');
    const patientNameInput = document.getElementById('patientName');
    const form = document.getElementById('notificationForm');

    const notificationSound = document.getElementById('notificationSound');

    // Load previously saved data
    loadSavedData();

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        saveData();
    });

    function loadSavedData() {
        const bedNumber = localStorage.getItem('bedNumber') || '';
        const patientName = localStorage.getItem('patientName') || '';

        bedNumberInput.value = bedNumber;
        patientNameInput.value = patientName;
    }

    function saveData() {
        const bedNumber = bedNumberInput.value;
        const patientName = patientNameInput.value;

        localStorage.setItem('bedNumber', bedNumber);
        localStorage.setItem('patientName', patientName);

        // Send data to the backend or use it to set up notifications
        sendNotificationDataToBackend(bedNumber, patientName);

        notificationSound.play();
        alert('Patient data saved!');
    }

    function sendNotificationDataToBackend(bedNumber, patientName) {
        // Example AJAX request to send data to backend
        fetch('/save-patient-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bedNumber: bedNumber,
                patientName: patientName,
                token: 'user_fcm_token' // Replace with the actual FCM token
            })
        }).then(response => {
            if (response.ok) {
                console.log('Data sent to backend');
            } else {
                console.error('Failed to send data to backend');
            }
        });
    }
});
