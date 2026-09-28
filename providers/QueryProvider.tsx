"use client";

import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";




import { useState } from "react";


// ======================================================
// TanStack Query Provider
// ======================================================
// 기존 React의 index.tsx에서 사용하던
//
// QueryClient
// QueryClientProvider
//
// 부분을 Next.js용으로 분리한 파일
// ======================================================

export default function QueryProvider({
                                          children
                                      }: {
    children: React.ReactNode;
}) {

    // ==================================================
    // QueryClient 생성
    // ==================================================
    // useState를 사용하는 이유
    //
    // Next.js Client Component에서
    // QueryClient가 불필요하게 여러 번 생성되는 것을
    // 방지하기 위해 사용
    // ==================================================

    const [queryClient] = useState(
        () =>

            new QueryClient({

                // ==========================================
                // TanStack Query 기본 설정
                // ==========================================
                defaultOptions: {

                    queries: {

                        // ----------------------------------
                        // 브라우저 창에 다시 들어왔을 때
                        // 자동으로 서버 요청하지 않음
                        // ----------------------------------
                        refetchOnWindowFocus: false,


                        // ----------------------------------
                        // Component가 다시 Mount 되었을 때
                        // 자동 요청하지 않음
                        // ----------------------------------
                        refetchOnMount: false,


                        // ----------------------------------
                        // 인터넷이 다시 연결되었을 때
                        // 자동 요청하지 않음
                        // ----------------------------------
                        refetchOnReconnect: false,


                        // ----------------------------------
                        // API 요청 실패 시
                        // 자동 재시도하지 않음
                        // ----------------------------------
                        retry: false,


                        // ----------------------------------
                        // 데이터를 5분 동안 fresh 상태로 유지
                        // ----------------------------------
                        // 5 * 60 * 1000
                        //
                        // = 300,000ms
                        // = 5분
                        // ----------------------------------
                        staleTime: 5 * 60 * 1000
                    }
                }
            })
    );


    // ==================================================
    // QueryClientProvider
    // ==================================================
    // children
    //   ↓
    // Next.js의 실제 페이지
    //   ↓
    // FoodList
    // BoardList
    // YoutubeFind
    // 등에서 useQuery() 사용 가능
    // ==================================================

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}