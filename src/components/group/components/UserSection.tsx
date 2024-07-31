"use client";

import { useGetProfileData } from "@/api/auth";
import { Icon } from "@/components/group/components";
import { useData, useLayers, useSettings, useShowSettings, useTooltip } from "@/components/group/lib/store";
import { translateCap } from "@/components/group/lib/strings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "@/styles/UserSection.module.css";
import { ReactElement, useRef } from "react";

export const UserSection = (): ReactElement => {

    const { currentUser } = useGetProfileData()

    const setShowSettings = useShowSettings((state) => state.setShowSettings);
    const setSettings = useSettings((state) => state.setSettings);
    const setTooltip = useTooltip((state) => state.setTooltip);
    const setLayers = useLayers((state) => state.setLayers);
    const settings = useSettings((state) => state.settings);
    const user = useData((state) => state.user);
    const layers = useLayers((state) => state.layers);

    const userSection = useRef<HTMLDivElement>(null);



    return (
        <div className="flex-shrink-0 bg-[#c0c5f8] z-1">
            <div className={styles.userSection}>
                <div
                    tabIndex={0}
                    ref={userSection}
                    className={
                        styles.avatarWrapper +
                        " " +
                        (layers.USER_CARD?.settings.element === userSection.current && styles.active)
                    }
                    onClick={(e) => {
                        if (layers.USER_CARD?.settings.element === e.currentTarget) return;
                        setLayers({
                            settings: {
                                type: "USER_CARD",
                                element: e.currentTarget,
                                firstSide: "TOP",
                                secondSide: "RIGHT",
                                gap: 14,
                            },
                            content: {
                                user: user,
                                animation: "off",
                                settings: true,
                            },
                        });
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (layers.USER_CARD?.settings.element === e.currentTarget) return;
                            setLayers({
                                settings: {
                                    type: "USER_CARD",
                                    element: e.currentTarget,
                                    firstSide: "TOP",
                                    secondSide: "RIGHT",
                                    gap: 14,
                                },
                                content: {
                                    user: user,
                                    animation: "off",
                                    settings: true,
                                },
                            });
                        }
                    }}
                >
                    <div>
                        <Avatar className="overflow-visible">
                            <AvatarImage
                                src={(currentUser?.photograph === 'default' || !currentUser?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${currentUser?.photograph}`}
                                className="rounded-full object-cover"
                            />
                            <AvatarFallback>
                                <div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full"></div>
                            </AvatarFallback>
                        </Avatar>
                        {/* <Image
                            className='mr-4 mt-0.5 h-10 w-10 rounded-full'
                            src={(currentUser?.photograph === 'default' || !currentUser?.photograph) ? '/assets/user.png' : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${currentUser?.photograph}`}
                            width={32}
                            height={32}
                            alt=''
                        /> */}
                    </div>

                    <div className={`${styles.contentWrapper} text-black`}>
                        <div>{currentUser?.surName} {currentUser?.givenName}</div>
                        <div className={styles.hoverContent}>
                            <div>{currentUser?.surName}</div>
                            <div>
                                {user?.customStatus
                                    ? user.customStatus
                                    : translateCap(user?.status === "OFFLINE" ? "INVISIBLE" : 'IDLE')}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.toolbar}>
                    <button
                        onMouseEnter={(e) => {
                            setTooltip(null);
                            setTooltip({
                                text: settings.microphone ? "Mute" : "Unmute",
                                element: e.currentTarget,
                                gap: 3,
                            });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={(e) => {
                            setTooltip(null);
                            setTooltip({
                                text: settings.microphone ? "Mute" : "Unmute",
                                element: e.currentTarget,
                                gap: 3,
                            });
                        }}
                        onBlur={() => setTooltip(null)}
                        onClick={(e) => {
                            setTooltip({
                                text: !settings.microphone ? "Mute" : "Unmute",
                                element: e.currentTarget,
                                gap: 3,
                            });

                            if (!settings.microphone && !settings.sound) {
                                setSettings("microphone", true);
                                setSettings("sound", true);
                                const audio = new Audio("/assets/sounds/undeafen.mp3");
                                audio.volume = 0.5;
                                audio.play();

                                // Speech
                                // const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                                // const recognition = new SpeechRecognition();

                                // recognition.continous = true;
                                // recognition.interimResults = true;
                                // recognition.lang = "en-US";
                                // recognition.start();

                                // recognition.onresult = function () {
                                //     console.log("Speech result");
                                // };

                                // recognition.onspeechend = function () {
                                //     console.log("Speech ended");
                                // };
                            } else {
                                setSettings("microphone", !settings.microphone);
                                const audio = new Audio(`
                                    /assets/sounds/${settings.microphone ? "mute" : "unmute"}.mp3
                                `);
                                audio.volume = 0.5;
                                audio.play();
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setTooltip({
                                    text: !settings.microphone ? "Mute" : "Unmute",
                                    element: e.currentTarget,
                                    gap: 3,
                                });

                                if (!settings.microphone && !settings.sound) {
                                    setSettings("microphone", true);
                                    setSettings("sound", true);
                                    const audio = new Audio("/assets/sounds/undeafen.mp3");
                                    audio.volume = 0.5;
                                    audio.play();
                                } else {
                                    setSettings("microphone", !settings.microphone);
                                    const audio = new Audio(`
                                        /assets/sounds/${settings.microphone ? "mute" : "unmute"}.mp3
                                    `);
                                    audio.volume = 0.5;
                                    audio.play();
                                }
                            }
                        }}
                        className={settings.microphone ? "" : styles.cut}
                    >
                        <div className={styles.toolbar}>
                            <Icon
                                name={settings.microphone ? "mic" : "micSlash"}
                                size={20}
                            />
                        </div>
                    </button>

                    <button
                        onMouseEnter={(e) => {
                            setTooltip(null);
                            setTooltip({
                                text: settings.sound ? "Deafen" : "Undeafen",
                                element: e.currentTarget,
                                gap: 3,
                            });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={(e) => {
                            setTooltip(null);
                            setTooltip({
                                text: settings.sound ? "Deafen" : "Undeafen",
                                element: e.currentTarget,
                                gap: 3,
                            });
                        }}
                        onBlur={() => setTooltip(null)}
                        onClick={(e) => {
                            setTooltip({
                                text: !settings.sound ? "Deafen" : "Undeafen",
                                element: e.currentTarget,
                                gap: 3,
                            });

                            if (settings.microphone && settings.sound) {
                                setSettings("microphone", false);
                                setSettings("sound", false);
                            } else {
                                setSettings("sound", !settings.sound);
                            }

                            const audio = new Audio(`
                                    /assets/sounds/${settings.sound ? "deafen" : "undeafen"}.mp3
                                `);
                            audio.volume = 0.5;
                            audio.play();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setTooltip({
                                    text: !settings.sound ? "Deafen" : "Undeafen",
                                    element: e.currentTarget,
                                    gap: 3,
                                });

                                if (settings.microphone && settings.sound) {
                                    setSettings("microphone", false);
                                    setSettings("sound", false);
                                } else {
                                    setSettings("sound", !settings.sound);
                                }

                                const audio = new Audio(`
                                        /assets/sounds/${settings.sound ? "deafen" : "undeafen"}.mp3
                                    `);
                                audio.volume = 0.5;
                                audio.play();
                            }
                        }}
                        className={settings.sound ? "" : styles.cut}
                    >
                        <div className={styles.toolbar}>
                            <Icon
                                name={settings.sound ? "headset" : "headsetSlash"}
                                size={20}
                            />
                        </div>
                    </button>

                    <button
                        onMouseEnter={(e) => {
                            setTooltip(null);
                            setTooltip({
                                text: "User Settings",
                                element: e.currentTarget,
                                gap: 3,
                            });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={(e) => {
                            setTooltip(null);
                            setTooltip({
                                text: "User Settings",
                                element: e.currentTarget,
                                gap: 3,
                            });
                        }}
                        onBlur={() => setTooltip(null)}
                        onClick={() => setShowSettings("")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setShowSettings("");
                            }
                        }}
                    >
                        <div className={styles.toolbar}>
                            <Icon
                                name="settings"
                                size={20}
                            />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
