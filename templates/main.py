from flask import Flask, render_template,request, redirect

app = Flask(__name__)



@app.route("/index")

def index():
   
    return render_template("index.html")

@app.route("/compracerta")
def compra_certa():
    return render_template("compracerta.html")

@app.route("/compraerrada")
def compra_errada():
    return render_template("compraerrada.html")

if __name__ == "__main__":
    app.run()