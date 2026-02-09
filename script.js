    const questions = [ 
        "Atomun merkezinde çekirdek mi vardır?", "Proton pozitif yüklü müdür?", "Elektronlar çekirdekte mi bulunur? (Hayır)", 
        "Su H2O formülüyle mi gösterilir?", "Demir bir metal midir?", "Oksijen yakıcı bir gaz mıdır?", 
        "Helyum uçan balonlarda kullanılır mı?", "Atom numarası proton sayısına eşit midir?", "Periyodik tabloda 7 periyot mu vardır?", 
        "Soygazlar tepkimeye girmeye istekli midir? (Hayır)", "Altın (Au) paslanır mı? (Hayır)", "En hafif element Hidrojen midir?", 
        "Elmas karbondan mı oluşur?", "Cıva oda sıcaklığında sıvı mıdır?", "Tuzun formülü NaCl midir?", 
        "Klor gazı yeşilimsi sarı mıdır?", "Lityum pillerde kullanılır mı?", "Flor diş macununda bulunur mu?" 
    ]; 
 
    // BİLİM İNSANI VE GÖRSEL DATABASE (GÜNCEL LİNKLER) 
const elements = [ 
  { id:1, sym:'H', name:'Hidrojen', no:1, type:'ametal', desc:'Evrenin yakıtı. Henry Cavendish tarafından keşfedildi.', img:'bilimadami/henry.webp' }, 
  { id:2, sym:'He', name:'Helyum', no:2, type:'soygaz', desc:'Güneş’te bulundu. Pierre Janssen ilk gözlemleyenlerdendi.', img:'bilimadami/alamy.webp' }, // Görseldeki 'alamy' etiketi Janssen'e ait 
  { id:3, sym:'Li', name:'Lityum', no:3, type:'metal', desc:'Johan August Arfwedson tarafından keşfedildi. Pillerde kullanılır.', img:'bilimadami/august.webp' }, 
  { id:4, sym:'Be', name:'Berilyum', no:4, type:'metal', desc:'Louis Nicolas Vauquelin tarafından zümrütte bulundu.', img:'bilimadami/nicolas.webp' }, 
  { id:5, sym:'B', name:'Bor', no:5, type:'ametal', desc:'Gay-Lussac ve Thenard tarafından izole edildi.', img:'bilimadami/gaylussac.webp' }, 
  { id:6, sym:'C', name:'Karbon', no:6, type:'ametal', desc:'Modern kimyanın babası Antoine Lavoisier tanımladı.', img:'bilimadami/lavoiser.webp' }, 
  { id:7, sym:'N', name:'Azot', no:7, type:'ametal', desc:'Daniel Rutherford tarafından keşfedildi. Havanın %78’i.', img:'bilimadami/rutherford.webp' }, 
  { id:8, sym:'O', name:'Oksijen', no:8, type:'ametal', desc:'Joseph Priestley deneyleriyle ünlü kâşifidir.', img:'bilimadami/priestley.webp' }, 
  { id:9, sym:'F', name:'Flor', no:9, type:'ametal', desc:'Henri Moissan tarafından izole edildi (Nobel Ödülü).', img:'bilimadami/moissan.webp' }, 
  { id:10, sym:'Ne', name:'Neon', no:10, type:'soygaz', desc:'William Ramsay tarafından keşfedildi. Neon lambaları.', img:'bilimadami/ramsay.webp' }, 
  { id:11, sym:'Na', name:'Sodyum', no:11, type:'metal', desc:'Humphry Davy tarafından elektrikle ayrıştırıldı.', img:'bilimadami/davy.webp' }, 
  { id:12, sym:'Mg', name:'Magnezyum', no:12, type:'metal', desc:'Humphry Davy tarafından elde edildi. Parlak ışık saçar.', img:'bilimadami/davy.webp' }, 
  { id:13, sym:'Al', name:'Alüminyum', no:13, type:'metal', desc:'Hans Christian Ørsted tarafından elde edildi.', img:'bilimadami/orsted.webp' }, 
  { id:14, sym:'Si', name:'Silisyum', no:14, type:'ametal', desc:'Jöns Jacob Berzelius tarafından izole edildi.', img:'bilimadami/berzelius.webp' }, 
  { id:15, sym:'P', name:'Fosfor', no:15, type:'ametal', desc:'Simyacı Hennig Brand tarafından keşfedildi.', img:'bilimadami/brand.webp' }, 
  { id:16, sym:'S', name:'Kükürt', no:16, type:'ametal', desc:'Antik çağlardan beri bilinir. Sarı kristaldir.', img:'bilimadami/lavoiser.webp' }, // Kükürtün element olduğunu Lavoisier kanıtlamıştır 
  { id:17, sym:'Cl', name:'Klor', no:17, type:'ametal', desc:'Carl Wilhelm Scheele tarafından keşfedildi.', img:'bilimadami/scheele.webp' }, 
  { id:18, sym:'Ar', name:'Argon', no:18, type:'soygaz', desc:'Lord Rayleigh ve William Ramsay tarafından keşfedildi.', img:'bilimadami/strutt.webp' }, // Lord Rayleigh (John William Strutt) 
  { id:19, sym:'K', name:'Potasyum', no:19, type:'metal', desc:'Humphry Davy tarafından keşfedildi. Suyla şiddetli tepkime verir.', img:'bilimadami/davy.webp' }, 
  { id:20, sym:'Ca', name:'Kalsiyum', no:20, type:'metal', desc:'Kemik ve dişlerin ana bileşeni. Humphry Davy tarafından izole edildi.', img:'bilimadami/davy.webp' } 
]; 
 
 
    let tiles = []; 
    let players = []; 
    let turn = 0; 
    let rankCounter = 1; 
    let wait = false; 
    const TARGET = 10000; 
 
    function initTiles() { 
        let eIdx = 0; 
        for(let i=0; i<28; i++) { 
            let t = { idx: i }; 
            if (i===0) { t.type='corner'; t.title='BAŞLANGIÇ'; t.icon='🏁'; t.desc='Geçişte +500 Puan'; } 
            else if (i===7) { t.type='penalty'; t.title='LAB KAZASI'; t.icon='💥'; t.desc='Riskli Bölge!'; } 
            else if (i===14) { t.type='corner'; t.title='TENEFFÜS'; t.icon='☕'; t.desc='Dinlenme alanı.'; } 
            else if (i===21) { t.type='penalty'; t.title='DİSİPLİN'; t.icon='⚠️'; t.desc='Kurallara uy!'; } 
            else if ([5,12,19,26].includes(i)) { t.type='chance'; t.title='ŞANS'; t.icon='🍀'; t.desc='Doğru bil +1000 Puan!'; } 
            else { 
                if(eIdx < elements.length) { t.type = 'element'; t.data = elements[eIdx]; eIdx++; } 
                else { t.type='chance'; t.title='ŞANS'; t.icon='🍀'; t.desc='Fırsat Kartı'; } 
            } 
            tiles.push(t); 
        } 
    } 
 
    function addInput() { 
        let d = document.getElementById('player-inputs'); 
        if(d.children.length < 6) { 
            d.innerHTML += `<div class="input-group"><input type="text" value="Oyuncu ${d.children.length+1}"></div>`; 
        } 
    } 
    addInput(); addInput(); 
 
    function startGame() { 
        SoundManager.init(); // Initialize Audio
        let inputs = document.querySelectorAll('#player-inputs input'); 
        let colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#3498db', '#9b59b6', '#1abc9c']; 
        let count = 0; 
        inputs.forEach((inp, i) => { 
            if(inp.value.trim()) { 
                players.push({ id: i, name: inp.value, money: 1500, pos: 0, color: colors[i], status: 'active', rank: 0 }); 
                count++; 
            } 
        }); 
        if(count < 2) { alert("En az 2 oyuncu!"); return; } 
        document.getElementById('setup-screen').style.display = 'none'; 
        document.getElementById('game-container').style.display = 'flex'; 
        initTiles(); 
        renderBoard(); 
        updateUI(); 
    } 
 
    function renderBoard() { 
        const b = document.getElementById('board'); 
        const center = document.getElementById('center-control').outerHTML; 
        b.innerHTML = center; 
        document.getElementById('turn-btn').onclick = takeTurn; 
 
        tiles.forEach(t => { 
            let div = document.createElement('div'); 
            div.onclick = () => showInfo(t.idx); 
 
            // Arka Plan Resmi 
            let bgLayer = document.createElement('div'); 
            bgLayer.className = 'tile-bg-layer'; 
            let imgUrl = (t.type==='element' && t.data.img) ? t.data.img : (t.type==='chance' ? 'https://images.unsplash.com/photo-1592424011349-052562706553?w=300' : 'https://images.unsplash.com/photo-1581093588401-fbb07398296b?w=300'); 
            bgLayer.style.backgroundImage = `url('${imgUrl}')`; 
            div.appendChild(bgLayer); 
 
            let contentLayer = document.createElement('div'); 
            contentLayer.className = 'tile-content'; 
 
            let r, c; 
            if (t.idx <= 7) { r=1; c=t.idx+1; } 
            else if (t.idx <= 14) { r=t.idx-7+1; c=8; } 
            else if (t.idx <= 21) { r=8; c=8-(t.idx-14); } 
            else { r=8-(t.idx-21); c=1; } 
            div.style.gridRow = r; div.style.gridColumn = c; 
 
            if(t.type === 'element') { 
                div.className = `tile ${t.data.type}`; 
                contentLayer.innerHTML = `<span class="t-num">${t.data.no}</span><span class="t-sym">${t.data.sym}</span><span class="t-name">${t.data.name}</span>`; 
            } else if (t.type === 'chance') { 
                div.className = `tile chance`; 
                contentLayer.innerHTML = `<span class="t-center-icon">${t.icon}</span><span class="t-label">${t.title}</span>`; 
            } else { 
                div.className = t.type === 'penalty' ? `tile penalty` : `tile corner`; 
                contentLayer.innerHTML = `<span class="t-center-icon">${t.icon}</span><span class="t-label">${t.title}</span>`; 
            } 
             
            div.appendChild(contentLayer); 
            let pc = document.createElement('div'); 
            pc.className = 'pawn-area'; 
            pc.id = `tile-${t.idx}-p`; 
            div.appendChild(pc); 
            b.appendChild(div); 
        }); 
        updatePawns(); 
    } 
 
    function showInfo(idx) { 
        if(wait) return; 
        let t = tiles[idx]; 
        let content = document.getElementById('info-content'); 
         
        if(t.type === 'element') { 
            let color = t.data.type === 'metal' ? '#e67e22' : (t.data.type === 'ametal' ? '#8e44ad' : '#2980b9'); 
            let img = t.data.img ? t.data.img : ''; 
            content.innerHTML = ` 
                <div class="info-header" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('${img}') center/cover;"> 
                    <div> 
                        <div style="font-size:1.5rem; font-weight:900;">${t.data.name}</div> 
                        <div>Atom No: ${t.data.no}</div> 
                    </div> 
                    <div class="info-sym-big" style="font-size:3rem; font-weight:bold;">${t.data.sym}</div> 
                </div> 
                <div style="padding:10px;"> 
                    <span style="background:${color}; color:white; padding:4px 10px; border-radius:15px; font-size:0.8rem; font-weight:bold; text-transform:uppercase;">${t.data.type}</span> 
                    <h4 style="margin:15px 0 5px 0; color:#2c3e50;">Bilgi & Keşif:</h4> 
                    <p style="font-size:1rem; color:#555;">${t.data.desc}</p> 
                    <p style="color:#27ae60; font-weight:bold; margin-top:20px;">💰 Değer: ${t.data.no * 100} Elektron</p> 
                </div> 
            `; 
        } else { 
            let color = t.type === 'chance' ? '#27ae60' : '#c0392b'; 
            content.innerHTML = ` 
                <div style="text-align:center; padding:20px;"> 
                    <h1 style="color:${color}; font-size:4rem; margin:0;">${t.icon}</h1> 
                    <h2 style="color:${color}; margin:10px 0;">${t.title}</h2> 
                    <p style="font-size:1.2rem; color:#555;">${t.desc}</p> 
                </div> 
            `; 
        } 
        document.getElementById('info-overlay').style.display = 'flex'; 
    } 
     
    function closeInfo(e) { if(!e || e.target.id === 'info-overlay') document.getElementById('info-overlay').style.display = 'none'; } 
 
    function takeTurn() { 
        if(wait) return; 
        SoundManager.playMove(); // Play move sound
        let p = players[turn]; 
        let steps = Math.floor(Math.random()*6)+1; 
        document.getElementById('move-count').innerText = `${steps} Adım`; 
        p.pos = (p.pos + steps) % 28; 
        if(p.pos < steps && p.pos !== 0) { p.money += 500; log(`${p.name} başlangıçtan geçti! (+500)`); } 
        updatePawns(); 
        setTimeout(() => checkTile(p), 800); 
    } 
 
    function checkTile(p) { 
        let t = tiles[p.pos]; 
        let win = 0, lose = 0; 
        if(t.type === 'element') { 
            win = t.data.no * 100; lose = win; 
            openQ('element', win, lose, t.data); 
        } else if (t.type === 'chance') { openQ('chance', 1000, 100, null); } 
        else if (t.type === 'penalty') { openQ('penalty', 100, 1000, null); } 
        else { nextTurn(); } 
    } 
 
    function openQ(type, w, l, data) { 
        wait = true; 
        let ov = document.getElementById('question-overlay'); 
        let vis = document.getElementById('q-visual'); 
        let tit = document.getElementById('q-type'); 
        ov.dataset.win = w; ov.dataset.lose = l; 
 
        if(type === 'element') { 
            tit.innerText = "ELEMENT SORUSU"; tit.style.color = "#3498db"; 
            let color = data.type === 'metal' ? '#d35400' : (data.type === 'ametal' ? '#8e44ad' : '#2980b9'); 
            vis.innerHTML = `<div style="background: url('${data.img}') center/cover; width:100px; height:100px; border-radius:50%; margin:auto; border:4px solid ${color}; box-shadow:0 5px 15px rgba(0,0,0,0.2);"></div><div style="font-size:2rem; font-weight:900; color:${color}; margin-top:10px;">${data.sym}</div>`; 
        } else if (type === 'chance') { 
            tit.innerText = "ŞANS ZAMANI"; tit.style.color = "#27ae60"; vis.innerHTML = `<div style="font-size:5rem;">🍀</div>`; 
        } else { 
            tit.innerText = "CEZA RİSKİ"; tit.style.color = "#c0392b"; vis.innerHTML = `<div style="font-size:5rem;">⚠️</div>`; 
        } 
 
        document.getElementById('q-text').innerText = questions[Math.floor(Math.random()*questions.length)]; 
        ov.style.display = 'flex'; 
        document.getElementById('turn-btn').disabled = true; 
    } 
 
    function answer(correct) { 
        let ov = document.getElementById('question-overlay'); 
        let p = players[turn]; 
        let w = parseInt(ov.dataset.win); 
        let l = parseInt(ov.dataset.lose); 
        ov.style.display = 'none'; 
         
        if(correct) { 
            SoundManager.playWin(); // Play win sound
            p.money += w; log(`${p.name} doğru bildi! (+${w})`); 
        } else { 
            SoundManager.playLose(); // Play lose sound
            p.money -= l; log(`${p.name} yanlış cevap! (-${l})`); 
        } 
 
        if(p.money < 0) { p.status = 'eliminated'; alert(`${p.name} ELENDİ!`); } 
        else if (p.money >= TARGET) { p.status = 'finished'; p.rank = rankCounter++; alert(`TEBRİKLER! ${p.name} ${p.rank}. oldu!`); } 
 
        if(players.filter(x => x.status === 'active').length === 0) endGame(); 
        else nextTurn(); 
         
        wait = false; document.getElementById('turn-btn').disabled = false; updateUI(); 
    } 
 
    function nextTurn() { 
        let count = 0; 
        do { turn = (turn + 1) % players.length; count++; } while(players[turn].status !== 'active' && count <= players.length); 
        updateUI(); 
    } 
 
    function updateUI() { 
        updatePawns(); 
        let lst = document.getElementById('p-list'); lst.innerHTML = ''; 
        let sorted = [...players].sort((a,b) => { 
            if(a.status==='finished' && b.status!=='finished') return -1; 
            if(b.status==='finished' && a.status!=='finished') return 1; 
            if(a.status==='finished') return a.rank - b.rank; 
            return b.money - a.money; 
        }); 
 
        sorted.forEach(p => { 
            let cls = p.status; 
            if(p.id === players[turn].id && p.status === 'active') cls += ' active'; 
            let badge = p.status==='eliminated' ? '<span class="badge elim">ELENDİ</span>' : (p.status==='finished' ? `<span class="badge win">🏆 ${p.rank}.</span>` : ''); 
            let percent = p.status==='eliminated' ? 0 : Math.min(100, (p.money/TARGET)*100); 
 
            lst.innerHTML += `<div class="player-card ${cls}"><div class="p-info-row"><span class="p-name" style="color:${p.color}">● ${p.name}</span>${badge}<span class="p-money">${p.money}</span></div><div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div></div>`; 
        }); 
 
        let cp = players[turn]; 
        if(cp.status === 'active') document.getElementById('turn-text').innerHTML = `SIRA: <span style="color:${cp.color}">${cp.name}</span>`; 
    } 
 
    function updatePawns() { 
        document.querySelectorAll('.pawn-area').forEach(e => e.innerHTML=''); 
        players.forEach(p => { 
            if(p.status==='active') { 
                let div = document.getElementById(`tile-${p.pos}-p`); 
                if(div) div.innerHTML += `<div class="pawn" style="background:${p.color}"></div>`; 
            } 
        }); 
    } 
 
    function log(m) { let box = document.getElementById('log-box'); box.innerHTML = `> ${m}<br>` + box.innerHTML; } 
 
    function endGame() { 
        document.getElementById('game-container').style.display = 'none'; 
        document.getElementById('game-over-screen').style.display = 'flex'; 
        let res = document.getElementById('results'); res.innerHTML = '<h3 style="margin-top:0;">Sonuçlar</h3>'; 
        let sorted = [...players].sort((a,b) => b.money - a.money); 
        sorted.forEach(p => { 
            let st = p.status==='finished' ? `🥇 ${p.rank}.` : (p.status==='eliminated'?'💀':'Kaldı'); 
            res.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee;"><span>${p.name}</span><span>${st} (${p.money})</span></div>`; 
        }); 
    } 
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    function openHowToPlay() { document.getElementById('how-to-play-overlay').style.display = 'flex'; }
    function closeHowToPlay(e) { 
        if(!e || e.target.id === 'how-to-play-overlay' || !e.target.id) {
            document.getElementById('how-to-play-overlay').style.display = 'none'; 
        }
    }

const SoundManager = {
    ctx: null,
    init: function() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    playTone: function(freq, type, duration) {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },
    playMove: function() { this.playTone(300, 'sine', 0.1); },
    playWin: function() { 
        this.playTone(523.25, 'square', 0.1); 
        setTimeout(() => this.playTone(659.25, 'square', 0.2), 100);
    },
    playLose: function() { 
        this.playTone(200, 'sawtooth', 0.3); 
        setTimeout(() => this.playTone(150, 'sawtooth', 0.4), 300);
    }
};

window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) {
            splash.style.opacity = '0';
            setTimeout(() => splash.remove(), 1000);
        }
    }, 2000); // 2 saniye bekle
});
