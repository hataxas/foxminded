class DataService {
  _apiBase = 'https://jsonplaceholder.typicode.com';

  async getResourse(path) {
    const res = await fetch(`${this._apiBase}${path}`);
    if(!res.ok) {
      throw new Error(`Could not fetch ${path} , received ${res.status}`);
    }
    return await res.json();
  }

  async getPosts() {
    return await this.getResourse(`/posts`);
  }

  async getPostsByUserId(userId) {
    let posts = await this.getResourse(`/posts`);
    posts = posts.filter((post) => post.userId == userId);
    return posts;
  }

  async getTodos() {
    return await this.getResourse(`/todos`);
  }

  async getTodosByUserId(userId) {
    let todos = await this.getResourse(`/todos`);
    todos = todos.filter((todo) => todo.userId == userId);
    return todos;
  }

  async getUsers() {
    return await this.getResourse(`/users`);
  }

  async createResourse(path, data) {
    const res = await fetch(`${this._apiBase}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if(!res.ok) {
      throw new Error(`Could not update ${path} , received ${res.status}`);
    }
    return await res.json();
  }

  async createPost(postData) {
    return await this.createResourse(`/posts`, postData);
  }
}

const dataService = new DataService();

export default dataService;
