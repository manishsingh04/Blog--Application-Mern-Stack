import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create" class="btn btn-success"  >Create new post</Link>
                        <Link class="btn btn-danger" onClick={logout}>Logout ({username})</Link>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login" class="btn btn-success">Login</Link>
                        <Link to="/register" class="btn btn-success">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
