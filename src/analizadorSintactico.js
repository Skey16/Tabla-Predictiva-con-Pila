function analizadorSintactico(cadena) {
  let pila = ['$', 'S']; // Cambio inicial a 'S'
  let apuntador = 0;
  let infoPila = [];
  let permitirEspacio = true; // Permitir espacios inicialmente ya que la entrada puede tener espacios
  let ultimaProduccion = '';

  const pushInfo = (X) => {
    infoPila.push(`Push: ${X}, Cadena: ${cadena.slice(apuntador)}`);
  };

  const popInfo = (X, a) => {
    infoPila.push(`Pop: ${X}, Carácter actual: '${a}', Cadena restante: '${cadena.slice(apuntador)}'`);
  };

  while (pila.length > 0) {
    const X = pila[pila.length - 1];
    let a = cadena[apuntador];

    // Se modifica para permitir espacios de forma más adecuada a la gramática dada
    if ((a === ' ' || a === '\n') && permitirEspacio) {
      apuntador++;
      continue;
    }

    if (X === '$') {
      infoPila.push('Análisis completado.');
      pila.pop();
      break;
    }

    if (X === a) {
      popInfo(X, a);
      pila.pop();
      apuntador++;
      permitirEspacio = true; // Se permite espacios después de matchear un terminal
    } else if (esNoTerminal(X)) {
      const produccion = obtenerProduccion(X, a);
      if (produccion) {
        popInfo(X, a);
        pila.pop();
        pushInfo(X);
        permitirEspacio = true; // Se permite espacios después de una producción

        if (produccion[0] !== 'ε') {
          for (let i = produccion.length - 1; i >= 0; i--) {
            pila.push(produccion[i]);
          }
        }
      } else {
        infoPila.push(`Error: No se pudo encontrar una producción válida para ${X}.`);
        return { esValida: false, infoPila };
      }
    } else {
      permitirEspacio = false;
      popInfo(X, a);
      return { esValida: false, infoPila };
    }
  }

  return { esValida: apuntador === cadena.length, infoPila };
}

function esNoTerminal(simbolo) {
  return /[A-Z]/.test(simbolo);
}

function obtenerProduccion(noTerminal, next) {
  switch (noTerminal) {
    case 'S':
      return ['A', 'B', 'V'];
    case 'A':
      return ['a','u','t','o','m','a','t','a']; 
    case 'V':
      return ['f','i','n'];
    case 'B':
      return ['ED', 'Q', 'F'];
    case 'ED':
      return ['I', ':', 'D', '-', 'N', ';'];
    case 'I':
      return ['e','s','t','a','d','o'];
    case 'D':
      return /[0-9]/.test(next) ? [next] : null; 
    case 'N':
      return ['D', 'E'];
    case 'E':
      return /[0-9]/.test(next) ? ['D', 'E'] : ['ε']; 
    case 'Q':
      return ['i','n','i','c','i','o', ':', 'D', ';'];
    case 'F':
      return ['P', ':', 'N', ';'];
    case 'P':
      return ['a','c','e','p','t','a','c','i','o','n'];
    default:
      return null;
  }
}

export { analizadorSintactico, esNoTerminal, obtenerProduccion };
