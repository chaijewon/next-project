"use client";

import { useEffect, useRef } from "react";

interface MapProps {
    address: string;
    name: string;
}

/*
 * =========================================================
 * Kakao Maps 최소 타입 정의
 * any를 사용하지 않음
 * =========================================================
 */

interface KakaoLatLng {
    getLat(): number;
    getLng(): number;
}

interface KakaoMap {
    setCenter(coords: KakaoLatLng): void;
}

interface KakaoResult {
    x: string;
    y: string;
}

interface KakaoServices {
    Geocoder: new () => {
        addressSearch(
            address: string,
            callback: (
                result: KakaoResult[],
                status: string
            ) => void
        ): void;
    };

    Status: {
        OK: string;
    };
}

interface KakaoMaps {
    LatLng: new (
        lat: number,
        lng: number
    ) => KakaoLatLng;

    Map: new (
        container: HTMLElement,
        options: {
            center: KakaoLatLng;
            level: number;
        }
    ) => KakaoMap;

    Marker: new (
        options: {
            map: KakaoMap;
            position: KakaoLatLng;
        }
    ) => unknown;

    InfoWindow: new (
        options: {
            content: string;
        }
    ) => {
        open(
            map: KakaoMap,
            marker: unknown
        ): void;
    };

    services: KakaoServices;

    load(callback: () => void): void;
}

interface Kakao {
    maps: KakaoMaps;
}

declare global {
    interface Window {
        kakao?: Kakao;
    }
}

const MapPrint = ({
                      address,
                      name
                  }: MapProps) => {

    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const appKey =
            '72fa81817487692b6dc093004af97650';

        if (!appKey) {
            console.error(
                "Kakao Map API Key가 없습니다."
            );
            return;
        }

        const createMap = () => {

            const kakao = window.kakao;


            if (!kakao?.maps) {
                console.error(
                    "Kakao Maps SDK가 아직 로드되지 않았습니다."
                );
                return;
            }


            kakao.maps.load(() => {

                if (!mapRef.current) {
                    return;
                }

                const center =
                    new kakao.maps.LatLng(
                        37.5665,
                        126.9780
                    );


                const map =
                    new kakao.maps.Map(
                        mapRef.current,
                        {
                            center: center,
                            level: 3
                        }
                    );


                if (!address) {
                    return;
                }


                const geocoder =
                    new kakao.maps.services.Geocoder();

                geocoder.addressSearch(
                    address,
                    (
                        result,
                        status
                    ) => {


                        if (
                            status ===
                            kakao.maps.services.Status.OK
                        ) {

                            const coords =
                                new kakao.maps.LatLng(
                                    Number(result[0].y),
                                    Number(result[0].x)
                                );


                            map.setCenter(coords);


                            const marker =
                                new kakao.maps.Marker({
                                    map: map,
                                    position: coords
                                });


                            const infoWindow =
                                new kakao.maps.InfoWindow({
                                    content: `
                                        <div style="
                                            padding:8px 12px;
                                            font-size:13px;
                                            font-weight:bold;
                                            white-space:nowrap;
                                        ">
                                            ${name}
                                        </div>
                                    `
                                });

                            infoWindow.open(
                                map,
                                marker
                            );
                        }
                    }
                );
            });
        };


        if (window.kakao?.maps) {

            createMap();

            return;
        }


        const script =
            document.createElement("script");

        script.id = "kakao-map-sdk";

        script.src =
            `https://dapi.kakao.com/v2/maps/sdk.js` +
            `?appkey=${appKey}` +
            `&libraries=services` +
            `&autoload=false`;

        script.async = true;


        script.onload = () => {

            console.log(
                "Kakao Maps SDK 로딩 완료"
            );

            createMap();
        };


        script.onerror = () => {

            console.error(
                "Kakao Maps SDK 로딩 실패"
            );
        };


        document.head.appendChild(script);

    }, [address, name]);


    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height: "400px"
            }}
        />
    );
};

export default MapPrint;