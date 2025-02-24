import { useState, useEffect } from "react";
import "../styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenuOpen } from "../Utils/menuSlice";
import axios from "axios";
import { logout, loginSuccess, checkAuthStatus } from "../Utils/authSlice";
import { updateProfile } from "../Utils/authSlice";

function Header() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchedText, seSearchedText] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [channelMenu, setChannelMenu] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelHandle, setChannelHandle] = useState("");
  const [message, setMessage] = useState("");


  // function for handling search query

  function handleSearch() {
    if (searchedText.trim()) {
      navigate(`/search/${searchedText}`);
    }
  }

  // Trigger search when Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/users/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout()); // Update Redux state
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // function to show channel menu

  function toggleChannelMenu() {
    setChannelMenu(!channelMenu);
  }

  // function to create a channel

  const handleCreateChannel = async (e) => {
    if (!user) return navigate("/login");
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/channel/create",
        { channelName, channelHandle, user_id: user._id }
      );

      const res = await axios.put(
        "http://localhost:3000/users/channel/channeladded",
        { user_id: user._id,channel:channelHandle },
        { withCredentials: true }
      );
      dispatch(updateProfile(res.data));
      setMessage("Channel Created successfully!");
      setTimeout(()=>{
        setMessage("");
        window.location.reload();
        setChannelMenu(false);
      },2000);
    } catch (error) {
      alert(error.response?.data?.error || "Error creating channel");
    }
  };

  // function for showing hamburger menu modal

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(setMenuOpen(!isMenuOpen));
  };

  // function for showing hamburger menu modal

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    dispatch(checkAuthStatus());
    const interval = setInterval(() => {
      dispatch(checkAuthStatus());
    }, 60000); // Check every  minute

    return () => clearInterval(interval);
  }, [dispatch]);


  // Our Component starts from here 
  return (
    <div className="header">
      <div>
        <div className="menu">
          {/* Hamburger Icon */}
          <div className="hamburger" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {/* Modal Menu */}
          {isMenuOpen && (
            <div className="modal">
              <div className="modal-content">
                {/* Menu Items */}
                <div className="menu-items">
                  <section className="bb-2">
                    <p onClick={toggleMenu}>
                      <Link to="/">
                        <i className="fa-solid fa-house fa-lg mlr-10"></i> Home{" "}
                      </Link>
                    </p>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        focusable="false"
                        aria-hidden="true"
                        className="mlr-10"
                      >
                        <path
                          clipRule="evenodd"
                          d="M18.45 8.851c1.904-1.066 2.541-3.4 1.422-5.214-1.119-1.814-3.57-2.42-5.475-1.355L5.55 7.247c-1.29.722-2.049 2.069-1.968 3.491.081 1.423.989 2.683 2.353 3.268l.942.404-1.327.742c-1.904 1.066-2.541 3.4-1.422 5.214 1.119 1.814 3.57 2.421 5.475 1.355l8.847-4.965c1.29-.722 2.049-2.068 1.968-3.49-.081-1.423-.989-2.684-2.353-3.269l-.942-.403 1.327-.743ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
                          fillRule="evenodd"
                        ></path>
                      </svg>{" "}
                      Shorts
                    </p>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        focusable="false"
                        aria-hidden="true"
                        className="mlr-10"
                      >
                        <path
                          clipRule="evenodd"
                          d="M5.5 3A1.5 1.5 0 004 4.5h16A1.5 1.5 0 0018.5 3h-13ZM2 7.5A1.5 1.5 0 013.5 6h17A1.5 1.5 0 0122 7.5v11a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5v-11Zm8 2.87a.5.5 0 01.752-.431L16 13l-5.248 3.061A.5.5 0 0110 15.63v-5.26Z"
                          fillRule="evenodd"
                        ></path>
                      </svg>{" "}
                      Subscriptions
                    </p>
                  </section>

                  <section className="bb-2">
                    {isAuthenticated ? (
                      <div>
                        <h3>You &gt;</h3>
                        <p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            focusable="false"
                            aria-hidden="true"
                            className="mlr-10 svg-2"
                          >
                            <path
                              clipRule="evenodd"
                              d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z"
                              fillRule="evenodd"
                            ></path>
                          </svg>{" "}
                          History
                        </p>
                        <p>
                          <i className="fa-solid fa-photo-film fa-lg mlr-10"></i>
                          Playlist
                        </p>
                        <p>
                          <i className="fa-solid fa-video fa-lg mlr-10"></i>Your
                          Videos
                        </p>
                        <p>
                          {" "}
                          <i className="fa-solid fa-graduation-cap fa-lg mlr-10 "></i>
                          Your Courses
                        </p>
                        <p>
                          {" "}
                          <i className="fa-solid fa-clock fa-lg mlr-10 "></i>
                          Watch later
                        </p>
                        <p>
                          {" "}
                          <i className="fa-solid fa-thumbs-up fa-lg mlr-10 "></i>
                          Liked Videos
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>
                          {" "}
                          <i className="fa-solid fa-user fa-lg mlr-10"></i> You
                        </p>
                        <p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            focusable="false"
                            aria-hidden="true"
                            className="mlr-10 svg-2"
                          >
                            <path
                              clipRule="evenodd"
                              d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z"
                              fillRule="evenodd"
                            ></path>
                          </svg>{" "}
                          History
                        </p>
                      </div>
                    )}
                  </section>

                  {/* signin section  */}

                  <section className="bb-2">
                    {isAuthenticated ? (
                      <div>
                        <h3>Subscriptions</h3>
                        <p>
                          <img
                            src="https://yt3.ggpht.com/DFAj5Pcujo1P0iXe8x4XoZwwItN9cbHnDxbdamvhqSTzXTmyNlqsE1HN2bEQN5vpXE6SB1IAoCM=s176-c-k-c0x00ffffff-no-rj"
                            alt=""
                            height="25px"
                            width="25px"
                            className="mlr-10 br50"
                          />
                          Bruno Mars
                        </p>
                        <p>
                          <img
                            src="https://yt3.googleusercontent.com/qjsflFmyakGs5ekX8fPsDNfuKABx-yxIDrv-4ooPAFcZ6JUUpUPlue7g_d-VAk2YAiYR-0yr=s160-c-k-c0x00ffffff-no-rj"
                            alt=""
                            height="25px"
                            width="25px"
                            className="mlr-10 br50"
                          />
                          Rose
                        </p>
                        <p>
                          <img
                            src="https://yt3.ggpht.com/PhFThrqp58joMS9FOd7I2jPZ1TepvCKDsdnuwmFXPl-Tq0kZjw3GNtCNtsxt3dgH8bqW7RdK=s176-c-k-c0x00ffffff-no-rj"
                            alt=""
                            height="25px"
                            width="25px"
                            className="mlr-10 br50"
                          />
                          Lady Gaga
                        </p>
                        <p>
                          <img
                            src="https://yt3.ggpht.com/Se8rnTzGI-Y8RmcltkCY9g8Evf0wVEIqGboR0G2EZWsrL6W61c0v9m6ijeDCAgNIF0U9tPIHbQ=s176-c-k-c0x00ffffff-no-rj"
                            alt=""
                            height="25px"
                            width="25px"
                            className="mlr-10 br50"
                          />
                          Ed Sheeran
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="signinheading">
                          Sign in to like videos, comment, and subscribe.
                        </h4>
                        <Link to="/login">
                          <div className="signin">
                            <i className="fa-regular fa-user fa-lg mlr-10"></i>
                            Sign in{" "}
                          </div>
                        </Link>
                      </div>
                    )}
                  </section>

                  {/* explore section  */}
                  <section className="bb-2">
                    <h3>Explore</h3>
                    <p>
                      <i className="fa-solid fa-fire fa-lg mlr-10"></i>Trending
                    </p>
                    <p>
                      <i className="fa-solid fa-bag-shopping fa-lg mlr-10"></i>
                      Shopping
                    </p>
                    <p>
                      <i className="fa-solid fa-music fa-lg mlr-10"></i>Music
                    </p>
                    <p>
                      <i className="fa-solid fa-clapperboard fa-lg mlr-10"></i>
                      Movies
                    </p>
                    <p>
                      {" "}
                      <i className="fa-solid fa-satellite-dish  fa-lg mlr-10 "></i>
                      Live
                    </p>
                    <p>
                      <i className="fa-solid fa-gamepad fa-lg mlr-10 "></i>
                      Gaming
                    </p>
                    <p>
                      <i className="fa-solid fa-newspaper fa-lg mlr-10 "></i>
                      News
                    </p>
                    <p>
                      <i className="fa-solid fa-trophy fa-lg mlr-10 "></i>Sports
                    </p>
                    <p>
                      {" "}
                      <i className="fa-solid fa-graduation-cap fa-lg mlr-10 "></i>
                      Courses
                    </p>
                    <p>
                      {" "}
                      <i className="fa-solid fa-podcast fa-lg mlr-10 "></i>
                      Podcasts
                    </p>
                  </section>

                  {/* youtube other products section  */}

                  <section className="bb-2">
                    <h3>More From Youtube</h3>
                    <p>
                      <i className="fa-brands fa-youtube red fa-lg mlr-10"></i>
                      Youtube Premium
                    </p>
                    <p>
                      <i className="fa-brands fa-youtube fa-lg mlr-10 red"></i>
                      Youtube Music
                    </p>
                    <p>
                      <i className="fa-brands fa-youtube fa-lg mlr-10 red"></i>
                      Youtube Kids
                    </p>
                  </section>

                  {/* setting ,feedback and help section  */}

                  <section className="bb-2">
                    <p>
                      <i className="fa-solid fa-gear fa-lg mlr-10"></i> Settings
                    </p>
                    <p>
                      <i className="fa-regular fa-flag fa-lg mlr-10"></i>Report
                      History
                    </p>
                    <p>
                      <i className="fa-solid fa-question fa-lg mlr-10"></i>Help
                    </p>
                    <p>
                      <i className="fa-regular fa-message fa-lg mlr-10"></i>Send
                      Feedback
                    </p>
                    <p onClick={handleLogout}>
                      <i className="fa-solid fa-arrow-right-from-bracket fa-xl mlr-15"></i>
                      Sign Out
                    </p>
                  </section>

                  <section className="p-10 sm-grey">
                    <h4>
                      About Press Copyright Contact us Creators Advertise
                      Developers{" "}
                    </h4>
                    <h4>
                      {" "}
                      Terms Privacy Policy & Safety How YouTube works Test new
                      features{" "}
                    </h4>
                    <h4 id="copyright">© 2025 Google LLC</h4>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* youtube logo  */}
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="yt-ringo2-svg_yt10"
            width="93"
            height="20"
            viewBox="0 0 93 20"
            focusable="false"
            aria-hidden="true"
            className="ml-80"
          >
            <g>
              <path
                d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z"
                fill="#FF0033"
              ></path>
              <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white"></path>
            </g>
            <g id="youtube-paths_yt10">
              <path d="M37.1384 18.8999V13.4399L40.6084 2.09994H38.0184L36.6984 7.24994C36.3984 8.42994 36.1284 9.65994 35.9284 10.7999H35.7684C35.6584 9.79994 35.3384 8.48994 35.0184 7.22994L33.7384 2.09994H31.1484L34.5684 13.4399V18.8999H37.1384Z"></path>
              <path d="M44.1003 6.29994C41.0703 6.29994 40.0303 8.04994 40.0303 11.8199V13.6099C40.0303 16.9899 40.6803 19.1099 44.0403 19.1099C47.3503 19.1099 48.0603 17.0899 48.0603 13.6099V11.8199C48.0603 8.44994 47.3803 6.29994 44.1003 6.29994ZM45.3903 14.7199C45.3903 16.3599 45.1003 17.3899 44.0503 17.3899C43.0203 17.3899 42.7303 16.3499 42.7303 14.7199V10.6799C42.7303 9.27994 42.9303 8.02994 44.0503 8.02994C45.2303 8.02994 45.3903 9.34994 45.3903 10.6799V14.7199Z"></path>
              <path d="M52.2713 19.0899C53.7313 19.0899 54.6413 18.4799 55.3913 17.3799H55.5013L55.6113 18.8999H57.6012V6.53994H54.9613V16.4699C54.6812 16.9599 54.0312 17.3199 53.4212 17.3199C52.6512 17.3199 52.4113 16.7099 52.4113 15.6899V6.53994H49.7812V15.8099C49.7812 17.8199 50.3613 19.0899 52.2713 19.0899Z"></path>
              <path d="M62.8261 18.8999V4.14994H65.8661V2.09994H57.1761V4.14994H60.2161V18.8999H62.8261Z"></path>
              <path d="M67.8728 19.0899C69.3328 19.0899 70.2428 18.4799 70.9928 17.3799H71.1028L71.2128 18.8999H73.2028V6.53994H70.5628V16.4699C70.2828 16.9599 69.6328 17.3199 69.0228 17.3199C68.2528 17.3199 68.0128 16.7099 68.0128 15.6899V6.53994H65.3828V15.8099C65.3828 17.8199 65.9628 19.0899 67.8728 19.0899Z"></path>
              <path d="M80.6744 6.26994C79.3944 6.26994 78.4744 6.82994 77.8644 7.73994H77.7344C77.8144 6.53994 77.8744 5.51994 77.8744 4.70994V1.43994H75.3244L75.3144 12.1799L75.3244 18.8999H77.5444L77.7344 17.6999H77.8044C78.3944 18.5099 79.3044 19.0199 80.5144 19.0199C82.5244 19.0199 83.3844 17.2899 83.3844 13.6099V11.6999C83.3844 8.25994 82.9944 6.26994 80.6744 6.26994ZM80.7644 13.6099C80.7644 15.9099 80.4244 17.2799 79.3544 17.2799C78.8544 17.2799 78.1644 17.0399 77.8544 16.5899V9.23994C78.1244 8.53994 78.7244 8.02994 79.3944 8.02994C80.4744 8.02994 80.7644 9.33994 80.7644 11.7299V13.6099Z"></path>
              <path d="M92.6517 11.4999C92.6517 8.51994 92.3517 6.30994 88.9217 6.30994C85.6917 6.30994 84.9717 8.45994 84.9717 11.6199V13.7899C84.9717 16.8699 85.6317 19.1099 88.8417 19.1099C91.3817 19.1099 92.6917 17.8399 92.5417 15.3799L90.2917 15.2599C90.2617 16.7799 89.9117 17.3999 88.9017 17.3999C87.6317 17.3999 87.5717 16.1899 87.5717 14.3899V13.5499H92.6517V11.4999ZM88.8617 7.96994C90.0817 7.96994 90.1717 9.11994 90.1717 11.0699V12.0799H87.5717V11.0699C87.5717 9.13994 87.6517 7.96994 88.8617 7.96994Z"></path>
            </g>
          </svg>
        </Link>
      </div>


{/* header search bar  */}

{/* display on bigger screen  */}
      <div className="hideon400px">
        <input
          className="searchinput"
          onChange={(e) => seSearchedText(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search"
        />
        <button onClick={handleSearch} className="searchbutton">
          <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
        </button>
      </div>


      {/* usermenu and create channel  */}

      {isAuthenticated ? (
        user.channelCreated ? (
          ""
        ) : (
          <div onClick={toggleChannelMenu} className="create-channel pointer">
            <i className="fa-solid fa-plus fa-lg"></i> <span className="hideon400px">Create Channel </span>
          </div>
        )
      ) : (
        ""
      )}

      {channelMenu ? (
        <div className="channel-Modal">
          <div className="channeluserlogo">
            <p>
              <i className="fa-solid fa-user fa-2xl"></i>
            </p>
          </div>
          <h2>Create a Channel</h2>
          <form onSubmit={handleCreateChannel}>
            <input
              type="text"
              placeholder="Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Channel Handle"
              value={channelHandle}
              onChange={(e) => setChannelHandle(e.target.value)}
              pattern="^\S*$"  // No spaces allowed
              title="Spaces are not allowed in the channel handle"
              required
            />
            <button type="submit" className="createchannelbutton">
              Create Channel
            </button>
            <button className="cancelbutton" onClick={toggleChannelMenu}>
              Cancel
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      ) : (
        ""
      )}

      {isAuthenticated ? (
        <div>
          <div className="namelogo" onClick={toggleUserMenu}>
            {" "}
            {user && user.fullname
              ? user.fullname.charAt(0).toUpperCase()
              : "U"}
          </div>
          {isUserMenuOpen ? (
            <div className="usermodal">
              <div className="email-name">
                <div>
                  <p className="namelogomodal">
                    {" "}
                    {user && user.fullname
                      ? user.fullname.charAt(0).toUpperCase()
                      : "U"}
                  </p>{" "}
                </div>
                <div>
                  <p>{user.fullname}</p>
                  <p>@{user.username}</p>
                  {user.channelCreated ? (
                    <Link to={`/channel/${user.channel}`}>
                      <p onClick={toggleUserMenu}>View your channel</p>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="usermodal-content">
                <div className="user-menu-items">
                  <p onClick={handleLogout} className=" bbuser">
                    <i className="fa-solid fa-arrow-right-from-bracket fa-xl mlr-15"></i>
                    Sign Out
                  </p>
                  <p>
                    <i className="fa-brands fa-youtube red fa-lg mlr-15"></i>
                    Youtube Studio
                  </p>
                  <p className="bbuser">
                    <i className="fa-solid fa-dollar fa-lg mlr-15"></i>Purchases
                    and memberships
                  </p>
                  <p>
                    <i className="fa-solid fa-file-shield fa-lg  mlr-15"></i>
                    Your Data in Youtube
                  </p>
                  <p>
                    <i className="fa-solid fa-moon fa-lg  mlr-15"></i>Appearance
                    : Light
                  </p>
                  <p>
                    <i className="fa-solid fa-language fa-lg  mlr-15"></i>
                    Language : English
                  </p>
                  <p>
                    <i className="fa-solid fa-globe fa-lg  mlr-15"></i>Location
                    : India
                  </p>
                  <p className="bbuser">
                    <i className="fa-solid fa-keyboard fa-lg mlr-15"></i>
                    Keyboard Shortcuts
                  </p>
                  <p className="bbuser">
                    <i className="fa-solid fa-gear fa-lg mlr-15"></i> Settings
                  </p>
                  <p>
                    <i className="fa-solid fa-question fa-lg mlr-15"></i>Help
                  </p>
                  <p>
                    <i className="fa-regular fa-message fa-lg mlr-15"></i>Send
                    Feedback
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Link to="/login">
          <div className="signin">
            {" "}
            <i className="fa-regular fa-user  mlr-10"></i>Sign in{" "}
          </div>
        </Link>
      )}

      {/* display on smaller screen  */}

      <div className="hideonBig">
        <div className="smallscreen-search">
        <input
          className="searchinput"
          onChange={(e) => seSearchedText(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search"
        />
        <button onClick={handleSearch} className="searchbutton">
          <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
        </button>
        </div>
      </div>

    </div>
  );
}

export default Header;
