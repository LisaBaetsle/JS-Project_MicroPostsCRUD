import { http } from './http';
import { ui } from './ui';

// Get posts on DOMload
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Lister for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

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

// Delete post
function deletePost(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure you want to delete?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}