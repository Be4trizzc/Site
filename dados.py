from flask import Flask, render_template_string, request, redirect, url_for
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

# Inicialização do Flask
app = Flask(__name__)

# Banco de dados e SQLAlchemy
engine = create_engine('sqlite:///enterprise.db', echo=True)
Base = declarative_base()

# Definindo o modelo de Usuário
class User(Base):
    __tablename__ = 'users'  # Correção do nome da tabela
    email = Column(String, primary_key=True)
    name = Column(String, nullable=False)

# Criando as tabelas no banco de dados
Base.metadata.create_all(engine)

# Criando a sessão para o banco, com scoped_session para garantir a limpeza
Session = scoped_session(sessionmaker(bind=engine))
session = Session()

# Função para adicionar usuário
def add_user(email, name):
    try:
        new_user = User(email=email, name=name)
        session.add(new_user)
        session.commit()  # Tentativa de commit
    except Exception as e:
        session.rollback()  # Se ocorrer um erro, faz o rollback
        print(f"Erro ao adicionar usuário: {e}")
        return False  # Indicando que o cadastro falhou
    return True  # Cadastro bem-sucedido

# Rota para o formulário de cadastro
@app.route('/')
def index():
 
    return render_template_string("""
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Usuário</title>
            <style>
                /* Arquivo styles.css */

                /* Resetando alguns estilos básicos para ter um comportamento consistente entre os navegadores */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                /* Cor de fundo da página */
                body {
                    font-family: 'Poppins', sans-serif; /* Fonte mais delicada */
                    background-color: #f3e6f5; /* Fundo lilás claro */
                    color: #333;
                    padding: 20px;
                }

                /* Container que envolve o formulário */
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }

                /* Caixa do formulário */
                .form-box {
                    background-color: #fff;
                    border-radius: 15px; /* Borda arredondada para dar um toque suave */
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                    padding: 40px;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                    transition: transform 0.3s ease;
                }

                /* Hover no formulário */
                .form-box:hover {
                    transform: scale(1.05);
                }

                /* Estilo para os títulos */
                h1 {
                    font-size: 28px;
                    color: #9b59b6; /* Cor lilás mais suave */
                    margin-bottom: 20px;
                    font-weight: 600;
                }

                /* Estilo para o formulário e campos */
                form {
                    width: 100%;
                }

                fieldset {
                    border: none;
                }

                legend {
                    font-size: 22px;
                    color: #9b59b6;
                    margin-bottom: 10px;
                    font-weight: 500;
                }

                .input-box {
                    position: relative;
                    margin-bottom: 20px;
                }

                .input-user {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 12px; /* Borda arredondada para os campos */
                    font-size: 16px;
                    color: #333;
                    transition: border-color 0.3s ease;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                .input-user:focus {
                    border-color: #9b59b6;
                }

                .label-input {
                    position: absolute;
                    top: -12px;
                    left: 10px;
                    font-size: 14px;
                    color: #9b59b6;
                    font-weight: bold;
                }

                /* Estilo do botão de envio */
                .submit-btn {
                    width: 100%;
                    padding: 14px;
                    border: none;
                    border-radius: 12px;
                    background-color: #9b59b6;
                    color: #fff;
                    font-size: 18px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .submit-btn:hover {
                    background-color: #8e44ad;
                    transform: scale(1.05);
                }

                /* Links de navegação */
                a {
                    text-decoration: none;
                    color: #9b59b6;
                    font-weight: bold;
                }

                a:hover {
                    text-decoration: underline;
                }

                /* Estilo para a página de sucesso/erro */
                h1 {
                    font-size: 22px;
                    color: #9b59b6;
                }

                p {
                    font-size: 16px;
                    color: #333;
                }

                .container .form-box {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="form-box">
                    <h1>Cadastro de Usuário</h1>
                    <form action="/add_user" method="POST">
                        <fieldset>
                            <legend>Preencha seus dados</legend>

                            <div class="input-box">
                                <input type="text" name="name" id="name" class="input-user" required>
                                <label for="name" class="label-input">Digite seu Nome:</label>
                            </div>

                            <div class="input-box">
                                <input type="email" name="email" id="email" class="input-user" required>
                                <label for="email" class="label-input">Digite seu Email:</label>
                            </div>

                            <input type="submit" value="Cadastrar" class="submit-btn">
                        </fieldset>
                    </form>
                </div>
            </div>
        </body>
        </html>
    """)

# Rota para adicionar o usuário e redirecionar para a tela de sucesso
@app.route('/add_user', methods=['POST'])
def add_user_route():
   
    email = request.form['email']
    name = request.form['name']
    
    # Tenta adicionar o usuário
    if add_user(email, name):
        return redirect(url_for('success', name=name))  # Redireciona para a página de sucesso
    else:
        return redirect(url_for('error'))  # Se falhar, redireciona para a página de erro

# Rota de sucesso que exibe uma mensagem após o cadastro
@app.route('/success')
def success():
  
    name = request.args.get('name')  # Recupera o nome do usuário da URL
    return render_template_string("""
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro Concluído</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f3e6f5;
                    color: #333;
                    padding: 20px;
                }
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .form-box {
                    background-color: #fff;
                    border-radius: 15px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                    padding: 40px;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                }
                h1 {
                    font-size: 22px;
                    color: #9b59b6;
                }
                p {
                    font-size: 16px;
                    color: #333;
                }
                a {
                    text-decoration: none;
                    color: #9b59b6;
                    font-weight: bold;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="form-box">
                    <h1>Cadastro realizado com sucesso!</h1>
                    <p>O usuário <strong>{{ name }}</strong> foi cadastrado com sucesso!</p>
                    <a href="/">Voltar para o formulário</a>
                </div>
            </div>
        </body>
        </html>
    """, name=name)

# Rota de erro, caso ocorra algum problema durante o cadastro
@app.route('/error')
def error():
    return render_template_string("""
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Erro no Cadastro</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f3e6f5;
                    color: #333;
                    padding: 20px;
                }
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .form-box {
                    background-color: #fff;
                    border-radius: 15px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                    padding: 40px;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                }
                h1 {
                    font-size: 22px;
                    color: #9b59b6;
                }
                p {
                    font-size: 16px;
                    color: #333;
                }
                a {
                    text-decoration: none;
                    color: #9b59b6;
                    font-weight: bold;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="form-box">
                    <h1>Ocorreu um erro no cadastro!</h1>
                    <p>Tente novamente mais tarde.</p>
                    <a href="/">Voltar para o formulário</a>
                </div>
            </div>
        </body>
        </html>
    """)

# Rodando o Flask
if __name__ == '__main__':
    app.run(debug=True)
