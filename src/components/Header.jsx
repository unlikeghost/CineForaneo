import Link from "next/link";
import react from "react";

function Header() {

    return (
        <>
            <Link href={"/roulette"}>
                Ruleta
            </Link>
            <Link href={"/"}>
                Agregar
            </Link>
        </>
    );
}

export { Header };