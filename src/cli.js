
import listaValidada from "./http-validacao.js";
import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk from "chalk"
const caminho = process.argv; //valores de argumento | tipo de informacao da linha de comando pro program

pegaArquivo(caminho[2])

async function imprimeLista(valida, resultado, identificador=''){
    
    if (valida){
        console.log(
            chalk.yellow('lista validada'), 
            chalk.black.bgGreen(identificador), 
           await listaValidada(resultado));
    } else {
            console.log(
                chalk.yellow('Lista de links'), 
                chalk.black.bgGreen(identificador), 
                resultado);

    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
    try{
            fs.lstatSync(caminho);
    }catch (erro){
        if (erro.code ==='ENOENT'){
            console.log("Diretório não existe ou não foi encontrado");
            return; // avoids to show an terminal error 
        }
    }
    if (fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho);
 
        imprimeLista(valida, resultado)
    } else if (fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo)=>{
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
       
            imprimeLista(valida, lista, nomeDeArquivo)
        })
      
    }


}

processaTexto(caminho)