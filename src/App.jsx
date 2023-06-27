import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import './assets/css/style.css';
import { editUserData } from './store/authSlice';
import useAuthApi from './components/hooks/useAuthApi';
import MainRouter from './components/routers/router/MainRouter';
import SessionExpired from './components/modals/auth/SessionExpired';


export const env = import.meta.env

const App = () => {
	// hooks
	const dispatch = useDispatch()
	const { authApi, controller } = useAuthApi()
	// global state
	const { isAuthenticated,activeIndex } = useSelector(state => state?.auth)
	// local state
	const [isSessionExpired, setExpired] = useState(false)

	// functions
	const validateUser = () => {
		authApi
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

	return (
		<>
			{isSessionExpired &&
				<SessionExpired
					closeHandler={() => setExpired(false)}
				/>
			}
			<MainRouter />
		</>
	)
}

export default App