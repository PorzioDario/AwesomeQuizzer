import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../axios';
import { urlQuizzerAPI } from '../../settings';

//import mockQuizzes from '../../QuizRepository';
import classes from './QuizList.module.css';

const QuizList = (props) => {
    const [mode, setMode] = useState('List');
    const [searchKeywords, setSearchKeywords] = useState('');

    const [quizList, setQuizList] = useState([]);

    let newQuizButtonClasses = [classes.command, 'btn', 'btn-secondary'];
    let cardButtonClasses = [...newQuizButtonClasses];
    let listButtonClasses = [...newQuizButtonClasses];
    let listRender = null;

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

    const onQuizzDelete = (quizzId) => {
        axios.delete('/quizz/'+ quizzId)
            .then(res => {
                setQuizList(quizList.filter(q => q.id !== quizzId));
            })
            .catch(err => {
                alert('Something went wrong.\n'+err.message);
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
                <button className={newQuizButtonClasses.join(' ')} > { /* routerLink="/contacts/new-contact" */}
                    <i className="fas fa-plus"></i> New Quiz
                </button>
                <div className={classes.command + " " + classes.searchBox}>
                    <p><i className="fas fa-search"></i> Filter:</p>
                    <input value={searchKeywords} onChange={event => setSearchKeywords(event.target.value)} placeholder="search" />
                </div>
            </div>

            {listRender}

            {pagination}

        </React.Fragment>
    );
}

export default withRouter(QuizList);