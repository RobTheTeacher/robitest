import Logo from "../Logo"
import Account from "../Account"
import Search from "../Home/Search"

const Header = () => {
    return (
        <header className="p-4 flex justify-between items-center">
            <Logo />
            <Search />
            <Account />
        </header>
    )
}

export default Header