document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('requestPermissionButton');
    
    button.addEventListener('click', function() {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ devices
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        // Permission granted
                        initializeMotionListeners();
                    } else {
                        // Permission denied
                        console.warn('Motion permission denied.');
                    }
                })
                .catch(error => {
                    console.error('Error requesting motion permission:', error);
                });
        } else {
            // Non-iOS 13+ or permission not required
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
