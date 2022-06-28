import Toast from 'react-native-root-toast';

export default function ToastComponent(toastText) {
    Toast.show(toastText, {
        duration: Toast.durations.LONG,
    });
}