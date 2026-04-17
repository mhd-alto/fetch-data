const getTodos = async (userId) =>{
    let userTodos = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    let userTodosData = await userTodos.json()
    return userTodosData; 
}

const getAlbumPhotos = async (albumId) =>{
    let UserAlbumPhotos = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    let UserAlbumPhotosData = await UserAlbumPhotos.json();
    return UserAlbumPhotosData;
}

const getUserAlbums = async (userId) =>{
    let UserAlbums = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    let UserAlbumsData = await UserAlbums.json();
    return UserAlbumsData;
}

const getPostComments = async (postId) =>{
    let postComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    let postCommentsData = await postComments.json();
    return postCommentsData;
}

const getUserPosts = async (userId) => {
    let userPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    let userPostsData = await userPosts.json();
    return userPostsData;
}   

const getUserData  = async() => {
    let users = await fetch("https://jsonplaceholder.typicode.com/users");
    let usersData = await users.json();
    return usersData;
}

const usersRows = () => {
    let Users = getUserData().map()
}

getUserData()