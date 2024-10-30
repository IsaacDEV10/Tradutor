import { useState, useEffect, useCallback } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "de", name: "Alemão" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
];

function App() {
  const [sourceLang, setSourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (sourceText) handleTranslate();
    }, 500);
    return () => clearTimeout(delay);
  }, [sourceText, sourceLang, targetLang]); 

  const handleTranslate = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          sourceText
        )}&langpair=${sourceLang}|${targetLang}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`);
      }

      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      console.error("Erro ao traduzir:", error);
      setTranslatedText("Erro ao traduzir. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText); 
    setTranslatedText("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-neutral-900 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
          <h1 className="text-headerColor text-2xl font-bold">Tradutor</h1>
        </div>
      </header>

      <main className="flex-grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-5xl bg-neutral-900 rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-neutral-700">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="text-sm text-textColor bg-transparent border-none outline-none focus:outline-none focus:ring-0 cursor-pointer rounded-lg"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              onClick={swapLanguages}
              className="p-2 rounded-full hover:bg-neutral-800 focus:outline-none"
            >
              <svg
                className="w-5 h-5 text-headerColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="text-sm text-textColor bg-transparent border-none outline-none focus:outline-none focus:ring-0 cursor-pointer rounded-lg"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Digite seu texto"
                className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none focus:outline-none focus:ring-0"
              ></textarea>
            </div>
            <div className="p-4 relative bg-secondaryBackground border-l border-neutral-700">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                </div>
              ) : (
                <p className="text-lg text-textColor">{translatedText}</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-900 border-t border-neutral-900 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-headerColor">
          &copy; {new Date().getFullYear()} Isaac Luiz
        </div>
      </footer>
    </div>
  );
}

export default App;
