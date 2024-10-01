import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import "./JournalForm.css"
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import { UserContext } from "../../context/user.context";



function JournalForm({ onSubmit, data, onDelete }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext)

	const focusError = (isValid) => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.postRef:
				postRef.current.focus();
				break;
		}
	}

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR' })
			dispatchForm({ type: 'SET_VALUE', payload: { userId } })
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...data } })
	}, [data])

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title)
			focusError(isValid)
		timerId = setTimeout(() => {
			dispatchForm({ type: 'RESET_VALIDITY' })
		}, 2000);
		return () => {
			clearTimeout(timerId);
		}
	}, [isValid])

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values)
		}
	}, [isFormReadyToSubmit, values])

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } })
	}, [userId])

	const onChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } })
	}

	const addJournalItem = (e) => {
		e.preventDefault()
		dispatchForm({ type: 'SUBMIT' })
	}

	const deleteJournalItem = () => {
		onDelete(data.id)
		dispatchForm({ type: 'CLEAR' })
		dispatchForm({ type: 'SET_VALUE', payload: { userId } })
	}

	return (

		<>
			<form className="JournalForm" onSubmit={addJournalItem}>
				<div className="form-row">
					<input type="text" ref={titleRef} name="title" onChange={onChange} value={values.title} className={`input-title ${isValid.title ? "" : "invalid"}`} />
					{data?.id && <button className="form-delete" type="button" onClick={deleteJournalItem}>-</button>}
				</div>
				<div className="form-row">
					<label htmlFor="date" className="form-label" >
						<img src="./date.svg" alt="Иконка каледаря" />
						<span>Дата</span>
					</label>
					<input type="date" ref={dateRef} name="date" onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} id="date" className={`input ${isValid.date ? "" : "invalid"}`} />
				</div>
				<div className="form-row">
					<label htmlFor="tag" className="form-label" >
						<img src="./media.svg" alt="Иконка папки" />
						<span>Метки</span>
					</label>
					<input type="text " name="tag" onChange={onChange} value={values.tag} id="tag" className="input" />
				</div>

				<textarea ref={postRef} name="post" onChange={onChange} value={values.post} className={`input-text ${isValid.post ? "" : "invalid"}`}  > </textarea>
				<Button text="Сохранить" />
			</form>
		</>
	)
}

export default JournalForm