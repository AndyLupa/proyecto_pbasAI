
require('dotenv').config();
const OpenAI = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function makeRequest() {
    try {
        const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { 
                role: 'user', 
                content: '¿Cuál es la capital de Argentina?' },
        ],
        });

        console.log('Respuesta:', response.choices[0].message.content);

    } catch (error) {
    
        console.error('Error al llamar a la API:', error.message);
  
    }
}

makeRequest();


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