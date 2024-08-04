import "./Button.css"
// import { useState } from "react"
function Button({text, onClick}) {
// const [text,setText]=useState("Save")
// const clicked=()=>{
// 	setText("Close")
// 	console.log("Hello")
// onClick={clicked}}

	return (

		<button  className="button accent" onClick={onClick}>{text}</button>

	)
}

export default Button


