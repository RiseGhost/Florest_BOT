<img src="https://user-images.githubusercontent.com/91985039/283889937-c590bddf-d81b-4aff-9079-c541d624f74d.png">

Implementação de um kit de ferramentas diversas para auxilio em áreas como matemática e representação de estruturas de dados.

Adicionar bot -> 
https://discord.com/api/oauth2/authorize?client_id=1167856337166811226&permissions=2048&scope=bot

# Features:
- ## CAS (Computer Algebric System): 🧮
    - Implementação de um calculadora gráfica diretamente no chat do discord.
- ## Representação de árvores binárias: 🌳
    - Capacidade de fazer uma representação da aparência de uma árvore binária.
- ## Conversor de únidades: 🧊
    - Capaz de fazer simples conversões de unidades, exemplo:
        - distância (km,...,m,...,mm)
        -  tempo (hora,minuto,segundo,mili segundo)
- ## Playing Music: 🎶
    - Capaz de reproduzir audio de um video do YouTube
- ## Execute Code:
    - Tem a capacidade de executar código diretamente no chat do discord.


<img src="https://user-images.githubusercontent.com/91985039/289634065-8de76c30-62cd-4174-afea-cf127c87e8de.png">

Tem a capicade de executar código de direntes linguagens diretamente no chat do discord. As linguaguens suportadas são:

- C
- Python
- JavaScript

O output é devolvido pelo bot no chat. Caso o código produza ficheiros esses ficheiros também são enviados pelo bot juntamente com o output do código. A linguaguem é identificada automáticamente não necessitando de utilizar qualquer tipo de comando ao flag no chat do discrod.

### Tratamento do código e de Erros ❌:
O código é executado num "ambiente" diferente utilizando o chroot. Prevenindo assim que qualquer código malicioso afete o sistema tanto do bot como do servidor.

Caso o código tenha algum erro de sintaxe esse error é devolvido para o utilizador no chat.

Caso o código não dê uma resposta em até 5 segundos após ser iniciada a sua execução, o código é parado e é devolvida uma mensagem de __Time Limit__ para o utilizador.

### Exemplos:

<table>
    <tr>
        <th><img src="https://user-images.githubusercontent.com/91985039/289638711-7bd051b2-103e-4823-bff8-dbebff9af01d.png"></th>
        <th><img src="https://user-images.githubusercontent.com/91985039/289638729-af0b4ede-258b-46d2-97ec-46f11c806734.png"></th>
    </tr>
    <tr>
        <th><img src="https://user-images.githubusercontent.com/91985039/289638716-23695914-be53-4a19-9701-a25e21938d96.png"></th>
        <th><img src="https://user-images.githubusercontent.com/91985039/289638725-bddc3651-271e-479d-8f62-168215f403cb.png"></th>
    </tr>
</table>


# About:

- author: RiseGhost 👻
- langugues: C/C++ Python JavaScript
- framework: discrod.js