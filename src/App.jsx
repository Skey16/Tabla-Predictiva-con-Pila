import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { analizadorSintactico } from './analizadorSintactico';


function App() {
  const [cadena, setCadena] = useState('');
  const [resultado, setResultado] = useState(null);
  const [pilaInfo, setPilaInfo] = useState([]);
  

  const analizarCadena = () => {
    const { esValida, infoPila } = analizadorSintactico(cadena);
    setResultado(esValida);
    setPilaInfo(infoPila);
  };

  const editorDidMount = (editor, monaco) => {
    console.log('Editor montado');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{ textAlign:'center', paddingLeft: '360px'}}>
      <h4>Keyla Lorena Sosa  Rosales 213482</h4>
      </div>

      <div style={{ width: '800px', marginBottom: '10px', paddingLeft: '360px'}}>
        <MonacoEditor
          width="800"
          height="200"
          language="plaintext"
          theme="vs-dark"
          value={cadena}
          onChange={setCadena}
          editorDidMount={editorDidMount}
        />
      </div>
      <div style={{padding: '10px',textAlign:'center', paddingLeft: '360px'}} >
      <button onClick={analizarCadena}>Analizar</button>
      </div>
      {resultado !== null && (
        <p>
          La cadena {cadena} es {resultado ? 'válida' : 'inválida'}.
        </p>
      )}


      <div>
        <h3>REPORTE DE INFORMACIÓN:</h3>
        <ul>
          {pilaInfo.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;