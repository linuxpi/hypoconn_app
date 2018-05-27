export function login(data) {
    return fetch('http://127.0.0.1:8000/users/login/',
        {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
}


