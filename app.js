document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('requestPermissionButton');

    button.addEventListener('click', function() {
        // ボタンを無効化して重複クリックを防ぐ
        button.disabled = true;

        // iOSのパーミッション要求をサポートしているか確認
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        console.log('Motion permission granted.');
                        // パーミッションが許可された場合、main.jsの機能を動作させるためにリダイレクトまたは初期化を行う
                        // 例えば、リダイレクトする場合:
                        window.location.href = 'https://aet42.github.io/Digital_Fortune/src/index.html';
                    } else {
                        console.warn('Motion permission denied.');
                        alert('モーションセンサーの許可が必要です。');
                    }
                    button.disabled = false; // ボタンを再度有効化
                })
                .catch(error => {
                    console.error('Error requesting motion permission:', error);
                    button.disabled = false; // ボタンを再度有効化
                });
        } else {
            console.log('DeviceMotionEvent is available.');
            window.location.href = 'https://aet42.github.io/Digital_Fortune/src/index.html';
        }
    });
});
