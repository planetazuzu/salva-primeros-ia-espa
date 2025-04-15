
const handleChangeAIMode = (mode: AIMode) => {
  switch (mode) {
    case 'huggingface':
      if (!modelLoadingStatus.isLoaded) {
        loadHuggingFaceModel();
      } else {
        setAiMode(mode);
      }
      break;
    case 'ollama':
      testOllamaConnection();
      break;
    default:
      setAiMode(mode);
  }
  
  let modeDescription = '';
  switch (mode) {
    case 'openai':
      modeDescription = 'ChatGPT';
      break;
    case 'huggingface':
      modeDescription = 'modelo local gratuito';
      break;
    case 'ollama':
      modeDescription = 'tu servidor Ollama local';
      break;
    case 'simulado':
      modeDescription = 'respuestas predefinidas';
      break;
  }
  
  toast({
    title: `Modo ${mode === 'openai' ? 'OpenAI' : mode === 'huggingface' ? 'Local (Hugging Face)' : mode === 'ollama' ? 'Ollama (Servidor local)' : 'Simulado'} activado`,
    description: `Ahora estás usando ${modeDescription}`,
  });
};
