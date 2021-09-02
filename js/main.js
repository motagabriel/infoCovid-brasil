const ufEstado = document.querySelector('#ufEstado');
const casos = document.querySelector('#casos');
const mortes = document.querySelector('#mortes');
const suspeitas = document.querySelector('#suspeitas')
console.log(ufEstado);


document.addEventListener('input', (e) => {
    uf = e.target.value;
    api(uf, ufEstado, casos, mortes, suspeitas);
    
})

function api(uf,estado, casos, mortes, suspeitas) {
    fetch("https://covid19-brazil-api.now.sh/api/report/v1")
    .then(api => api.json())
    .then(dados => {
       const [ufSelecionada] = dados.data.filter(estado => estado.uf == uf)
       return ufSelecionada;
    })
    .then(uf => {
        console.log(uf)
        estado.textContent = `${uf.uf}, ${uf.state}`;
        casos.textContent = formataValor(uf.cases);
        mortes.textContent = formataValor(uf.deaths);
        suspeitas.textContent = formataValor(uf.suspects);
    })
}

function formataValor(valor) {
    return valor.toLocaleString('pt-br');
}



