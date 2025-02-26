const server = require("fastify")({ logger: true });
const fastifyCookies = require("@fastify/cookie");
const cors = require("fastify-cors")

const { randomUUID } = require("crypto");

const db = require("mongoose");
const cookiesModel = require("./db.js");

server.register(fastifyCookies);
server.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET"],
  credentials: true
});

server.get("/setCookie", async (request, reply) => {
  if (request.cookies.key) {
    // indioca que o recuso ja foi acessado antes.
    return reply.code(208).send({ text: "Cookie ja existe!" });
  } else {
    const id = randomUUID();
    const newCookie = new cookiesModel({
      cookie: id,
    });
    
    // o return e preciso para indicar que o fim do codigo.
    return newCookie.save()
      .then((x) => {
        console.log("Cookie salvo com sucesso!");
        return reply.setCookie("key", id).send({ text: "Cookie Salvo!", cookie: id});
      })
      .catch((err) => console.error("Erro ao salvar o cookie!", err));
  }
});

server.get("/clearCookie", async (request, reply) => {
    const x = await cookiesModel.deleteMany({})
    console.log("Cookie deltado com sucesso!")
    return reply.clearCookie("key").send({text: "Cookies apagados com Sucesso!"})
});

server.post("/cadastrar", async(request, reply) => {
  // console.log(request.cookies)
  const newDatas = {cookie: request.cookies.key, name: request.body}
  await cookiesModel.findOneAndUpdate({cookie: request.cookies.key}, newDatas)
  reply.send({text: "Dados salvos!"})
});

server.get("/findCookie", async (request, reply) =>{
  const exist = await cookiesModel.find({cookie: request.cookies.key})
  console.log(exist)
  if(exist){
    // console.log(exist)
    reply.code(200).send({cookie: exist[0].cookie, name: exist[0].name, date: exist[0].date})
  }else{
    reply.code(201).send({text: "Err"})
  }
})

server.listen({ port: 3000 });
