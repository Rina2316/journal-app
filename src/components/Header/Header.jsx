import SelectUser from "../../SelectUser/SelectUser"
import styles from "./Header.module.css"
function Header() {
	
	return (
		<>
			<><img className={styles} src="/logo.svg" alt="Logotype" /></>
			<SelectUser/>
	</>
	)
}

export default Header