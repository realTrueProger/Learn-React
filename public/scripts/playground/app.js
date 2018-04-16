class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteState = this.handleDeleteState.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            options: props.options
        }
    }

    handleDeleteState() {
        this.setState(() => ({options: []}));
    }

    handleDeleteOption(option) {
        this.setState((prevState) => ({
            options: prevState.options.filter((opt) => opt !== option)
        }));
    }

    handleRandom() {
        const random = Math.floor(Math.random() * this.state.options.length);
        console.log(this.state.options[random]);
    }

    handleAdd(option) {
        if (!option) {
            return 'no option';
        }

        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) {
                this.setState( () => ({options}));
            }
        } catch(e) {
          // nothing here
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    render() {
        const subTitle = 'Indesicion App controls you!';

        return (
            <div>
                <Header
                    subTitle={subTitle}
                />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handleRandom={this.handleRandom}
                />
                <Options
                    options={this.state.options}
                    handleDeleteState={this.handleDeleteState}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAdd={this.handleAdd}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indesicion App by TrueProger'
};


const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handleRandom}
                disabled={!props.hasOptions}
            >
                What to do?
            </button>
        </div>
    );
};


const Options = (props) => {
    return (
        <div>
            <p>Options count: {props.options.length}</p>
            <button onClick={props.handleDeleteState}>Remove All</button>
            <ol>
                {props.options.map((option) =>
                    <Option
                        key={option}
                        text={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />)}
            </ol>
        </div>
    );
};


const Option = (props) => {
    return (
        <li>
            {props.text}
            <button onClick={(e) => {
                props.handleDeleteOption(props.text);
            }
            }>remove
            </button>
        </li>
    );
};


class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        e.target.elements.option.value = '';
        const error = this.props.handleAdd(option);
        this.setState(() => ({error}));
    }

    render() {
        return (
            <div>
                {this.state.error && <p>There is an error: {this.state.error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));
