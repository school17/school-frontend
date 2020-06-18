
import Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import cogoToast from 'cogo-toast';


export const connectWs = (institution:any, user:any, role:any) => {
  console.log("institution",institution);
  let url = "http://localhost:8082/websocketApp";
  let socket:any  = new SockJS(url);
  const client: any  = Stomp.over(socket);
  let userType = role === "ADMIN" ? "STUDENT" : role;
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

    client.subscribe(`/topic/${institution}.${user.division}`, function(payload:any){
      cogoToast.success(payload.body, {position: 'top-right'});
    });
  },
  () => {
    console.log("ERROR CALL BACK !!!");
  }
  )

}
