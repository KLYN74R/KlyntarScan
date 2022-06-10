import UWS from 'uWebSockets.js'
import fetch from 'node-fetch'
import fs from 'fs'



let CONFIGS=JSON.parse(fs.readFileSync('config.json'))


//_______________________________________________________ START _______________________________________________________

UWS.App().get('/',a=>{
    
    a.onAborted(()=>a.aborted=true)

    a.end(fs.readFileSync('Parking(scanner).html').toString('utf-8'))
    
    // fetch(`${CONFIGS.SOURCE}/i`).then(r=>r.json()).then(val=>
        
    //     a.end(JSON.stringify(val,null,2))
        
    // ).catch(e=>a.end('Pingback failed.Node is sleeping'))
   

}).listen(4444,ok=>{})