import UWS from 'uWebSockets.js'

UWS.App().get('/',a=>a.end('Hello')).listen(4444,ok=>{})