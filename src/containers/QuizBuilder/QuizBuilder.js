import React, { Component } from 'react';
//import classes from './QuizBuilder.module.css';
import EditableName from '../../components/EditableName';
import TabsManager from '../../hoc/TabsManager';
import TabItem from '../../hoc/TabsManager/TabItem';
import QuizProperties from '../../components/QuizProperties/QuizProperties';

import axios from 'axios';

//import mockQuizzes from '../../QuizRepository';

class QuizBuilder extends Component {
    state = {
        name: "Quiz #1"
    };

    componentDidMount() {
        let quizz = null;
        const id = this.props.match.params.id;

        axios.get('https://quizbuilderapi.firebaseio.com/quizzes.json')
            .then(response => {
                quizz = Object.values(response.data).find(obj => obj.id === id);
                this.setState(quizz);
            })
            .catch(error => {
                console.log(error);
            });

    }

    changeNameHandler = (newName) => {
        let newState = {...this.state, name:newName};

        axios.put('https://quizbuilderapi.firebaseio.com/quizzes.json',newState);
        this.setState(newState);
    };

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            });
          }
    }

    render() {
        return (
            <React.Fragment>
                <EditableName name={this.state.name} nameChanged={this.changeNameHandler} />
                <div style={{height: '500px'}}>
                    <TabsManager>
                        <TabItem tabId="props" tabName="Properties"><QuizProperties /></TabItem>
                        <TabItem tabId="questions" tabName="Questions"><p>Questions</p></TabItem>
                        <TabItem tabId="enrolments" tabName="Partecipants"><p>Partecipants</p></TabItem>
                        <TabItem tabId="reports" tabName="Reports"><p>Reports</p></TabItem>
                    </TabsManager>
                </div>
            </React.Fragment>
        );
    }
}

export default QuizBuilder;