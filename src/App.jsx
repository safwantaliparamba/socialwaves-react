import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './assets/css/style.css';
import useApi from './components/hooks/useApi';
import { editUserData } from './store/authSlice';
import MainRouter from './components/routers/router/MainRouter';
import SessionExpired from './components/modals/auth/SessionExpired';
import { pushState } from './store/uiSlice';
import { useLocation } from 'react-router-dom';

export const ENV = import.meta.env

const App = () => {
	// hooks
	const dispatch = useDispatch()
	const location = useLocation()
	const { api, controller } = useApi(true)
	// global state
	const { isAuthenticated, activeIndex } = useSelector(state => state?.auth)
	// local state
	const [isSessionExpired, setExpired] = useState(false)
	// functions
	const validateUser = () => {
		api
			.get('/accounts/app/')
			.then(res => {
				const { statusCode, data } = res.data

				if (statusCode === 6000) {
					dispatch(editUserData({
						name: data.name,
						email: data.email,
						image: data.image,
						username: data.username,
						isProMember: data.is_pro_member,
						bookmarkCount: data.bookmark_count,
						notificationCount: data.notification_count,
					}))
				} else {
					setExpired(true)
				}
			})
			.catch(e => {
				if (e?.response?.status === 401) {
					setExpired(true)
				}
			})
	}

	useEffect(() => {
		const authURLS = ['/sign-in', '/sign-up', '/sign-in/', '/sign-up/',]

		if (isAuthenticated && !authURLS.includes(location.pathname.toLowerCase())) validateUser()

		return () => {
			controller.abort()
		}
	}, [activeIndex])

	useEffect(() => {
		dispatch(pushState(location.pathname))
		
	}, [location.pathname])

	return (
		<>
			{isSessionExpired &&
				<SessionExpired
					closeHandler={() => setExpired(false)}
				/>
			}
			<ToastContainer
				position="bottom-left"
				autoClose="4500"
				hideProgressBar={true}
				newestOnTop={false}
				rtl={false}
				pauseOnHover
				theme="dark"
			/>
			<MainRouter />
		</>
	)
}

export default App