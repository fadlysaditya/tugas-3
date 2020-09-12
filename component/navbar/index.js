import Link from 'next/link'
import { useRouter } from 'next/router'



const navbar = () => {
    const router = useRouter();
    var activeLink = router.pathname

    function TestFunction(id){
        activeLink = id
    }
    
    return(
        <ul>
            <li 
            onClick={() => TestFunction("/")}
            className={
                ("/" === activeLink ? " active" : "")
            }
            >
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>

            <li 
            onClick={() => TestFunction("/Cart")}
            className={
                ("/Cart" === activeLink ? " active" : "")
            }
            >
                <Link href="/Cart">
                    <a>Cart</a>
                </Link>
            </li>
        </ul>
    )
}

export default navbar;