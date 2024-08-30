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
                        window.location.href = 'main.html'; // ここでmain.htmlにリダイレクトする
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
            // iOS以外のデバイスで直接モーションリスナーを初期化
            console.log('DeviceMotionEvent is available.');
            // main.jsを適切に初期化するコードをここに追加できます
            // 例えば、直接main.htmlにリダイレクトする
            window.location.href = 'main.html'; // ここでmain.htmlにリダイレクトする
        }
    });
});
