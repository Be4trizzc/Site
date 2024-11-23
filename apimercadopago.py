from flask import Flask, render_template, request, jsonify
import mercadopago

app = Flask(__name__)

@app.route("/gerar_link_pagamento", methods=["POST"])
def gerar_link_pagamento():
    try:
        
        data = request.get_json() 
        print("Dados recebidos:", data)  
        

        valor_compra = data.get('valor', 0) 
        print("Valor da compra:", valor_compra)

        if valor_compra <= 0:
            return jsonify({"error": "Valor inválido"}), 400  


        sdk = mercadopago.SDK("TEST-5506075049440348-112115-9a1da7febf0e192a7986237e59d05e42-2112252754")
        
        payment_data = {
            "items": [
                {"id": "1", "title": "Produto", "quantity": 1, "currency_id": "BRL", "unit_price": valor_compra},
            ],
            "back_urls": {
                "success": "http://127.0.0.1:5000/compracerta",
                "failure": "http://127.0.0.1:5000/compraerrada",
                "pending": "http://127.0.0.1:5000/compraerrada"
            },
            "auto_return": "all"
        }

        result = sdk.preference().create(payment_data)
        payment = result["response"]
        print("Resposta do Mercado Pago:", payment)
        
        # Obter o link de pagamento
        link_iniciar_pagamento = payment["init_point"]
        return jsonify({"link": link_iniciar_pagamento}) 

    except Exception as e:
        print("Erro ao gerar link de pagamento:", str(e))  
        return jsonify({"error": "Erro ao gerar o link de pagamento"}), 500
