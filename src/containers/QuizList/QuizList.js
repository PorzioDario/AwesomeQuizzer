import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import { urlQuizzerAPI } from '../../settings';

//import mockQuizzes from '../../QuizRepository';
import classes from './QuizList.module.css';
import Modal from '../../hoc/Modal/Modal';

const QuizList = (props) => {
	const [mode, setMode] = useState('List');
	const [searchKeywords, setSearchKeywords] = useState('');
	const [modalState, setModalState] = useState({
		show: false,
		onClose: () => { },
		modality: 'Ok',
		content: null
	})

	const [quizName, setQuizName] = useState();
	const [quizDesc, setQuizDesc] = useState();
	const [quizDuration, setQuizDuration] = useState();

	const [quizList, setQuizList] = useState([]);

	let newQuizButtonClasses = [classes.command, 'btn', 'btn-secondary'];
	let cardButtonClasses = [...newQuizButtonClasses];
	let listButtonClasses = [...newQuizButtonClasses];
	let listRender = null;

	let modal = null;

	useEffect(() => {
		const quizzes = [];

		axios.get(urlQuizzerAPI + 'quizz')
			.then(response => {
				Object.entries(response.data).forEach(([objKey, objContent]) => {
					quizzes.push(objContent);
				});

				setQuizList(quizzes.map(q => {
					return {
						id: q.id,
						name: q.name,
						description: q.description,
						participants: 3 //q.participants.length
					};
				}));
			})
			.catch(error => {
				console.log(error);
			});

	}, []);

	const onQuizzClick = (quizzId) => {
		props.history.push('/quizz/' + quizzId);
	}

	const addNewQuiz = () => {
		axios.post('/quizz/', {
			name: quizName,
			description: quizDesc,
			duration: quizDuration
		})
			.then(res => {
				onQuizzClick(res.data.id);
			})
			.catch(err => {
				alert('Something went wrong.\n' + err.message);
			});
	};

	const onNewQuizClick = () => {
		setModalState({
			show: true,
			modality: 'CancelConfirm',
			onClose: (button) => {
				if (button === 'Confirm') {
					addNewQuiz();	
				} else {
					// chiusura modal
					setModalState({
						...modalState,
						show: false
					});
				}
			},
			content:
				<form className="my-5 p-3" >
					<div className="form-group">
						<label htmlFor="QuizName">Quiz Name</label>
						<input
							type="text"
							className="form-control"
							id="quizName"
							value={quizName}
							onChange={event => setQuizName(event.target.value)}
							aria-describedby="emailHelp"
							placeholder="Enter a Name" />
					</div>
					<div className="form-group">
						<label htmlFor="QuizName">Quiz Description</label>
						<input
							type="text"
							className="form-control"
							id="quizDesc"
							value={quizDesc}
							onChange={event => setQuizDesc(event.target.value)}
							placeholder="Enter a description" />
					</div>
					<div className="form-group">
						<label htmlFor="QuizName">Quiz Duration</label>
						<input
							type="number"
							className="form-control"
							id="quizDuration"
							value={quizDuration}
							onChange={event => setQuizDuration(event.target.value)}
							placeholder="Enter a duration in minutes" />
					</div>
				</form>
		});
	}

	const onQuizzDelete = (quizzId) => {
		setModalState({
			show: true,
			modality: 'CancelConfirm',
			onClose: (button) => {
				if (button === 'Confirm') {
					axios.delete('/quizz/' + quizzId)
						.then(res => {
							setQuizList(quizList.filter(q => q.id !== quizzId));
						})
						.catch(err => {
							alert('Something went wrong.\n' + err.message);
						});
				}

				// chiusura modal
				setModalState({
					...modalState,
					show: false
				});
			},
			content: <React.Fragment>
				<p>Are you sure to delete this quiz?</p>
			</React.Fragment>
		});
	};

	if (mode === 'Card') {
		cardButtonClasses.push('active');

		listRender = <p>Not Supported Yet!</p>;
	} else if (mode === 'List') {
		listButtonClasses.push('active');

		listRender = <div className="p-4">
			<table className="table table-hover" >
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Quiz Name</th>
						<th scope="col">Quiz Description</th>
						<th scope="col">Partecipants</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{quizList.map((item, index) => <tr style={{ cursor: 'pointer' }} key={item.id} onDoubleClick={() => onQuizzClick(item.id)}>
						<th scope="row">{index}</th>
						<td>{item.name}</td>
						<td>{item.description}</td>
						<td>{item.participants}</td>
						<td><button onClick={() => onQuizzDelete(item.id)} className="btn btn-danger"><i className="fas fa-trash"></i></button></td>
					</tr>)}
				</tbody>
			</table>
		</div>;
	}

	let pagination = null;
	if (quizList.filter(() => true).length > 10) {
		pagination = "too many...";
	}

	return (
		<React.Fragment>

			<p className="h1 ml-5"><i className="fas fa-users"></i> Quiz list</p>

			<div className={classes.commandsBar + " mt-4"}>
				{/* <button className={cardButtonClasses.join(' ')} onClick={() => setMode('Card')} >
					<i className="fas fa-th"></i> Card View
				</button>
				<button className={listButtonClasses.join(' ')} onClick={() => setMode('List')} >
					<i className="fas fa-bars"></i> List View
				</button> */}
				<button className={newQuizButtonClasses.join(' ')} onClick={onNewQuizClick} > { /* routerLink="/contacts/new-contact" */}
					<i className="fas fa-plus"></i> New Quiz
				</button>
				<div className={classes.command + " " + classes.searchBox}>
					<p><i className="fas fa-search"></i> Filter:</p>
					<input value={searchKeywords} onChange={event => setSearchKeywords(event.target.value)} placeholder="search" />
				</div>
			</div>

			{listRender}

			{pagination}

			<Modal showModal={modalState.show} modality={modalState.modality} closeModal={modalState.onClose}>
				{modalState.content}
			</Modal>

		</React.Fragment>
	);
}

export default withRouter(QuizList);