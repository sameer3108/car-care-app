import "./css/Blogs.css";
import { useNavigate } from "react-router-dom";
import AllBlogs from "../components/AllBlogs";

function Blogs() {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userID");

    const handleWriteBlog = () => {
        navigate("/writeBlog");
    };

    const handleClickToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="main-blogs-page">
            <div className="main-blogs-form-heading">Maintenance Blogs</div>
            <div className="main-blogs-form-subheading">
                Ready to Share Your Car Insights? Write a Maintenance Blog!
            </div>

            {userId ? (
                <button onClick={handleWriteBlog}>Write a Blog</button>
            ) : (
                <div className="main-blog-login-msg">
                    Please login to your account to write a Maintenance Blog.
                    <br></br>
                    <div className="main-blog-login-button" onClick={handleClickToLogin}><i><u>Click here to Login</u></i></div>
                </div>
            )}

            <AllBlogs></AllBlogs>
        </div>
    );
}

export default Blogs;
