const net = require('net');

const handleConnection = socket => {
    console.log('Jogador conectado')


    socket.on('data', data => {
        const comando = data.toString()
        if (comando == ' ') {
            console.log("comando vazio")
        }

        if (comando != '') {

            let letra = comando + ""
            let resultFinal = letra.split("/")
            let primeiroValor = parseInt(resultFinal[0])
            let segundoValor = parseInt(resultFinal[1])
            let comandoFinal = primeiroValor.toString()

            if (segundoValor == 0) {
                comandoFinal = 2 + ""

                console.log("teste do comando" + comando);
            }

            switch (comandoFinal) {
                case "1":
                    console.log("entrou");
                    // Só o Player 1 da o dano

                    var resultPlayer1 = Math.floor(Math.random() * 1 + 1);
                    var resultPlayer2 = 0
                    resultPlayer1 + ""
                    resultPlayer2 + ""
                    var resulTotal = resultPlayer1 + "/" + resultPlayer2
                    console.log(resulTotal);
                    socket.write(resulTotal.toString())
                    break;
                // Player 1 Passa a vez
                case "2":
                    var resultPlayer1 = 0
                    var resultPlayer2 = 0;
                    resultPlayer1 + ""
                    resultPlayer2 + ""
                    var resulTotal = resultPlayer1 + "/" + resultPlayer2
                    console.log(resulTotal);
                    socket.write(resulTotal.toString())
                    break;

                // Só o Player 2 da o dano
                case "3":
                    var resultPlayer1 = 0
                    var resultPlayer2 = Math.floor(Math.random() * 1 + 1);
                    resultPlayer1 + ""
                    resultPlayer2 + ""
                    var resulTotal = resultPlayer1 + "/" + resultPlayer2
                    console.log(resulTotal);
                    socket.write(resulTotal.toString())
                    break;
                // Player 2 Passa a vez
                case "4":
                    var resultPlayer1 = 0
                    var resultPlayer2 = 0;
                    resultPlayer1 + ""
                    resultPlayer2 + ""
                    var resulTotal = resultPlayer1 + "/" + resultPlayer2
                    console.log(resulTotal);
                    socket.write(resulTotal.toString())
                    break;

                default:
                    break;
            }
        }


    })

}

const server = net.createServer(handleConnection)

server.listen(5000)
