import React, { useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import gsap from 'gsap';
const SidebarNav = props => {
  let sidebarMenu = useRef(null);
  let sidebarMenuOverlay = useRef(null);
  let menuLayer = useRef(null);
  const menuTimeline = useRef();

  const { menuState, setMenuState } = props;

  useEffect(() => {
    menuTimeline.current = gsap.timeline({ paused: true });
    menuTimeline.current.fromTo(
      [sidebarMenuOverlay, menuLayer, sidebarMenu],
      {
        duration: 0,
        x: '100%'
      },
      {
        duration: 0.75,
        x: '0%',
        ease: 'power3.inOut',
        stagger: {
          amount: 0.5
        }
      }
    );
  }, []);

  useEffect(() => {
    menuState ? menuTimeline.current.play() : menuTimeline.current.reverse();
  }, [menuState]);

  useEffect(() => {
    const { history } = props;
    history.listen(() => setMenuState(false));
  });

  return (
    <>
      <div
        className="sidebarNavigationOverlay"
        ref={el => (sidebarMenuOverlay = el)}
        onClick={() => setMenuState(false)}
      ></div>
      <div className="menu-wrapper">
        <div className="menu-layer" ref={el => (menuLayer = el)}></div>
        <nav className="sidebarNavigation" ref={el => (sidebarMenu = el)}>
          <div className="sidebar-top">
            <div className="links-wrapper">
              <Link className="menu-link" to="/">
                Home
              </Link>
              <Link className="menu-link" to="/videolinkupload">
                Video Link Upload
              </Link>
              <Link className="menu-link" to="/summary">
                Summary
              </Link>
              <Link className="menu-link" to="/mcq">
                MCQ
              </Link>
              <Link className="menu-link" to="/search">
                Search
              </Link>
            </div>
          </div>
          {/* <div className="sidebar-bottom">
            <ul className="extra-links">
              <li className="link-item">
                <div className="link-title">Email</div>
                <a href="mailto:example@gmail.com">example@gmail.com</a>
              </li>
              <li className="link-item">
                <div className="link-title">Find Us</div>
                <span>57, Arch Road</span>
                <span>Middleton</span>
              </li>
              <li className="link-item">
                <div className="link-title">Social Media</div>
                <div className="social-media-links">
                  <a href="www.twitter.com" className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="www.facebook.com" className="social-link">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="www.google.com" className="social-link">
                    <i className="fab fa-google"></i>
                  </a>
                </div>
              </li>
              <li className="link-item">
                <div className="link-title">Phone</div>
                <span>000-000-0000</span>
              </li>
            </ul>
          </div> */}
        </nav>
      </div>
    </>
  );
};
export default withRouter(SidebarNav);
