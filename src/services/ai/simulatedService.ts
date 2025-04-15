
// Function to generate simulated responses based on keywords
export const generateSimulatedResponse = (userMessage: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userMessage.toLowerCase().includes('atragantamiento')) {
        resolve(
          'Para ayudar a alguien que se está atragantando: \n\n' +
          '1. Anima a la persona a toser para expulsar el objeto. \n' +
          '2. Si no puede toser, hablar o respirar, realiza la maniobra de Heimlich: \n' +
          '   - Colócate detrás de la persona y rodea su cintura con tus brazos. \n' +
          '   - Haz un puño con una mano y colócalo ligeramente por encima del ombligo. \n' +
          '   - Sujeta el puño con la otra mano y presiona hacia dentro y hacia arriba con movimientos rápidos. \n' +
          '3. Continúa hasta que el objeto sea expulsado o la persona pierda el conocimiento. \n' +
          '4. Si pierde el conocimiento, comienza la RCP.'
        );
      } else if (userMessage.toLowerCase().includes('rcp') || userMessage.toLowerCase().includes('reanimación')) {
        resolve(
          'Pasos básicos para realizar la RCP en adultos: \n\n' +
          '1. Asegura la escena y comprueba si la persona responde. \n' +
          '2. Si no responde y no respira o solo jadea, llama a emergencias. \n' +
          '3. Coloca a la persona boca arriba en una superficie firme. \n' +
          '4. Coloca las manos una sobre otra en el centro del pecho. \n' +
          '5. Mantén los brazos rectos y usa el peso de tu cuerpo para comprimir. \n' +
          '6. Realiza compresiones de al menos 5 cm de profundidad a un ritmo de 100-120 por minuto. \n' +
          '7. Si estás entrenado, da 2 respiraciones después de cada 30 compresiones. \n' +
          '8. Continúa hasta que llegue ayuda profesional o la persona muestre signos de vida.'
        );
      } else if (userMessage.toLowerCase().includes('quemadura')) {
        resolve(
          'Para tratar una quemadura leve: \n\n' +
          '1. Enfría la quemadura con agua corriente a temperatura ambiente durante 10-20 minutos. \n' +
          '2. No uses hielo, ya que puede empeorar la lesión. \n' +
          '3. Retira anillos, relojes u otros objetos ajustados cerca de la zona quemada. \n' +
          '4. Cubre la quemadura con un vendaje estéril no adherente o una gasa limpia. \n' +
          '5. Usa un analgésico de venta libre si es necesario para el dolor. \n' +
          '6. No apliques mantequilla, aceite, pasta dental ni remedios caseros. \n\n' +
          'Busca atención médica si la quemadura: \n' +
          '- Es mayor que el tamaño de la palma de la mano. \n' +
          '- Afecta articulaciones, cara, manos, pies o genitales. \n' +
          '- Forma ampollas o tiene aspecto blanco o carbonizado. \n' +
          '- Es causada por productos químicos o electricidad.'
        );
      } else if (userMessage.toLowerCase().includes('hemorragia') && userMessage.toLowerCase().includes('nasal')) {
        resolve(
          'Para detener una hemorragia nasal: \n\n' +
          '1. Siéntate e inclina ligeramente la cabeza hacia adelante (no hacia atrás). \n' +
          '2. Presiona la parte blanda de la nariz (justo debajo del puente) con el pulgar y el índice. \n' +
          '3. Mantén la presión constante durante al menos 10-15 minutos sin interrupciones. \n' +
          '4. Respira por la boca y escupe cualquier sangre que llegue a la garganta. \n' +
          '5. Puedes aplicar una compresa fría en el puente de la nariz para ayudar a contraer los vasos sanguíneos. \n\n' +
          'Busca atención médica si: \n' +
          '- El sangrado no se detiene después de 20-30 minutos. \n' +
          '- La hemorragia es abundante. \n' +
          '- Fue causada por un traumatismo fuerte. \n' +
          '- Ocurre frecuentemente.'
        );
      } else {
        resolve(
          'Gracias por tu pregunta. Como asistente virtual básico, tengo información limitada. Para obtener consejos específicos sobre primeros auxilios, te recomiendo: \n\n' +
          '1. Explorar las secciones educativas de nuestra plataforma. \n' +
          '2. Consultar preguntas frecuentes como atragantamiento, RCP, quemaduras o hemorragias nasales. \n' +
          '3. Para emergencias reales, siempre llama inmediatamente a los servicios de emergencia (911, 112 o el número local).'
        );
      }
    }, 1500);
  });
};
