class App {
  //setup the class and get values of the userForm
  constructor() {
    this.users = [];
    document.getElementById("userForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.addUser({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      });
    });
  }

  //load users from the database
  init() {
    this.request("GET", "users").then((res) => {
      this.users = res;
      this.render();
    });
  }

  //reciev the user from the form and load apiKey from the local storage, if apiKey doesnt exist, an a unauthorized message is reciev from the backend
  addUser(user) {
    document.getElementById("users").appendChild(this.createUserElement(user));

    const dataToSend = { ...user, apiKey: localStorage.getItem("auth") };

    this.request("POST", "user", dataToSend).then((response) => {
      console.log(response);
    });
    this.users.push(user);
  }

  //delete method
  deleteUser(user) {
    //first remove in the front-end
    let index = this.users.map((user) => user.id).indexOf(user.id);
    this.users.splice(index, 1);

    //before delete in the database
    this.request("DELETE", "user", user).then((response) => {
      console.log(response);
    });
  }

  //render new user element in the ul and delete user
  createUserElement(user) {
    let el = document.createElement("li");
    el.className = "li";
    el.innerHTML = `
          <div>
              <a href="#" class="remove">&times;</a>
              <span class="title">${user.username}</span>
          </div>
      `;
    el.querySelector("a").addEventListener("click", (e) => {
      e.preventDefault();
      this.deleteUser(user);
      el.remove();
    });

    return el;
  }
  //render users
  render() {
    let fragment = document.createDocumentFragment();
    for (let user of this.users) {
      fragment.appendChild(this.createUserElement(user));
    }
    let el = document.getElementById("users");
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(fragment);
  }

  //method for make api request, data in the body is optionality
  request(method, endPoint, data = null) {
    //return a promise at contain
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, `http://localhost:8080/${endPoint}`, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => {
        if (xhr.status === 200) {
          return resolve(JSON.parse(xhr.responseText || "{}"));
        } else {
          return reject(new Error(`Request failed with status ${xhr.status}`));
        }
      };
      if (data) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  }
}

//load the class and init the values from the database
let app = new App();
app.init();
