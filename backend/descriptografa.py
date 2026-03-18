import base64
import hashlib


def gerar_chave(chave):
    return hashlib.sha256(chave.encode()).digest()


def descriptografar(cript, chave):

    try:

        chave_bytes = gerar_chave(chave)
        mensagem_bytes = base64.b64decode(cript)

        resultado = bytearray()

        for i in range(len(mensagem_bytes)):
            byte = mensagem_bytes[i] ^ chave_bytes[i % len(chave_bytes)]
            resultado.append(byte)

        return resultado.decode()

    except Exception:
        return None