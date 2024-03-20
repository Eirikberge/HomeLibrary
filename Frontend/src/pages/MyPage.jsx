import useAuth from "../components/Auth/useAuth";

const MyPage = () => {
    const { setAuth } = useAuth();

    const logout = () => {
        localStorage.removeItem('accessToken');
        setAuth({ isAuthenticated: false });

    }

    return (
        <div>
            <button onClick={logout}>Logg ut</button>
        </div>
    )
}

export default MyPage;