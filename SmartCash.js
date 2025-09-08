let totalReceitas = 0;
let totalDespesas = 0;
let numeroTransacoes = 0;

function adicionarReceita() {
    const descricao = document.getElementById('descricao-receita').value;
    const valor = parseFloat(document.getElementById('valor-receita').value);
    if (descricao === "" || isNaN(valor) || valor <= 0) {
        mostrarAlerta('error');
        return;
    }
    totalReceitas += valor;
    numeroTransacoes++;
    atualizarSaldo();
    adicionarTransacao('receita', descricao, valor);
    mostrarAlerta('success');
    resetarFormularios();
}

function adicionarDespesa() {
    const descricao = document.getElementById('descricao-despesa').value;
    const valor = parseFloat(document.getElementById('valor-despesa').value);
    if (descricao === "" || isNaN(valor) || valor <= 0) {
        mostrarAlerta('error');
        return;
    }
    totalDespesas += valor;
    numeroTransacoes++;
    atualizarSaldo();
    adicionarTransacao('despesa', descricao, valor);
    mostrarAlerta('success');
    resetarFormularios();
}

function adicionarTransacao(tipo, descricao, valor) {
    const transacoesDiv = document.getElementById('transacoes');
    const transacaoDiv = document.createElement('div');
    transacaoDiv.className = 'card';
    transacaoDiv.innerHTML = `${tipo === 'receita' ? '💵' : '🛒'} ${descricao} - R$ ${valor.toFixed(2)} - ${new Date().toLocaleString()}`;
    transacoesDiv.appendChild(transacaoDiv);
    document.getElementById('numero-transacoes').innerText = numeroTransacoes;
}

function atualizarSaldo() {
    const saldo = totalReceitas - totalDespesas;
    document.getElementById('saldo-valor').innerText = saldo.toFixed(2);
    document.getElementById('saldo').className = saldo < 0 ? 'saldo negative' : 'saldo';
    document.getElementById('total-receitas').innerText = `R$ ${totalReceitas.toFixed(2)}`;
    document.getElementById('total-despesas').innerText = `R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById('progresso').style.width = `${(totalReceitas / (totalReceitas + totalDespesas) * 100) || 0}%`;
}

function mostrarAlerta(tipo) {
    const alert = document.getElementById(`alert-${tipo}`);
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

function resetarFormularios() {
    document.getElementById('descricao-receita').value = '';
    document.getElementById('valor-receita').value = '';
    document.getElementById('descricao-despesa').value = '';
    document.getElementById('valor-despesa').value = '';
}

function resetar() {
    if (confirm("Tem certeza que deseja apagar todos os registros?")) {
        totalReceitas = 0;
        totalDespesas = 0;
        numeroTransacoes = 0;
        atualizarSaldo();
        document.getElementById('transacoes').innerHTML = '';
        mostrarAlerta('success');
    }
}

window.onscroll = function() {
    const header = document.querySelector('header');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Menu Hamburguer
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}
 