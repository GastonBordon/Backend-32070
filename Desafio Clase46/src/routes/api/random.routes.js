const Router = require("koa-router");
// const { fork } = require("child_process");
// const express = require("express");
// const { Router } = express;

// const router = Router();

const router = new Router({
    prefix: "api/randoms",
  });
  
  router.get("/", (ctx) => {
    let data = "Esta es la ruta /api/randoms";
    ctx.body = {
      status: "todo ok",
      data,
    };
  });

// router.get("/", (req, res) => {
//     let  {url}  = req
//     let cant = 100000000
    
//     if (url != '/'){
//         cant = Number(req.query.cant)
//     }
    
//     const random = fork('./utils/randomNumbers.js')

//     random.send(cant)
//     random.on('message', randomNumbers =>{
//         res.send(randomNumbers)
//     }
// );
// })



module.exports = router;
