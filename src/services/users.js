export function login(data) {
    return fetch('http://192.168.1.50:8001/users/login/',
        {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
}


