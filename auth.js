/* auth.js — simples autenticação local usando localStorage (para desenvolvimento/demonstração)
   - registerForm: salva usuário em localStorage under 'users'
   - loginForm: valida usuário e salva 'loggedUser'
   Não use em produção (senhas em texto claro). */
(function(){
  function getUsers(){ return JSON.parse(localStorage.getItem('users') || '{}'); }
  function saveUsers(u){ localStorage.setItem('users', JSON.stringify(u)); }
  function showMsg(id, msg, ok){
    var el = document.getElementById(id);
    if(!el) return;
    el.textContent = msg;
    el.style.color = ok ? '#a6f3a6' : '#ffb3b3';
  }

  function register(e){
    e.preventDefault();
    var u = (document.getElementById('username') || {}).value || '';
    var p = (document.getElementById('password') || {}).value || '';
    var p2 = (document.getElementById('password2') || {}).value || '';
    u = u.trim();
    if(!u || !p){ showMsg('registerMsg','Preencha usuário e senha', false); return; }
    if(p !== p2){ showMsg('registerMsg','Senhas não conferem', false); return; }
    var users = getUsers();
    if(users[u]){ showMsg('registerMsg','Usuário já existe', false); return; }
    users[u] = { password: p };
    saveUsers(users);
    showMsg('registerMsg','Cadastro realizado com sucesso!', true);
    setTimeout(function(){ window.location.href = 'entrada.html'; }, 900);
  }

  function login(e){
    e.preventDefault();
    var u = (document.getElementById('username') || {}).value || '';
    var p = (document.getElementById('password') || {}).value || '';
    u = u.trim();
    if(!u || !p){ showMsg('loginMsg','Preencha usuário e senha', false); return; }
    var users = getUsers();
    if(users[u] && users[u].password === p){
      localStorage.setItem('loggedUser', u);
      showMsg('loginMsg','Login efetuado! Redirecionando...', true);
      setTimeout(function(){ window.location.href = 'index.html'; }, 700);
    } else {
      showMsg('loginMsg','Usuário ou senha incorretos', false);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    var rf = document.getElementById('registerForm'); if(rf) rf.addEventListener('submit', register);
    var lf = document.getElementById('loginForm'); if(lf) lf.addEventListener('submit', login);
  });
})();
