document.getElementById('form-info').addEventListener('submit', saveUser);

function saveUser(e){
    let prenom = document.getElementById('prenom').value;
    let nom = document.getElementById('nom').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    let user = {
        prenom,
        nom,
        email,
        phone
    };

    if (localStorage.getItem('users') === null) {
        let users = [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        let users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };

    getUser();

    document.getElementById('form-info').reset();
    e.preventDefault();
}




function deleteUser(prenom) {

  let users = JSON.parse(localStorage.getItem('users'));
  for (let i = 0; i < users.length; i++) {
    if (users[i].prenom == prenom) {
        users.splice(i , 1);
    }
  }

  localStorage.setItem('users', JSON.stringify(users));
  getUser();
}



function editUser(prenom) {
    
    let users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        if (users[i].prenom == prenom) {
                document.getElementById('prenom').value = users[i].prenom;
                document.getElementById('nom').value = users[i].nom;
                document.getElementById('email').value = users[i].email;
                document.getElementById('phone').value = users[i].phone;
                document.getElementById('boutton').innerHTML = `<button type="click" class="btn btn-warning w-100" id="modif">Modifier</button>`;
            let modif = document.getElementById('modif');
            modif.addEventListener('click', function(){
                document.getElementById('boutton').innerHTML = `<button type="submit" class="btn btn-success w-100">Ajouter</button>`;
                document.getElementById('prenom').value = '';
                document.getElementById('nom').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phone').value = '';               
            
            })
        };
    }
    
    localStorage.setItem('users', JSON.stringify(users));
    getUser();
}


function getUser(){
    let users = JSON.parse(localStorage.getItem('users'));
    let usersView = document.getElementById('users');
    usersView.innerHTML = '';

    for(let i = 0 ; i < users.length ; i++){
        let prenom = users[i].prenom;
        let nom = users[i].nom;
        let email = users[i].email;
        let phone = users[i].phone;

        usersView.innerHTML +=     
        `<div class="carte d-flex justify-content-around bg-light border py-2">
            <div class="col w-100">
                <p>${prenom}</p>
            </div>
            <div class="col w-100">
                <p>${nom}</p>
            </div>
            <div class="col w-100">
                <p>${email}</p>
            </div>
            <div class="col w-100">
                <p>${phone}</p>
            </div>
            <div class="col w-100 d-flex justify-content-between actions">
                <div class="col">
                    <button type="submit" onclick="editUser('${prenom}')" class="btn btn-warning">Modifier</button>
                </div>
                <div class="col">
                    <button type="button" onclick="deleteUser('${prenom}')" class="btn btn-danger">Supprimer</button>
                </div>
            </div>
        </div>`
    }

}

getUser();