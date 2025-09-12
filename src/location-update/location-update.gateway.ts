import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true }) // allow frontend to connect
export class LocationUpdateGateway {
  @WebSocketServer()
  server: Server;

  // Driver or Admin joins a shipment room
  @SubscribeMessage('joinShipment')
  handleJoinShipment(
    @MessageBody() data: { shipmentId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = `shipment_${data.shipmentId}`;
    client.join(room);
    console.log(`Client ${client.id} joined ${room}`);
    return { status: 'ok', room };
  }

  // Driver sends location update
  @SubscribeMessage('locationUpdate')
  handleLocationUpdate(
    @MessageBody()
    data: {
      shipmentId: string;
      lat: number;
      lng: number;
    },
  ) {
    const room = `shipment_${data.shipmentId}`;
    console.log(`Update for ${room}: ${data.lat},${data.lng}`);

    // Broadcast update to everyone in that shipment room (admin dashboard etc.)
    this.server.to(room).emit('locationUpdate', {
      lat: data.lat,
      lng: data.lng,
      shipmentId: data.shipmentId,
      timestamp: new Date(),
    });
  }
}
