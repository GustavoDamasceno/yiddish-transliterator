function limparTexto() {
    const textarea = document.getElementById('bar');
    textarea.value = '';
  }

    /**
     * Palavras/frases (escrita iídiche/hebraica) → transliteração desejada.
     * Chaves mais longas são avaliadas primeiro (ex.: "מזל טוב" antes de partes).
     * Só fazem match como palavra inteira (não dentro de הושלום).
     */
    const EXCECOES_TRANSLITERACAO_IIDICHE = {
      "שלום": "sholem",
      "שבת": "shabes",
      "תורה": "toyre",
      "מצוה": "mitsve",
      "ברכה": "brokhe",
      "אמן": "omen",
      "חנוכה": "khanike",
      "פסח": "peysekh",
      "סוכות": "sukes",
      "מזל טוב": "mazel tov",
      "עליכם": "aleykhem",
      "יהודה": "yude",
      "יהודי": "yid",
      "יהודים": "yidn",
      "ייִדיש": "yidish"
    };

    const CHAVES_EXCECOES_IIDICHE = Object.keys(EXCECOES_TRANSLITERACAO_IIDICHE).sort(
      function (a, b) { return b.length - a.length; }
    );

    function caractereIidicheOuHebraico(c) {
      if (!c) return false;
      var u = c.codePointAt(0);
      return (u >= 0x0591 && u <= 0x05F4) || (u >= 0xFB1D && u <= 0xFB4F);
    }

    function limitePalavraExcecaoAntes(str, i) {
      if (i === 0) return true;
      return !caractereIidicheOuHebraico(str[i - 1]);
    }

    function limitePalavraExcecaoDepois(str, j) {
      if (j >= str.length) return true;
      return !caractereIidicheOuHebraico(str[j]);
    }

    function transliterar() {
      const textarea = document.getElementById('bar');
      const texto = textarea.value;
      const transliteracao = transliterarTextoIidiche(texto);
      const textoTransliterado = texto + " (" + transliteracao + ")";
      textarea.value = textoTransliterado;
    }

    /** Transliteração por ortografia iídiche (sem niqqud massético hebraico). */
    function transliterarTextoIidiche(texto) {
      const pares = [
        ['דזש', 'dzh'],
        ['יי\u05B7', 'ay'],
        ['ייַ', 'ay'],
        ['ײַ', 'ay'],
        ['טש', 'tsh'],
        ['זש', 'zh'],
        ['וו', 'v'],
        ['װ', 'v'],
        ['וי', 'oy'],
        ['ױ', 'oy'],
        ['יי', 'ey'],
        ['ײ', 'ey'],
        ['פֿ', 'f'],
        ['פּ', 'p'],
        ['ו\u05BC', 'u'],
        ['א\u05B7', 'a'],
        ['אַ', 'a'],
        ['א\u05B8', 'o'],
        ['אָ', 'o'],
        ['י\u05B4', 'i'],
        ['יִ', 'i'],
        ['כ\u05BC', 'k'],
        ['כּ', 'k'],
        ['ת\u05BC', 't'],
        ['תּ', 't'],
        ['ש\u05C1', 'sh'],
        ['שׁ', 'sh'],
        ['ש\u05C2', 's'],
        ['שׂ', 's'],
        ['א', ''],
        ['ע', 'e'],
        ['י', null],
        ['ו', 'u'],
        ['ב', 'b'],
        ['ד', 'd'],
        ['ג', 'g'],
        ['ה', 'h'],
        ['ז', 'z'],
        ['ט', 't'],
        ['כ', 'kh'],
        ['ך', 'kh'],
        ['ל', 'l'],
        ['מ', 'm'],
        ['ם', 'm'],
        ['נ', 'n'],
        ['ן', 'n'],
        ['ס', 's'],
        ['פ', 'f'],
        ['ף', 'f'],
        ['צ', 'ts'],
        ['ץ', 'ts'],
        ['ק', 'k'],
        ['ר', 'r'],
        ['ש', 'sh'],
        ['ת', 's'],
        ['ח', 'kh'],
        ['שׂ', 's'],
        ['־', '-'],
      ];

      pares.sort((a, b) => b[0].length - a[0].length);

      function yudSozinho(i) {
        if (i === 0) return 'y';
        const ant = texto[i - 1];
        if (ant === ' ' || ant === '\n' || ant === '\t' || ant === '(' || ant === '[') return 'y';
        return 'i';
      }

      function inicioDePalavra(pos) {
        if (pos === 0) return true;
        const a = texto[pos - 1];
        return a === ' ' || a === '\n' || a === '\t' || a === '\u05BE';
      }

      let transliteracao = '';
      let i = 0;
      while (i < texto.length) {
        if (limitePalavraExcecaoAntes(texto, i)) {
          let excecaoUsada = false;
          for (let e = 0; e < CHAVES_EXCECOES_IIDICHE.length; e++) {
            const chaveEx = CHAVES_EXCECOES_IIDICHE[e];
            if (
              texto.startsWith(chaveEx, i) &&
              limitePalavraExcecaoDepois(texto, i + chaveEx.length)
            ) {
              transliteracao += EXCECOES_TRANSLITERACAO_IIDICHE[chaveEx];
              i += chaveEx.length;
              excecaoUsada = true;
              break;
            }
          }
          if (excecaoUsada) continue;
        }
        if (inicioDePalavra(i) && texto.startsWith('ייד', i)) {
          transliteracao += 'yid';
          i += 3;
          continue;
        }
        let encontrado = false;
        for (let p = 0; p < pares.length; p++) {
          const pat = pares[p][0];
          const rep = pares[p][1];
          if (texto.startsWith(pat, i)) {
            if (rep === null) {
              transliteracao += yudSozinho(i);
            } else {
              transliteracao += rep;
            }
            i += pat.length;
            encontrado = true;
            break;
          }
        }
        if (!encontrado) {
          transliteracao += texto[i];
          i++;
        }
      }

      return transliteracao;
    }
