export function login(data) {
    return fetch('http://localhost:8080/hypoconn/login',
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(res => res.json()).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(response);
            }
        });
}


