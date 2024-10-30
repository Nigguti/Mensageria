import * as amqp from 'amqplib';

async function receberMensagem(queue: string) {
    try {
        const conexao = await amqp.connect('amqp://localhost:3000');
        const canal = await conexao.createChannel();
             await canal.assertQueue(queue, { durable: true});
             console.log(`Aguardando mensagens na fila "${queue}"...`);

             canal.consume(queue, (msg) => {
                if (msg) {
                    console.log(`Mensagem recebida: ${msg.content.toString()}`);
                    canal.ack(msg);
                }
             });

    } catch (error) {
        console.error('Erro ao receber mensagem:', error);
    }
}

receberMensagem('fila');