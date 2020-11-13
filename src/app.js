import { http } from './http';
import { ui } from './ui';

// Get posts on DOMload
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
};

// submit post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#title').value;

  const data = {
    title: title,
    body: body
  };

  // Create post
  http.post('http://localhost:3000/posts', data)
    .then(date => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err))
}