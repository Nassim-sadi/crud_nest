import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // allow all for demo
  },
})
export class ShipmentGateway {
  @WebSocketServer()
  server: Server;

  // Runs when client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Runs when client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Example: driver joins a shipment room
  @SubscribeMessage('joinShipment')
  handleJoinShipment(
    @MessageBody() shipmentId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`shipment_${shipmentId}`);
    console.log(`Client ${client.id} joined shipment_${shipmentId}`);
  }

  // Example: driver sends location update
  @SubscribeMessage('locationUpdate')
  handleLocationUpdate(
    @MessageBody() data: { shipmentId: string; coords: [number, number] },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Location update for shipment_${data.shipmentId}`, data.coords);

    // broadcast to everyone in that shipment room (including admin)
    this.server.to(`shipment_${data.shipmentId}`).emit('locationUpdate', data);
  }
}
