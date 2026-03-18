from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import time

from criptografa import criptografar, descriptografar

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

mensagens = {}

@app.route("/")
def home():
    return jsonify({"status": "API online"}), 200


# ----------------------------
# CRIPTOGRAFAR
# ----------------------------
@app.route("/criptografar", methods=["POST"])
def rota_criptografar():

    data = request.get_json()

    if not data:
        return jsonify({"erro": "dados inválidos"}), 400

    mensagem = data.get("mensagem")
    chave = data.get("chave") or data.get("senha")

    if not mensagem or not chave:
        return jsonify({"erro": "mensagem ou chave vazia"}), 400

    try:
        resultado = criptografar(mensagem, chave)
        return jsonify({"resultado": resultado})
    except Exception as e:
        print("ERRO CRIPTO:", e)
        return jsonify({"erro": "erro interno"}), 500


# ----------------------------
# CRIAR LINK
# ----------------------------
@app.route("/criar-link", methods=["POST"])
def criar_link():

    data = request.get_json()

    if not data:
        return jsonify({"erro": "dados inválidos"}), 400

    mensagem = data.get("mensagem")
    chave = data.get("chave") or data.get("senha")

    if not mensagem or not chave:
        return jsonify({"erro": "mensagem ou chave vazia"}), 400

    try:
        mensagem_criptografada = criptografar(mensagem, chave)

        id_link = str(uuid.uuid4())[:8]

        mensagens[id_link] = {
            "mensagem": mensagem_criptografada,
            "expira": time.time() + 60,
            "visualizado": False
        }

        return jsonify({"link": id_link})

    except Exception as e:
        print("ERRO LINK:", e)
        return jsonify({"erro": "erro interno"}), 500


# ----------------------------
# PEGAR MENSAGEM
# ----------------------------
@app.route("/mensagem/<id>", methods=["GET"])
def ver_mensagem(id):

    if id not in mensagens:
        return jsonify({"erro": "não existe"}), 404

    msg = mensagens[id]

    if time.time() > msg["expira"]:
        del mensagens[id]
        return jsonify({"erro": "expirada"}), 410

    if msg["visualizado"]:
        return jsonify({"erro": "já visualizada"}), 403

    return jsonify({"mensagem": msg["mensagem"]})


# ----------------------------
# DESTRUIR
# ----------------------------
@app.route("/destruir/<id>", methods=["DELETE"])
def destruir(id):

    if id in mensagens:
        del mensagens[id]
        return jsonify({"ok": True})

    return jsonify({"erro": "não encontrada"}), 404


# ----------------------------
# DESCRIPTOGRAFAR
# ----------------------------
@app.route("/descriptografar", methods=["POST"])
def rota_descriptografar():

    data = request.get_json()

    if not data:
        return jsonify({"erro": "dados inválidos"}), 400

    cript = data.get("cript")
    chave = data.get("chave") or data.get("senha")

    if not cript or not chave:
        return jsonify({"erro": "dados incompletos"}), 400

    try:
        resultado = descriptografar(cript, chave)

        if resultado:
            for id_link, msg in mensagens.items():
                if msg["mensagem"] == cript:
                    msg["visualizado"] = True
                    break

            return jsonify({"resultado": resultado})
        else:
            return jsonify({"erro": "senha incorreta"}), 400

    except Exception as e:
        print("ERRO DESCRIPTO:", e)
        return jsonify({"erro": "erro interno"}), 500


if __name__ == "__main__":
    app.run(debug=True)
