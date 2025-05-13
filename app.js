function mudarPagina(idNovaPagina) {
    const paginas = document.querySelectorAll('.wrapper, .wrapper-ativo');
    paginas.forEach(pagina => {
        pagina.classList.remove('wrapper-ativo');
        pagina.classList.add('wrapper');
    });

    const novaPagina = document.getElementById(idNovaPagina);
    novaPagina.classList.remove('wrapper');
    novaPagina.classList.add('wrapper-ativo');
}

function enviarCadastro() {
    const nome = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('password-input').value;	
    const senhaConfirmacao = document.getElementById('repeat-password-input').value;

    const data = {
        nome: nome,
        email: email,
        senha: senha,
        confirmar_senha: senhaConfirmacao
    };
    fetch('https://todo-list-39pt.onrender.com/auth/cadastro', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Cadastro realizado com sucesso!');
        mudarPagina('login');
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao realizar o cadastro. Verifique os dados e tente novamente.');
    });      
}

function loginGetToken() {
    const email = document.getElementById('email-input-login').value;
    const senha = document.getElementById('password-input-login').value;

    const form = new URLSearchParams();
    form.append('username', email);
    form.append('password', senha);
    form.append('grant_type', 'password');      // se você não usar grant_type, deixe em branco
    form.append('scope', '');           // idem
    form.append('client_id', 'string');       // se não for cliente OAuth
    form.append('client_secret', 'string');   // se não for cliente OAuth

    fetch('https://todo-list-39pt.onrender.com/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString()
      })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          console.error('Erro no login:', data);
          alert('Erro: ' + JSON.stringify(data.detail));
          return;
        }
        console.log('Sucesso', data);
        alert("Login realizado com sucesso!");
        mudarPagina('login-ok');
      })
      .catch(err => {
        console.error('Erro de rede:', err);
        alert('Erro ao conectar-se ao servidor.');
      });
    }

