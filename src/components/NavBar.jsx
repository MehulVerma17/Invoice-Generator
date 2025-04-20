import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">Invoice Generator</div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <a href="https://github.com/MehulVerma17">
                    GitHub
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                            3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
                            0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 
                            1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.467-1.334-5.467-5.93 
                            0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
                            0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013 0c2.28-1.552 
                            3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 
                            1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 
                            5.92.42.36.81 1.096.81 2.215 0 1.6-.015 2.89-.015 
                            3.286 0 .315.21.69.825.57C20.565 22.092 24 
                            17.592 24 12.297c0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/mehul-verma-b7a333246/">
                    LinkedIn
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path
                        d="M20.447 20.452H17.21V14.8c0-1.345-.025-3.077-1.877-3.077-1.878 0-2.165 1.464-2.165 
                            2.975v5.753H9.021V9h3.104v1.561h.045c.433-.82 
                            1.494-1.683 3.073-1.683 3.289 0 3.894 2.165 
                            3.894 4.977v6.597zM5.337 7.433a1.804 1.804 
                            0 01-1.8-1.805c0-.995.807-1.805 
                            1.8-1.805.994 0 1.8.81 1.8 1.805 0 
                            .998-.806 1.805-1.8 1.805zM6.89 
                            20.452H3.78V9h3.11v11.452zM22.225 
                            0H1.771C.792 0 0 .774 0 1.723v20.554C0 
                            23.227.792 24 1.771 24h20.451C23.2 24 24 
                            23.227 24 22.277V1.723C24 .774 23.2 
                            0 22.222 0h.003z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              {/* <a>Sign In</a> */}
              <a href="https://github.com/MehulVerma17">
                GitHub{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                            3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
                            0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 
                            1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.467-1.334-5.467-5.93 
                            0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
                            0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013 0c2.28-1.552 
                            3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 
                            1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 
                            5.92.42.36.81 1.096.81 2.215 0 1.6-.015 2.89-.015 
                            3.286 0 .315.21.69.825.57C20.565 22.092 24 
                            17.592 24 12.297c0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mehul-verma-b7a333246/">
                LinkedIn
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path
                    d="M20.447 20.452H17.21V14.8c0-1.345-.025-3.077-1.877-3.077-1.878 0-2.165 1.464-2.165 
                            2.975v5.753H9.021V9h3.104v1.561h.045c.433-.82 
                            1.494-1.683 3.073-1.683 3.289 0 3.894 2.165 
                            3.894 4.977v6.597zM5.337 7.433a1.804 1.804 
                            0 01-1.8-1.805c0-.995.807-1.805 
                            1.8-1.805.994 0 1.8.81 1.8 1.805 0 
                            .998-.806 1.805-1.8 1.805zM6.89 
                            20.452H3.78V9h3.11v11.452zM22.225 
                            0H1.771C.792 0 0 .774 0 1.723v20.554C0 
                            23.227.792 24 1.771 24h20.451C23.2 24 24 
                            23.227 24 22.277V1.723C24 .774 23.2 
                            0 22.222 0h.003z"
                  />
                </svg>
              </a>
              {/* <a>Sign Up</a> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
