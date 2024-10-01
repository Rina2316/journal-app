import { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/user.context'

function SelectUser() {
	const [users, setUsers] = useState([])
	const { userId, setUserId } = useContext(UserContext)

	useEffect(() => {
		if (localStorage.getItem('users')) {
			setUsers(JSON.parse(localStorage.getItem('users')))
		}
	}, [])

	const changeUser = (e) => {
		setUserId(Number(e.target.value))
	}

	return (
		<>
			<select className="select" name="user" id="user" value={userId} onChange={changeUser} >
				{users.map((el) => <option key={el.userId} value={el.userId}>{el.name}</option>)}
			</select >
		</>
	)
}

export default SelectUser