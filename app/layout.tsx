import type { Metadata } from "next";
import Script from "next/script";

import QueryProvider from "@/providers/QueryProvider";

import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";


// ======================================================
// 사이트 기본 정보
// ======================================================

export const metadata: Metadata = {
    title: "AI LIFE",
    description: "AI LIFE Application",
};


// ======================================================
// Root Layout
// ======================================================

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="ko">

        <head>

            {/* =========================================
                    기본 CSS
                ========================================= */}

            <link
                rel="stylesheet"
                href="/css/main.css"
            />

            <link
                rel="stylesheet"
                href="/css/food_list.css"
            />

            <link
                rel="stylesheet"
                href="/css/board.css"
            />

            <link
                rel="stylesheet"
                href="/css/youtube.css"
            />

        </head>


        <body>

        {/* =========================================
                    Kakao Map SDK
                ========================================= */}

        <Script
            src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=72fa81817487692b6dc093004af97650&libraries=services&autoload=false"
            strategy="beforeInteractive"
        />


        {/* =========================================
                    Header
                ========================================= */}

        <Header />


        {/* =========================================
                    TanStack Query Provider
                ========================================= */}

        <QueryProvider>

            {/* =====================================
                        현재 페이지
                    ===================================== */}

            {children}

        </QueryProvider>


        {/* =========================================
                    Footer
                ========================================= */}

        <Footer />

        </body>

        </html>
    );
}