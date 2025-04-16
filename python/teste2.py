## importa as bibliotecas necessárias
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

## Configura o driver do Chrome
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.maximize_window()

## inicia o bloco try para iniciar o teste
try:
    # define o url do site a ser testado
    url = "https://www.hankeds.com.br/prova/login.html"
    # drive pega o url do site
    driver.get(url)

    ## coloca o tempo de espera para carregar a pagina
    time.sleep(2)

    ## define a função para digitar lentamente
    def digitar_lento(elemento, texto, delay=0.25):

        for letra in texto:
            elemento.send_keys(letra)
            time.sleep(delay)

    ## espera até que os elementos estejam presentes na página 
    time.sleep(1)
    usuario = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))
    senha = driver.find_element(By.ID, "password")
    botao = driver.find_element(By.XPATH, "//button[contains(text(), 'Entrar')]")

    ## chama a funcao de digitar lentamente para preencher os campos de usuario e senha
    digitar_lento(usuario, "admin")
    time.sleep(1)
    digitar_lento(senha, "admin123456")

    ## clica no botão de entrar
    botao.click()
    time.sleep(4)

    ## se apos clicar no botao de entrar, e for redirecionado para a pagina destino.html, o teste passa
    if "destino.html" in driver.current_url:
        print(" Teste passou: redirecionado corretamente.")
    ## Se nao for redirecionado para a pagina destino.html, o teste falha
    else:
        print(" Teste falhou: redirecionamento não ocorreu.")

    ## espera 5 segundos para visualizar o resultado
    time.sleep(5)

## Se o teste falhar, imprime uma mensagem de erro 
except Exception as e:
    print(" Erro durante o teste:", str(e))

# por fim, fecha o driver e o finaliza o teste
finally:
    driver.quit()