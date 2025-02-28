function filterTable() {
    let nameInput = document.getElementById("search-name").value.toLowerCase();
    let sectorInput = document.getElementById("search-sector").value.toLowerCase();
    let ramalInput = document.getElementById("search-ramal").value.toLowerCase();
    let emailInput = document.getElementById("search-email").value.toLowerCase();
    let phoneInput = document.getElementById("search-phone").value.toLowerCase();
    let rows = document.querySelectorAll("#table-body tr");
    
    rows.forEach(row => {
        let name = row.children[0].textContent.toLowerCase();
        let sector = row.children[1].textContent.toLowerCase();
        let ramal = row.children[2].textContent.toLowerCase();
        let email = row.children[3].textContent.toLowerCase();
        let phone = row.children[4].textContent.toLowerCase();
        
        let matches = 
            (name.includes(nameInput) || nameInput === "") &&
            (sectorInput === "" || sector.includes(sectorInput)) &&
            (ramal.includes(ramalInput) || ramalInput === "") &&
            (email.includes(emailInput) || emailInput === "") &&
            (phone.includes(phoneInput) || phoneInput === "");
        
        row.style.display = matches ? "" : "none";
    });
}

function sortTable(columnIndex) {
    let table = document.querySelector("table tbody");
    let rows = Array.from(table.rows);
    let ascending = table.dataset.order !== "asc";
    
    rows.sort((a, b) => {
        let cellA = a.cells[columnIndex].textContent.trim().toLowerCase();
        let cellB = b.cells[columnIndex].textContent.trim().toLowerCase();
        
        return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });
    
    table.innerHTML = "";
    rows.forEach(row => table.appendChild(row));
    table.dataset.order = ascending ? "asc" : "desc";
}

document.addEventListener('DOMContentLoaded', () => {
    fetchContatos();
    addEnterKeyListener();
});

async function fetchContatos() {
    try {
        const response = await fetch('http://10.1.2.248:3001/contatos');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar contatos');
        }

        const contatos = await response.json();

        const tableBody = document.getElementById('table-body');

        tableBody.innerHTML = '';

        contatos.data.forEach(contato => {
            const row = document.createElement('tr');
            row.dataset.id = contato.id;
            row.innerHTML = `
                <td>${contato.nome}</td>
                <td>${contato.setor}</td>
                <td>${contato.ramal}</td>
                <td>${contato.email} <a href="mailto:${contato.email}"><i class="fa-solid fa-envelope"></a></i></td>
                <td>${contato.telefone} <a href="https://wa.me/55${formatPhoneNumber(contato.telefone)}"><i class="fa-brands fa-whatsapp"></a></i>
                    <button class="edit-button hidden" onclick="editContact('${contato.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete-button hidden" onclick="deleteContact('${contato.id}')"><i class="fa-solid fa-trash"></i></button></td>

            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Erro ao buscar contatos:', err);
        alert('Erro ao buscar contatos. Verifique o console para mais detalhes.');
    }
}

async function editContact(id) {
    const name = prompt("Digite o novo nome:");
    const sector = prompt("Digite o novo setor:");
    const ramal = prompt("Digite o novo ramal:");
    const email = prompt("Digite o novo e-mail:");
    const phone = prompt("Digite o novo telefone:");

    if (!name || !sector || !ramal || !email || !phone) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch(`http://10.1.2.248:3001/contatos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: name,
                setor: sector,
                ramal: ramal,
                email: email,
                telefone: phone,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao editar contato');
        }

        fetchContatos();

        alert('Contato editado com sucesso!');
    } catch (err) {
        console.error('Erro ao editar contato:', err);
        alert('Erro ao editar contato. Verifique o console para mais detalhes.');
    }
}

async function deleteContact(id) {
    if (!confirm('Tem certeza que deseja excluir este contato?')) {
        return;
    }

    try {
        const response = await fetch(`http://10.1.2.248:3001/contatos/${id}`, {
            method: 'DELETE',
        });

        if (response.headers.get('content-type')?.includes('application/json')) {
            const error = await response.json();
            if (!response.ok) {
                throw new Error(error.error || 'Erro ao excluir contato');
            }
        } else if (!response.ok) {
            throw new Error('Erro ao excluir contato');
        }

        fetchContatos();

        alert('Contato excluído com sucesso!');
    } catch (err) {
        console.error('Erro ao excluir contato:', err);
        alert('Erro ao excluir contato. Verifique o console para mais detalhes.');
    }
}

async function addContact() {
    const newName = document.getElementById('newName').value;
    const newSector = document.getElementById('newSector').value;
    const newRamal = document.getElementById('newRamal').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPhone = document.getElementById('newPhone').value;

    if (!newName || !newSector || !newRamal || !newEmail || !newPhone) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const emailExists = await checkEmailExists(newEmail);
    if (emailExists) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    try {
        const response = await fetch('http://10.1.2.248:3001/contatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: newName,
                setor: newSector,
                ramal: newRamal,
                email: newEmail,
                telefone: newPhone,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao adicionar contato');
        }

        closeAddContactModal();

        fetchContatos();

        alert('Contato adicionado com sucesso!');
    } catch (err) {
        console.error('Erro ao adicionar contato:', err);
        alert('Erro ao adicionar contato. Verifique o console para mais detalhes.');
    }
}

async function checkEmailExists(email) {
    try {
        const response = await fetch(`http://10.1.2.248:3001/contatos?email=${email}`);
        const contatos = await response.json();

        return contatos.some(contato => contato.email === email);
    } catch (err) {
        console.error('Erro ao verificar e-mail:', err);
        return false;
    }
}

function addEnterKeyListener() {
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');

    loginInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            validateLogin();
        }
    });

    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            validateLogin();
        }
    });
}

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function openAddContactModal() {
    document.getElementById('addContactModal').style.display = 'flex';
}

function closeAddContactModal() {
    document.getElementById('addContactModal').style.display = 'none';
}

const adminLogin = "admin";
const adminPassword = "admin123";

function validateLogin() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    if (login === adminLogin && password === adminPassword) {
        closeLoginModal(); 
        document.querySelectorAll('button').forEach(button => button.classList.remove('hidden'));
    } else {
        document.getElementById('errorMessage').textContent = 'Login ou senha incorretos.';
    }
}

function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '');
}