async function fetchContatos() {
    try {
        const response = await fetch('https://contatos.plconfeccoes.com.br/api/contatos');

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
                <td class="align-center"><i class="fa-regular fa-star favorite-icon" data-id="${contato.id}" onclick="toggleFavorite(event, '${contato.id}')"></i></td>
                <td>${contato.nome}</td>
                <td>${contato.setor}</td>
                <td>${contato.ramal}</td>
                <td>${contato.telefone} <a href="https://wa.me/55${formatPhoneNumber(contato.telefone)}"><i class="fa-brands fa-whatsapp"></a></i></td>
                <td>${contato.email} <a href="mailto:${contato.email}"><i class="fa-solid fa-paper-plane"></i></a></td>

                <td class="admin-td align-center" hidden><button class="admin-button"><i class="fa-solid fa-pen-to-square" onclick="editContact('${contato.id}')"></i></button></td>

                <td class="admin-td align-center" hidden><button class="admin-button"><i class="fa-solid fa-trash" onclick="deleteContact('${contato.id}')"></i></button></td>
            `;
            tableBody.appendChild(row);
            row.addEventListener('click', () => openContactCard(contato));
        });
    } catch (err) {
        console.error('Erro ao buscar contatos:', err);
        alert('Erro ao buscar contatos. Verifique o console para mais detalhes.');
    }

    showAdminButtons();
    updateFavoriteIcons();
}

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

function openContactCard(contato) {
    document.getElementById('contactCard').style.display = 'flex';
    document.getElementById('contactName').textContent = contato.nome;
    document.getElementById('contactSector').textContent = contato.setor;

    document.getElementById('contactRamal').innerHTML = `<i class="fa-solid fa-phone"></i> <a>${contato.ramal}</a>`;
    document.getElementById('contactPhone').innerHTML = `<i class="fa-brands fa-whatsapp"></i> <a target="blank" href="https://wa.me/55${formatPhoneNumber(contato.telefone)}">${contato.telefone}</a>`;
    document.getElementById('contactEmail').innerHTML = `<i class="fa-solid fa-envelope"></i> <a target="blank" href="mailto:${contato.email}">${contato.email}</a>`;
}

function closeContactCard() {
    document.getElementById('contactCard').style.display = 'none';
    document.getElementById('contactName').textContent = '';
    document.getElementById('contactSector').textContent = '';
    document.getElementById('contactRamal').innerHTML = '';
    document.getElementById('contactPhone').innerHTML = '';
    document.getElementById('contactEmail').innerHTML = '';
}

function toggleFavorite(event, id) {
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteIcons();
}

function updateFavoriteIcons() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        if (favorites.includes(icon.dataset.id)) {
            icon.classList.add('fa-solid');
            icon.classList.remove('fa-regular');
            icon.style.color = 'gold';
        } else {
            icon.classList.add('fa-regular');
            icon.classList.remove('fa-solid');
            icon.style.color = '';
        }
    });
}

function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchContatos();
});