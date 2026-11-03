// Quizball service worker: κρατάει το παιχνίδι διαθέσιμο και offline.
// Άλλαξε τον αριθμό έκδοσης όταν ανεβάζεις νέες ερωτήσεις, για να φορτώσουν σίγουρα.
const CACHE = 'quizball-2026-11-03q';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
const LOGOS = ["./logos/q_aalborg.png", "./logos/q_adelaide.png", "./logos/q_aik.png", "./logos/q_ajaccio.png", "./logos/q_al_ahli.png", "./logos/q_al_ahly.png", "./logos/q_al_ain.png", "./logos/q_alaves.png", "./logos/q_almeria.png", "./logos/q_america_cali.png", "./logos/q_andorra.png", "./logos/q_angers.png", "./logos/q_argentinos_juniors.png", "./logos/q_aris_limassol.png", "./logos/q_arouca.png", "./logos/q_astana.png", "./logos/q_atlas.png", "./logos/q_atletico_nacional.png", "./logos/q_auckland.png", "./logos/q_augsburg.png", "./logos/q_austin.png", "./logos/q_austria_wien.png", "./logos/q_auxerre.png", "./logos/q_ballkani.png", "./logos/q_barracas.png", "./logos/q_bastia.png", "./logos/q_bate_borisov.png", "./logos/q_birmingham.png", "./logos/q_bolivar.png", "./logos/q_brann.png", "./logos/q_brest.png", "./logos/q_cadiz.png", "./logos/q_catolica.png", "./logos/q_celje.png", "./logos/q_central_coast.png", "./logos/q_cercle_brugge.png", "./logos/q_cfr_cluj.png", "./logos/q_charleroi.png", "./logos/q_charlton.png", "./logos/q_chaves.png", "./logos/q_chicago.png", "./logos/q_cincinnati.png", "./logos/q_clermont.png", "./logos/q_coventry_city.png", "./logos/q_cremonese.png", "./logos/q_cruz_azul.png", "./logos/q_cruzeiro.png", "./logos/q_cukaricki.png", "./logos/q_dallas.png", "./logos/q_darmstadt.png", "./logos/q_dc_united.png", "./logos/q_derby.png", "./logos/q_dinamo_minsk.png", "./logos/q_djurgardens.png", "./logos/q_elfsborg.png", "./logos/q_empoli.png", "./logos/q_esperance.png", "./logos/q_estoril.png", "./logos/q_estudiantes.png", "./logos/q_fortaleza.png", "./logos/q_fredrikstad.png", "./logos/q_frosinone.png", "./logos/q_ga_eagles.png", "./logos/q_gil_vicente.png", "./logos/q_goteborg.png", "./logos/q_grasshopper.png", "./logos/q_groningen.png", "./logos/q_guadalajara.png", "./logos/q_hacken.png", "./logos/q_hajduk.png", "./logos/q_hapoel_beer_sheva.png", "./logos/q_heerenveen.png", "./logos/q_heidenheim.png", "./logos/q_hellas_verona.png", "./logos/q_helsinki.png", "./logos/q_hibernian.png", "./logos/q_holstein_kiel.png", "./logos/q_houston_dynamo.png", "./logos/q_huracan.png", "./logos/q_independiente_valle.png", "./logos/q_jablonec.png", "./logos/q_jagiellonia.png", "./logos/q_juventude.png", "./logos/q_kaiserslautern.png", "./logos/q_kaizer_chiefs.png", "./logos/q_kv_mechelen.png", "./logos/q_las_palmas.png", "./logos/q_lask_linz.png", "./logos/q_lech_poznan.png", "./logos/q_legia_warsaw.png", "./logos/q_levski_sofia.png", "./logos/q_lincoln_red_imps.png", "./logos/q_ludogorets.png", "./logos/q_lugano.png", "./logos/q_luton.png", "./logos/q_maccabi_haifa.png", "./logos/q_mamelodi.png", "./logos/q_maribor.png", "./logos/q_melbourne_city.png", "./logos/q_metz.png", "./logos/q_millonarios.png", "./logos/q_millwall.png", "./logos/q_mineiro.png", "./logos/q_molde.png", "./logos/q_monterrey.png", "./logos/q_montpellier.png", "./logos/q_moreirense.png", "./logos/q_nancy.png", "./logos/q_nashville.png", "./logos/q_nijmegen.png", "./logos/q_noah.png", "./logos/q_nordsjaelland.png", "./logos/q_olimpija.png", "./logos/q_orlando_city.png", "./logos/q_orlando_pirates.png", "./logos/q_oxford.png", "./logos/q_pachuca.png", "./logos/q_palermo.png", "./logos/q_penarol.png", "./logos/q_pereira.png", "./logos/q_philadelphia.png", "./logos/q_pisa.png", "./logos/q_portimonense.png", "./logos/q_portsmouth.png", "./logos/q_preston.png", "./logos/q_qadsiah.png", "./logos/q_racing.png", "./logos/q_rapid_wien.png", "./logos/q_real_oviedo.png", "./logos/q_real_salt_lake.png", "./logos/q_rfs.png", "./logos/q_rijeka.png", "./logos/q_rosenborg.png", "./logos/q_rubin_kazan.png", "./logos/q_san_diego.png", "./logos/q_san_jose.png", "./logos/q_santa_fe.png", "./logos/q_shamrock_rovers.png", "./logos/q_shanghai_port.png", "./logos/q_shanghai_shenhua.png", "./logos/q_sheffield_wed.png", "./logos/q_shkendija.png", "./logos/q_silkeborg.png", "./logos/q_sparta_rotterdam.png", "./logos/q_spartak_moscow.png", "./logos/q_spartak_trnava.png", "./logos/q_sport_recife.png", "./logos/q_sporting_kc.png", "./logos/q_st_gallen.png", "./logos/q_st_louis.png", "./logos/q_st_pauli.png", "./logos/q_sturm_graz.png", "./logos/q_sydney_fc.png", "./logos/q_tigre.png", "./logos/q_tigres.png", "./logos/q_tijuana.png", "./logos/q_toluca.png", "./logos/q_toulouse.png", "./logos/q_troyes.png", "./logos/q_ulsan.png", "./logos/q_union_sg.png", "./logos/q_univ_craiova.png", "./logos/q_urawa.png", "./logos/q_utrecht.png", "./logos/q_valladolid.png", "./logos/q_vasco.png", "./logos/q_viking.png", "./logos/q_vissel_kobe.png", "./logos/q_vitoria_guimaraes.png", "./logos/q_westerlo.png", "./logos/q_western_sydney.png", "./logos/q_wisla_krakow.png", "./logos/q_wolfsberger.png", "./logos/q_wrexham.png", "./logos/q_zorya_luhansk.png", "./logos/q_zurich.png", "./logos/var.png"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).then(() => Promise.all(LOGOS.map(u => c.add(u).catch(() => {}))))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Σελίδα: πρώτα δίκτυο (για να έρχονται οι νέες ερωτήσεις), αλλιώς cache.
  if (req.mode === 'navigate') {
    e.respondWith(
      // cache: 'no-cache' => πάντα ελέγχει το GitHub για νέα έκδοση (αλλιώς ο browser κρατάει την παλιά έως 10 λεπτά)
      fetch(req, { cache: 'no-cache' }).then(res => { caches.open(CACHE).then(c => c.put('./index.html', res.clone())); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Εικόνες/γραμματοσειρές/σήματα: πρώτα cache, μετά δίκτυο.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => hit))
  );
});

// Προθέρμανση: η σελίδα στέλνει τη λίστα με όλα τα εξωτερικά σήματα/σημαίες
// και τα κατεβάζουμε σιγά-σιγά στο παρασκήνιο, ώστε να υπάρχουν και offline.
self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'warm' || !Array.isArray(e.data.urls)) return;
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const todo = [];
    for (const u of e.data.urls) { if (!(await cache.match(u))) todo.push(u); }
    let i = 0;
    const worker = async () => {
      while (i < todo.length) {
        const u = todo[i++];
        try {
          let res = await fetch(u, { mode: 'cors' }).catch(() => null);
          if (!res || !res.ok) res = await fetch(u, { mode: 'no-cors' });
          if (res && (res.ok || res.type === 'opaque')) await cache.put(u, res);
        } catch (err) { /* ένα σήμα που δεν βρέθηκε δεν σταματάει τα υπόλοιπα */ }
      }
    };
    await Promise.all([worker(), worker(), worker(), worker()]);
  })());
});
