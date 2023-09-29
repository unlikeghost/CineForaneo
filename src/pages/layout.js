import React from "react";
// import { Header } from "@/components/Header";

export default function LayoutMain({ children }) {
    return (
        <>
            {/* <Header /> */}
            <main>
                { children }
            </main>
        </>
    );
}
