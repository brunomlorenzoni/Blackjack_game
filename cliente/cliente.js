const net = require('net')
const readline = require('readline')
const cliente = net.Socket()
let numTotalPlayer1 = 0
let numTotalPlayer2 = 0
let numTentativasPlayer1 = 5
let numTentativasPlayer2 = 5
let comandoEnviado

cliente.connect(5000, '127.0.0.1', () => {
    console.log('Conectado ao servidor')
    console.log('')
    linha.addListener('line', line => {
        comandoEnviado = line
        if (line === '0') {
            cliente.end();
            console.log("jogador desconectado")
        } else if (line == 1 || line == 2) {
            cliente.write(line + "/" + numTentativasPlayer1)
        } else if (line == 3 || line == 4) {
            cliente.write(line + "/" + numTentativasPlayer2)
        }

    })
})
cliente.on('data', (data) => {

    // Verificação do comando enviado pelo socket para reduzir as tentativas dos players
    if (comandoEnviado == 1 && numTentativasPlayer1 > 0) {
        numTentativasPlayer1--
    } else if (comandoEnviado == 2) {
        numTentativasPlayer1 = 0
    } else if (comandoEnviado == 3 && numTentativasPlayer2 > 0) {
        numTentativasPlayer2--
    } else if (comandoEnviado == 4) {
        numTentativasPlayer2 = 0
    }

    // Transforma e separa o valor que veio do Socket para String  
    let letra = data + ""
    let resultFinal = letra.split("/")
    numTotalPlayer2 = numTotalPlayer2 + parseInt(resultFinal[1])
    numTotalPlayer1 = numTotalPlayer1 + parseInt(data)

    // Interface do jogo
    console.log("numero total de pontos do Player 1: " + numTotalPlayer1)
    console.log("numero total de tentativas do Player 1: " + numTentativasPlayer1)
    console.log('_________________________________________________________________')

    console.log("numero total de pontos do Player 2: " + numTotalPlayer2)
    console.log("numero total de tentativas do Player 2: " + numTentativasPlayer2)
    console.log('_________________________________________________________________')
    console.log('')
    console.log('')
    console.log('')

    // Verificador de vitoria do Player 1 e Player 2 
    if (numTotalPlayer1 > 21) {
        console.log("O Player 1 ultrapassou 21 pontos, Derrota do Player 1 !!!")
        console.log('')
        cliente.end();
    }
    else if (numTotalPlayer2 > 21) {
        console.log("O Player 2 ultrapassou 21 pontos, Derrota do Player 2 !!!")
        console.log('')
        cliente.end();
    }
    else if (numTotalPlayer1 == numTotalPlayer2 && numTentativasPlayer1 <= 0 && numTentativasPlayer2 <= 0) {
        console.log("Player 1 tem o mesmo numero de pontos que Player 2, Jogo foi considerado um Empate !!!")
        console.log('')
        cliente.end();
    }
    else if (numTotalPlayer1 < numTotalPlayer2 && numTentativasPlayer1 <= 0 && numTentativasPlayer2 <= 0) {
        console.log("Player 1 tem menos numero de pontos que o Player 2,  Vitoria do Player 2 !!!")
        console.log('')
        cliente.end();
    }
    else if (numTotalPlayer1 > numTentativasPlayer2 && numTentativasPlayer1 <= 0 && numTentativasPlayer2 <= 0) {
        console.log("Player 1 tem mais numero de pontos que o Player 2,  Vitoria do Player 1 !!!")
        console.log('')
        cliente.end();

    }


})

// Pega o valor informado pelo Player
const linha = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})