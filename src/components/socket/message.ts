
import Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import cogoToast from 'cogo-toast';


export const connectWs = (institution:any) => {
  console.log("institution",institution);
  let url = "http://localhost:8082/websocketApp";
  let socket:any  = new SockJS(url);
  const client: any  = Stomp.over(socket);
  let userType = "student"
  client.connect({},
  () =>{
    client.subscribe("/topic/global", function(payload:any){
      cogoToast.success(payload.body, {position: 'top-right'});
    })

    client.subscribe(`/topic/${institution}`, function(payload:any){
      cogoToast.success(payload.body, {position: 'top-right'});
    });

    client.subscribe(`/topic/${institution}.${userType}`, function(payload:any){
      cogoToast.success(payload.body, {position: 'top-right'});
    });
  },
  () => {
    console.log("ERROR CALL BACK !!!");
  }
  )

}
