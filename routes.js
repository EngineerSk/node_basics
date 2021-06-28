const requestHandler = (request, response) => {
    if(request.url === '/'){
        response.write("<html>");
        response.write("<head><meta charset='utf-8'></head>");
        response.write("<body><form action='/create-user' method='POST'><input type='text' name='users'><button type='submit'>Add user</button></form></body>");
        response.write("</html>");
        return response.end();
    }

    if(request.url === '/create-user' && request.method === 'POST'){
        const body = [];
        request.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return request.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
            response.statusCode = 302;
            response.setHeader('Location','/users');
            return response.end();
        });
    }

    if(request.url === '/users'){
        response.write("<html>");
        response.write("<head><meta charset='utf-8'></head>");
        response.write("<body><ul><li>user 1</li><li>user 2</li><li>user 3</li><li>user 4</li></ul></body>");
        response.write("</html>");
        return response.end();
    }
    response.setHeader('Content_Type', 'text/html');
    response.write("<html>");
    response.write("<head><meta charset='utf-8'></head>");
    response.write("<body><h1>Hello!!! This is a practice app of Node.JS Basics</h1></body>");
    response.write("</html>");
    response.end();
};

module.exports = {
    handler: requestHandler
};