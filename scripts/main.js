/*Métodos: 
    GET:
    Descrição: Solicita uma representação do recurso especificado.
    Uso comum: Recuperar dados de um servidor sem causar efeitos colaterais. Por exemplo, navegar em um site ou recuperar uma postagem de blog.
    Corpo da requisição: Geralmente não tem.
    
    POST:
    Descrição: Envia dados ao servidor para criar um novo recurso.
    Uso comum: Enviar dados de um formulário para serem processados no servidor; criar um novo item em um banco de dados.
    Corpo da requisição: Contém os dados a serem processados pelo servidor.
    
    PUT:
    Descrição: Atualiza o recurso especificado ou cria-o se não existir.
    Uso comum: Atualizar um recurso existente ou criar um recurso se ele não existir (idempotente).
    Corpo da requisição: Contém a representação completa do recurso a ser atualizado ou criado.
    
    DELETE:
    Descrição: Solicita a remoção do recurso especificado.
    Uso comum: Excluir um item específico, como um post de blog ou uma conta de usuário.
    Corpo da requisição: Geralmente não tem.
    
    HEAD:
    Descrição: Semelhante ao GET, mas apenas solicita os cabeçalhos da resposta.
    Uso comum: Verificar se um recurso existe; verificar se foi modificado (por exemplo, para cache).
    Corpo da requisição: Geralmente não tem.
    
    OPTIONS:
    Descrição: Solicita os métodos HTTP permitidos em um recurso.
    Uso comum: Descobrir quais operações um servidor suporta para um URL específico.
    Corpo da requisição: Geralmente não tem.
    
    PATCH:
    Descrição: Aplica modificações parciais a um recurso.
    Uso comum: Atualizar parte de um recurso sem fornecer uma representação completa dele. Por exemplo, atualizar o nome de um usuário sem modificar seu endereço de e-mail.
    Corpo da requisição: Contém as alterações a serem aplicadas ao recurso.
*/


//Método através do JS.

// document.addEventListener("DOMContentLoaded", ()=>{     //AJAX - Asynchronous JavaScript and XML, surgiu para que fosse possivel ocorrer uma interação entre o front e o back sem precisar recarregar a página.
//     document.getElementById('btn-buscar-cep').addEventListener('click', ()=>{   //Atualmente não utilizamos o XML para fazer essa interação, normalmente usamos o JSON para isso .
//         const xhttp = new XMLHttpRequest(); //isso cria uma nova instância do objeto XMLHttpRequest. Essa instância representa uma requisição que você pode configurar e enviar para um servidor.
//         const cep = document.getElementById('cep').value;
//         const endPoint = `https://viacep.com.br/ws/${cep}/json`; //esse é o site da API que busca CEP
        
//         xhttp.open('GET', endPoint); //o primeiro verbo ele indica qual método iremos utilizar, o segundo indica em qual servidor iremos fazer a requisição, no caso, no site indicado anteriormente.
//             //o método open configura a requisição, caso usassemos o método send, enviariamos uma requisição.
    
//         xhttp.send();
//     })
// })


// Método através do jQuery.

// $(document).ready(()=>{
//     $('#cep').mask('00000-000');

//     $('#btn-buscar-cep').click(()=>{
//         const cep = $('#cep').val();
//         const endPoint = `https://viacep.com.br/ws/${cep}/json`;
//         $(this).find('i').addClass('d-none');       //O this faz referência ao objeto selecionado na função que o contêm, no caso o #botao-buscar-cep.
//         $(this).find('span').removeClass('d-none');


//         $.ajax(endPoint).done(function(resposta){   
            // const logradouro = resposta.logradouro;    //Na resposta dada pelo ajax é passado vários paramêtros, ex:mlogradouro, uf, bairro, localidade.
            // const bairro = resposta.bairro;
            // const cidade = resposta.localidade;
            // const estado = resposta.uf;
            // const endereco = `${logradouro}, ${bairro}, ${cidade} , ${estado}`
        
            // $('#endereco').val(endereco);
            // //Se não passarmos um argumento no val ela nos retornará o valor do campo, se inserimos um parâmetro ela irá inserir um valor no campo.
        
            // $('#btn-buscar-cep').find('i').removeClass('d-none');
            // $('#btn-buscar-cep').find('span').addClass('d-none');
//         });
//     })
// })


// Através do fetch API

$(document).ready(function() {
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').click(function() {
        const btn = $(this);
        const cep = $('#cep').val();
        const endPoint = `https://viacep.com.br/ws/${cep}/json/`;
        btn.find('i').addClass('d-none');
        btn.find('span').removeClass('d-none');

        fetch(endPoint)
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(json) {
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const estado = json.uf;
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`
                $('#endereco').val(endereco);

            }).catch(function(erro) {
                console.error("Ocorreu um erro:", erro);
                alert("Ocorreu um erro ao tentar buscar o endereço, confira os dados.");
            });
    });
});

/*Para tratar os erros devemos colocar toda a função dentro de um try{} e então colocar ao fim dele um catch(function(erro){o que deve ser feito ao ocorrer um erro}).
    o then já faz a função do try, então não é necessário colocar o try. */