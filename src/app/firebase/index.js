import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NOTIFICATION_ACTION, gettingToken } from "src/redux/authenticate/actions";


const FireBaseComponent = () => {
    const dispatch = useDispatch()
    const device_token = useSelector(state => state.device_token);
    const initializeFirebase = async () => {
        const hasFirebaseMessagingSupport = await isSupported();
        if (hasFirebaseMessagingSupport) {
            const firebaseConfig = {
                apiKey: process.env.REACT_APP_API_KEY,
                authDomain: process.env.REACT_APP_AUTHDOMAIN,
                projectId: process.env.REACT_APP_PROJECT_ID,
                storageBucket: process.env.REACT_APP_STORAGEBUCKET,
                messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
                appId: process.env.REACT_APP_APPID,
                measurementId: process.env.REACT_APP_MEASUREMENTID,
            };
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);


            getToken(messaging, {
                vapidKey: process.env.REACT_APP_VAPIDKEY,
            }).then((currentToken) => {
                if (device_token === currentToken) {
                    return
                }
                dispatch(gettingToken(currentToken));
            }).catch((err) => {
                if (Notification.permission === "denied") {
                    return false
                } else {
                    Notification.requestPermission()
                    dispatch(gettingToken(''));
                }
            });
            onMessage(messaging, (payload) => {
                dispatch({ type: NOTIFICATION_ACTION.SET, payload: payload })
            })
        } else {

        }
    }
    useEffect(() => {
        initializeFirebase()
    }, [])
    return
}

export default FireBaseComponent