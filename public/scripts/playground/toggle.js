class ToggleApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleButton = this.handleButton.bind(this);
        this.state = {
            visibility: false
        }
    }

    handleButton() {
        this.setState( (prevState) => {
            return {
                visibility: !prevState.visibility
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Toggle App</h1>
                <button onClick={this.handleButton}>Show/hide</button>
                <p>{this.state.visibility ? 'show' : ''}</p>
            </div>
        );
    }
}

ReactDOM.render(<ToggleApp />, document.getElementById('app'));