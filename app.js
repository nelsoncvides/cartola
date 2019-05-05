// const https = require('https');
// const fs = require('fs');
// const log = require('./log.js');
//
// // const options = {
// //   hostname: 'api.cartolafc.globo.com',
// //   path: '/mercado/status',
// //   method: 'GET',
// //   headers: {
// //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
// //   }
// // };
// //
// // var rodada = null;
// //
// // const req = https.request(options, (res) => {
// //   // console.log('statusCode:', res.statusCode);
// //   // console.log('headers:', res.headers);
// //
// //   res.on('data', (d) => {
// //     rodada = JSON.parse(d.toString());
// //     console.log(`Rodada ${rodada.rodada_atual}`);
// //   });
// // });
//
//
// // console.log(rodada);
// //
// // console.log('------');
//
// var fetch = (path, file) => {
//   // var obj;
//   const options = {
//     hostname: 'api.cartolafc.globo.com',
//     path,
//     method: 'GET',
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
//     }
//   };
//
//   const req = https.request(options, (res) => {
//     res.on('data', (d) => {
//       var json = d.toString();
//       fs.writeFileSync(file, json);
//     });
//   });
//
//   req.on('error', (e) => {
//     console.error(e);
//   });
//   req.end();
// };
//
// var lerArquivo = (arquivo) => {
//   try {
//     var arquivoString = fs.readFileSync(arquivo);
//     // console.log(arquivoString);
//     // console.log(JSON.parse(arquivoString));
//     return JSON.parse(arquivoString);
//   } catch (e) {
//     return [];
//   }
// };
//
// // fetch('/mercado/status', 'status.json');
// // fetch('/atletas/mercado', 'mercado.json');
// // fetch('/mercado/destaques', 'mercado_destaques.json');
//
// // var destaques = lerArquivo('mercado_destaques.json');
// // console.log(`Temos ${destaques.length} atletas em destaque no mercado.`);
// // destaques.forEach((destaque) => logDestaques(destaque));
//
// // var mercado = lerArquivo('mercado.json');
// // console.log(`Temos ${mercado.length} atletas no mercado.`);
// // mercado.forEach((atletas) => logAtletas(atletas));
//
// //CLUBES
// // fetch('/clubes', 'clubes.json');
// var clubes = lerArquivo('clubes.json');
// var filter = [];
// Object.keys(clubes).map(function(key) {
//   filter.push(clubes[key]);
// });
//
// filter.forEach((clube) => log.logClubes(clube));

var request = require('request');
var fetch = (path, callback) => {
  request({
    uri: 'https://api.cartolafc.globo.com' + path,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0'
    },
    json: true
}, function(error, response, body) {
  if (error) {
    console.log("Error" + error);
  }

  setTimeout(() => {
    callback(body);
  }, 0);
});

};

// fetch('/atletas/mercado', (body) => {
//   // console.log(body);
// body.atletas.forEach(element => {
//   if (body.clubes[element.clube_id].nome === 'Flamengo') {
//     console.log(`Atleta: ${element.apelido} Clube: ${body.clubes[element.clube_id].nome} `);
//   }
//     // console.log(`Atleta: ${element.apelido} Clube: ${body.clubes[element.clube_id].nome} `);
//   });


// });

fetch('/time/slug/salpico-fc', (body) => {
  console.log(`RODADA: ${body.rodada_atual}`);
  console.log('---------');
  body.atletas.sort((a, b) => parseFloat(a.posicao_id) - parseFloat(b.posicao_id))
  .forEach(element => {
    if (element.atleta_id === body.capitao_id) {
      console.log(`${element.apelido} - Pts: ${element.pontos_num * 2} - CAPITÃO`)
    } else {

      console.log(`${element.apelido} - Pts: ${element.pontos_num}`)
    }
  });
  console.log('---------');
  console.log(`${body.pontos} Pontos`);
});

// fetch('/mercado/destaques', (body) => {
//   console.log('DESTAQUES');
//   console.log('---------');
//   body.sort((a, b) => parseFloat(b.escalacoes) - parseFloat(a.escalacoes))
//       .forEach(element => console.log(`${element.Atleta.apelido} - ${element.clube} - ${element.escalacoes}`));
//     });

// fetch('/partidas', (body) => {
//   console.log(`RODADA ${body.rodada}`);
//   body.partidas.forEach(element => console.log(`${body.clubes[element.clube_casa_id].nome} x ${body.clubes[element.clube_visitante_id].nome}`));
//     });

// fetch('/clubes', (body) => {
//   Object.keys(body).forEach(function (key) {
//      console.log(`${body[key].nome}`)
//   });
// });
