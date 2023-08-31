
import { SidebarAccount } from 'widgets/Profile'
import {bodyProfile} from './Profile.module.scss'

export const ProfilePage = () => {
	return(
		<div className={bodyProfile}>
			<SidebarAccount />

			<div></div>
		</div>
	)
}