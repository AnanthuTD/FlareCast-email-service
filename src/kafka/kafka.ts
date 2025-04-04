import {Kafka} from 'kafkajs'
import env from '../env'

const kafka = new Kafka({
  brokers: [env.KAFKA_BROKER],
  clientId: 'email-service',
  /* sasl:{
    mechanism: "plain",
    username: env.KAFKA_USERNAME,
    password: env.KAFKA_PASSWORD
  } */
})

export default kafka