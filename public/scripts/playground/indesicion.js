// babel src/app.js --out-file=scripts/app.js --presets=env,react --watch

const app = {
    title: 'React App',
    subtitle: 'By TrueProger',
    options: []
};

const root = document.getElementById('app');

const formSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;

    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';
    }

    render();

};

const removeAll = () => {
    app.options = [];
    render();
};

const makeDesicion = () => {
    const random = Math.floor(Math.random() * app.options.length);
    console.log(app.options[random]);

};

const render = () => {
    let id = 0;
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'options' : 'no options'}</p>
            <button disabled={app.options.length === 0} onClick={makeDesicion}>Make desicion!</button>
            <ol>
                {
                    app.options.map( (option) => <li key={option}>Number: {option}</li>)
                }
            </ol>
            <button onClick={removeAll}>removeAll</button>
            <br/>
            <br/>
            <form onSubmit={formSubmit}>
                <input type="text" name="option"/>
                <button>Add option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, root);

};

render();






