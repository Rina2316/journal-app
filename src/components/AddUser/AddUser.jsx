import { useEffect, useState } from "react"
import Button from "../Button/Button"

function AddUser() {
	const [userName, setUserName] = useState('')
	const [users, setUsers] = useState([])

	useEffect(() => {
		if (localStorage.getItem('users')) {
			setUsers(JSON.parse(localStorage.getItem('users')))
		}
	}, [])

	const userNameChange = (e) => {
		setUserName(e?.target?.value)
	}

	const handleCreateUser = () => {
		const userId = Math.max(users.map((el) => el.userId)) + 1
		const newUser = {
			userId,
			name: userName,
		}
		const res = [...users]
		res.push(newUser)
		setUsers(res)
		localStorage.setItem('users', JSON.stringify(res))
	}

	return <>
		<input type="text" placeholder="Имя пользовтеля" onChange={userNameChange} />
		<Button text={'Создать пользователя'} onClick={handleCreateUser}></Button>
	</>
}

export default AddUser