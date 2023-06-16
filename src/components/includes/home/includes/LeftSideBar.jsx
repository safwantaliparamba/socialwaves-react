import { useMemo, useState } from "react"

import { useSelector } from "react-redux"
import { styled } from "styled-components"
import { nanoid } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"

import Logo from "../../Logo"
import SilentLink from "../../SilentLink"
import homeDark from "/icons/home-dark.svg"
import homeLight from "/icons/home-light.svg"
import profile from "/images/profile-demo.jpg"
import logoutRed from "/icons/logout-red.svg"
import premiumGold from "/icons/premium-gold.svg"
import exploreDark from "/icons/explore-dark.svg"
import exploreLight from "/icons/explore-light.svg"
import dropdownDark from "/icons/dropdown-dark.svg"
import dropdownLigh from "/icons/dropdown-light.svg"
import settingsDark from "/icons/settings-dark.svg"
import settingsLight from "/icons/settings-light.svg"
import bookmarkDark from "/icons/bookmark-dark.svg"
import bookmarkLight from "/icons/bookmark-light.svg"
import analyticsDark from "/icons/analytics-dark.svg"
import analyticsLight from "/icons/analytics-light.svg"
import notificationDark from "/icons/notification-dark.svg"
import notificationLight from "/icons/notification-light.svg"
import { isPathnameEqual, trimText } from "../../../functions"
// import premiumLight from "/icons/premium-light.svg"
// import premiumDark from "/icons/premium-dark.svg"


const LeftSideBar = ({ }) => {
    // global states //
    const { theme } = useSelector(state => state.ui)
    const { username, isProMember } = useSelector(state => state.auth)

    // Hooks //
    const navigate = useNavigate()

    // Local variables
    const buyPremiumHandler = () => {
        console.log("Buy premium");
    }

    const LogoutHandler = () => {
        console.log("logout");
    }

    const navItems = useMemo(() => (
        [
            {
                id: nanoid(),
                title: "Home",
                imgLight: homeLight,
                imgDark: homeDark,
                url: ""
            },
            {
                id: nanoid(),
                title: "Explore",
                imgLight: exploreLight,
                imgDark: exploreDark,
                url: '/explore'
            },
            {
                id: nanoid(),
                title: "Notifications",
                imgLight: notificationLight,
                imgDark: notificationDark,
                url: '/notification',
                hasCount: true,
                count: "99+"
            },
            {
                id: nanoid(),
                title: "Bookmarks",
                imgLight: bookmarkLight,
                imgDark: bookmarkDark,
                url: '/bookmarks',
                hasCount: true,
                count: 4
            },
            {
                id: nanoid(),
                title: "Analytics",
                imgLight: analyticsLight,
                imgDark: analyticsDark,
                url: '/analytics',
            },
            {
                id: nanoid(),
                title: "Settings",
                imgLight: settingsLight,
                imgDark: settingsDark,
                url: "/settings",
            },
        ]
    ), [])

    const bottomNavItems = useMemo(() => {
        const temp = [
            {
                id: nanoid(),
                title: "Logout",
                imgLight: logoutRed,
                imgDark: logoutRed,
                action: LogoutHandler,
                className: "logout",
            },
        ]

        if (!isProMember) {
            temp.unshift({
                id: nanoid(),
                title: "Buy Premium",
                imgLight: premiumGold,
                imgDark: premiumGold,
                action: buyPremiumHandler,
                className: "golden-btn",
            })
        }

        return temp

    }, [])


    return (
        <Container theme={theme}>
            <TopWrapper>
                <Head>
                    <SilentLink to="/">
                        <Logo />
                    </SilentLink>
                </Head>
                <Nav>
                    <Profile theme={theme}>
                        <div className="wrapper" onClick={e => navigate(`/${username}`)}>
                            <img className="profile" src={profile} alt="" />
                            <span>{trimText(username, 14)}</span>
                        </div>
                        <div className="dropdown-wrapper">
                            <img className="dropdown" src={theme === "DARK" ? dropdownLigh : dropdownDark} alt="" />
                        </div>
                    </Profile>
                    {
                        navItems.map(nav => (
                            <NavItem
                                key={nav.id}
                                className={isPathnameEqual(nav.url) ? "active" : ""}
                                theme={theme}
                                onClick={e => navigate(nav.url)}
                            >
                                <div className="wrapper">
                                    <div className="left">
                                        <img
                                            src={theme === "DARK" ? nav.imgLight : nav.imgDark}
                                            alt="icon"
                                        />
                                    </div>
                                    <span>{nav.title}</span>
                                </div>
                                {nav?.hasCount && (
                                    <span
                                        className="count"
                                    >
                                        {nav?.count}
                                    </span>
                                )}
                            </NavItem>
                        ))
                    }
                </Nav>
            </TopWrapper>
            <BottomWrapper>
                {
                    bottomNavItems.map(nav => (
                        <NavItem
                            key={nav.id}
                            className={[nav?.url ? (isPathnameEqual(nav?.url) ? "active " : " ") : " ", ` ${nav?.className}`]}
                            theme={theme}
                            onClick={e => nav?.action()}
                        >
                            <div className="wrapper">
                                <div className="left">
                                    <img
                                        src={theme === "DARK" ? nav.imgLight : nav.imgDark}
                                        alt="icon"
                                    />
                                </div>
                                <span>{nav.title}</span>
                            </div>
                        </NavItem>
                    ))
                }
            </BottomWrapper>
        </Container>
    )
}

export default LeftSideBar

const Container = styled.div`
    width: 20%;
    height: calc(100vh - 24px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 12px;
    border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"};
    /* border: 1px solid #222222; */
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.4s ease-in-out;
    padding: 28px 0;
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#fff"};
`

const Head = styled.header`
    padding: 28px 26px;
    padding-top: 0;
`

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 26px ;
    gap: 4px;
    user-select: none;
    margin-bottom: 24px;

    .wrapper{
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px;
        cursor: pointer;
        border: 1px solid transparent;

        /* &:hover{
            border-radius: 6px;
            border-color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
        } */
        
        img.profile{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }

        span{
            font-size: 16px;
            /* font-weight: 600; */
            color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"};
        }
    }

    div.dropdown-wrapper{
        width: 35px;
        height: 35px;
        /* padding: 12px; */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover{
            background: #8080801a;
            border: 1px solid ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
            border-radius: 20%;
            transition: border 0.3s ease-in-out;
        }
        img.dropdown{
            width: 14px ;
            display: inline-block;
        }

    }
`

const NavItem = styled.div`
    padding: 12px 0 ;
    margin: 0 26px;
    padding: 12px;
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    gap: 18px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.3s ease-in-out;
    border-radius: 8px;

    &:hover, 
    &.active{
        background: #8080801a;
        border-color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"};
    }


    &>.wrapper{
        margin: 0;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        gap: 18px;

        .left{
            img{
                width: 18px;
            }
        }
        span{
            font-size: 15px;
            color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"};
        }
    }

    span.count{
        font-size: 14px;
        // color: red;
        font-weight: 600;
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
    }

    &.active{
        span{
            font-weight: 600;
        }
    }
    &.golden-btn{
        span{
            color: rgb(120,50,5);
        }

        &:hover{
            background-size: 150% 150%;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23),
                        inset 0 -2px 5px 1px #b17d10,
                        inset 0 -1px 1px 3px rgba(250,227,133,1);
            border: 1px solid rgba(165,93,7,.6);
            background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
        }
    }
    &.logout{
        span{
            color: red;
            font-size: 14px;
        }
    }
`
const TopWrapper = styled.div`
    
`

const BottomWrapper = styled(Nav)`
    
`