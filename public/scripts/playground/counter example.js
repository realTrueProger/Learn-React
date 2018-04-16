class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            count: 0
        };
    }

    plus() {
        this.setState((last) => {
            return {
                count: last.count + 1
            }
        })
    }

    minus() {
        this.setState((last) => {
            return {
                count: last.count - 1
            }
        })
    }

    reset() {
        this.setState(() => {
            return {
                count: 0
            }
        })
    }

    componentDidMount() {
        const count = parseInt(localStorage.getItem('count'));
        this.setState( () => ({count}));
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.plus}>+1</button>
                <button onClick={this.minus}>-1</button>
                <button onClick={this.reset}>reset</button>
            </div>
        );
    }
}


ReactDOM.render(<Counter/>, document.getElementById('app'));





// class Counter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.plus = this.plus.bind(this);
//         this.minus = this.minus.bind(this);
//         this.reset = this.reset.bind(this);
//         this.state = {
//             count: 0
//         };
//     }
//
//     plus() {
//         this.setState((last) => {
//             return {
//                 count: last.count + 1
//             }
//         })
//     }
//
//     minus() {
//         this.setState((last) => {
//             return {
//                 count: last.count - 1
//             }
//         })
//     }
//
//     reset() {
//         this.setState(() => {
//             return {
//                 count: 0
//             }
//         })
//     }
//
//     render() {
//         return (
//             <div>
//                 <h1>Count: {this.state.count}</h1>
//                 <button onClick={this.plus}>+1</button>
//                 <button onClick={this.minus}>-1</button>
//                 <button onClick={this.reset}>reset</button>
//             </div>
//         );
//     }
// }
//
//
// ReactDOM.render(<Counter/>, document.getElementById('app'));




/*
let root = document.getElementById('app');

let count = 0;

const add = () => {
    count++;
    renderApp();
};
const sub = () => {
    count--;
    renderApp();
};
const reset = () => {
    count = 0;
    renderApp();
};



const renderApp = () => {
    const countTemplate = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={add}>+1</button>
            <button onClick={sub}>-1</button>
            <button onClick={reset}>reset</button>
        </div>
    );
    ReactDOM.render(countTemplate, root);
};

renderApp();*/
