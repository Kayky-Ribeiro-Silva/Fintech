let msg = document.getElementById("msg");
let formulario = document.getElementById("formularios");
let listaUsuarios = [];

function criarlistaUsuarios(){

    formulario.innerHTML = `
        <div class="usuarios">
            <h2>Dados dos Usuários</h2>
        ${listaUsuarios.map(usuario => `
            <p>Usuário: ${usuario.nome}</p>
            <p>CPF: ${usuario.cpf.replace(/\d(?=\d{5})/g, '*')}</p>
            <p>Idade: ${usuario.idade}</p>
            <hr/>
        </div>
        `).join("")}
    `;
}

function limparlistaUsuarios() {
    listaUsuarios = [];
    formulario.innerHTML = "";
}

function salvarUsuario() {
    let idade = document.getElementById("nascimento").value;
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;

    let dataNascimento = new Date(idade);
    let idadeAtual = new Date().getFullYear() - dataNascimento.getFullYear();

    let usuario = {
        "nome" : nome,
        "cpf" : cpf,
        "idade" : idadeAtual,
    };
    listaUsuarios.push(usuario);
    console.log("Usuário salvo:", usuario);
}

function validarFormulario() {
    msg.innerHTML = ""; // Limpa mensagens anteriores
    let valido = true;

    if (!validarEmail()) valido = false;
    if (!validarSenha()) valido = false;
    if (!validarIdade()) valido = false;
    if (!limparCPF()) valido = false;

    if (valido) {
        msg.innerHTML = `<span style="color:green">✅ Formulário válido!</span>`;
        salvarUsuario();
    }
}

function limparCPF() {
    let input = document.getElementById("cpf");
    let cpf = input.value;
    if (!cpf) return;
    let cpfLimpo = cpf.replace(/\D/g, '');
    input.value = cpfLimpo;
    if (validarCPF(cpfLimpo)) {
        return true;
    } else {
        msg.innerHTML = `<span style="color:red">❌ CPF ${cpfLimpo} inválido!</span>`;
        return false;
    }
}

// Função Algoritmo do CPF
function validarCPF(cpfLimpo) {
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) return false;
    let s = 0, r;
    for (let i = 1; i <= 9; i++) {
        s += parseInt(cpfLimpo[i - 1]) * (11 - i);
    }
    r = (s * 10) % 11;
    if (r === 10 || r === 11) r = 0;
    if (r !== parseInt(cpfLimpo[9])) return false;
    s = 0;
    for (let i = 1; i <= 10; i++) {
        s += parseInt(cpfLimpo[i - 1]) * (12 - i);
    }
    r = (s * 10) % 11;
    if (r === 10 || r === 11) r = 0;
    return r === parseInt(cpfLimpo[10]);
}

function validarIdade(){
    let idade = document.getElementById("nascimento").value;
    if (!idade) return false;
    let dataNascimento = new Date(idade);
    let idadeAtual = new Date().getFullYear() - dataNascimento.getFullYear();
    if (idadeAtual < 18) {
        msg.innerHTML = `<span style="color:red">❌ Idade mínima é 18 anos!</span>`;
        return false;
    }
    msg.innerHTML = `<span style="color:green">✅ Idade validada!</span>`;
    return true;
}

function validarSenha() {
    let senha = document.getElementById("senha").value;
    const regexEspecial = /[@_!#$%^&*()<>?/\|}{]/;
    if (!senha) return false;
    if (senha.length < 6 || !regexEspecial.test(senha)) { 
        msg.innerHTML = `<span style="color:red">❌ Senha deve ter pelo menos 6 caracteres e um caractere especial!</span>`; 
        return false; 
    }
    msg.innerHTML = `<span style="color:green">✅ Senha validada!</span>`;
    return true;
}

function validarEmail(){
    let email = document.getElementById("email").value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return false;
    if (!regexEmail.test(email)) {
        msg.innerHTML = `<span style="color:red">❌ E-mail inválido!</span>`;
        return false;
    }
    msg.innerHTML = `<span style="color:green">✅ E-mail validado!</span>`;
    return true;
}