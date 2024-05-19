class URLShortener {
    constructor() {
        this.urlMap = new Map();
        this.shortUrlMap = new Map();
        this.characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.shortUrlLength = 6; // Length of the shortened URL
        this.baseUrl = 'http://short.url/'; // Base URL for shortened URLs
    }

    // Function to generate a random string
    generateRandomString(length) {
        let randomString = '';
        for (let i = 0; i < length; i++) {
            randomString += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        }
        return randomString;
    }

    // Function to encode long URL to a shortened URL
    encodeURL(longURL) {
        if (this.urlMap.has(longURL)) {
            return this.urlMap.get(longURL);
        }

        let shortCode;
        do {
            shortCode = this.generateRandomString(this.shortUrlLength);
        } while (this.shortUrlMap.has(shortCode));

        const shortURL = this.baseUrl + shortCode;
        this.urlMap.set(longURL, shortURL);
        this.shortUrlMap.set(shortCode, longURL);
        return shortURL;
    }

    // Function to decode shortened URL to its original long URL
    decodeURL(shortURL) {
        const shortCode = shortURL.replace(this.baseUrl, '');
        if (this.shortUrlMap.has(shortCode)) {
            return this.shortUrlMap.get(shortCode);
        } else {
            return "Shortened URL not found";
        }
    }
}

const urlShortener = new URLShortener();

function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const shortUrl = urlShortener.encodeURL(longUrl);
    document.getElementById('shortUrl').textContent = shortUrl;
}

function redirectToLongUrl() {
    const shortUrlInput = document.getElementById('shortUrlInput').value;
    const longUrl = urlShortener.decodeURL(shortUrlInput);
    if (longUrl !== "Shortened URL not found") {
        window.location.href = longUrl;
    } else {
        document.getElementById('originalUrl').textContent = longUrl;
    }
}
