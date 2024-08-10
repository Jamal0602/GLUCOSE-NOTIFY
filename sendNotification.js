const admin = ('firebase-admin');
const serviceAccount = ('google-service.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function sendGlucoseAlertNotification(token, bedNumber, patientName) {
    const message = {
        notification: {
            title: `Glucose Alert: Patient ${patientName}`,
            body: `Bed ${bedNumber} - The glucose bottle is getting empty!`
        },
        token: token
    };

    admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
}

// Example call:
sendGlucoseAlertNotification('user_fcm_token', '1', 'abc');
