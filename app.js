document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('requestPermissionButton');
    
    button.addEventListener('click', function() {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        initializeMotionListeners();
                    } else {
                        console.warn('Motion permission denied.');
                    }
                })
                .catch(error => {
                    console.error('Error requesting motion permission:', error);
                });
        } else {
            initializeMotionListeners();
        }
    });
});

function initializeMotionListeners() {
    window.addEventListener('deviceorientation', event => {
        console.log('Alpha:', event.alpha);
        console.log('Beta:', event.beta);
        console.log('Gamma:', event.gamma);
    });
}
