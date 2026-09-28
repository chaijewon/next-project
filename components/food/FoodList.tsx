"use client";


import apiClient from "../../http-commons";
import { FoodItem, FoodListData } from "@/commons/commonsData";

import { AxiosResponse } from "axios";

import { useRef, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import PagePrint from "@/commons/PagePrint";

import Link from "next/link";


/*
=========================================================
FoodList
---------------------------------------------------------
역할
1. 맛집 목록 조회
2. 지역 검색
3. 페이징
4. 맛집 상세 페이지 이동
5. TanStack Query를 이용한 서버 데이터 관리
=========================================================
*/

function FoodList() {

    /*
    =====================================================
    1. 현재 페이지
    =====================================================
    */

    const [curpage, setCurpage] = useState<number>(1);


    const [search, setSearch] = useState<string>("마포");

    const [keyword, setKeyword] = useState<string>("마포");


    const fdRef = useRef<HTMLInputElement>(null);


    /*
    =====================================================
    4. 맛집 목록 조회
    =====================================================

    기존 React 코드

    const { ... } = useQuery(...)

    그대로 사용할 수 있습니다.

    단,
    Next.js에서는 이 컴포넌트가 Client Component이므로
    반드시 파일 최상단에

    "use client";

    가 있어야 합니다.
    */

    const {
        isLoading,
        isError,
        error,
        data,
        refetch: foodFind
    } = useQuery<AxiosResponse<FoodListData>, Error>({

        /*
        -------------------------------------------------
        Query Key
        -------------------------------------------------

        현재 페이지와 검색어가 변경되면
        서로 다른 Query로 관리할 수 있습니다.
        */

        queryKey: ["food", curpage, search],


        /*
        -------------------------------------------------
        서버 요청
        -------------------------------------------------
        */

        queryFn: async () => {

            return await apiClient.get(
                `/food/list_react/${search}/${curpage}`
            );

        }

    });


    /*
    =====================================================
    5. 검색
    =====================================================
    */

    const find = () => {

        /*
        input 객체 가져오기
        */

        const value = keyword.trim()


        /*
        검색어가 없는 경우
        */

        if (!value) {

          return
        }


        /*
        검색어 변경
        */

        setSearch(value);


        /*
        검색할 때 첫 페이지로 이동
        */

        setCurpage(1);


        /*
        서버 재조회
        */

        //foodFind();

    };


    /*
    =====================================================
    6. Loading
    =====================================================
    */

    if (isLoading) {

        return (
            <main className="restaurant-page">

                <section className="page-title">

                    <div>

                        <span>AI RESTAURANT</span>

                        <h1>
                            맛집 찾기
                        </h1>

                        <p>
                            맛집 정보를 불러오는 중입니다...
                        </p>

                    </div>

                </section>

                <div>
                    Loading...
                </div>

            </main>
        );
    }


    /*
    =====================================================
    7. Error
    =====================================================
    */

    if (isError) {

        return (
            <main className="restaurant-page">

                <section className="page-title">

                    <div>

                        <span>AI RESTAURANT</span>

                        <h1>
                            맛집 찾기
                        </h1>

                        <p>
                            서버와 통신하는 중 오류가 발생했습니다.
                        </p>

                    </div>

                </section>

                <div>

                    <h2>
                        Error 발생
                    </h2>

                    <p>
                        {error?.message}
                    </p>

                </div>

            </main>
        );
    }


    /*
    =====================================================
    8. 정상 화면
    =====================================================
    */

    return (

        <main className="restaurant-page">


            {/* =================================================
                페이지 제목
            ================================================= */}

            <section className="page-title">

                <div>

                    <span>
                        AI RESTAURANT
                    </span>

                    <h1>
                        맛집 찾기
                    </h1>

                    <p>
                        원하는 지역을 선택해보세요.
                    </p>

                </div>

            </section>



            {/* =================================================
                SEARCH
            ================================================= */}

            <section className="search-area">

                <div className="search-box">

                    <span>
                        📍
                    </span>


                    <input
                        type="text"
                        placeholder="지역 또는 맛집 이름을 입력하세요."

                        ref={fdRef}

                        value={keyword}

                        onChange={(e) => {

                            setKeyword(e.target.value);

                        }}

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                find();

                            }

                        }}

                    />


                    <button
                        type="button"
                        onClick={find}
                    >
                        검색
                    </button>

                </div>

            </section>



            {/* =================================================
                목록 HEADER
            ================================================= */}

            <section className="list-header">

                <div>

                    <strong>
                        맛집 목록
                    </strong>

                    <span>
                        총 {data?.data.count ?? 0}개의 맛집
                    </span>

                </div>


                <select>

                    <option>
                        추천순
                    </option>

                    <option>
                        평점순
                    </option>

                    <option>
                        리뷰순
                    </option>

                    <option>
                        거리순
                    </option>

                </select>

            </section>



            {/* =================================================
                RESTAURANT LIST
            ================================================= */}

            <section className="restaurant-list">

                {

                    data?.data.list?.map(
                        (food: FoodItem, index: number) => (

                            <article
                                className="restaurant-card"
                                key={food.no ?? index}
                            >


                                {/* =================================
                                    음식점 이미지
                                ================================= */}

                                <div className="restaurant-image sushi">

                                    <img
                                        src={food.poster}
                                        alt={food.name}
                                    />

                                </div>



                                {/* =================================
                                    음식점 정보
                                ================================= */}

                                <div className="restaurant-info">


                                    {/* 평점 */}

                                    <div className="rating">

                                        ⭐ {food.score}

                                    </div>



                                    {/* 음식점 이름 */}

                                    <h3>

                                        {food.name}

                                    </h3>



                                    {/* 음식 종류 */}

                                    <p>

                                        {food.type}

                                    </p>



                                    {/* 테마 */}

                                    <div className="tags">

                                        <span>
                                            {food.theme}
                                        </span>

                                    </div>



                                    {/* 상세보기 */}

                                    <Link
                                        href={`/food/detail/${food.no}`}
                                    >

                                        자세히 보기 →

                                    </Link>


                                </div>

                            </article>

                        )
                    )

                }

            </section>



            {/* =================================================
                PAGE
            ================================================= */}

            {

                data?.data && (

                    <PagePrint

                        data={data.data}

                        setCurpage={setCurpage}

                    />

                )

            }


        </main>

    );

}


export default FoodList;