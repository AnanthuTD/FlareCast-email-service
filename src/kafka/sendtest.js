import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9094'], 
});

const producer = kafka.producer();

const sendMessage = async () => {
  await producer.connect();

  const message = {
    userId: "121464654",
    email: "ananthu.td.dev@gmail.com",
  };

  try {
    await producer.send({
      topic: "user-created-event", 
      messages: [
        {
          value: JSON.stringify(message), 
        },
      ],
    });
    console.log('Message sent successfully!');
  } catch (err) {
    console.error('Error sending message:', err);
  } finally {
    await producer.disconnect();
  }
};

sendMessage();
