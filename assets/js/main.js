const getAllUserData = async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    
    const [
        users, 
        postsRes, 
        commentsRes, 
        albumsRes, 
        photosRes, 
        todosRes
    ] = await Promise.all([
        fetch(`${baseUrl}/users`),
        fetch(`${baseUrl}/posts`),
        fetch(`${baseUrl}/comments`),
        fetch(`${baseUrl}/albums`),
        fetch(`${baseUrl}/photos`),
        fetch(`${baseUrl}/todos`)
    ]);
    
    const [usersData, posts, comments, albums, photos, todos] = await Promise.all([
        users.json(),
        postsRes.json(),
        commentsRes.json(),
        albumsRes.json(),
        photosRes.json(),
        todosRes.json()
    ]);
    // console.log({ users: usersData, posts, comments, albums, photos, todos })
    
    return { users: usersData, posts, comments, albums, photos, todos };
};

const getUserStatsRow = (user, posts, comments, albums, photos, todos) => {
    // Post Count
    const postCount = posts.filter(p => p.userId === user.id).length;
    
    // User Albums Count  
    const albumCount = albums.filter(a => a.userId === user.id).length;
    
    // Comment Count (on user's posts)
    const userPostIds = posts.filter(p => p.userId === user.id).map(p => p.id);
    const commentCount = comments.filter(c => userPostIds.includes(c.postId)).length;
    
    // Photo Count (in user's albums)
    const userAlbumIds = albums.filter(a => a.userId === user.id).map(a => a.id);
    const photoCount = photos.filter(ph => userAlbumIds.includes(ph.albumId)).length;
    
    // Todo counts
    const userTodos = todos.filter(t => t.userId === user.id);
    const completedTodos = userTodos.filter(t => t.completed).length;
    const incompleteTodos = userTodos.filter(t => !t.completed).length;
    
    // console.log(
    //     `
    //     <tr>
    //         <td>${user.id}</td>
    //         <td>${user.name}</td>
    //         <td>${postCount}</td>
    //         <td>${commentCount}</td>
    //         <td>${albumCount}</td>
    //         <td>${photoCount}</td>
    //         <td>${completedTodos}</td>
    //         <td>${incompleteTodos}</td>
    //     </tr>
    // `
    // )

    return `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${postCount}</td>
            <td>${commentCount}</td>
            <td>${albumCount}</td>
            <td>${photoCount}</td>
            <td>${completedTodos}</td>
            <td>${incompleteTodos}</td>
        </tr>
    `;
};

const usersRows = async () => {
    const { users, posts, comments, albums, photos, todos } = await getAllUserData();
    
    const header = `
        <thead>
            <tr>
                <th>ID</th>
                <th>User</th>
                <th>Post Count</th>
                <th>Comment Count</th>
                <th>User Albums Count</th>
                <th>Photo Count</th>
                <th>Completed Todos</th>
                <th>Not Completed Todos</th>
            </tr>
        </thead>
    `;
    
    let rows = header
    rows += users.map(user => getUserStatsRow(user, posts, comments, albums, photos, todos)).join('');
    return rows
};

usersRows()
.then(html => {
    let table = new DataTable('#users');
    document.getElementById("users").innerHTML = html
  })



