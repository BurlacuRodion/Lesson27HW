const root = document.getElementById('root');

function getList(todos, name) {
    const wrapper = document.createElement('div');
    const list = document.createElement('ul');
    const userName = document.createElement('p');

    userName.innerText = name

    todos.forEach((todos) => {
        const title = document.createElement('p');
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';

        title.innerText = todos.title;
        li.appendChild(title)

        if(todos.completed) {
            const icon = document.createElement('img')
            icon.src = './images/checked.png';
            icon.style.height = '16px';
            icon.style.width = '16px';

            li.appendChild(icon)
            li.style.textDecoration = 'line-through'

        }
        list.appendChild(li)
    });

    wrapper.appendChild(userName);
    wrapper.appendChild(list);

    root.appendChild(wrapper)
}

let usersUrl = 'https://jsonplaceholder.typicode.com/users';
let todos = 'https://jsonplaceholder.typicode.com/todos';

const getData = (url)=>{
    return fetch(url).then(res => res.json())
}

Promise.all([
    getData(usersUrl),
    getData(todos)
]).then(([users,todos])=>{
    users.forEach((user)=>{
        const todosList = todos.filter(todo => todo.userId === user.id)

        getList(todosList, user.name)
    })

})