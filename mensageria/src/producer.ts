import * as amqp from 'amqplib';

async function enviarMensagem(queue: string, message: string) {
    try {
        const conexao = await amqp.conexao('amqp://localhost:3000');
        const canal = await conexao.criarCanal();
             await canal.criarFila(queue, { durable: true });
             canal.sendToQueue(queue, Buffer.from(message));
             console.log(`Mensagem enviada: ${message}`);
    } catch (error) {
        console.log('Erro ao enviar mensagem:', error);

        setTimeout(() => {
            close();
        }, 500);
    }
}

enviarMensagem('fila', 'Olá, RabbitMQ!');