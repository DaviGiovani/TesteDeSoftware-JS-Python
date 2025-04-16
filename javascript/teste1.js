//importa o webdriver do selenium
const { Builder, By } = require('selenium-webdriver');

//cria uma função assíncrona para iniciar o teste, utilizando a url a ser testada e o driver selenuim do chrome
(async function testeHanked() {
const url = 'https://www.hankeds.com.br/prova/login2.html';
let driver = await new Builder().forBrowser('chrome').build();

//comeca o teste
try {

//espera o driver receber a url
await driver.get(url);
//deixa o driver de molho por 2000 milisegundos
await driver.sleep(2000);

//pede para o driver encontrar as caixas de texto (username e password) e o botao (entrar) 
const username = await driver.findElement(By.id('username'));
const password = await driver.findElement(By.id('password'));
const botao = await driver.findElement(By.xpath("//button[contains(text(),'Entrar')]"));

//coloca cada letra da palavra `admin` no campo username, com intevalos de 250 milissegundos a cada letra.
for (const letra of 'admin') {
await username.sendKeys(letra);
await driver.sleep(250);
}

//deixa o driver de molho por 1000 milisegundos
await driver.sleep(1000);

//coloca cada letra da palavra `admin123456` no campo password, com intevalos de 250 milissegundos a cada letra.
for (const letra of 'admin123456') {
await password.sendKeys(letra);
await driver.sleep(250);
}

//deixa o driver de molho por 1000 milisegundos
await driver.sleep(1000);

//clica no botao entrar
await botao.click();

//deixa o driver de molho por 4000 milisegundos
await driver.sleep(4000);

//pega o url que o driver esta acessando no momento e coloca em uma constante
const urlAtual = await driver.getCurrentUrl();

//se o url que esta sendo acessado pelo driver for o `destino.html`, envia uma mensagem que o teste passou, caso contrario, passa uma mensagem que o teste falhou.
if (urlAtual.includes('destino2.html')) {
console.log(' Teste passou: redirecionado corretamente.');
} else {
console.log(' Teste falhou: não houve redirecionamento.');
}

//coloca o driver de molho por 5000 milissegundos
await driver.sleep(5000);

//caso o bloco try (teste realizado acima) nao funcione, é enviado uma mensagem que houve um erro durante o teste seguido do script do erro 
} catch (err) {
console.error(' Erro durante o teste:', err);
//por fim, espera o driver parar de ser executado
} finally {
await driver.quit();
}
})();