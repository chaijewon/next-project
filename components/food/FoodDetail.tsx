"use client";

import { FoodDetailItem } from "../../commons/commonsData";

import { useQuery } from "@tanstack/react-query";

import { AxiosResponse } from "axios";

import {
    useParams,
    useRouter
} from "next/navigation";

import apiClient from "../../http-commons";

import MapPrint from "../../commons/MapPrint";


/*
=========================================================
FoodDetail
=========================================================
*/

function FoodDetail() {


    /*
    =====================================================
    URL 파라미터

    /food/detail/1

    ↓

    no = "1"
    =====================================================
    */

    const params =
        useParams<{ no: string }>();

    const no = params.no;


    /*
    =====================================================
    Next.js 페이지 이동
    =====================================================
    */

    const router = useRouter();


    /*
    =====================================================
    맛집 상세 데이터 조회
    =====================================================
    */

    const {
        isLoading,
        isError,
        error,
        data
    } = useQuery<
        AxiosResponse<FoodDetailItem>,
        Error
    >({

        /*
        =================================================
        Query Key
        =================================================
        */

        queryKey: [
            "food-detail",
            no
        ],


        /*
        =================================================
        Spring Boot API
        =================================================
        */

        queryFn: async () => {

            return await apiClient.get(
                `/food/detail_react/${no}`
            );

        },


        /*
        =================================================
        no가 존재할 때만 API 호출
        =================================================
        */

        enabled: !!no

    });


    /*
    =====================================================
    Loading
    =====================================================
    */

    if (isLoading) {

        return (

            <main className="restaurant-page">

                <section className="page-title">

                    <span>
                        AI RESTAURANT
                    </span>

                    <h1>
                        맛집 정보를 불러오는 중입니다.
                    </h1>

                </section>

            </main>

        );

    }


    /*
    =====================================================
    Error
    =====================================================
    */

    if (isError) {

        return (

            <main className="restaurant-page">

                <section className="page-title">

                    <span>
                        AI RESTAURANT
                    </span>

                    <h1>
                        맛집 정보를 불러오지 못했습니다.
                    </h1>

                    <p>
                        {error?.message}
                    </p>

                </section>

            </main>

        );

    }


    /*
    =====================================================
    AxiosResponse

    data
      ↓
    AxiosResponse

    data.data
      ↓
    FoodDetailItem
    =====================================================
    */

    const vo:
        FoodDetailItem | undefined =
        data?.data;


    /*
    =====================================================
    데이터가 없는 경우
    =====================================================
    */

    if (!vo) {

        return (

            <main className="restaurant-page">

                <section className="page-title">

                    <span>
                        AI RESTAURANT
                    </span>

                    <h1>
                        맛집 정보가 없습니다.
                    </h1>

                    <button
                        type="button"
                        onClick={() => router.back()}
                    >
                        ← 목록으로
                    </button>

                </section>

            </main>

        );

    }


    /*
    =====================================================
    콘솔
    =====================================================
    */

    console.log(
        "Food Detail = ",
        vo
    );


    /*
    =====================================================
    화면
    =====================================================
    */

    return (

        <main className="restaurant-page">


            {/* =================================================
                페이지 제목
            ================================================= */}

            <section className="page-title">

                <span>
                    AI RESTAURANT
                </span>

                <h1>
                    맛집 상세정보
                </h1>

                <p>
                    맛집의 다양한 정보를 확인해보세요.
                </p>

            </section>



            {/* =================================================
                맛집 상세
            ================================================= */}

            <section className="food-detail">


                {/* =================================================
                    이미지
                ================================================= */}

                <div className="food-detail-image">

                    <img
                        src={vo.poster}
                        alt={vo.name}
                    />

                </div>



                {/* =================================================
                    맛집 정보
                ================================================= */}

                <div className="food-detail-info">


                    {/* 평점 */}

                    <div className="rating">

                        ⭐ {vo.score}

                    </div>


                    {/* 이름 */}

                    <h2>
                        {vo.name}
                    </h2>


                    {/* 종류 */}

                    <p className="food-type">
                        {vo.type}
                    </p>


                    {/* 태그 */}

                    <div className="food-tags">

                        <span>
                            {vo.type}
                        </span>

                        <span>
                            AI 추천
                        </span>

                        <span>
                            인기맛집
                        </span>

                    </div>


                    {/* =================================================
                        상세정보
                    ================================================= */}

                    <div className="food-info">


                        {/* 주소 */}

                        <div>

                            <strong>
                                📍 주소
                            </strong>

                            <p>
                                {vo.address}
                            </p>

                        </div>


                        {/* 전화 */}

                        <div>

                            <strong>
                                📞 전화
                            </strong>

                            <p>
                                {vo.phone}
                            </p>

                        </div>


                        {/* 영업시간 */}

                        <div>

                            <strong>
                                🕐 영업시간
                            </strong>

                            <p>
                                {vo.time}
                            </p>

                        </div>


                        {/* 음식 종류 */}

                        <div>

                            <strong>
                                🍴 음식 종류
                            </strong>

                            <p>
                                {vo.type}
                            </p>

                        </div>


                        {/* 가격 */}

                        <div>

                            <strong>
                                💰 가격대
                            </strong>

                            <p>
                                {vo.price}
                            </p>

                        </div>


                        {/* 주차 */}

                        <div>

                            <strong>
                                🚗 주차
                            </strong>

                            <p>
                                {vo.parking}
                            </p>

                        </div>

                    </div>



                    {/* =================================================
                        버튼
                    ================================================= */}

                    <div className="food-detail-buttons">


                        {/* 목록 */}

                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => router.back()}
                        >
                            ← 목록으로
                        </button>


                        {/* 지도 */}

                        <button
                            type="button"
                            className="map-btn"
                            onClick={() => {

                                document
                                    .querySelector(
                                        ".food-map"
                                    )
                                    ?.scrollIntoView({
                                        behavior:
                                            "smooth"
                                    });

                            }}
                        >
                            📍 지도에서 보기
                        </button>

                    </div>

                </div>

            </section>



            {/* =================================================
                맛집 소개
            ================================================= */}

            <section className="food-description">

                <h2>
                    맛집 소개
                </h2>

                <p>
                    {vo.content}
                </p>

            </section>



            {/* =================================================
                지도
            ================================================= */}

            <section
                className="food-map"
            >

                <div className="map-title2">

                    <span>
                        📍 LOCATION
                    </span>

                    <h2>
                        매장 위치
                    </h2>

                    <p>
                        {vo.address}
                    </p>

                </div>


                <div className="map-container">

                    <div className="map-placeholder">

                        <MapPrint
                            address={vo.address}
                            name={vo.name}
                        />

                    </div>

                </div>

            </section>



            {/* =================================================
                AI 추천
            ================================================= */}

            <section className="ai-recommend">


                {/* AI 아이콘 */}

                <div className="ai-icon">
                    ✨
                </div>


                {/* AI 내용 */}

                <div>

                    <span>
                        AI RECOMMEND
                    </span>

                    <h2>
                        이런 맛집도 추천해드릴까요?
                    </h2>

                    <p>
                        현재 맛집과 비슷한 음식점과
                        주변 인기 맛집을 AI가 추천해드립니다.
                    </p>

                </div>


                {/* 추천 버튼 */}

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/food/recommend"
                        )
                    }
                >
                    AI 맛집 추천 →
                </button>

            </section>


        </main>

    );

}


export default FoodDetail;