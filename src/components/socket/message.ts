
import Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
export const connectWs = () => {
  let url = "http://localhost:8082/websocketApp";
  let socket:any  = new SockJS(url);
  const client: any  = Stomp.over(socket);
  client.connect({},
  () =>{
    console.log("CONNECT CALL BACK !!!");
    client.subscribe("/topic/global", function(payload:any){
      console.log("SUBSCRIBED MESSAGE");
      console.log(payload.body);
      //client.unsubscribe("sub-0");
    })
  },
  () => {
    console.log("ERROR CALL BACK !!!");
  }
  )

}
