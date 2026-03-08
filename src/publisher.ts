import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";


console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {

  console.log("Publisher connected to NATS");


  const publisher= new TicketCreatedPublisher(stan);

  try {
     await  publisher.publish({
     id: "123",
    title: "coancert",
    price: 200
  })
    console.log("event published");
  } catch (error) {
    console.error(error);
  }
  // const dataa = JSON.stringify({
  //   id: "123",
  //   title: "coancert",
  //   price: 200,
  // });

  // stan.publish('ticket: created',data,()=>{
  //         console.log('event published');
  // })

  // stan.publish("ticket:created", dataa, () => {
  //   console.log("event published");
  // });
});
