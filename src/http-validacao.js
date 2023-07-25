import chalk from "chalk" 
 
 const extraiLinks = (arrayLinks) => {
    
   return  arrayLinks.map((objetoLink)=>{ return Object.values(objetoLink).join()})

 } 

const manejaErro = (erro) => {
    console.log(chalk.red('Algo deu errado'), erro)
    if (erro.cause.code === 'ENOTFOUND'){
        return 'URL não encontrada.'
    } else { 
        return 'Ocorreu algum erro'
    }
}
 
const checaStatus = async (listaURLs) => {
    const arrStatus = await Promise
    .all( // get a peding promises list that return a solved promises list 
        listaURLs.map( async (url)=>{ 
       try {
        const response = await fetch(url, { method: 'HEAD'});
        console.log(response)
        return `${response.status} - ${response.statusText}`;
        }catch(erro){
            manejaErro(erro);
        }
        })
    );
    return arrStatus;
}


 const listaValidada = async (listaDeLinks) => {
    const lista =  extraiLinks(listaDeLinks);
    const status = await checaStatus(lista);
    console.log(status)

    return listaDeLinks.map((objeto, indice)=> ({
        ...objeto, status: status[indice]
    }))

}

export default listaValidada;
