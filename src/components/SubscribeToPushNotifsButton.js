import {Button} from "react-bootstrap";
import OneSignal from 'react-onesignal';
import {useEffect, useState} from "react";

export function SubscribeToPushNotifsButton() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    useEffect(() => {
        if (Notification.permission !== "granted") OneSignal.setSubscription(false);
        else OneSignal.getSubscription().then((subState) => setIsSubscribed(subState));
    }, []);


    const text = isSubscribed ? "Unsubscribe" : "Subscribe to new Figures";
    return (
        <Button
            style={{position: "absolute", bottom: ".5rem", right: ".5rem"}}
            onClick={() => {
                if (!isSubscribed) {
                    Notification.requestPermission().then(
                        (result) => {
                            const isPushEnabled = result === "granted";
                            OneSignal.registerForPushNotifications();
                            OneSignal.setSubscription(true);
                            setIsSubscribed(isPushEnabled)
                        });
                } else OneSignal.setSubscription(false).then(() => setIsSubscribed(false));
            }}
        >{text}</Button>
    )
}