document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('requestPermissionButton');

    button.addEventListener('click', function() {
        // ボタンを無効化して重複クリックを防ぐ
        button.disabled = true;

        // iOSのパーミッション要求をサポートしているか確認
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        initializeMotionListeners();
                    } else {
                        console.warn('Motion permission denied.');
                        // ユーザーに対するフィードバックを追加することもできます
                    }
                    button.disabled = false; // ボタンを再度有効化
                })
                .catch(error => {
                    console.error('Error requesting motion permission:', error);
                    button.disabled = false; // ボタンを再度有効化
                });
        } else {
            // iOS以外のデバイスで直接モーションリスナーを初期化
            initializeMotionListeners();
            button.disabled = false; // ボタンを再度有効化
        }
    });
});

function initializeMotionListeners() {
    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', event => {
            console.log('Alpha:', event.alpha);
            console.log('Beta:', event.beta);
            console.log('Gamma:', event.gamma);
        });
    } else {
        console.error('DeviceOrientationEvent is not supported.');
        // ユーザーに対するフィードバックを追加することもできます
    }
}
