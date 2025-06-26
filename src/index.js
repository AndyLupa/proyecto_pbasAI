
require('dotenv').config();
const OpenAI = require('openai');
const path = require('path');
const connection = require('db.js');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});




const datos = () => {
  let sql= `SELECT DOC.casa, DOC.nombre, DOC.ano, DOC.genero, DOC.golfativo, DOC.top, DOC.middle, DOC.BASE,
            DOC.url, DOC.DESCRIP
            FROM WEB.fragancias_doc DOC
            WHERE DELETED=0
            AND DOC.nombre="Bergamote Boisee"`;
  connection.query(sql, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      return;
    }    
    const json = JSON.stringify(resultados, null, 2);
    console.log(json);
  });
};




async function makeRequest1() {
    try {
        const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { 
                role: 'user', 
                content: 'eres un perfumista experto, ARMA UNA PIRAMIDE OLFATIVA NUEVA, DAME UN TEXTO MEJOR ENUNCIADO Y CON ORIENTACION AL CLIENTE con estos datos: '+ datos() },
        ],
        });

        console.log('Respuesta:', response.choices[0].message.content);

    } catch (error) {
    
        console.error('Error al llamar a la API:', error.message);
  
    }
}

makeRequest1();


/*

require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const pdfParse = require('pdf-parse');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analizarPDF() {
  const dataBuffer = fs.readFileSync('./archivosPDF/210321.pdf'); 
  const pdfData = await pdfParse(dataBuffer);

  const texto = pdfData.text.slice(0, 3000);

  const response = await openai.chat.completions.create({
     model: "gpt-4o-mini",
    messages: [
      {
        role: 'user',
        content: `const prompt ="Extraé en JSON los siguientes datos (solo una vez si aparecen múltiples veces): 
                - Nro de CAE
                - Vto CAE
                - Nro de Factura
                - Importe Neto
                - Importe IVA
                - Importe Total
                - Fecha de Emisión
                - Fecha de Vencimiento

                El resultado debe estar en formato JSON válido.

                Texto OCR: :\n\n${texto}`,
        max_tokens: 1000,
      },
    ],
  });

  console.log('JSON generado:');
  console.log(response.choices[0].message.content);
}

analizarPDF();

*/