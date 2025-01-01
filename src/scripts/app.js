// This file is intentionally left blank.

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const homePage = document.getElementById('home-page');
    const counterPage = document.getElementById('counter-page');
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');
    const charNoSpaceCount = document.getElementById('char-no-space-count');
    const paragraphCount = document.getElementById('paragraph-count');
    const backBtn = document.getElementById('back-btn');
    const generateBtn = document.getElementById('generate-btn');
    const prefixInput = document.getElementById('prefix-input');
    const suffixInput = document.getElementById('suffix-input');
    const charLength = document.getElementById('char-length');
    const includeSpaces = document.getElementById('include-spaces');
    const resultArea = document.getElementById('result-area');
    const generatorPage = document.getElementById('generator-page');
    const startGeneratorBtn = document.getElementById('start-generator-btn');
    const backFromGeneratorBtn = document.getElementById('back-from-generator-btn');
    const includeAffixLength = document.getElementById('include-affix-length');
    const copyBtn = document.getElementById('copy-btn');

    // Sayfa geçişleri için fonksiyonlar
    function showHomePage() {
        homePage.style.display = 'block';
        counterPage.style.display = 'none';
        generatorPage.style.display = 'none';
    }

    function showCounterPage() {
        homePage.style.display = 'none';
        counterPage.style.display = 'block';
        generatorPage.style.display = 'none';
    }

    function showGeneratorPage() {
        homePage.style.display = 'none';
        counterPage.style.display = 'none';
        generatorPage.style.display = 'block';
    }

    // Event listeners
    startBtn.addEventListener('click', showCounterPage);
    backBtn.addEventListener('click', showHomePage);
    startGeneratorBtn.addEventListener('click', showGeneratorPage);
    backFromGeneratorBtn.addEventListener('click', showHomePage);

    // Random string oluşturma fonksiyonu
    function generateRandomString(length, includeSpaces) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charsLength = chars.length;
        
        for (let i = 0; i < length; i++) {
            if (includeSpaces && i > 0 && i < length - 1 && Math.random() < 0.2) {
                result += ' ';
            } else {
                result += chars.charAt(Math.floor(Math.random() * charsLength));
            }
        }
        return result;
    }

    // Generate butonu için event listener
    generateBtn.addEventListener('click', function() {
        const prefix = prefixInput.value;
        const suffix = suffixInput.value;
        let length = parseInt(charLength.value);
        const withSpaces = includeSpaces.checked;
        const countAffix = includeAffixLength.checked;

        if (length < 1) {
            alert('Lütfen geçerli bir karakter sayısı girin!');
            return;
        }

        // Eğer prefix ve suffix uzunluğu dahil edilecekse, ana uzunluktan çıkar
        if (countAffix) {
            length = Math.max(1, length - (prefix.length + suffix.length));
        }

        const randomPart = generateRandomString(length, withSpaces);
        const finalResult = `${prefix}${randomPart}${suffix}`;
        resultArea.value = finalResult;
    });

    // Kopyalama butonu için event listener
    copyBtn.addEventListener('click', function() {
        resultArea.select();
        document.execCommand('copy');
        
        // Kopyalama animasyonu
        copyBtn.classList.add('btn-copied');
        copyBtn.innerHTML = '<i class="bi bi-check2"></i> Kopyalandı';
        
        setTimeout(() => {
            copyBtn.classList.remove('btn-copied');
            copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Kopyala';
        }, 2000);
    });

    // Text input için event listener
    textInput.addEventListener('input', function() {
        const text = this.value;
        
        // Karakter sayısı
        charCount.textContent = text.length;
        
        // Sözcük sayısı
        const words = text.trim().split(/\s+/);
        wordCount.textContent = text.trim() === '' ? 0 : words.length;
        
        // Boşluksuz karakter sayısı
        charNoSpaceCount.textContent = text.replace(/\s/g, '').length;
        
        // Paragraf sayısı
        const paragraphs = text.trim().split(/\n\s*\n/);
        paragraphCount.textContent = text.trim() === '' ? 0 : paragraphs.length;
    });
});