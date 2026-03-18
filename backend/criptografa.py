from cryptography.fernet import Fernet
import base64
import hashlib


def gerar_chave(chave: str) -> bytes:
    hash_chave = hashlib.sha256(chave.encode()).digest()
    return base64.urlsafe_b64encode(hash_chave)


def criptografar(mensagem: str, chave: str) -> str:
    f = Fernet(gerar_chave(chave))
    return f.encrypt(mensagem.encode()).decode()


def descriptografar(token: str, chave: str):
    try:
        f = Fernet(gerar_chave(chave))
        return f.decrypt(token.encode()).decode()
    except:
        return None