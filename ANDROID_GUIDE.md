# Android APK Oluşturma Rehberi

Bu proje, modern bir Web Uygulaması (PWA) olarak tasarlanmıştır. Bu sayede, herhangi bir kod değişikliği yapmadan **Android APK** dosyasına dönüştürülebilir. Aşağıdaki yöntemlerden birini seçerek uygulamanızı Google Play Store'a hazır hale getirebilirsiniz.

## Yöntem 1: PWABuilder (En Kolay Yöntem)

PWABuilder, web sitenizi otomatik olarak bir APK dosyasına dönüştüren ücretsiz bir Microsoft aracıdır.

1.  **Projeyi Yayınlayın:**
    Öncelikle bu kodları bir sunucuya (GitHub Pages, Vercel, Netlify vb.) yükleyin.
    Örneğin: `https://kullaniciadi.github.io/periyopoly/`

2.  **PWABuilder'a Gidin:**
    [pwabuilder.com](https://www.pwabuilder.com/) adresini açın.

3.  **URL'yi Girin:**
    Yayınladığınız oyunun URL adresini kutuya yapıştırın ve "Start" butonuna basın.

4.  **Skorunuzu Kontrol Edin:**
    Sistem `manifest.json`, `service-worker.js` ve ikonları kontrol edecektir. Her şey hazır olduğu için yüksek bir skor almalısınız.

5.  **Build (Oluştur):**
    "Package for Stores" butonuna tıklayın.
    "Android" seçeneğini seçin.
    Gerekli bilgileri (Uygulama Adı, Paket Kimliği vb.) doldurun ve APK/AAB dosyasını indirin.

---

## Yöntem 2: Cordova / Capacitor (Geliştirici Yöntemi)

Eğer projeyi tamamen çevrimdışı çalışacak yerel bir uygulama gibi paketlemek isterseniz:

### Gereksinimler
- Node.js
- Android Studio

### Kurulum Adımları

1.  **Cordova'yı Yükleyin:**
    ```bash
    npm install -g cordova
    ```

2.  **Yeni Proje Oluşturun:**
    ```bash
    cordova create periyopoly com.ornek.periyopoly "Periyopoly"
    cd periyopoly
    ```

3.  **Android Platformunu Ekleyin:**
    ```bash
    cordova platform add android
    ```

4.  **Dosyaları Kopyalayın:**
    Bu projedeki tüm dosyaları (`index.html`, `style.css`, `script.js`, `icon.svg` vb.) Cordova projesindeki `www/` klasörüne kopyalayın (mevcut olanları silin).

5.  **APK Oluşturun:**
    ```bash
    cordova build android
    ```
    APK dosyası `platforms/android/app/build/outputs/apk/debug/` klasöründe oluşacaktır.

---

## Önemli Notlar

-   **Yatay Mod (Landscape):** Oyun, kod içinde zorunlu yatay mod korumasına sahiptir. `manifest.json` dosyasında da `orientation: landscape` ayarı yapılmıştır.
-   **Tam Ekran:** Oyun açıldığında durum çubuğunu gizlemek için "Tam Ekran" butonu eklenmiştir.
-   **İkon:** `icon.svg` dosyası uygulamanızın logosu olarak ayarlanmıştır.
