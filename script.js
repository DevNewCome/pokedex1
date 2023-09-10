
let btnProcurar = document.querySelector('#procurar')


btnProcurar.addEventListener('click', async (e)=>{
    e.preventDefault()
   
let inputValor = document.querySelector('#pokeNome').value  

if(!inputValor){
    alert('Campo vázio')
    return
}else{
    
    let url = `https://pokeapi.co/api/v2/pokemon/${inputValor}`
    try {
        loading('carregando')
        let result = await fetch(url);
        if (result.status === 200) {
            loading('') 
            let json = await result.json();
            console.log(json);
            showInfo(json);
        } else if (result.status === 404) {
            loading('Pokemon não existe, tente outro')
        } else {
            alert(`Erro ao buscar os dados do Pokémon (Status: ${result.status})`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao buscar os dados do Pokémon');
    }
   
}
   
})

function showInfo(json){
  
    document.querySelector('#nome').innerText = `${json.name}`;
    document.querySelector('#foto').setAttribute('src',`${json.sprites.front_default}`)
    document.querySelector('#numero').innerText = `${json.base_experience}`
}

function loading(msg){
    document.querySelector('#carregando').innerText = msg
}


