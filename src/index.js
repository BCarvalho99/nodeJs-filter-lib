import fs from 'fs';
import chalk from 'chalk';


const extraiLinks = (texto)=>{
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
 
  return resultados.length !== 0 ? resultados : 'Não existem links no arquivo.'; 
} 

function trataErro(erro){
    //throw new Error(erro)
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretorio ou diretório inválido '))
  }
 


async function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  try {
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)

    return extraiLinks(texto);
  } catch(erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.yellow('operação concluída'));
  }
}



export default pegaArquivo;


