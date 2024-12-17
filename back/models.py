from database import db
from sqlalchemy.orm import relationship

class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    criado_em = db.Column(db.DateTime, default=db.func.current_timestamp())
    atualizado_em = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    def to_dict(self):
        return{
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "senha": self.senha,
            "criado_em": self.criado_em.isoformat() if self.criado_em else None,
            "atualizado_em": self.atualizado_em.isoformat() if self.atualizado_em else None
        }
    # Define o relacionamento com Evento usando back_populates para evitar conflito
    
    def __repr__(self):
        return f'<Usuario {self.nome}>'

class Produto(db.Model):
    __tablename__ = 'produtos'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    criado_em = db.Column(db.DateTime, default=db.func.current_timestamp())
    atualizado_em = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    def to_dict(self):
        return{
            "id": self.id,
            "nome": self.nome,
            "valor": self.valor,
            "criado_em": self.criado_em.isoformat() if self.criado_em else None,
            "atualizado_em": self.atualizado_em.isoformat() if self.atualizado_em else None
        }
    def __repr__(self):
        return f'<Produto {self.nome} - R$ {self.valor}>'
    
class Pedidos(db.Model):
    __tablename__ = 'pedidos'

    id = db.Column(db.Integer, primary_key=True)
    cliente_nome = db.Column(db.String(100), nullable=False)
    criado_em = db.Column(db.DateTime, default=db.func.current_timestamp())
    valor_total = db.Column(db.Numeric(10, 2), default=0.00, nullable=False)
    entregue = db.Column(db.Integer, default=0, nullable=False)
    # Relacionamento com os itens do pedido
    itens = db.relationship('pedido_itens', backref='pedido_rel', lazy=True)
    def to_dict(self):
        return{
            "id": self.id,
            "cliente_nome": self.cliente_nome,
            "valor_total": self.valor_total,
            "criado_em": self.criado_em.isoformat() if self.criado_em else None,
            "itens": [item.to_dict() for item in self.itens]
        }

class pedido_itens(db.Model):
    __tablename__ = 'pedido_itens'

    id = db.Column(db.Integer, primary_key=True)
    pedido_id = db.Column(db.Integer, db.ForeignKey('pedidos.id'), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produtos.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

    # Relacionamento com Produto
    produto = db.relationship('Produto', backref='pedido_itens', lazy=True)
    def to_dict(self):
        return{
            "id": self.id,
            "pedido_id": self.pedido_id,
            "produto_id": self.produto_id,
            "quantidade": self.quantidade
        }