const quizzes = [

    {
        id: '1',
        name: 'Quiz #1',
        description: 'Angular 8',
        participants: [
            {
                firstname: 'dario',
                lastname: 'porzio',
                token: 'sdasdasdasdaffasdretbssdasdasdasd'
            },
            {
                firstname: 'fabio',
                lastname: 'castano',
                token: 'oaisdoeusrfnuybwekdnkasdnerifvube'
            },
            {
                firstname: 'francesco',
                lastname: 'lucci',
                token: 'oaisdoetyuiojierbfasdasnverifvube'
            }
        ],
        questions: [
            {
                id: 'asd1',
                question: 'How do you output the variable v1 inside your template?',
                value: 10,
                answers: [
                    {
                        answer: 'ngModel: v1',
                        factor: 0
                    },
                    {
                        answer: '[ngModel]=v1',
                        factor: 0
                    },
                    {
                        answer: '{{v1}}',
                        factor: 1
                    },
                    {
                        answer: '[[v1]]',
                        factor: 0
                    }
                ]
            },
            {
                id: 'asd2',
                question: 'How do you bind a method to a click on a button?',
                value: 10,
                answers: [
                    {
                        answer: '(click)="myMethod"',
                        factor: 1
                    },
                    {
                        answer: 'onClick={myMethod}',
                        factor: 0
                    },
                    {
                        answer: '(click)=>{myMethod(click);}',
                        factor: 0
                    },
                    {
                        answer: 'myMethod.bind(this, click);',
                        factor: 0
                    },
                ]
            }
        ]
    },
    {
        id: '2',
        name: 'Quiz #2',
        description: 'React js',
        participants: [
            {
                firstname: 'dario',
                lastname: 'porzio',
                token: '1iausdiajsndkajbskdjbiuqiwjbisdbf'
            },
            {
                firstname: 'fabio',
                lastname: 'castano',
                token: 'idufc9w8eud6374uiqnws982y4f63g8ru'
            },
            {
                firstname: 'francesco',
                lastname: 'lucci',
                token: 'uqwd762376chuiuerbsutfx7enre9ùàòè'
            }
        ],
        questions: [
            {
                id: 'qwerty1',
                question: 'How do change your state in a class component?',
                value: 10,
                answers: [
                    {
                        answer: 'this.setState({newProps: newValue});',
                        factor: 1
                    },
                    {
                        answer: 'useState({...state, newProps: newValue})',
                        factor: 0
                    },
                    {
                        answer: 'this.state = newState',
                        factor: -1
                    },
                    {
                        answer: 'newState = {...this.state, newProps: newValue}',
                        factor: 0
                    }
                ]
            },
            {
                id: 'qwerty2',
                question: 'How do you create a state in a functional component?',
                value: 10,
                answers: [
                    {
                        answer: 'const state = setState(initialValue);',
                        factor: 0
                    },
                    {
                        answer: 'asdasdasdasdasd',
                        factor: 0
                    },
                    {
                        answer: 'const [myState, setMyState] = useState(initialValue);',
                        factor: 1
                    },
                    {
                        answer: 'asdasdasdasdasd',
                        factor: 0
                    }
                ]
            }
        ]
    }

];

export default quizzes;