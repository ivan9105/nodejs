strings = {
    'connected': '[sys][time]%time%[/time]: Вы успешно соединились к сервером как [user]%name%[/user].[/sys]',
    'userJoined': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] присоединился к чату.[/sys]',
    'messageSent': '[out][time]%time%[/time]: [user]%name%[/user]: %text%[/out]',
    'messageReceived': '[in][time]%time%[/time]: [user]%name%[/user]: %text%[/in]',
    'userSplit': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] покинул чат.[/sys]'
};
window.onload = function() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') !== -1) {
        socket = io.connect('http://localhost:8085', {'transports': ['xhr-polling']});
    } else {
        socket = io.connect('http://localhost:8085');
    }

    socket.on('connect', function () {
        socket.on('message', function (message) {
            document.querySelector('#log').innerHTML += strings[message.event]
                .replace(/\[([a-z]+)\]/g, '<span class="$1">')
                .replace(/\[\/[a-z]+\]/g, '</span>')
                .replace(/\%time\%/, message.time)
                .replace(/\%name\%/, message.name)
                .replace(/\%text\%/, unescape(message.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>';

            document.querySelector('#log').scrollTop = document.querySelector('#log').scrollHeight;
        });
    });

    document.querySelector('#input').onkeypress = function(event) {
        if (event.which === '13') {
            socket.send(escape(document.querySelector('#input').value));
            document.querySelector('#input').value = '';
        }
    };

    document.querySelector('#send').onclick = function() {
        socket.send(escape(document.querySelector('#input').value));
        document.querySelector('#input').value = '';
    };
};