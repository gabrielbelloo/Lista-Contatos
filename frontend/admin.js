function openAddContactModal() {
    document.getElementById('addContactModal').style.display = 'flex';
}

function closeAddContactModal() {
    document.getElementById('addContactModal').style.display = 'none';
}

async function addContact() {
    const newName = document.getElementById('newName').value;
    const newSector = document.getElementById('newSector').value;
    const newRamal = document.getElementById('newRamal').value;
    const newPhone = document.getElementById('newPhone').value;
    const newEmail = document.getElementById('newEmail').value;


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
        const response = await fetch('https://contatos.plconfeccoes.com.br/api/contatos', {
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
        const response = await fetch(`https://contatos.plconfeccoes.com.br/api/contatos?email=${email}`);
        const contatos = await response.json();

        return contatos.some(contato => contato.email === email);
    } catch (err) {
        console.error('Erro ao verificar e-mail:', err);
        return false;
    }
}

async function editContact(id) {
    const name = prompt("Digite o novo nome:");
    const sector = prompt("Digite o novo setor:");
    const ramal = prompt("Digite o novo ramal:");
    const phone = prompt("Digite o novo telefone:");
    const email = prompt("Digite o novo e-mail:");

    if (!name || !sector || !ramal || !email || !phone) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch(`https://contatos.plconfeccoes.com.br/api/contatos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: name,
                setor: sector,
                ramal: ramal,
                telefone: phone,
                email: email,
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
        const response = await fetch(`https://contatos.plconfeccoes.com.br/api/contatos/${id}`, {
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

function showAdminButtons() {
        document.querySelectorAll('button').forEach(button => button.classList.remove('hidden'));
}

document.addEventListener('DOMContentLoaded', () => {
    showAdminButtons();
});